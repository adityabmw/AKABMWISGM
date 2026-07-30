export class BaseRepository {

    constructor(collection) {

        this.collection = collection;

    }

    async create(data) {

        console.log("[CREATE]", this.collection, data);

        return data;

    }

    async update(id,data){

        console.log("[UPDATE]",this.collection,id,data);

        return data;

    }

    async delete(id){

        console.log("[DELETE]",this.collection,id);

        return true;

    }

    async find(id){

        console.log("[FIND]",this.collection,id);

        return null;

    }

    async all(){

        console.log("[ALL]",this.collection);

        return [];

    }

}
