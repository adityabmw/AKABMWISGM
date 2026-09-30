export class InventoryView {
  static render(data=[]){ 
    const el=document.getElementById('content');
    if(el) el.innerHTML=`<div style="padding:12px;background:#1e293b;border-radius:8px">Inventory Items: ${data.length}</div>`;
  }
}
export const InventoryViews = InventoryView;
export const InventoryViewInstance = new InventoryView();
export default InventoryView;
