import roleManager from "../../core/security/role.manager.js";

export function checkUserAccess(requiredRole) {
    const currentRole = roleManager.getUserRole();
    return currentRole === requiredRole || currentRole === "SUPERADMIN";
}

export default {
    checkUserAccess
};
