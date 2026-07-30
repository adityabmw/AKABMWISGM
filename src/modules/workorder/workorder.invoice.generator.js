export function generateInvoice(wo,total){
return{
invoiceNo:"INV-"+Date.now(),
workOrderNo:wo.workOrderNo,
customerId:wo.customerId,
total
};
}
