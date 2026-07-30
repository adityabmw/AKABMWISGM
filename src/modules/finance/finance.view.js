import Controller from "./finance.controller.js";

class FinanceView{

render(){

const page=document.getElementById("financePage");
if(!page) return;

const s=Controller.summary();

page.innerHTML=`
<div class="container-fluid">

<h3 class="mb-3">
<i class="fa-solid fa-wallet"></i>
Finance
</h3>

<div class="row g-3">

<div class="col-md-4">
<div class="card">
<div class="card-body">
<h6>Pemasukan</h6>
<h3>Rp ${s.income.toLocaleString("id-ID")}</h3>
</div>
</div>
</div>

<div class="col-md-4">
<div class="card">
<div class="card-body">
<h6>Pengeluaran</h6>
<h3>Rp ${s.expense.toLocaleString("id-ID")}</h3>
</div>
</div>
</div>

<div class="col-md-4">
<div class="card">
<div class="card-body">
<h6>Laba Bersih</h6>
<h3>Rp ${s.profit.toLocaleString("id-ID")}</h3>
</div>
</div>
</div>

</div>

</div>`;
}

}

export default new FinanceView();
