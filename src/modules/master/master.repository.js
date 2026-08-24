/**
 * Master Repository - Firestore collection: master_data
 * Support Browser (compat) + Node (modular SDK) + Admin fallback
 */
const COLLECTION = "master_data";
let _db = null;

async function getDb() {
  // 1. Browser compat (app.js)
  if (typeof firebase!== "undefined" && firebase.firestore) {
    return firebase.firestore();
  }
  // 2. Node modular SDK (untuk seeder di Termux)
  try {
    const { initializeApp, getApps, getApp } = await import("firebase/app");
    const { getFirestore } = await import("firebase/firestore");
    const firebaseConfig = {
      apiKey: "AIzaSyC9tLGHRc-_8gnNsUOfLQDTshbEAVHaR7c",
      authDomain: "akabmwisgm.firebaseapp.com",
      projectId: "akabmwisgm",
      storageBucket: "akabmwisgm.firebasestorage.app",
      messagingSenderId: "317584647702",
      appId: "1:317584647702:web:8d7b6dbd9334f973eeb737"
    };
    const app = getApps().length? getApp() : initializeApp(firebaseConfig);
    _db = getFirestore(app);
    return {
      _isModular: true,
      _db,
      collection: (name) => name,
      doc: (id) => id
    };
  } catch (e) {
    console.error("Firestore init error:", e.message);
    return null;
  }
}

export class MasterRepository {
  async list() {
    const dbWrapper = await getDb();
    if (!dbWrapper) throw new Error("Firestore not initialized");

    if (dbWrapper._isModular) {
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
      const q = query(collection(dbWrapper._db, COLLECTION), orderBy("code"));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id,...d.data() }));
    } else {
      const snap = await dbWrapper.collection(COLLECTION).orderBy("code").get();
      return snap.docs.map(d => ({ id: d.id,...d.data() }));
    }
  }

  async findByCodeAndCategory(code, category) {
    const dbWrapper = await getDb();
    if (!dbWrapper) throw new Error("Firestore not initialized");

    if (dbWrapper._isModular) {
      const { collection, getDocs, query, where, limit } = await import("firebase/firestore");
      const q = query(collection(dbWrapper._db, COLLECTION), where("code","==",code), where("category","==",category), limit(1));
      const snap = await getDocs(q);
      return snap.empty? null : { id: snap.docs[0].id,...snap.docs[0].data() };
    } else {
      const snap = await dbWrapper.collection(COLLECTION).where("code","==",code).where("category","==",category).limit(1).get();
      return snap.empty? null : { id: snap.docs[0].id,...snap.docs[0].data() };
    }
  }

  async create(data) {
    const dbWrapper = await getDb();
    if (!dbWrapper) throw new Error("Firestore not initialized");

    if (dbWrapper._isModular) {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const ref = await addDoc(collection(dbWrapper._db, COLLECTION), {...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      return ref.id;
    } else {
      const ref = await dbWrapper.collection(COLLECTION).add({...data, createdAt: firebase.firestore.FieldValue.serverTimestamp(), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      return ref.id;
    }
  }

  async getById(id) {
    const dbWrapper = await getDb();
    if (dbWrapper._isModular) {
      const { doc, getDoc } = await import("firebase/firestore");
      const d = await getDoc(doc(dbWrapper._db, COLLECTION, id));
      return d.exists()? { id: d.id,...d.data() } : null;
    } else {
      const doc = await dbWrapper.collection(COLLECTION).doc(id).get();
      return doc.exists? { id: doc.id,...doc.data() } : null;
    }
  }

  async update(id, data) {
    const dbWrapper = await getDb();
    if (dbWrapper._isModular) {
      const { doc, updateDoc, serverTimestamp } = await import("firebase/firestore");
      await updateDoc(doc(dbWrapper._db, COLLECTION, id), {...data, updatedAt: serverTimestamp()});
      return id;
    } else {
      await dbWrapper.collection(COLLECTION).doc(id).update({...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      return id;
    }
  }

  async delete(id) {
    const dbWrapper = await getDb();
    if (dbWrapper._isModular) {
      const { doc, deleteDoc } = await import("firebase/firestore");
      await deleteDoc(doc(dbWrapper._db, COLLECTION, id));
      return true;
    } else {
      await dbWrapper.collection(COLLECTION).doc(id).delete();
      return true;
    }
  }
}
export const MasterRepo = new MasterRepository();
