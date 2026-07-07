// ==========================================================
// AKA BMW ISGM
// Inventory Routes
// Enterprise v6.0
// ==========================================================

import { Router } from "../../core/router.js";

class InventoryRoutes {

    register() {

        Router.register({

            name: "inventory",

            path: "/inventory",

            title: "Inventory",

            permission: "INVENTORY_VIEW",

            action: () => {

                window.showInventoryPage?.();

            }

        });

    }

}

const InventoryRoute = new InventoryRoutes();

export {

    InventoryRoute,

    InventoryRoutes

};