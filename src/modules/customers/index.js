import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
export function initCustomers(){}
Router.register({
  name: "customers",
  render: async ()=>{
    const app = document.getElementById('app');
    app.innerHTML = `<div style="padding:20px"><h2 style="color:#00b4d8">CUSTOMERS</h2><div id="list">Loading...</div><button id="btnAdd" style="margin-top:12px;background:#00b4d8;color:#fff;padding:8px 16px;border:none;border-radius:6px">+ Customer Baru</button></div>`;
    const data = await Firestore.getAll("customers");
    document.getElementById('list').innerHTML = data.length ? data.map(c=>`<div style="background:#131b2b;padding:10px;margin:6px 0;border-radius:6px">${c.name||c.nama} - ${c.phone||c.hp||''}</div>`).join('') : '<p style="color:#8a9bb5">Belum ada customer. Klik +</p>';
  }
});
