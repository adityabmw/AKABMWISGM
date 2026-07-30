// ==========================================================
// AKA BMW ISGM
// Booking Statistics
// Enterprise v6.0
// ==========================================================

import { BookingServiceInstance } from "./booking.service.js";

class BookingStatistics {

    async summary() {

        const bookings = await BookingServiceInstance.getAllBookings();

        const summary = {

            total: bookings.length,

            pending: 0,

            confirmed: 0,

            checkIn: 0,

            process: 0,

            finished: 0,

            cancelled: 0

        };

        bookings.forEach(item => {

            switch (item.status) {

                case "PENDING":
                    summary.pending++;
                    break;

                case "CONFIRMED":
                    summary.confirmed++;
                    break;

                case "CHECK_IN":
                    summary.checkIn++;
                    break;

                case "PROCESS":
                    summary.process++;
                    break;

                case "FINISHED":
                    summary.finished++;
                    break;

                case "CANCELLED":
                    summary.cancelled++;
                    break;

            }

        });

        return summary;

    }

    async todayTotal() {

        const bookings = await BookingServiceInstance.getTodayBookings();

        return bookings.length;

    }

    async pendingTotal() {

        const bookings = await BookingServiceInstance.getPendingBookings();

        return bookings.length;

    }

    async finishedToday() {

        const bookings = await BookingServiceInstance.getTodayBookings();

        return bookings.filter(item =>

            item.status === "FINISHED"

        ).length;

    }

    async processToday() {

        const bookings = await BookingServiceInstance.getTodayBookings();

        return bookings.filter(item =>

            item.status === "PROCESS"

        ).length;

    }

}

const BookingStatisticsInstance = new BookingStatistics();

export {

    BookingStatistics,

    BookingStatisticsInstance

};