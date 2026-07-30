import Service from "./knowledge.service.js";

class KnowledgeController{

list(){
return Service.all();
}

search(keyword){
return Service.search(keyword);
}

save(item){
return Service.save(item);
}

}

export default new KnowledgeController();
