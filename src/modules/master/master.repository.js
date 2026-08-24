/**
 * Master Repository - Firestore collection: master_data
 * Uses compat firebase if available (from app.js), fallback to modular
 */
const COLLECTION = "master_data";
function getDb() {
  if (typeof firebase!== "undefined" && firebase.firestore) return firebase.firestore();
  return null;
}
export class MasterRepository {
  async list() {
    const db = getDb();
    if (!db) throw new Error("Firestore not initialized");
    const snap = await db.collection(COLLECTION).orderBy("code").get();
    return snap.docs.map(d => ({ id: d.id,...d.data() }));
  }
  async getById(id) {
    const db = getDb();
    const doc = await db.collection(COLLECTION).doc(id).get();
    return doc.exists? { id: doc.id,...doc.data() } : null;
  }
  async findByCodeAndCategory(code, category) {
    const db = getDb();
    const snap = await db.collection(COLLECTION).where("code","==",code).where("category","==",category).limit(1).get();
    return snap.empty? null : { id: snap.docs[0].id,...snap.docs[0].data() };
  }
  async create(data) {
    const db = getDb();
    const ref = await db.collection(COLLECTION).add({...data, createdAt: firebase.firestore.FieldValue.serverTimestamp(), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    return ref.id;
  }
  async update(id, data) {
    const db = getDb();
    await db.collection(COLLECTION).doc(id).update({...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    return id;
  }
  async delete(id) {
    const db = getDb();
    await db.collection(COLLECTION).doc(id).delete();
    return true;
  }
}
export const MasterRepo = new MasterRepository();
