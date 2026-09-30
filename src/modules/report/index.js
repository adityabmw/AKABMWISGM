import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
import { sendWA } from "../../utils/whatsapp.js";
Router.register({
  name: "report",
  render: async ()=>{
    const [cust, veh, wo, parts, bookings] = await Promise.all([
      Firestore.getAll('customers'),
      Firestore.getAll('vehicles'),
      Firestore.getAll('workorders'),
      Firestore.getAll('parts'),
      Firestore.getAll('bookings').catch(()=>[])
    ]);
    const open = wo.filter(w=>w.status!=='done').length;
    const done = wo.filter(w=>w.status==='done').length;
    const omset = wo.reduce((s,w)=>s+Number(w.estimasi||0),0);
    const low = parts.filter(p=>(p.stock||0)<5).length;
    document.getElementById('app').innerHTML = `
    <div style="padding:20px">
      <h2 style="color:#00b4d8">LAPORAN HARIAN OWNER</h2>
      <div style="background:#131b2b;padding:16px;border-radius:12px;max-width:600px">
        <div>Hari ini: ${new Date().toLocaleDateString('id-ID')}</div>
        <div style="margin-top:10px">WO Masuk: <b>${wo.length}</b> | Open: <b style="color:#ffb703">${open}</b> | Selesai: <b style="color:#06d6a0">${done}</b></div>
        <div>Customers: ${cust.length} | Vehicles: ${veh.length} | Bookings: ${bookings.length}</div>
        <div>Omset Estimasi: <b style="color:#06d6a0">Rp ${omset.toLocaleString('id-ID')}</b></div>
        <div>Low Stock: <b style="color:#ef476f">${low} items</b></div>
        <input id="ownerPhone" placeholder="No WA Owner" value="62812xxxxxxx" style="width:100%;margin-top:12px;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <button id="btnSendReport" style="width:100%;margin-top:8px;background:#25D366;color:#000;padding:12px;border:none;border-radius:8px;font-weight:800">KIRIM LAPORAN WA KE OWNER</button>
      </div>
    </div>`;
    document.getElementById('btnSendReport').onclick = ()=>{
      const phone = document.getElementById('ownerPhone').value;
      const text = `*LAPORAN HARIAN AKA BMW*\nTanggal: ${new Date().toLocaleDateString('id-ID')}\nWO Masuk: ${wo.length}\nOpen: ${open}\nSelesai: ${done}\nOmset: Rp ${omset.toLocaleString('id-ID')}\nLow Stock: ${low}\nhttps://akabmwisgm.web.app/#dashboard`;
      sendWA(phone, text);
    };
  }
});
