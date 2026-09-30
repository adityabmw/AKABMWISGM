// ==========================================================
// AKA BMW ISGM
// Vehicle Model
// Enterprise v6.0
// ==========================================================

class Vehicle {

    constructor(data = {}) {

        this.id = data.id ?? "";

        this.customerId = data.customerId ?? "";

        this.vehicleCode = data.vehicleCode ?? "";

        this.plateNumber = data.plateNumber ?? "";

        this.vin = data.vin ?? "";

        this.engineNumber = data.engineNumber ?? "";

        this.brand = data.brand ?? "BMW";

        this.model = data.model ?? "";

        this.variant = data.variant ?? "";

        this.productionYear = data.productionYear ?? "";

        this.engineCode = data.engineCode ?? "";

        this.transmission = data.transmission ?? "";

        this.fuelType = data.fuelType ?? "";

        this.color = data.color ?? "";

        this.odometer = data.odometer ?? 0;

        this.notes = data.notes ?? "";

        this.status = data.status ?? "ACTIVE";

        this.createdAt = data.createdAt ?? new Date().toISOString();

        this.updatedAt = data.updatedAt ?? new Date().toISOString();

        this.deleted = data.deleted ?? false;

    }

    update(data = {}) {

        Object.assign(this, data);

        this.updatedAt = new Date().toISOString();

        return this;

    }

    softDelete() {

        this.deleted = true;

        this.updatedAt = new Date().toISOString();

        return this;

    }

    toJSON() {

        return {

            id: this.id,

            customerId: this.customerId,

            vehicleCode: this.vehicleCode,

            plateNumber: this.plateNumber,

            vin: this.vin,

            engineNumber: this.engineNumber,

            brand: this.brand,

            model: this.model,

            variant: this.variant,

            productionYear: this.productionYear,

            engineCode: this.engineCode,

            transmission: this.transmission,

            fuelType: this.fuelType,

            color: this.color,

            odometer: this.odometer,

            notes: this.notes,

            status: this.status,

            deleted: this.deleted,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt

        };

    }

    static createCode(lastNumber = 0) {

        return "VEH" + String(lastNumber + 1).padStart(6, "0");

    }

}

export {

    Vehicle

};