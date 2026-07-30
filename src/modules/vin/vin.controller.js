import Service from "./vin.service.js";

class VinController{

decode(value){
return Service.decode(value);
}

search(value){
return Service.search(value);
}

}

export default new VinController();
