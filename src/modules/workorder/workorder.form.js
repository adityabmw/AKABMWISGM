import Controller from "./workorder.controller.js";
import View from "./workorder.view.js";

class WorkOrderForm{

bind(){

const form=document.getElementById("workOrderForm");

if(!form) return;

form.addEventListener("submit",async(e)=>{

e.preventDefault();

await Controller.save({

customerId:document.getElementById("woCustomer").value,
vehicleId:document.getElementById("woVehicle").value,
complaint:document.getElementById("woComplaint").value,
mechanic:document.getElementById("woMechanic").value

});

form.reset();

await View.render();

});

}

}

export default new WorkOrderForm();
