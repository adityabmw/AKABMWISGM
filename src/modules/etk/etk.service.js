import Repo from "./etk.repository.js";

class ETKService{

decode(vin){
return Repo.getLinks(vin);
}

}

export default new ETKService();
