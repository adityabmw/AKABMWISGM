import Service from "./finance.service.js";

class FinanceController{

summary(){
return Service.getSummary();
}

save(data){
return Service.save(data);
}

}

export default new FinanceController();
