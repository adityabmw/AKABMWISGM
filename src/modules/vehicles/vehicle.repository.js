// ==========================================================
// AKA BMW ISGM
// Vehicle Repository
// Enterprise v6.0
// ==========================================================

import { Repository } from "../../core/repository.js";

class VehicleRepository extends Repository {

    constructor() {

        super("vehicles");

    }

    async save(vehicle) {

        return await this.create(
            vehicle.toJSON()
        );

    }

    async saveWithId(id, vehicle) {

        return await this.createWithId(
            id,
            vehicle.toJSON()
        );

    }

    async updateVehicle(id, vehicle) {

        return await this.update(
            id,
            vehicle.toJSON()
        );

    }

    async deleteVehicle(id) {

        return await this.delete(
            id
        );

    }

    async get(id) {

        return await this.find(
            id
        );

    }

    async getAll() {

        return await this.all();

    }

}

const VehicleRepo = new VehicleRepository();

export {

    VehicleRepo,

    VehicleRepository

};