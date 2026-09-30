// ==========================================================
// AKA BMW ISGM
// Vehicle Validator
// Enterprise v6.0
// ==========================================================

class VehicleValidation {

    static validate(data = {}) {

        const errors = [];

        if (!data.customerId) {

            errors.push("Customer wajib dipilih.");

        }

        if (!data.plateNumber) {

            errors.push("Nomor Polisi wajib diisi.");

        }

        if (!data.brand) {

            errors.push("Brand kendaraan wajib diisi.");

        }

        if (!data.model) {

            errors.push("Model kendaraan wajib diisi.");

        }

        if (data.productionYear) {

            const year = Number(data.productionYear);

            const currentYear =
                new Date().getFullYear() + 1;

            if (
                year < 1950 ||
                year > currentYear
            ) {

                errors.push(
                    "Tahun produksi tidak valid."
                );

            }

        }

        if (data.vin) {

            const vin =
                data.vin.trim().toUpperCase();

            if (
                vin.length !== 17
            ) {

                errors.push(
                    "VIN harus terdiri dari 17 karakter."
                );

            }

        }

        return {

            valid: errors.length === 0,

            errors

        };

    }

    static throwIfInvalid(data) {

        const result =
            this.validate(data);

        if (!result.valid) {

            throw new Error(
                result.errors.join("\n")
            );

        }

        return true;

    }

}

export {

    VehicleValidation

};