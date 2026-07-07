// ==========================================================
// AKA BMW ISGM
// Inventory Repository
// Enterprise v6.0
// ==========================================================

import { Repository } from "../../core/repository.js";

class InventoryRepository extends Repository {

    constructor() {

        super("parts");

    }

    async save(part) {

        return await this.create(

            part.toJSON()

        );

    }

    async saveWithId(id, part) {

        return await this.createWithId(

            id,

            part.toJSON()

        );

    }

    async updatePart(id, part) {

        return await this.update(

            id,

            part.toJSON()

        );

    }

    async deletePart(id) {

        return await this.delete(id);

    }

    async get(id) {

        return await this.find(id);

    }

    async getAll() {

        return await this.all();

    }

}

const InventoryRepo = new InventoryRepository();

export {

    InventoryRepo,

    InventoryRepository

};