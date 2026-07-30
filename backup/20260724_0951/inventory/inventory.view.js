export default class InventoryView {

renderInventoryTable(parts = []) {

const table=document.getElementById("inventoryTable");

if(!table) return;

if(parts.length===0){

table.innerHTML='<tr><td colspan="6" class="text-center">Belum ada data.</td></tr>';

return;

}

table.innerHTML=parts.map(part=>`

<tr>

<td>${part.partNumber??"-"}</td>

<td>${part.name??"-"}</td>

<td>${part.category??"-"}</td>

<td>${part.stock??0}</td>

<td>Rp ${Number(part.price??0).toLocaleString("id-ID")}</td>

<td>

<button class="btn btn-warning btn-sm editInventory" data-id="${part.id}">

Edit

</button>

<button class="btn btn-danger btn-sm deleteInventory" data-id="${part.id}">

Hapus

</button>

</td>

</tr>

`).join("");

}

renderLowStock(parts=[]){

const badge=document.getElementById("lowStockInventory");

if(badge) badge.textContent=parts.length;

}

}
