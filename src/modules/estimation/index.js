import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
import { sendWA } from "../../utils/whatsapp.js";
Router.register({
  name: "estimation",
  render: async ()=>{
    const woId = new URLSearchParams(location.hash.split('?')[1]||'').get('wo') || localStorage.getItem('lastWO') || '';
    const wos = await Firestore.getAll('workorders');
    document.getElementById('app').innerHTML = `
    <div style="padding:20px;max-width:800px">
      <h2 style="color:#00b4d8">ESTIMASI + WA APPROVAL</h2>
      <select id="estWO" style="width:100%;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff;margin-bottom:12px">
        <option value="">Pilih WorkOrder</option>
        ${wos.map(w=>`<option value="${w.id}" ${w.id===woId?'selected':''}>${w.nopol||''} - ${w.customerName||''} - ${w.keluhan||''}</option>`).join('')}
      </select>
      <div style="background:#131b2b;padding:16px;border-radius:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <input id="estJasa" type="number" placeholder="Jasa" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="estPart" type="number" placeholder="Part" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="estDiskon" type="number" placeholder="Diskon" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <div style="padding:10px;background:#0b1220;border-radius:6px"><b>Total: <span id="estTotal" style="color:#06d6a0">Rp 0</span></b></div>
        <input id="estPhone" placeholder="No WA Customer" style="grid-column:span 2;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <textarea id="estNote" placeholder="Catatan: butuh ganti timing chain, etc" style="grid-column:span 2;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"></textarea>
        <button id="btnKirimWA" style="grid-column:span 2;background:#25D366;color:#000;padding:12px;border:none;border-radius:8px;font-weight:800">KIRIM WA APPROVAL + SIMPAN ESTIMASI</button>
      </div>
    </div>`;
    const calc = ()=>{ const j=Number(document.getElementById('estJasa').value||0); const p=Number(document.getElementById('estPart').value||0); const d=Number(document.getElementById('estDiskon').value||0); document.getElementById('estTotal').innerText='Rp '+(j+p-d).toLocaleString('id-ID'); };
    document.getElementById('estJasa').oninput=calc; document.getElementById('estPart').oninput=calc; document.getElementById('estDiskon').oninput=calc;
    document.getElementById('btnKirimWA').onclick = async ()=>{
      const wo = document.getElementById('estWO').value;
      const total = document.getElementById('estTotal').innerText;
      const note = document.getElementById('estNote').value;
      const phone = document.getElementById('estPhone').value;
      const j = document.getElementById('estJasa').value; const p = document.getElementById('estPart').value;
      if(!wo||!phone){ alert('Pilih WO & No WA'); return; }
      await Firestore.create('estimations',{woId:wo, jasa:Number(j), part:Number(p), total, note, status:'sent'});
      const msg = `Halo, Estimasi untuk mobil ${wo} : ${total}. Detail: ${note}. Balas OK untuk approval. - AKA BMW SERVICE`;
      sendWA(phone, msg);
      alert('Estimasi disimpan & WA dibuka');
    };
  }
});
