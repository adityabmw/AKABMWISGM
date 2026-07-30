import { collection, addDoc } from "firebase/firestore";
import { DB } from "../../config/firebase.config.js";
import sessionManager from "../../core/session/session.manager.js";

const COLLECTION = "audit_logs";

export async function logActivity(action, description) {
  try {
    const session = sessionManager.getCurrentSession() || { email: "SYSTEM" };
    await addDoc(collection(DB, COLLECTION), {
      operator: session.email,
      action: action,
      description: description,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Gagal mencatat audit log:", error);
    return false;
  }
}

export default {
  logActivity
};
