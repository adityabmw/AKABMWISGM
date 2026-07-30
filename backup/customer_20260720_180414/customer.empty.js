export function emptyState(total){
const el=document.getElementById("emptyState");
if(!el)return;
el.style.display=total===0?"block":"none";
}
