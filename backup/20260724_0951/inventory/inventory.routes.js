import inventoryController from "./inventory.controller.js";

export function initInventoryModule() {
  if (typeof inventoryController.init === "function") {
    inventoryController.init();
  }

  // Event Delegation yang terbaca oleh Router
  if (!window._inventoryEventListenerAttached) {
    window._inventoryEventListenerAttached = true;
    document.addEventListener("click", async (e) => {
      const editBtn = e.target.closest(".editInventory");
      if (editBtn) {
        const id = editBtn.getAttribute("data-id");
        if (id && typeof inventoryController.editPart === "function") {
          inventoryController.editPart(id);
        }
      }

      const deleteBtn = e.target.closest(".deleteInventory");
      if (deleteBtn) {
        const id = deleteBtn.getAttribute("data-id");
        if (id && typeof inventoryController.deletePart === "function") {
          if (confirm("Yakin ingin menghapus part ini?")) {
            inventoryController.deletePart(id);
          }
        }
      }
    });
  }
}

export default initInventoryModule;
