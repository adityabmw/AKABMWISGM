import inventoryRepository from "./inventory.repository.js";
import InventoryView from "./inventory.view.js";

class InventoryController {

  constructor() {
    this.view = new InventoryView();
    this.parts = [];
  }

  async init() {

    inventoryRepository.subscribeParts((parts) => {

      this.parts = parts;

      this.view.renderInventoryTable(parts);

      this.view.renderLowStock(
        parts.filter(p => (p.stock ?? 0) <= (p.minStock ?? 5))
      );

    });

  }

  async editPart(id) {

    const part = this.parts.find(x => x.id === id);

    if (!part) return;

    [
      "partNumber",
      "name",
      "category",
      "stock",
      "minStock",
      "price",
      "location",
      "supplier"
    ].forEach(field => {

      const el =
        document.getElementById(field) ||
        document.querySelector(`[name="${field}"]`);

      if (el) {
        el.value = part[field] ?? "";
      }

    });

    const form = document.getElementById("inventoryForm");

    if (form)
      form.dataset.editId = id;

    const btn =
      document.getElementById("btnSaveInventory");

    if (btn) {

      btn.dataset.mode = "edit";

      btn.textContent = "Update Part";

    }

  }

  async savePart(data, editId = null) {

    if (editId) {

      await inventoryRepository.updatePart(editId, data);

    } else {

      await inventoryRepository.createPart(data);

    }

  }

  async deletePart(id) {

    if (!confirm("Yakin ingin menghapus part ini?"))
      return;

    await inventoryRepository.deletePart(id);

  }

}

export default new InventoryController();
