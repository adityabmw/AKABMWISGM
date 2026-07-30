import { FirestoreRepository } from "../../core/firestore.repository.js";

class VehicleRepository extends FirestoreRepository{

    constructor(){

        super("vehicles");

    }

}

export default new VehicleRepository();
