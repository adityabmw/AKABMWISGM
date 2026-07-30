import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

import { DB } from "../../config/firebase.config.js";

const COLLECTION = "bookings";

class BookingRepository {
  async getAll() {
    const q = query(collection(DB, COLLECTION), orderBy("bookingDate", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
  async get(id) {
    const snap = await getDoc(doc(DB, COLLECTION, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  }
  async create(data) {
    const ref = await addDoc(collection(DB, COLLECTION), {
      ...data,
      status: data.status || "PENDING",
      priority: data.priority || "REGULAR",
      createdAt: new Date().toISOString()
    });
    return ref.id;
  }
  async update(id, data) {
    await updateDoc(doc(DB, COLLECTION, id), { ...data, updatedAt: new Date().toISOString() });
  }
  async delete(id) {
    await deleteDoc(doc(DB, COLLECTION, id));
  }
}
export default new BookingRepository();
