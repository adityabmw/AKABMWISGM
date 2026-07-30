// ==========================================================
// AKA BMW ISGM
// Booking Events
// Enterprise v6.0
// ==========================================================

import { BookingControllerInstance } from "./booking.controller.js";
import { BookingViewInstance } from "./booking.view.js";

class BookingEvents {

    init() {

        this.registerRefresh();

        this.registerCreate();

    }

    registerRefresh() {

        const button = document.getElementById("btnRefreshBooking");

        if (!button) {

            return;

        }

        button.addEventListener("click", async () => {

            await BookingViewInstance.refresh();

        });

    }

    registerCreate() {

        const button = document.getElementById("btnSaveBooking");

        if (!button) {

            return;

        }

        button.addEventListener("click", async () => {

            const data = {

                bookingNumber: document.getElementById("bookingNumber")?.value || "",

                customerId: document.getElementById("bookingCustomerId")?.value || "",

                customerName: document.getElementById("bookingCustomerName")?.value || "",

                customerPhone: document.getElementById("bookingCustomerPhone")?.value || "",

                vehicleId: document.getElementById("bookingVehicleId")?.value || "",

                plateNumber: document.getElementById("bookingPlate")?.value || "",

                bookingDate: document.getElementById("bookingDate")?.value || "",

                bookingTime: document.getElementById("bookingTime")?.value || "",

                complaint: document.getElementById("bookingComplaint")?.value || "",

                serviceAdvisor: document.getElementById("bookingSA")?.value || "",

                priority: document.getElementById("bookingPriority")?.value || "NORMAL"

            };

            const result = await BookingControllerInstance.create(data);

            alert(result.message);

            if (result.success) {

                await BookingViewInstance.refresh();

            }

        });

    }

}

const BookingEventsInstance = new BookingEvents();

export {

    BookingEvents,

    BookingEventsInstance

};