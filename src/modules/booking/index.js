// ==========================================================
// AKA BMW ISGM
// Booking Module Bootstrap
// Enterprise v6.0
// ==========================================================

import { BookingControllerInstance } from "./booking.controller.js";
import { BookingRoute } from "./booking.routes.js";
import { BookingViews } from "./booking.view.js";
import { Firestore } from "../../core/firestore.js";

class BookingModule {

    async initialize() {

        BookingRoute.register();

        this.bindRealtime();

        window.Booking = BookingControllerInstance;

    }

    bindRealtime() {

        const ref = Firestore.collection("bookings");

        Firestore.watch(

            ref,

            (snapshot) => {

                BookingViews.render(snapshot);

            }

        );

    }

}

const Booking = new BookingModule();

export {

    Booking,

    BookingModule

};