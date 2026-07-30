/**
 * ==========================================================
 * AKA BMW ISGM
 * Enterprise Security Manager
 * Version : 1.0.0
 * ==========================================================
 */

import SessionManager from "../session/session.manager.js";
import RoleManager from "./role.manager.js";
import PermissionManager from "./permission.manager.js";

class SecurityManager {

    isAuthenticated() {
        return SessionManager.isLoggedIn();
    }

    currentUser() {
        return SessionManager.get();
    }

    currentRole() {
        return SessionManager.getRole();
    }

    hasRole(role) {
        return this.currentRole() === role;
    }

    hasPermission(module) {
        const role = this.currentRole();

        if (!role) return false;

        return PermissionManager.can(role, module);
    }

    requireLogin() {

        if (!this.isAuthenticated()) {

            window.location.href = "/";

            return false;

        }

        return true;

    }

    requirePermission(module) {

        if (!this.requireLogin()) return false;

        if (!this.hasPermission(module)) {

            alert("⛔ Anda tidak memiliki hak akses.");

            return false;

        }

        return true;

    }

    logout() {

        SessionManager.clear();

        window.location.href = "/";

    }

}

export default new SecurityManager();
