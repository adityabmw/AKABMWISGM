export function createPurchaseOrder(data){
return{
...data,
status:"ORDERED"
};
}
