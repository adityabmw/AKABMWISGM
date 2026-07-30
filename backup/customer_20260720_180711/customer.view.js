import Controller from "./customer.controller.js";

class CustomerView{

async render(){

const table=document.getElementById("customerTable");
if(!table) return;

const data=await Controller.all();

table.innerHTML=data.map(c=>`
<tr>
<td>${c.name??""}</td>
<td>${c.phone??""}</td>
<td>${c.email??""}</td>
<td>${c.address??""}</td>
</tr>
`).join("");

}

async refresh(){
await this.render();
}

}

export default new CustomerView();
