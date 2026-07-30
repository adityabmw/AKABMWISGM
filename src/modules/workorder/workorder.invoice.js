export function createInvoiceRef(wo){
return{
workOrderNo:wo.workOrderNo,
customerId:wo.customerId,
vehicleId:wo.vehicleId
};
}
