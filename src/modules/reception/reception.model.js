// ==========================================================
// AKA BMW ISGM
// Reception Model
// Enterprise v6.0
// ==========================================================

class Reception {

    constructor(data = {}) {

        this.id = data.id ?? "";

        this.receptionCode = data.receptionCode ?? "";

        this.customerId = data.customerId ?? "";

        this.vehicleId = data.vehicleId ?? "";

        this.workOrderId = data.workOrderId ?? "";

        this.serviceAdvisor = data.serviceAdvisor ?? "";

        this.checkInDate = data.checkInDate ?? new Date().toISOString();

        this.complaint = data.complaint ?? "";

        this.odometer = data.odometer ?? 0;

        this.fuelLevel = data.fuelLevel ?? "";

        this.keyQuantity = data.keyQuantity ?? 1;

        this.status = data.status ?? "CHECK-IN";

        this.priority = data.priority ?? "NORMAL";

        this.notes = data.notes ?? "";

        this.createdAt = new Date().toISOString();

        this.updatedAt = new Date().toISOString();

        this.deleted = false;

    }

    update(data = {}) {

        Object.assign(this, data);

        this.updatedAt = new Date().toISOString();

        return this;

    }

    checkOut() {

        this.status = "CHECK-OUT";

        this.updatedAt = new Date().toISOString();

        return this;

    }

    cancel() {

        this.status = "CANCEL";

        this.updatedAt = new Date().toISOString();

        return this;

    }

    toJSON() {

        return {

            id: this.id,

            receptionCode: this.receptionCode,

            customerId: this.customerId,

            vehicleId: this.vehicleId,

            workOrderId: this.workOrderId,

            serviceAdvisor: this.serviceAdvisor,

            checkInDate: this.checkInDate,

            complaint: this.complaint,

            odometer: this.odometer,

            fuelLevel: this.fuelLevel,

            keyQuantity: this.keyQuantity,

            status: this.status,

            priority: this.priority,

            notes: this.notes,

            deleted: this.deleted,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt

        };

    }

    static createCode(last = 0) {

        return "RCP" + String(last + 1).padStart(6, "0");

    }

}

export {

    Reception

};