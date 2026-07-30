// ==========================================================
// AKA BMW ISGM
// Booking Validator
// Enterprise v6.0
// ==========================================================

class BookingValidator {

    static validate(data) {

        const errors = [];

        if (!data.customerId) {

            errors.push("Customer wajib dipilih.");

        }

        if (!data.customerName) {

            errors.push("Nama customer wajib diisi.");

        }

        if (!data.customerPhone) {

            errors.push("Nomor telepon customer wajib diisi.");

        }

        if (!data.vehicleId) {

            errors.push("Kendaraan wajib dipilih.");

        }

        if (!data.plateNumber) {

            errors.push("Nomor polisi wajib diisi.");

        }

        if (!data.bookingDate) {

            errors.push("Tanggal booking wajib diisi.");

        }

        if (!data.bookingTime) {

            errors.push("Jam booking wajib diisi.");

        }

        if (!data.complaint) {

            errors.push("Keluhan customer wajib diisi.");

        }

        if (!data.serviceAdvisor) {

            errors.push("Service Advisor wajib dipilih.");

        }

        return {

            valid: errors.length === 0,

            errors

        };

    }

    static validateStatus(status) {

        const allowed = [

            "PENDING",
            "CONFIRMED",
            "CHECK_IN",
            "PROCESS",
            "FINISHED",
            "CANCELLED"

        ];

        return allowed.includes(status);

    }

    static validatePriority(priority) {

        const allowed = [

            "LOW",
            "NORMAL",
            "HIGH",
            "URGENT"

        ];

        return allowed.includes(priority);

    }

}

export {

    BookingValidator

};