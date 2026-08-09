/*
====================================================
 AKA BMW ISGM
 Module : PARTS
 Layer  : REPOSITORY
====================================================
*/

import { FirestoreRepository } from "../../core/firestore.repository.js";

export default class PartsRepository extends FirestoreRepository{

    constructor(){

        super("inventory");

    }

}
