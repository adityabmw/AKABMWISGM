import { calculateTax } from "./finance.tax.js";
import { calculateDiscount } from "./finance.discount.js";

export function calculateGrandTotal(subtotal,discount){

const afterDiscount=calculateDiscount(subtotal,discount);

const tax=calculateTax(afterDiscount);

return{

subtotal,

discount,

tax,

grandTotal:afterDiscount+tax

};

}
