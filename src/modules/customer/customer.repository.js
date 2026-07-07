// ==========================================================
// AKA BMW ISGM
// Customer Repository
// Enterprise v6.0
// ==========================================================

import { Repository } from "../../core/repository.js";

class CustomerRepository extends Repository {

    constructor() {

        super("customers");

    }

    async save(customer) {

        return await this.create(
            customer.toJSON()
        );

    }

    async saveWithId(id, customer) {

        return await this.createWithId(
            id,
            customer.toJSON()
        );

    }

    async updateCustomer(id, customer) {

        return await this.update(
            id,
            customer.toJSON()
        );

    }

    async deleteCustomer(id) {

        return await this.delete(
            id
        );

    }

    async get(id) {

        return await this.find(
            id
        );

    }

    async getAll() {

        return await this.all();

    }

}

const CustomerRepo = new CustomerRepository();

export {

    CustomerRepo,

    CustomerRepository

};