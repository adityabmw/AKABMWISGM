import Service from "./tis.service.js";

class TisController{

async load(){
return await Service.all();
}

async search(keyword){
return await Service.search(keyword);
}

}

export default new TisController();
