// ==========================================================
// AKA BMW ISGM
// Customer Service
// Enterprise v6.0
// ==========================================================

import { Customer } from "./customer.model.js";
import { CustomerRepo } from "./customer.repository.js";

class CustomerService {

    async create(data) {

        const customer = new Customer(data);

        return await CustomerRepo.save(customer);

    }

    async createWithId(id, data) {

        const customer = new Customer(data);

        return await CustomerRepo.saveWithId(
            id,
            customer
        );

    }

    async update(id, data) {

        const customer = new Customer(data);

        customer.id = id;

        customer.updatedAt = new Date().toISOString();

        return await CustomerRepo.updateCustomer(
            id,
            customer
        );

    }

    async remove(id) {

        return await CustomerRepo.deleteCustomer(
            id
        );

    }

    async find(id) {

        return await CustomerRepo.get(
            id
        );

    }

    async findAll() {

        return await CustomerRepo.getAll();

    }

    async existsPhone(phone) {

        const snap = await CustomerRepo.getAll();

        return snap.docs.some(doc => {

            const data = doc.data();

            return (data.phone || "") === phone;

        });

    }

    async existsEmail(email) {

        const snap = await CustomerRepo.getAll();

        return snap.docs.some(doc => {

            const data = doc.data();

            return (data.email || "") === email;

        });

    }

    async existsNik(nik) {

        const snap = await CustomerRepo.getAll();

        return snap.docs.some(doc => {

            const data = doc.data();

            return (data.nik || "") === nik;

        });

    }

}

const CustomerServices = new CustomerService();

export {

    CustomerServices,

    CustomerService

};