// ================================================================
// AKA BMW ISGM
// Employee Service
// ================================================================

import { Employee } from "./employee.model.js";
import { EmployeeRepo } from "./employee.repository.js";
import { EmployeeValidation } from "./employee.validator.js";

class EmployeeService {

    async create(data) {

        const employee = Employee.create(data);

        EmployeeValidation.validate(employee);

        return await EmployeeRepo.createWithId(

            employee.employeeId,

            employee

        );

    }

    async update(id, data) {

        return await EmployeeRepo.update(id, data);

    }

    async delete(id) {

        return await EmployeeRepo.delete(id);

    }

    async find(id) {

        return await EmployeeRepo.find(id);

    }

    async all() {

        return await EmployeeRepo.all();

    }

}

const EmployeeServices = new EmployeeService();

export {

    EmployeeServices,

    EmployeeService

};