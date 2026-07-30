class ServiceContainer {

    constructor() {
        this.services = new Map();
    }

    register(name, instance) {
        this.services.set(name, instance);
    }

    resolve(name) {
        return this.services.get(name);
    }

    has(name) {
        return this.services.has(name);
    }

    all() {
        return [...this.services.keys()];
    }

    remove(name) {
        this.services.delete(name);
    }

    clear() {
        this.services.clear();
    }

}

export const Container = new ServiceContainer();

export default Container;
