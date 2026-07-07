// ==========================================================
// AKA BMW ISGM
// Customer Module Bootstrap
// Enterprise v6.0
// ==========================================================

import { CustomerControllerInstance } from "./customer.controller.js";
import { CustomerRoute } from "./customer.routes.js";
import { CustomerViews } from "./customer.view.js";
import { Firestore } from "../../core/firestore.js";

class CustomerModule {

    async initialize() {

        CustomerRoute.register();

        this.bindRealtime();

        window.Customer = CustomerControllerInstance;

    }

    bindRealtime() {

        const ref = Firestore.collection("customers");

        Firestore.watch(

            ref,

            (snapshot) => {

                CustomerViews.render(snapshot);

            }

        );

    }

}

const Customer = new CustomerModule();

export {

    Customer,

    CustomerModule

};