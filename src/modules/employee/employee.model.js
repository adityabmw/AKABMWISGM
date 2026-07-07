// ================================================================
// AKA BMW ISGM
// Employee Model
// Enterprise Version 3.0
// ================================================================

import { EmployeeSchema } from "./employee.schema.js";

import { Identity } from "../../core/identity.js";

import { Helper } from "../../core/helper.js";

class EmployeeModel {

    create(data = {}) {

        const employee = structuredClone(EmployeeSchema);

        employee.uid = Identity.uuid();

        employee.employeeId = Identity.next("EMP");

        employee.branch = "MAIN";

        employee.status = "ACTIVE";

        employee.isOnline = false;

        employee.currentStatus = "OFFLINE";

        employee.createdAt = Helper.now();

        employee.updatedAt = Helper.now();

        Object.assign(employee, data);

        return employee;

    }

    clone(employee) {

        return structuredClone(employee);

    }

}

const Employee = new EmployeeModel();

export {

    Employee,

    EmployeeModel

};