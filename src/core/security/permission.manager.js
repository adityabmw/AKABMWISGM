/**
 * AKA BMW ISGM
 * Enterprise Permission Manager
 * Version 1.0.0
 */

class PermissionManager {

    constructor() {

        this.permissions = {

            OWNER: ["*"],

            ADMIN: [
                "dashboard",
                "customer",
                "vehicle",
                "workorder",
                "booking",
                "inventory",
                "employee",
                "finance",
                "reports"
            ],

            SERVICE_ADVISOR: [
                "dashboard",
                "customer",
                "vehicle",
                "booking",
                "workorder"
            ],

            HEAD_MECHANIC: [
                "dashboard",
                "workorder",
                "vehicle"
            ],

            MECHANIC: [
                "workorder"
            ],

            PARTS: [
                "inventory"
            ],

            CASHIER: [
                "finance"
            ],

            FINANCE: [
                "finance",
                "reports"
            ]

        };

    }

    can(role, module) {

        const access = this.permissions[role];

        if (!access) return false;

        if (access.includes("*")) return true;

        return access.includes(module);

    }

    list(role) {

        return this.permissions[role] || [];

    }

}

export default new PermissionManager();

