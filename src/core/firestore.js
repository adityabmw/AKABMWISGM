import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "../../app.js";
export class Firestore {
  static async getAll(name){
    try{ const s=await getDocs(collection(db,name)); return s.docs.map(d=>({id:d.id,...d.data()})); }
    catch(e){ console.warn('[Firestore]',name,e.message); return []; }
  }
  static async add(name,data){ return await addDoc(collection(db,name),{...data,createdAt:Date.now()}); }
}
