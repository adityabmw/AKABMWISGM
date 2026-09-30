// ==========================================================
// AKA BMW ISGM
// Vehicle Routes
// Enterprise v6.0
// ==========================================================

import { Router } from "../../core/router.js";

class VehicleRoutes {

    register() {

        Router.register({

            name: "vehicle",

            path: "/vehicle",

            title: "Vehicle",

            permission: "VEHICLE_VIEW",

            action: () => {

                window.showVehiclePage?.();

            }

        });

    }

}

const VehicleRoute = new VehicleRoutes();

export {

    VehicleRoute,

    VehicleRoutes

};