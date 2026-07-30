import ReportController from "./report.controller.js";

class ReportView{

render(){

const page=document.getElementById("reportPage");
if(!page) return;

const r=ReportController.load();

page.innerHTML=`
<div class="container-fluid">

<h3 class="mb-3">
<i class="fa-solid fa-chart-column"></i>
Laporan Bengkel
</h3>

<div class="row g-3">

<div class="col-md-4">
<div class="card shadow-sm">
<div class="card-body">
<h6>Omzet Hari Ini</h6>
<h3>Rp ${Number(r.todayRevenue).toLocaleString("id-ID")}</h3>
</div>
</div>
</div>

<div class="col-md-4">
<div class="card shadow-sm">
<div class="card-body">
<h6>Omzet Bulan Ini</h6>
<h3>Rp ${Number(r.monthRevenue).toLocaleString("id-ID")}</h3>
</div>
</div>
</div>

<div class="col-md-4">
<div class="card shadow-sm">
<div class="card-body">
<h6>Total Work Order</h6>
<h3>${r.totalWO}</h3>
</div>
</div>
</div>

<div class="col-md-4">
<div class="card shadow-sm">
<div class="card-body">
<h6>WO Selesai</h6>
<h3>${r.finishedWO}</h3>
</div>
</div>
</div>

<div class="col-md-4">
<div class="card shadow-sm">
<div class="card-body">
<h6>Total Customer</h6>
<h3>${r.totalCustomer}</h3>
</div>
</div>
</div>

<div class="col-md-4">
<div class="card shadow-sm">
<div class="card-body">
<h6>Total Kendaraan</h6>
<h3>${r.totalVehicle}</h3>
</div>
</div>
</div>

</div>

</div>
`;

}

}

export default new ReportView();
