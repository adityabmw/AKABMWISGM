class InventoryService {

    constructor() {
        this.items = [];
    }

    getAll() {
        return this.items;
    }

    add(item) {
        this.items.push(item);
        return item;
    }

    update(id, data) {

        const index = this.items.findIndex(x => x.id === id);

        if (index < 0) return false;

        this.items[index] = {
            ...this.items[index],
            ...data
        };

        return this.items[index];

    }

    delete(id) {
        this.items = this.items.filter(x => x.id !== id);
    }

    getById(id) {
        return this.items.find(x => x.id === id);
    }

    getLowStock() {
        return this.items.filter(x => x.stock <= x.minStock);
    }

}

export default new InventoryService();
