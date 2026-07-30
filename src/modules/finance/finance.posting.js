import { createJournal } from "./finance.engine.js";

export function postingInvoice(invoice){

return createJournal({

reference:invoice.invoiceNo,

description:"Invoice Customer",

debit:[
{
account:"1101",
amount:invoice.total
}
],

credit:[
{
account:"4101",
amount:invoice.total
}
]

});

}
