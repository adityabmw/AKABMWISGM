import { DB } from "../../config/firebase.config.js";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  onSnapshot
} from "firebase/firestore";

const COLLECTION = "inventory";

class InventoryRepository {

  subscribeParts(callback) {
    return onSnapshot(collection(DB, COLLECTION), (snapshot) => {
      const parts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(parts);
    });
  }

  async getAll() {
    const snap = await getDocs(collection(DB, COLLECTION));
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async get(id) {
    const snap = await getDoc(doc(DB, COLLECTION, id));
    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data()
    };
  }

  async createPart(data) {
    const ref = await addDoc(collection(DB, COLLECTION), {
      ...data,
      createdAt: new Date().toISOString()
    });

    return ref.id;
  }

  async updatePart(id, data) {
    await updateDoc(doc(DB, COLLECTION, id), {
      ...data,
      updatedAt: new Date().toISOString()
    });
  }

  async deletePart(id) {
    await deleteDoc(doc(DB, COLLECTION, id));
  }

}

export default new InventoryRepository();
