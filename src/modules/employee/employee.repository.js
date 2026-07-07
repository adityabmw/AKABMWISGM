// ================================================================
// AKA BMW ISGM
// Employee Repository
// ================================================================

import { Repository } from "../../core/repository.js";

class EmployeeRepository extends Repository {

    constructor() {

        super("employees");

    }

}

const EmployeeRepo = new EmployeeRepository();

export {

    EmployeeRepo,

    EmployeeRepository

};