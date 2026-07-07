// ==========================================================
// AKA BMW ISGM
// Work Order Routes
// Enterprise v6.0
// ==========================================================

import { Router } from "../../core/router.js";

class WorkOrderRoutes {

    register() {

        Router.register({

            name: "workorder",

            path: "/workorder",

            title: "Work Order",

            permission: "WORKORDER_VIEW",

            action: () => {

                window.showWOPage?.();

            }

        });

    }

}

const WorkOrderRoute = new WorkOrderRoutes();

export {

    WorkOrderRoute,

    WorkOrderRoutes

};