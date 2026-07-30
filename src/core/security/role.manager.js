/**
 * AKA BMW ISGM
 * Enterprise Role Manager
 */

class RoleManager {
    constructor() {
        this.roles = {
            OWNER: "OWNER",
            ADMIN: "ADMIN",
            SERVICE_ADVISOR: "SERVICE_ADVISOR",
            HEAD_MECHANIC: "HEAD_MECHANIC",
            MECHANIC: "MECHANIC",
            PARTS: "PARTS",
            CASHIER: "CASHIER",
            FINANCE: "FINANCE",
            CUSTOMER: "CUSTOMER"
        };
    }

    getAll() {
        return Object.values(this.roles);
    }

    exists(role) {
        return this.getAll().includes(role);
    }

    isAdmin(role) {
        return ["OWNER", "ADMIN"].includes(role);
    }

    canManageUsers(role) {
        return ["OWNER", "ADMIN"].includes(role);
    }

    canApprove(role) {
        return ["OWNER", "ADMIN", "HEAD_MECHANIC"].includes(role);
    }
}

export default new RoleManager();
