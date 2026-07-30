// ==========================================================
// AKA BMW ISGM
// Work Order Module Bootstrap
// Enterprise v6.0
// ==========================================================

import { WorkOrderControllerInstance } from "./workorder.controller.js";
import { WorkOrderRoute } from "./workorder.routes.js";
import { WorkOrderViews } from "./workorder.view.js";
import { Firestore } from "../../core/firestore.js";

class WorkOrderModule {

    async initialize() {

        WorkOrderRoute.register();

        this.bindRealtime();

        window.WorkOrder = WorkOrderControllerInstance;

    }

    bindRealtime() {

        const ref = Firestore.collection("workorders");

        Firestore.watch(

            ref,

            (snapshot) => {

                WorkOrderViews.render(snapshot);

            }

        );

    }

}

const WorkOrder = new WorkOrderModule();

export {

    WorkOrder,

    WorkOrderModule

};
export { default as WorkOrderForm } from "./workorder.form.js";
