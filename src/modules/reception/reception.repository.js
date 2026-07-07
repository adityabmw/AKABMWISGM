// ==========================================================
// AKA BMW ISGM
// Reception Repository
// Enterprise v6.0
// ==========================================================

import { Repository } from "../../core/repository.js";

class ReceptionRepository extends Repository {

    constructor() {

        super("receptions");

    }

    async save(reception) {

        return await this.create(
            reception.toJSON()
        );

    }

    async saveWithId(id, reception) {

        return await this.createWithId(
            id,
            reception.toJSON()
        );

    }

    async updateReception(id, reception) {

        return await this.update(
            id,
            reception.toJSON()
        );

    }

    async deleteReception(id) {

        return await this.delete(id);

    }

    async get(id) {

        return await this.find(id);

    }

    async getAll() {

        return await this.all();

    }

}

const ReceptionRepo = new ReceptionRepository();

export {

    ReceptionRepo,

    ReceptionRepository

};