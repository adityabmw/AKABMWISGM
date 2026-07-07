// ==========================================================
// AKA BMW ISGM
// File      : permission.js
// Layer     : Core Foundation
// Version   : 3.0.0-alpha
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

const ROLE = {

    OWNER: "OWNER",

    ADMINISTRATOR: "ADMINISTRATOR",

    SERVICE_ADVISOR: "SERVICE_ADVISOR",

    HEAD_MECHANIC: "HEAD_MECHANIC",

    MECHANIC: "MECHANIC",

    CASHIER: "CASHIER",

    PURCHASING: "PURCHASING"

};

const PERMISSIONS = {

    OWNER: ["*"],

    ADMINISTRATOR: [

        "dashboard",
        "customer",
        "vehicle",
        "reception",
        "workorder",
        "inventory",
        "invoice",
        "report"

    ],

    SERVICE_ADVISOR: [

        "dashboard",
        "customer",
        "vehicle",
        "reception",
        "workorder",
        "estimation"

    ],

    HEAD_MECHANIC: [

        "dashboard",
        "workorder",
        "diagnostic",
        "timeline",
        "checklist",
        "qualitycontrol"

    ],

    MECHANIC: [

        "dashboard",
        "myworkorder",
        "diagnostic",
        "timeline",
        "checklist"

    ],

    CASHIER: [

        "dashboard",
        "invoice",
        "payment"

    ],

    PURCHASING: [

        "dashboard",
        "inventory",
        "supplier",
        "purchaseorder"

    ]

};

class PermissionEngine {

    can(role, permission) {

        if (!role) {

            return false;

        }

        const list = PERMISSIONS[role] || [];

        if (list.includes("*")) {

            return true;

        }

        return list.includes(permission);

    }

    all(role) {

        return PERMISSIONS[role] || [];

    }

    roles() {

        return Object.keys(PERMISSIONS);

    }

}

const Permission = new PermissionEngine();

export {

    ROLE,

    PERMISSIONS,

    Permission

};