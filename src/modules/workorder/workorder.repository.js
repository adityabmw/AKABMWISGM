// ==========================================================
// AKA BMW ISGM
// Work Order Repository
// Enterprise v6.0
// ==========================================================

import { Repository } from "../../core/repository.js";

class WorkOrderRepository extends Repository {

    constructor() {

        super("workorders");

    }

    async save(workOrder) {

        return await this.create(
            workOrder.toJSON()
        );

    }

    async saveWithId(id, workOrder) {

        return await this.createWithId(
            id,
            workOrder.toJSON()
        );

    }

    async updateWorkOrder(id, workOrder) {

        return await this.update(
            id,
            workOrder.toJSON()
        );

    }

    async deleteWorkOrder(id) {

        return await this.delete(id);

    }

    async get(id) {

        return await this.find(id);

    }

    async getAll() {

        return await this.all();

    }

}

const WorkOrderRepo = new WorkOrderRepository();

export {

    WorkOrderRepo,

    WorkOrderRepository

};