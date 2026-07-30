import BookingRepository from "./booking.repository.js";
export async function list() { return await BookingRepository.getAll(); }
export async function create(data) { return await BookingRepository.create(data); }
export async function update(id, data) { await BookingRepository.update(id, data); return true; }
export async function remove(id) { await BookingRepository.delete(id); return true; }
export default { list, create, update, remove };
