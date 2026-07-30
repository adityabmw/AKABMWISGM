import BookingService from "./booking.service.js";
class BookingController {
  async list() {
    try { return await BookingService.list(); } 
    catch (error) { console.error("Gagal memuat data booking:", error); return []; }
  }
  async create(data) { return await BookingService.create(data); }
  async update(id, data) { return await BookingService.update(id, data); }
  async remove(id) { return await BookingService.remove(id); }
}
const BookingControllerInstance = new BookingController();
export { BookingController, BookingControllerInstance };
