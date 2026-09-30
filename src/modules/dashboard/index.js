import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
Router.register({
  name: "dashboard",
  render: async ()=>{
    const el = document.getElementById('app');
    el.innerHTML = `<div style="padding:20px"><h2 style="color:#00b4d8">Dashboard AKA BMW</h2><p style="color:#8a9bb5">Loading data...</p></div>`;
    try{
      const [cust, veh, wo, parts] = await Promise.all([
        Firestore.getAll('customers'),
        Firestore.getAll('vehicles'),
        Firestore.getAll('workorders'),
        Firestore.getAll('parts')
      ]);
      const open = wo.filter(w=>w.status!=='done').length;
      const done = wo.filter(w=>w.status==='done').length;
      el.innerHTML = `
      <div style="padding:20px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <img src="/avis_logo.webp" style="width:48px;height:48px;border-radius:8px;background:#131b2b" onerror="this.style.display='none'"/>
          <div><h2 style="color:#00b4d8;margin:0">DASHBOARD AKA BMW</h2><small style="color:#8a9bb5">AVIS Active • ISGM v6.0</small></div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;max-width:900px">
          <div style="background:#131b2b;padding:14px;border-radius:12px;border-left:3px solid #00b4d8"><small style="color:#8a9bb5">WO OPEN</small><div style="font-size:28px;font-weight:800;color:#ffb703">${open}</div></div>
          <div style="background:#131b2b;padding:14px;border-radius:12px;border-left:3px solid #06d6a0"><small style="color:#8a9bb5">WO DONE</small><div style="font-size:28px;font-weight:800;color:#06d6a0">${done}</div></div>
          <div style="background:#131b2b;padding:14px;border-radius:12px"><small style="color:#8a9bb5">CUSTOMERS</small><div style="font-size:28px;font-weight:800">${cust.length}</div></div>
          <div style="background:#131b2b;padding:14px;border-radius:12px"><small style="color:#8a9bb5">VEHICLES</small><div style="font-size:28px;font-weight:800">${veh.length}</div></div>
          <div style="background:#131b2b;padding:14px;border-radius:12px"><small style="color:#8a9bb5">PARTS</small><div style="font-size:28px;font-weight:800">${parts.length}</div></div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
          <a href="#reception" style="background:#00b4d8;color:#000;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:700">+ Reception</a>
          <a href="#workorders" style="background:#131b2b;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Work Orders</a>
          <a href="#avis" style="background:#131b2b;color:#00b4d8;padding:10px 16px;border-radius:8px;text-decoration:none;border:1px solid #00b4d8">🤖 AVIS AI</a>
        </div>
        <div style="margin-top:20px;background:#0f172a;padding:12px;border-radius:8px;max-width:900px"><small style="color:#475569">Jika angka 0 semua, berarti belum ada data di Firestore atau rules belum allow. Cek Firebase Console → Firestore → Rules → allow read, write: if true;</small></div>
      </div>`;
    }catch(e){
      el.innerHTML = `<div style="padding:20px"><h2 style="color:#00b4d8">Dashboard</h2><p style="color:#ef476f">Error: ${e.message}</p><pre style="color:#8a9bb5;font-size:12px">${e.stack||''}</pre><p>Dashboard tetap jalan tanpa data.</p></div>`;
      console.error(e);
    }
  }
});
