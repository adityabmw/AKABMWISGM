import DashboardController from "./dashboard.controller.js";

class DashboardView{

async render(){

const d=await DashboardController.load();

const set=(id,val)=>{
const el=document.getElementById(id);
if(el) el.textContent=val;
};

set("totalCustomers",d.customers);
set("totalVehicles",d.vehicles);
set("totalWorkOrders",d.workorders);
set("totalInvoices",d.invoices);

}

}

export default new DashboardView();
