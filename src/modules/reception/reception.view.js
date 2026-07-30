import CustomerService from "../customer/customer.service.js";
import VehicleService from "../vehicle/vehicle.service.js";
import WorkOrderService from "../workorder/workorder.service.js";

class ReceptionView{

async render(){

const page=document.getElementById("receptionPage");
if(!page) return;

page.innerHTML=`
<div class="container-fluid">

<div class="row">

<div class="col-lg-8">

<div class="card shadow-sm">

<div class="card-header">
<h4><i class="fa-solid fa-car-side"></i> Penerimaan Kendaraan</h4>
</div>

<div class="card-body">

<div class="mb-3">
<label>Customer</label>
<select id="rcCustomer" class="form-select"></select>
</div>

<div class="mb-3">
<label>Kendaraan</label>
<select id="rcVehicle" class="form-select"></select>
</div>

<div class="mb-3">
<label>Keluhan Pelanggan</label>
<textarea id="rcComplaint" class="form-control" rows="4"></textarea>
</div>

<button class="btn btn-primary" id="btnCreateWO">
<i class="fa-solid fa-file-circle-plus"></i>
Buat Work Order
</button>

</div>

</div>

</div>

<div class="col-lg-4">

<div class="card shadow-sm">

<div class="card-header">
Status
</div>

<div class="card-body">

<ul class="list-group">

<li class="list-group-item">Customer ✔</li>
<li class="list-group-item">Vehicle ✔</li>
<li class="list-group-item">Reception ✔</li>
<li class="list-group-item">Work Order</li>
<li class="list-group-item">Diagnosis</li>
<li class="list-group-item">Invoice</li>

</ul>

</div>

</div>

</div>

</div>

</div>
`;

}

}

export default new ReceptionView();
