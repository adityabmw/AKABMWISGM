import inventoryController from "./inventory.controller.js";

let initialized = false;

export function setupInventoryEvents() {

    if (initialized) return;
    initialized = true;

    document.getElementById("btnAddInventory")?.addEventListener("click", async () => {

        const data = {
            partNumber: document.getElementById("partNumber")?.value.trim() || "",
            partName: document.getElementById("partName")?.value.trim() || "",
            brand: document.getElementById("partBrand")?.value.trim() || "",
            category: document.getElementById("partCategory")?.value || "",
            supplier: document.getElementById("partSupplier")?.value || "",
            stock: Number(document.getElementById("partStock")?.value || 0),
            minStock: Number(document.getElementById("partMinStock")?.value || 0),
            costPrice: Number(document.getElementById("partCostPrice")?.value || 0),
            sellPrice: Number(document.getElementById("partSellPrice")?.value || 0),
            barcode: document.getElementById("partBarcode")?.value.trim() || ""
        };

        if (!data.partNumber || !data.partName) {
            alert("Part Number dan Nama Barang wajib diisi.");
            return;
        }

        await inventoryController.savePart(data);

        [
            "partNumber",
            "partName",
            "partBrand",
            "partBarcode"
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = "";
        });

        [
            "partStock",
            "partMinStock",
            "partCostPrice",
            "partSellPrice"
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = "0";
        });

    });

    document.addEventListener("click", async (e) => {

        const edit = e.target.closest(".editInventory");
        if (edit) {
            e.preventDefault();
            await inventoryController.editPart(edit.dataset.id);
            return;
        }

        const del = e.target.closest(".deleteInventory");
        if (del) {
            e.preventDefault();
            await inventoryController.deletePart(del.dataset.id);
            return;
        }

    });

}
