// ================================================================
// AKA BMW ISGM
// Master Controller
// ================================================================

import { MasterServices } from "./master.service.js";

class MasterController {

    async create(data){

        return await MasterServices.create(data);

    }

    async update(id,data){

        return await MasterServices.update(id,data);

    }

    async delete(id){

        return await MasterServices.delete(id);

    }

    async list(){

        return await MasterServices.all();

    }

}

const MasterControllerAPI =

new MasterController();

export {

MasterControllerAPI,

MasterController

};