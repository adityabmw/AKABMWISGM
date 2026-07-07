// ==========================================================
// AKA BMW ISGM
// Customer Routes
// Enterprise v6.0
// ==========================================================

import { Router } from "../../core/router.js";

class CustomerRoutes {

    register() {

        Router.register({

            name: "customer",

            path: "/customer",

            title: "Customer",

            permission: "CUSTOMER_VIEW",

            action: () => {

                window.showCustomerPage?.();

            }

        });

    }

}

const CustomerRoute = new CustomerRoutes();

export {

    CustomerRoute,

    CustomerRoutes

};