// ==========================================================
// AKA BMW ISGM
// Booking Routes
// Enterprise v6.0
// ==========================================================

import { BookingViewInstance } from "./booking.view.js";

class BookingRoutes {

    init() {

        const bookingMenu = document.getElementById("navBooking");

        if (bookingMenu) {

            bookingMenu.addEventListener("click", async () => {

                await BookingViewInstance.render();

            });

        }

    }

    async open() {

        await BookingViewInstance.render();

    }

    async reload() {

        await BookingViewInstance.refresh();

    }

}

const BookingRoutesInstance = new BookingRoutes();

export {

    BookingRoutes,

    BookingRoutesInstance

};