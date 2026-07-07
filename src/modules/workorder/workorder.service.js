// ==========================================================
// AKA BMW ISGM
// Work Order Service
// Enterprise v6.0
// ==========================================================

import { WorkOrder } from "./workorder.model.js";
import { WorkOrderRepo } from "./workorder.repository.js";

class WorkOrderService {

    async create(data) {

        const workOrder = new WorkOrder(data);

        return await WorkOrderRepo.save(
            workOrder
        );

    }

    async createWithId(id, data) {

        const workOrder = new WorkOrder(data);

        return await WorkOrderRepo.saveWithId(
            id,
            workOrder
        );

    }

    async update(id, data) {

        const workOrder = new WorkOrder(data);

        workOrder.id = id;

        workOrder.updatedAt = new Date().toISOString();

        return await WorkOrderRepo.updateWorkOrder(
            id,
            workOrder
        );

    }

    async remove(id) {

        return await WorkOrderRepo.deleteWorkOrder(id);

    }

    async find(id) {

        return await WorkOrderRepo.get(id);

    }

    async findAll() {

        return await WorkOrderRepo.getAll();

    }

}

const WorkOrderServices = new WorkOrderService();

export {

    WorkOrderServices,

    WorkOrderService

};