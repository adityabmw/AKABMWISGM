import inventoryController from "./inventory.controller.js";

let initialized = false;

export function setupInventoryEvents() {

  if (initialized) return;

  initialized = true;

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
