/**
 * ==========================================================
 * AKA BMW ISGM
 * Enterprise Audit Manager
 * ==========================================================
 */

import { DB } from "../../config/firebase.config.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

class AuditManager {

    async log(action, module, user, description = "") {

        try {

            await addDoc(collection(DB, "audit_logs"), {

                action,
                module,
                uid: user?.uid || "",
                email: user?.email || "",
                role: user?.role || "",
                description,
                createdAt: serverTimestamp()

            });

        } catch (err) {

            console.error("Audit Error:", err);

        }

    }

}

export default new AuditManager();
