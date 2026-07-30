import Service from "./dtc.service.js";

class DtcController{

decode(value){
return Service.decode(value);
}

search(value){
return Service.search(value);
}

}

export default new DtcController();
