export function renderCustomerTable(rows=[]){
const tbody=document.getElementById("customerTableBody");
if(!tbody)return;
tbody.innerHTML=rows.map(c=>`
<tr data-id="${c.id}">
<td>${c.customerCode||""}</td>
<td>${c.name||""}</td>
<td>${c.phone||""}</td>
<td>${c.city||""}</td>
<td>${c.memberLevel||"REGULAR"}</td>
<td>${c.active?"Active":"Nonaktif"}</td>
</tr>
`).join("");
}
