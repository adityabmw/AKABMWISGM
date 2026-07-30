export function openCustomerModal(id="customerModal"){
const el=document.getElementById(id);
if(el && window.bootstrap){
new bootstrap.Modal(el).show();
}
}
export function closeCustomerModal(id="customerModal"){
const el=document.getElementById(id);
const m=bootstrap.Modal.getInstance(el);
if(m)m.hide();
}
