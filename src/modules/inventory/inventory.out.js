export function stockOut(stock,qty){
return Math.max(0,Number(stock)-Number(qty));
}
