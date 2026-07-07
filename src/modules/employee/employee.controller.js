// ================================================================
// AKA BMW ISGM
// Employee Controller
// ================================================================

import { EmployeeServices } from "./employee.service.js";

class EmployeeController {

    async create(data){

        return await EmployeeServices.create(data);

    }

    async update(id,data){

        return await EmployeeServices.update(id,data);

    }

    async delete(id){

        return await EmployeeServices.delete(id);

    }

    async detail(id){

        return await EmployeeServices.find(id);

    }

    async list(){

        return await EmployeeServices.all();

    }

}

const EmployeeControllerAPI =

new EmployeeController();

export {

EmployeeControllerAPI,

EmployeeController

};