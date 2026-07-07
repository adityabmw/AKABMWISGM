// ==========================================================
// AKA BMW ISGM
// Reception Controller
// Enterprise v6.0
// ==========================================================

import { ReceptionServices } from "./reception.service.js";
import { ReceptionValidation } from "./reception.validator.js";

class ReceptionController {

    async create(data) {

        ReceptionValidation.throwIfInvalid(data);

        return await ReceptionServices.create(
            data
        );

    }

    async update(id, data) {

        ReceptionValidation.throwIfInvalid(data);

        return await ReceptionServices.update(
            id,
            data
        );

    }

    async delete(id) {

        return await ReceptionServices.remove(id);

    }

    async detail(id) {

        return await ReceptionServices.find(id);

    }

    async list() {

        return await ReceptionServices.findAll();

    }

}

const ReceptionControllerInstance =
    new ReceptionController();

export {

    ReceptionControllerInstance,

    ReceptionController

};