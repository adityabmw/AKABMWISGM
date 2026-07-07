// ==========================================================
// AKA BMW ISGM
// Work Order Model
// Enterprise v6.0
// ==========================================================

class WorkOrder {

    constructor(data = {}) {

        this.id = data.id ?? "";

        this.workOrderCode = data.workOrderCode ?? "";

        this.receptionId = data.receptionId ?? "";

        this.customerId = data.customerId ?? "";

        this.vehicleId = data.vehicleId ?? "";

        this.serviceAdvisor = data.serviceAdvisor ?? "";

        this.mechanic = data.mechanic ?? "";

        this.priority = data.priority ?? "NORMAL";

        this.status = data.status ?? "OPEN";

        this.complaint = data.complaint ?? "";

        this.diagnosis = data.diagnosis ?? "";

        this.recommendation = data.recommendation ?? "";

        this.laborItems = data.laborItems ?? [];

        this.partItems = data.partItems ?? [];

        this.totalLabor = data.totalLabor ?? 0;

        this.totalParts = data.totalParts ?? 0;

        this.grandTotal = data.grandTotal ?? 0;

        this.createdAt = data.createdAt ?? new Date().toISOString();

        this.updatedAt = data.updatedAt ?? new Date().toISOString();

        this.deleted = data.deleted ?? false;

    }

    update(data = {}) {

        Object.assign(this, data);

        this.updatedAt = new Date().toISOString();

        return this;

    }

    close() {

        this.status = "CLOSED";

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

            workOrderCode: this.workOrderCode,

            receptionId: this.receptionId,

            customerId: this.customerId,

            vehicleId: this.vehicleId,

            serviceAdvisor: this.serviceAdvisor,

            mechanic: this.mechanic,

            priority: this.priority,

            status: this.status,

            complaint: this.complaint,

            diagnosis: this.diagnosis,

            recommendation: this.recommendation,

            laborItems: this.laborItems,

            partItems: this.partItems,

            totalLabor: this.totalLabor,

            totalParts: this.totalParts,

            grandTotal: this.grandTotal,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt,

            deleted: this.deleted

        };

    }

    static createCode(last = 0) {

        return "WO" + String(last + 1).padStart(6, "0");

    }

}

export {

    WorkOrder

};