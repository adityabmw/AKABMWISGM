export function getCustomerForm(){

return{

name:document.getElementById("customerName")?.value.trim()||"",

phone:document.getElementById("customerPhone")?.value.trim()||"",

whatsapp:document.getElementById("customerWhatsapp")?.value.trim()||"",

email:document.getElementById("customerEmail")?.value.trim()||"",

address:document.getElementById("customerAddress")?.value.trim()||"",

city:document.getElementById("customerCity")?.value.trim()||"",

notes:document.getElementById("customerNotes")?.value.trim()||""

};

}
