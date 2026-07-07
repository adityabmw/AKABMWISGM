// ==========================================================
// AKA BMW ISGM
// Work Order Validator
// Enterprise v6.0
// ==========================================================

class WorkOrderValidation {

    static validate(data = {}) {

        const errors = [];

        if (!data.customerId)
            errors.push("Customer wajib dipilih.");

        if (!data.vehicleId)
            errors.push("Kendaraan wajib dipilih.");

        if (!data.receptionId)
            errors.push("Reception wajib dipilih.");

        if (!data.serviceAdvisor)
            errors.push("Service Advisor wajib dipilih.");

        if (!data.complaint)
            errors.push("Keluhan customer wajib diisi.");

        if (!data.mechanic)
            errors.push("Mekanik wajib dipilih.");

        return {

            valid: errors.length === 0,

            errors

        };

    }

    static throwIfInvalid(data) {

        const result = this.validate(data);

        if (!result.valid) {

            throw new Error(
                result.errors.join("\n")
            );

        }

        return true;

    }

}

export {

    WorkOrderValidation

};