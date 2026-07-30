import Repository from "./tis.repository.js";

class TisService{

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

export default new TisService();
