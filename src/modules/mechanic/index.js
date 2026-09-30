import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
Router.register({
  name: "mechanic",
  render: async ()=>{
    const wos = (await Firestore.getAll('workorders')).filter(w=>w.status!=='done');
    document.getElementById('app').innerHTML = `
    <div style="padding:20px">
      <h2 style="color:#00b4d8">MEKANIK TRACKER - Tablet Mode</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px">
        ${wos.map(w=>`
        <div style="background:#131b2b;padding:14px;border-radius:12px;border-left:4px solid ${w.prioritas==='Urgent'?'#ef476f':'#06d6a0'}">
          <b>${w.nopol}</b> - ${w.model||''}<br/><small>${w.customerName} - ${w.keluhan}</small><br/>
          <div style="margin-top:8px;display:flex;gap:6px">
            <button onclick="import('../../core/firestore.js').then(m=>m.Firestore.update('workorders','${w.id}',{status:'in_progress'}).then(()=>location.reload()))" style="flex:1;background:#ffb703;border:none;padding:8px;border-radius:6px">START</button>
            <button onclick="import('../../core/firestore.js').then(m=>m.Firestore.update('workorders','${w.id}',{status:'done'}).then(()=>location.reload()))" style="flex:1;background:#06d6a0;border:none;padding:8px;border-radius:6px">DONE</button>
          </div>
        </div>`).join('')||'<p>Semua WO selesai - Good job!</p>'}
      </div>
    </div>`;
  }
});
