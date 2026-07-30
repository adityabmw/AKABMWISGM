// ==========================================================
// AKA BMW ISGM
// Booking View
// Enterprise v6.0
// ==========================================================

import { BookingControllerInstance } from "./booking.controller.js";

class BookingView {

    constructor() {

        this.tableBody = document.getElementById("bookingTableBody");

    }

    async render() {

        const bookings = await BookingControllerInstance.list();

        if (!this.tableBody) {

            return;

        }

        if (!bookings.length) {

            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center">
                        Belum ada data Booking.
                    </td>
                </tr>
            `;

            return;

        }

        this.tableBody.innerHTML = bookings.map(item => `

            <tr>

                <td>${item.bookingNumber}</td>

                <td>${item.customerName}</td>

                <td>${item.plateNumber}</td>

                <td>${item.bookingDate}</td>

                <td>${item.bookingTime}</td>

                <td>${item.serviceAdvisor}</td>

                <td>${item.status}</td>

                <td>${item.priority}</td>

                <td>

                    <button
                        class="btn btn-sm btn-primary booking-detail"
                        data-id="${item.id}">

                        Detail

                    </button>

                </td>

            </tr>

        `).join("");

    }

    async refresh() {

        await this.render();

    }

}

const BookingViewInstance = new BookingView();

export {

    BookingView,

    BookingViewInstance

};