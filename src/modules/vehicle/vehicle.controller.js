// ==========================================================
// AKA BMW ISGM
// Vehicle Controller
// Enterprise v6.0
// ==========================================================

import { VehicleServices } from "./vehicle.service.js";
import { VehicleValidation } from "./vehicle.validator.js";

class VehicleController {

    async create(data) {

        VehicleValidation.throwIfInvalid(data);

        if (await VehicleServices.existsPlate(data.plateNumber)) {

            throw new Error(
                "Nomor Polisi sudah terdaftar."
            );

        }

        if (data.vin) {

            if (await VehicleServices.existsVIN(data.vin)) {

                throw new Error(
                    "VIN sudah terdaftar."
                );

            }

        }

        return await VehicleServices.create(data);

    }

    async update(id, data) {

        VehicleValidation.throwIfInvalid(data);

        return await VehicleServices.update(
            id,
            data
        );

    }

    async delete(id) {

        return await VehicleServices.remove(
            id
        );

    }

    async detail(id) {

        return await VehicleServices.find(
            id
        );

    }

    async list() {

        return await VehicleServices.findAll();

    }

}

const VehicleControllerInstance =
    new VehicleController();

export {

    VehicleControllerInstance,

    VehicleController

};