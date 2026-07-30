export function generateCustomerCode(last=1){

const d=new Date();

const y=d.getFullYear();

const m=String(d.getMonth()+1).padStart(2,"0");

const day=String(d.getDate()).padStart(2,"0");

const no=String(last).padStart(6,"0");

return `CUS-${y}${m}${day}-${no}`;

}
