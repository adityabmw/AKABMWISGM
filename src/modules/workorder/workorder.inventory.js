export function consumeStock(parts=[]){
return parts.map(p=>({
partNo:p.partNo,
qtyUsed:p.qty
}));
}
