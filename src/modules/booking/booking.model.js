// ==========================================================
// AKA BMW ISGM
// Booking Model
// Enterprise v6.0
// ==========================================================

import { Generator } from "../../shared/generator.js";

class BookingModel {

    constructor(data = {}) {

        this.id = data.id || null;

        this.bookingNumber = data.bookingNumber || Generator.code("BK");

        this.customerId = data.customerId || "";
        this.customerName = data.customerName || "";
        this.customerPhone = data.customerPhone || "";

        this.vehicleId = data.vehicleId || "";
        this.plateNumber = data.plateNumber || "";
        this.vin = data.vin || "";
        this.model = data.model || "";
        this.series = data.series || "";
        this.engine = data.engine || "";
        this.year = data.year || "";

        this.bookingDate = data.bookingDate || "";
        this.bookingTime = data.bookingTime || "";

        this.serviceAdvisor = data.serviceAdvisor || "";

        this.complaint = data.complaint || "";
        this.diagnosis = data.diagnosis || "";

        this.bookingSource = data.bookingSource || "WALK_IN";

        this.priority = data.priority || "NORMAL";

        this.status = data.status || "PENDING";

        this.checkInStatus = data.checkInStatus || false;

        this.workOrderId = data.workOrderId || "";
        this.workOrderNumber = data.workOrderNumber || "";

        this.estimatedDuration = data.estimatedDuration || 0;

        this.notes = data.notes || "";

        this.reminderSent = data.reminderSent || false;

        this.cancelReason = data.cancelReason || "";

        this.createdBy = data.createdBy || "";
        this.updatedBy = data.updatedBy || "";

        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();

    }

    toFirestore() {

        return {

            bookingNumber: this.bookingNumber,

            customerId: this.customerId,
            customerName: this.customerName,
            customerPhone: this.customerPhone,

            vehicleId: this.vehicleId,
            plateNumber: this.plateNumber,
            vin: this.vin,
            model: this.model,
            series: this.series,
            engine: this.engine,
            year: this.year,

            bookingDate: this.bookingDate,
            bookingTime: this.bookingTime,

            serviceAdvisor: this.serviceAdvisor,

            complaint: this.complaint,
            diagnosis: this.diagnosis,

            bookingSource: this.bookingSource,

            priority: this.priority,

            status: this.status,

            checkInStatus: this.checkInStatus,

            workOrderId: this.workOrderId,
            workOrderNumber: this.workOrderNumber,

            estimatedDuration: this.estimatedDuration,

            notes: this.notes,

            reminderSent: this.reminderSent,

            cancelReason: this.cancelReason,

            createdBy: this.createdBy,
            updatedBy: this.updatedBy,

            createdAt: this.createdAt,
            updatedAt: this.updatedAt

        };

    }

    static fromFirestore(document) {

        return new BookingModel({

            id: document.id,

            ...document.data()

        });

    }

}

export {

    BookingModel

};