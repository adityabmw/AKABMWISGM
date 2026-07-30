import Repository from "./dtc.repository.js";

class DtcService{

decode(value){
return Repository.decode(value);
}

search(value){
return Repository.search(value);
}

}

export default new DtcService();
