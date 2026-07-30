import DashboardService from "./dashboard.service.js";

class DashboardController{

async load(){
return await DashboardService.summary();
}

}

export default new DashboardController();
