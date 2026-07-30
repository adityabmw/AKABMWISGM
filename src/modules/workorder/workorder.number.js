export function generateWONumber(){
const d=new Date();
return `WO-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}-${Date.now().toString().slice(-6)}`;
}
