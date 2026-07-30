export function stockMovement(parts=[]){
return parts.map(p=>({
partNo:p.partNo,
qty:-Math.abs(p.qty||0)
}));
}
