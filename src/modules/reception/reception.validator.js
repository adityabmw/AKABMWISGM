// ==========================================================
// AKA BMW ISGM
// Reception Validator
// Enterprise v6.0
// ==========================================================

class ReceptionValidation {

    static validate(data = {}) {

        const errors = [];

        if (!data.customerId)
            errors.push("Customer wajib dipilih.");

        if (!data.vehicleId)
            errors.push("Kendaraan wajib dipilih.");

        if (!data.serviceAdvisor)
            errors.push("Service Advisor wajib dipilih.");

        if (!data.complaint)
            errors.push("Keluhan customer wajib diisi.");

        if (
            data.odometer === "" ||
            data.odometer === null ||
            data.odometer === undefined
        ) {

            errors.push("Odometer wajib diisi.");

        }

        if (!data.fuelLevel)
            errors.push("Level BBM wajib dipilih.");

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

    ReceptionValidation

};