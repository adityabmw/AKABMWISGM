import Repo from "./knowledge.repository.js";

class KnowledgeService{

all(){
return Repo.getAll();
}

search(keyword){
return Repo.search(keyword);
}

save(item){
return Repo.save(item);
}

}

export default new KnowledgeService();
