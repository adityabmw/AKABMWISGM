// ==========================================================
// AKA BMW ISGM
// Work Order Controller
// Enterprise v6.0
// ==========================================================

import { WorkOrderServices } from "./workorder.service.js";
import { WorkOrderValidation } from "./workorder.validator.js";

class WorkOrderController {

    async create(data) {

        WorkOrderValidation.throwIfInvalid(data);

        return await WorkOrderServices.create(data);

    }

    async update(id, data) {

        WorkOrderValidation.throwIfInvalid(data);

        return await WorkOrderServices.update(
            id,
            data
        );

    }

    async delete(id) {

        return await WorkOrderServices.remove(id);

    }

    async detail(id) {

        return await WorkOrderServices.find(id);

    }

    async list() {

        return await WorkOrderServices.findAll();

    }

}

const WorkOrderControllerInstance =
    new WorkOrderController();

export {

    WorkOrderControllerInstance,

    WorkOrderController

};