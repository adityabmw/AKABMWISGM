// ==========================================================
// AKA BMW ISGM
// Inventory Service
// Enterprise v6.0
// ==========================================================

import { Inventory } from "./inventory.model.js";
import { InventoryRepo } from "./inventory.repository.js";

class InventoryService {

    async create(data) {

        const item = new Inventory(data);

        return await InventoryRepo.save(item);

    }

    async createWithId(id, data) {

        const item = new Inventory(data);

        return await InventoryRepo.saveWithId(

            id,

            item

        );

    }

    async update(id, data) {

        const item = new Inventory(data);

        item.id = id;

        item.updatedAt = new Date().toISOString();

        return await InventoryRepo.updatePart(

            id,

            item

        );

    }

    async remove(id) {

        return await InventoryRepo.deletePart(id);

    }

    async find(id) {

        return await InventoryRepo.get(id);

    }

    async findAll() {

        return await InventoryRepo.getAll();

    }

}

const InventoryServices = new InventoryService();

export {

    InventoryServices,

    InventoryService

};