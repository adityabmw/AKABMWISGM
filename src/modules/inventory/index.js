// ==========================================================
// AKA BMW ISGM
// Inventory Module Bootstrap
// Enterprise v6.0
// ==========================================================

import { InventoryControllerInstance } from "./inventory.controller.js";
import { InventoryRoute } from "./inventory.routes.js";
import { InventoryViews } from "./inventory.view.js";
import { Firestore } from "../../core/firestore.js";

class InventoryModule {

    async initialize() {

        InventoryRoute.register();

        this.bindRealtime();

        window.Inventory = InventoryControllerInstance;

    }

    bindRealtime() {

        const ref = Firestore.collection("parts");

        Firestore.watch(

            ref,

            (snapshot) => {

                InventoryViews.render(snapshot);

            }

        );

    }

}

const Inventory = new InventoryModule();

export {

    Inventory,

    InventoryModule

};