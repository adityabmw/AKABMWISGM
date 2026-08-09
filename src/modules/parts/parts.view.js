/*
====================================================
 AKA BMW ISGM
 Module : PARTS
 Layer  : VIEW
====================================================
*/

export default class PartsView {

render(parts=[]){

return `

<div class="card">

<div class="card-header">
<h3>Master Parts</h3>
</div>

<div class="card-body">

<table class="table table-striped table-hover">

<thead>

<tr>
<th>Part Number</th>
<th>Nama</th>
<th>Kategori</th>
<th>Stock</th>
<th>Harga</th>
<th width="220">Action</th>
</tr>

</thead>

<tbody>

${parts.map(item=>`

<tr data-id="${item.id}">

<td>${item.partNumber||""}</td>
<td>${item.name||""}</td>
<td>${item.category||""}</td>
<td>${item.stock??0}</td>
<td>${item.price??0}</td>

<td>

<button class="btn btn-primary btn-sm part-detail" data-id="${item.id}">
👁
</button>

<button class="btn btn-warning btn-sm part-edit" data-id="${item.id}">
✏️
</button>

<button class="btn btn-info btn-sm part-copy" data-id="${item.id}">
📋
</button>

<button class="btn btn-danger btn-sm part-archive" data-id="${item.id}">
🗑
</button>

</td>

</tr>

`).join("")}

</tbody>

</table>

</div>

</div>

`;

}

}
