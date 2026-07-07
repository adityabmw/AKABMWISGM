// ==========================================================
// AKA BMW ISGM
// Inventory Model
// Enterprise v6.0
// ==========================================================

class Inventory {

    constructor(data = {}) {

        this.id = data.id ?? "";

        this.partNumber = data.partNumber ?? "";

        this.partName = data.partName ?? "";

        this.category = data.category ?? "";

        this.brand = data.brand ?? "";

        this.location = data.location ?? "";

        this.unit = data.unit ?? "PCS";

        this.stock = data.stock ?? 0;

        this.minimumStock = data.minimumStock ?? 0;

        this.costPrice = data.costPrice ?? 0;

        this.sellingPrice = data.sellingPrice ?? 0;

        this.supplierId = data.supplierId ?? "";

        this.status = data.status ?? "ACTIVE";

        this.notes = data.notes ?? "";

        this.createdAt = data.createdAt ?? new Date().toISOString();

        this.updatedAt = data.updatedAt ?? new Date().toISOString();

        this.deleted = data.deleted ?? false;

    }

    increase(qty) {

        this.stock += Number(qty);

        this.updatedAt = new Date().toISOString();

        return this;

    }

    decrease(qty) {

        this.stock -= Number(qty);

        if (this.stock < 0) {

            this.stock = 0;

        }

        this.updatedAt = new Date().toISOString();

        return this;

    }

    toJSON() {

        return {

            id: this.id,

            partNumber: this.partNumber,

            partName: this.partName,

            category: this.category,

            brand: this.brand,

            location: this.location,

            unit: this.unit,

            stock: this.stock,

            minimumStock: this.minimumStock,

            costPrice: this.costPrice,

            sellingPrice: this.sellingPrice,

            supplierId: this.supplierId,

            status: this.status,

            notes: this.notes,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt,

            deleted: this.deleted

        };

    }

    static createCode(last = 0) {

        return "PRT" + String(last + 1).padStart(6, "0");

    }

}

export {

    Inventory

};