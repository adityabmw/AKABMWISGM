export function paymentSummary(total,paid=0){
return{
total,
paid,
balance:total-paid,
status:paid>=total?"PAID":"UNPAID"
};
}
