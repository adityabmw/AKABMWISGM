import { FirestoreRepository } from "../../core/firestore.repository.js";

class CustomerRepository extends FirestoreRepository{

    constructor(){

        super("customers");

    }

}

export default new CustomerRepository();
