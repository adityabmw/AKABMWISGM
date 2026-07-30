import VehicleService from "./vehicle.service.js";

class VehicleView{

vehicles=[];

async render(){

const page=document.getElementById("vehiclePage");
if(!page)return;

page.innerHTML=`
<div class="container-fluid">

<div class="d-flex justify-content-between mb-3">

<h3><i class="fa-solid fa-car"></i> Master Kendaraan</h3>

<button class="btn btn-primary" id="btnAddVehicle">
<i class="fa-solid fa-plus"></i>
Tambah Kendaraan
</button>

</div>

<input
id="vehicleSearch"
class="form-control mb-3"
placeholder="Cari VIN / Plat / Model">

<div class="table-responsive">

<table class="table table-striped table-hover">

<thead>

<tr>
<th>Plat</th>
<th>VIN</th>
<th>Model</th>
<th>Mesin</th>
<th>Tahun</th>
<th>KM</th>
<th width="150">Aksi</th>
</tr>

</thead>

<tbody id="vehicleTable"></tbody>

</table>

</div>

</div>
`;

document.getElementById("vehicleSearch").addEventListener("input",(e)=>{
this.draw(e.target.value);
});

VehicleService.realtime((snap)=>{

this.vehicles=[];

snap.forEach(doc=>{

this.vehicles.push({
id:doc.id,
...doc.data()
});

});

this.draw("");

});

}

draw(keyword=""){

const body=document.getElementById("vehicleTable");

const q=keyword.toLowerCase();

const rows=this.vehicles.filter(v=>

(v.plateNo||"").toLowerCase().includes(q)||
(v.vin||"").toLowerCase().includes(q)||
(v.model||"").toLowerCase().includes(q)

);

body.innerHTML=rows.map(v=>`

<tr>

<td>${v.plateNo||""}</td>
<td>${v.vin||""}</td>
<td>${v.model||""}</td>
<td>${v.engine||""}</td>
<td>${v.year||""}</td>
<td>${Number(v.odometer||0).toLocaleString("id-ID")} km</td>

<td>

<button class="btn btn-warning btn-sm">
Edit
</button>

<button class="btn btn-danger btn-sm">
Hapus
</button>

</td>

</tr>

`).join("");

if(rows.length===0){

body.innerHTML="<tr><td colspan='7' class='text-center'>Belum ada data kendaraan.</td></tr>";

}

}

}

export default new VehicleView();
