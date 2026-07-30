import Controller from "./workorder.controller.js";

class WorkOrderView{

async render(){

const table=document.getElementById("workOrderTable");

if(!table) return;

const rows=await Controller.all();

table.innerHTML=rows.map(r=>`
<tr>
<td>${r.workOrderNo||""}</td>
<td>${r.customerName||""}</td>
<td>${r.plateNumber||""}</td>
<td>${r.status||""}</td>
</tr>
`).join("");

}

}

export default new WorkOrderView();
