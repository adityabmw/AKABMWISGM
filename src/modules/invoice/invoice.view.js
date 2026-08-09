export default class InvoiceView {

render(data={}){

const customer=data.customer||{};
const vehicle=data.vehicle||{};
const invoice=data.invoice||{};
const jobs=data.jobs||[];
const parts=data.parts||[];

const laborTotal=jobs.reduce((t,x)=>t+(Number(x.price)||0),0);
const partTotal=parts.reduce((t,x)=>t+((Number(x.qty)||0)*(Number(x.price)||0)),0);
const grandTotal=laborTotal+partTotal;

return `

<div class="container-fluid p-4 bg-white text-dark">

<div class="text-center border-bottom pb-3 mb-3">

<h2>AKA BMW ISGM</h2>

<h5>BMW / MINI Specialist Workshop</h5>

<div>
Jl. ________________________________
</div>

<div>
Telp : ____________________
</div>

</div>

<div class="row">

<div class="col-6">

<b>INVOICE :</b> ${invoice.number||"-"}<br>

<b>Tanggal :</b> ${invoice.date||"-"}<br>

<b>Service Advisor :</b> ${invoice.advisor||"-"}

</div>

<div class="col-6">

<b>Pelanggan :</b> ${customer.name||"-"}<br>

<b>Telepon :</b> ${customer.phone||"-"}<br>

<b>Alamat :</b> ${customer.address||"-"}

</div>

</div>

<hr>

<div class="row">

<div class="col-3">
<b>No Polisi</b><br>
${vehicle.plateNumber||"-"}
</div>

<div class="col-3">
<b>Model</b><br>
${vehicle.model||"-"}
</div>

<div class="col-3">
<b>VIN</b><br>
${vehicle.vin||"-"}
</div>

<div class="col-3">
<b>KM</b><br>
${vehicle.odometer||0}
</div>

</div>

<hr>

<h5>PEKERJAAN</h5>

<table class="table table-bordered">

<thead>

<tr>

<th width="60%">Deskripsi</th>

<th width="20%">Teknisi</th>

<th width="20%">Biaya</th>

</tr>

</thead>

<tbody>

${jobs.map(x=>`

<tr>

<td>${x.name}</td>

<td>${x.tech||"-"}</td>

<td class="text-end">
Rp ${Number(x.price||0).toLocaleString("id-ID")}
</td>

</tr>

`).join("")}

</tbody>

</table>

<h5>SPAREPART</h5>

<table class="table table-bordered">

<thead>

<tr>

<th>Part Number</th>

<th>Nama</th>

<th>Qty</th>

<th>Harga</th>

<th>Total</th>

</tr>

</thead>

<tbody>

${parts.map(x=>`

<tr>

<td>${x.partNumber}</td>

<td>${x.name}</td>

<td>${x.qty}</td>

<td class="text-end">
Rp ${Number(x.price).toLocaleString("id-ID")}
</td>

<td class="text-end">
Rp ${(Number(x.qty)*Number(x.price)).toLocaleString("id-ID")}
</td>

</tr>

`).join("")}

</tbody>

</table>

<div class="row justify-content-end">

<div class="col-4">

<table class="table">

<tr>

<th>Jasa</th>

<td class="text-end">
Rp ${laborTotal.toLocaleString("id-ID")}
</td>

</tr>

<tr>

<th>Sparepart</th>

<td class="text-end">
Rp ${partTotal.toLocaleString("id-ID")}
</td>

</tr>

<tr>

<th>Grand Total</th>

<td class="text-end fw-bold">
Rp ${grandTotal.toLocaleString("id-ID")}
</td>

</tr>

</table>

</div>

</div>

<div class="mt-5">

<div class="row">

<div class="col text-center">

_____________________<br>

Service Advisor

</div>

<div class="col text-center">

_____________________<br>

Pelanggan

</div>

<div class="col text-center">

_____________________<br>

Kasir

</div>

</div>

</div>

<div class="mt-4 text-center">

<small>

Terima kasih telah mempercayakan perawatan kendaraan di AKA BMW ISGM.<br>

Garansi pekerjaan sesuai ketentuan bengkel.

</small>

</div>

</div>

`;

}

}
