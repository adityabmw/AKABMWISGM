class RBAC {

    constructor() {
        this.roles = new Map();
    }

    register(name, permissions = []) {
        this.roles.set(name, new Set(permissions));
    }

    can(role, permission) {

        if (!this.roles.has(role)) return false;

        if (this.roles.get(role).has("*")) return true;

        if (this.roles.get(role).has(permission)) return true;

        const module = permission.split(".")[0] + ".*";

        return this.roles.get(role).has(module);

    }

    permissions(role) {

        if (!this.roles.has(role)) return [];

        return [...this.roles.get(role)];

    }

}

export const Rbac = new RBAC();
export default Rbac;
