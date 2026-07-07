// ==========================================================
// AKA BMW ISGM
// Reception Service
// Enterprise v6.0
// ==========================================================

import { Reception } from "./reception.model.js";
import { ReceptionRepo } from "./reception.repository.js";

class ReceptionService {

    async create(data) {

        const reception = new Reception(data);

        return await ReceptionRepo.save(reception);

    }

    async createWithId(id, data) {

        const reception = new Reception(data);

        return await ReceptionRepo.saveWithId(
            id,
            reception
        );

    }

    async update(id, data) {

        const reception = new Reception(data);

        reception.id = id;

        reception.updatedAt = new Date().toISOString();

        return await ReceptionRepo.updateReception(
            id,
            reception
        );

    }

    async remove(id) {

        return await ReceptionRepo.deleteReception(id);

    }

    async find(id) {

        return await ReceptionRepo.get(id);

    }

    async findAll() {

        return await ReceptionRepo.getAll();

    }

}

const ReceptionServices = new ReceptionService();

export {

    ReceptionServices,

    ReceptionService

};