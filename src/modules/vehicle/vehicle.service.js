// ==========================================================
// AKA BMW ISGM
// Vehicle Service
// Enterprise v6.0
// ==========================================================

import { Vehicle } from "./vehicle.model.js";
import { VehicleRepo } from "./vehicle.repository.js";

class VehicleService {

    async create(data) {

        const vehicle = new Vehicle(data);

        return await VehicleRepo.save(vehicle);

    }

    async createWithId(id, data) {

        const vehicle = new Vehicle(data);

        return await VehicleRepo.saveWithId(
            id,
            vehicle
        );

    }

    async update(id, data) {

        const vehicle = new Vehicle(data);

        vehicle.id = id;

        vehicle.updatedAt = new Date().toISOString();

        return await VehicleRepo.updateVehicle(
            id,
            vehicle
        );

    }

    async remove(id) {

        return await VehicleRepo.deleteVehicle(id);

    }

    async find(id) {

        return await VehicleRepo.get(id);

    }

    async findAll() {

        return await VehicleRepo.getAll();

    }

    async existsPlate(plateNumber) {

        const snap = await VehicleRepo.getAll();

        return snap.docs.some(doc => {

            const data = doc.data();

            return (
                (data.plateNumber || "").toUpperCase() ===
                plateNumber.toUpperCase()
            );

        });

    }

    async existsVIN(vin) {

        const snap = await VehicleRepo.getAll();

        return snap.docs.some(doc => {

            const data = doc.data();

            return (
                (data.vin || "").toUpperCase() ===
                vin.toUpperCase()
            );

        });

    }

}

const VehicleServices = new VehicleService();

export {

    VehicleServices,

    VehicleService

};