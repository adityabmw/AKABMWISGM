// ==========================================================
// AKA BMW ISGM
// Customer Model
// Enterprise v6.0
// ==========================================================

import { Helper } from "../../core/helper.js";

class Customer {

    constructor(data = {}) {

        this.id = data.id ?? "";

        this.customerCode = data.customerCode ?? "";

        this.name = data.name ?? "";

        this.phone = data.phone ?? "";

        this.email = data.email ?? "";

        this.nik = data.nik ?? "";

        this.address = data.address ?? "";

        this.city = data.city ?? "";

        this.province = data.province ?? "";

        this.postalCode = data.postalCode ?? "";

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

    deactivate() {

        this.status = "INACTIVE";

        this.updatedAt = new Date().toISOString();

        return this;

    }

    activate() {

        this.status = "ACTIVE";

        this.updatedAt = new Date().toISOString();

        return this;

    }

    softDelete() {

        this.deleted = true;

        this.updatedAt = new Date().toISOString();

        return this;

    }

    restore() {

        this.deleted = false;

        this.updatedAt = new Date().toISOString();

        return this;

    }

    toJSON() {

        return {

            id: this.id,

            customerCode: this.customerCode,

            name: this.name,

            phone: this.phone,

            email: this.email,

            nik: this.nik,

            address: this.address,

            city: this.city,

            province: this.province,

            postalCode: this.postalCode,

            notes: this.notes,

            status: this.status,

            deleted: this.deleted,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt

        };

    }

    static createCode(lastNumber = 0) {

        return "CUST" + String(lastNumber + 1).padStart(6, "0");

    }

}

export {

    Customer

};