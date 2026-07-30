import Service from "./wiring.service.js";

class WiringController{

async load(){
return await Service.all();
}

async search(keyword){
return await Service.search(keyword);
}

}

export default new WiringController();
