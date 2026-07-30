export function searchCustomer(data,keyword){

keyword=(keyword||"").toLowerCase();

return data.filter(c=>

(c.customerCode||"").toLowerCase().includes(keyword)||

(c.name||"").toLowerCase().includes(keyword)||

(c.phone||"").includes(keyword)||

(c.email||"").toLowerCase().includes(keyword)||

(c.city||"").toLowerCase().includes(keyword)

);

}
