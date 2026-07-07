// ==========================================================
// AKA BMW ISGM
// File      : identity.js
// Layer     : Core Foundation
// Version   : 3.0.0-alpha
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

class IdentityEngine {

    constructor() {

        this.counters = new Map();

    }

    uuid() {

        return crypto.randomUUID();

    }

    today() {

        const date = new Date();

        const year = date.getFullYear();

        const month = String(

            date.getMonth() + 1

        ).padStart(2, "0");

        const day = String(

            date.getDate()

        ).padStart(2, "0");

        return `${year}${month}${day}`;

    }

    next(prefix = "SYS") {

        const date = this.today();

        const key = `${prefix}-${date}`;

        const current =

            this.counters.get(key) || 0;

        const next = current + 1;

        this.counters.set(key, next);

        return `${prefix}-${date}-${String(next).padStart(6, "0")}`;

    }

    customerNo() {

        return this.next("CUS");

    }

    vehicleNo() {

        return this.next("VEH");

    }

    workOrderNo() {

        return this.next("WO");

    }

    invoiceNo() {

        return this.next("INV");

    }

    estimationNo() {

        return this.next("EST");

    }

    purchaseOrderNo() {

        return this.next("PO");

    }

    paymentNo() {

        return this.next("PAY");

    }

}

const Identity = new IdentityEngine();

export {

    Identity,

    IdentityEngine

};