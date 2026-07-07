// ==========================================================
// AKA BMW ISGM
// Reception Routes
// Enterprise v6.0
// ==========================================================

import { Router } from "../../core/router.js";

class ReceptionRoutes {

    register() {

        Router.register({

            name: "reception",

            path: "/reception",

            title: "Reception",

            permission: "RECEPTION_VIEW",

            action: () => {

                window.showReceptionPage?.();

            }

        });

    }

}

const ReceptionRoute = new ReceptionRoutes();

export {

    ReceptionRoute,

    ReceptionRoutes

};