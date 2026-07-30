export function financePosting(invoice){
return{
reference:invoice.invoiceNo,
amount:invoice.total
};
}
