// ==========================================================
// AKA BMW ISGM
// Vehicle Module Bootstrap
// Enterprise v6.0
// ==========================================================

import { VehicleControllerInstance } from "./vehicle.controller.js";
import { VehicleRoute } from "./vehicle.routes.js";
import { VehicleViews } from "./vehicle.view.js";
import { Firestore } from "../../core/firestore.js";

class VehicleModule {

    async initialize() {

        VehicleRoute.register();

        this.bindRealtime();

        window.Vehicle = VehicleControllerInstance;

    }

    bindRealtime() {

        const ref = Firestore.collection("vehicles");

        Firestore.watch(

            ref,

            (snapshot) => {

                VehicleViews.render(snapshot);

            }

        );

    }

}

const Vehicle = new VehicleModule();

export {

    Vehicle,

    VehicleModule

};