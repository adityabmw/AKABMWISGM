// ==========================================================
// AKA BMW ISGM
// Customer Controller
// Enterprise v6.0
// ==========================================================

import { CustomerServices } from "./customer.service.js";
import { CustomerValidation } from "./customer.validator.js";

class CustomerController {

    async create(data) {

        CustomerValidation.throwIfInvalid(data);

        if (await CustomerServices.existsPhone(data.phone)) {

            throw new Error(
                "Nomor Handphone sudah terdaftar."
            );

        }

        if (data.email) {

            if (await CustomerServices.existsEmail(data.email)) {

                throw new Error(
                    "Email sudah terdaftar."
                );

            }

        }

        if (data.nik) {

            if (await CustomerServices.existsNik(data.nik)) {

                throw new Error(
                    "NIK sudah terdaftar."
                );

            }

        }

        return await CustomerServices.create(data);

    }

    async update(id, data) {

        CustomerValidation.throwIfInvalid(data);

        return await CustomerServices.update(
            id,
            data
        );

    }

    async delete(id) {

        return await CustomerServices.remove(
            id
        );

    }

    async detail(id) {

        return await CustomerServices.find(
            id
        );

    }

    async list() {

        return await CustomerServices.findAll();

    }

}

const CustomerControllerInstance =
    new CustomerController();

export {

    CustomerControllerInstance,

    CustomerController

};