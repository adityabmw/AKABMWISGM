import ReportService from "./report.service.js";

class ReportController{

load(){

return ReportService.getDashboardReport();

}

}

export default new ReportController();
