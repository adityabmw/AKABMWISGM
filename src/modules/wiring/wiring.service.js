import Repository from "./wiring.repository.js";

class WiringService{

all(){
return Repository.getAll();
}

find(id){
return Repository.getById(id);
}

search(keyword){
return Repository.search(keyword);
}

}

export default new WiringService();
