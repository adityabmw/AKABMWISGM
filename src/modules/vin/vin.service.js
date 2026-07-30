import Repository from "./vin.repository.js";

class VinService{

decode(value){
return Repository.decode(value);
}

search(value){
return Repository.search(value);
}

}

export default new VinService();
