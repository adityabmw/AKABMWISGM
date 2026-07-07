// ================================================================
// AKA BMW ISGM
// Enterprise Service Container
// Version : 3.0.0
// ================================================================

class ServiceContainer {

    constructor() {

        this.services = new Map();

    }

    register(name, instance) {

        if (!name) {

            throw new Error("Service name is required.");

        }

        if (this.services.has(name)) {

            throw new Error(
                `Service "${name}" already registered.`
            );

        }

        this.services.set(name, instance);

        return instance;

    }

    singleton(name, factory) {

        if (this.services.has(name)) {

            return this.services.get(name);

        }

        const instance = factory();

        this.services.set(name, instance);

        return instance;

    }

    resolve(name) {

        if (!this.services.has(name)) {

            throw new Error(
                `Service "${name}" is not registered.`
            );

        }

        return this.services.get(name);

    }

    has(name) {

        return this.services.has(name);

    }

    remove(name) {

        this.services.delete(name);

    }

    clear() {

        this.services.clear();

    }

    keys() {

        return [...this.services.keys()];

    }

    values() {

        return [...this.services.values()];

    }

    entries() {

        return [...this.services.entries()];

    }

    count() {

        return this.services.size;

    }

}

const Services = new ServiceContainer();

export {

    Services,

    ServiceContainer

};