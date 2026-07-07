// ==========================================================
// AKA BMW ISGM
// Customer Validator
// Enterprise v6.0
// ==========================================================

class CustomerValidation {

    static validate(data = {}) {

        const errors = [];

        if (!data.name || data.name.trim() === "") {

            errors.push("Nama Customer wajib diisi.");

        }

        if (!data.phone || data.phone.trim() === "") {

            errors.push("Nomor Handphone wajib diisi.");

        } else {

            const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;

            if (!phoneRegex.test(data.phone.trim())) {

                errors.push("Format Nomor Handphone tidak valid.");

            }

        }

        if (data.email && data.email.trim() !== "") {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(data.email.trim())) {

                errors.push("Format Email tidak valid.");

            }

        }

        if (data.nik && data.nik.trim() !== "") {

            if (!/^[0-9]{16}$/.test(data.nik.trim())) {

                errors.push("NIK harus terdiri dari 16 digit.");

            }

        }

        if (data.postalCode && data.postalCode.trim() !== "") {

            if (!/^[0-9]{5}$/.test(data.postalCode.trim())) {

                errors.push("Kode Pos harus terdiri dari 5 digit.");

            }

        }

        return {

            valid: errors.length === 0,

            errors

        };

    }

    static throwIfInvalid(data) {

        const result = this.validate(data);

        if (!result.valid) {

            throw new Error(result.errors.join("\n"));

        }

        return true;

    }

}

export {

    CustomerValidation

};