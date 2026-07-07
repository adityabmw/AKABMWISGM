// ================================================================
// AKA BMW ISGM
// Employee Validator
// Enterprise Version 3.0
// ================================================================

import { Validator } from "../../core/validator.js";

class EmployeeValidator {

    validate(employee) {

        if (!Validator.required(employee.fullName)) {

            throw new Error("Nama lengkap wajib diisi.");

        }

        if (!Validator.required(employee.role)) {

            throw new Error("Role wajib dipilih.");

        }

        if (!Validator.required(employee.department)) {

            throw new Error("Department wajib dipilih.");

        }

        if (!Validator.required(employee.position)) {

            throw new Error("Position wajib dipilih.");

        }

        if (employee.email &&
            !Validator.email(employee.email)) {

            throw new Error("Format email tidak valid.");

        }

        if (employee.phone &&
            !Validator.phone(employee.phone)) {

            throw new Error("Nomor HP tidak valid.");

        }

        return true;

    }

}

const EmployeeValidation = new EmployeeValidator();

export {

    EmployeeValidation,

    EmployeeValidator

};