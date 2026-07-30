import Service from "./etk.service.js";

class ETKController{

open(vin){
return Service.decode(vin);
}

}

export default new ETKController();
