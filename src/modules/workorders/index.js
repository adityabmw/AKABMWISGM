import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
Router.register({
  name: "workorders",
  render: async ()=>{
    const wos = await Firestore.getAll('workorders');
    document.getElementById('app').innerHTML = `
    <div style="padding:20px">
      <h2 style="color:#00b4d8">WORK ORDERS + FOTO BEFORE/AFTER</h2>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <a href="#reception" style="background:#00b4d8;color:#000;padding:8px 14px;border-radius:6px;text-decoration:none;font-weight:700">+ Reception Baru</a>
        <a href="#estimation" style="background:#ffb703;color:#000;padding:8px 14px;border-radius:6px;text-decoration:none">Buat Estimasi</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px">
        ${wos.map(w=>`
        <div style="background:#131b2b;padding:14px;border-radius:12px">
          <b>${w.nopol}</b> - ${w.customerName||''}<br/>
          <small style="color:#8a9bb5">${w.model||''} | ${w.keluhan||''} | ${w.status||'open'}</small><br/>
          <div style="margin-top:8px;display:flex;gap:6px">
            <button onclick="location.hash='estimation?wo=${w.id}'" style="background:#1e293b;color:#fff;border:none;padding:6px 10px;border-radius:6px">Estimasi</button>
            <button onclick="alert('Foto Before/After upload ke Storage - next')" style="background:#1e293b;color:#fff;border:none;padding:6px 10px;border-radius:6px">Foto</button>
            <button onclick="import('../../core/firestore.js').then(m=>m.Firestore.update('workorders','${w.id}',{status:'done'}).then(()=>location.reload()))" style="background:#06d6a0;color:#000;border:none;padding:6px 10px;border-radius:6px">Done</button>
          </div>
        </div>`).join('')||'<p>Belum ada WO - buat di Reception</p>'}
      </div>
    </div>`;
  }
});
