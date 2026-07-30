export function renderCustomerTable(rows=[]){

const tbody=document.getElementById("customerTableBody");

if(!tbody) return;

tbody.innerHTML=rows.map(c=>`
<tr>
<td>${c.customerCode||""}</td>
<td>${c.name||""}</td>
<td>${c.phone||""}</td>
<td>${c.city||""}</td>
<td>${c.memberLevel||"REGULAR"}</td>
</tr>
`).join("");

}
