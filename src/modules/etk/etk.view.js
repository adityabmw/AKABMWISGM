import Controller from "./etk.controller.js";

class ETKView{

render(){

const page=document.getElementById("etkPage");
if(!page) return;

page.innerHTML=`
<div class="container-fluid">

<h3 class="mb-3">
<i class="fa-solid fa-gears"></i>
BMW ETK Online
</h3>

<div class="input-group mb-3">
<input id="vinSearch" class="form-control" placeholder="Masukkan 17 digit VIN">
<button id="btnETK" class="btn btn-primary">Cari</button>
</div>

<div id="etkResult"></div>

</div>`;

document.getElementById("btnETK").onclick=()=>{

const vin=document.getElementById("vinSearch").value.trim();

const url=Controller.open(vin);

document.getElementById("etkResult").innerHTML=`
<div class="list-group">

<a class="list-group-item list-group-item-action" href="${url.realoem}" target="_blank">
RealOEM
</a>

<a class="list-group-item list-group-item-action" href="${url.bimmercat}" target="_blank">
Bimmercat
</a>

<a class="list-group-item list-group-item-action" href="${url.bmwfans}" target="_blank">
BMWFans
</a>

</div>`;
};

}

}

export default new ETKView();
