// ==========================================================
// AKA BMW ISGM
// Reception Module Bootstrap
// Enterprise v6.0
// ==========================================================

import { ReceptionControllerInstance } from "./reception.controller.js";
import { ReceptionRoute } from "./reception.routes.js";
import { ReceptionViews } from "./reception.view.js";
import { Firestore } from "../../core/firestore.js";

class ReceptionModule {

    async initialize() {

        ReceptionRoute.register();

        this.bindRealtime();

        window.Reception = ReceptionControllerInstance;

    }

    bindRealtime() {

        const ref = Firestore.collection("receptions");

        Firestore.watch(

            ref,

            (snapshot) => {

                ReceptionViews.render(snapshot);

            }

        );

    }

}

const Reception = new ReceptionModule();

export {

    Reception,

    ReceptionModule

};