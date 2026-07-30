import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { DB } from "../../config/firebase.config.js";
const COLLECTION = "master_data";
class MasterRepository {
  async getAll(subCollection) {
    const q = query(collection(DB, COLLECTION, subCollection, "items"), orderBy("name", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}
export default new MasterRepository();
