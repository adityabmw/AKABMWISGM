import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
Router.register({
  name: "invoices",
  render: async ()=>{
    const wos = await Firestore.getAll('workorders');
    document.getElementById('app').innerHTML = `
    <div style="padding:20px">
      <h2 style="color:#00b4d8">INVOICES - PDF + QRIS</h2>
      <select id="invWO" style="width:100%;max-width:500px;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff">
        <option value="">Pilih WO untuk Invoice</option>
        ${wos.map(w=>`<option value="${w.id}">${w.nopol} - ${w.customerName} - Rp ${(w.estimasi||0).toLocaleString('id-ID')}</option>`).join('')}
      </select>
      <div id="invPreview" style="margin-top:16px;background:#fff;color:#000;padding:20px;border-radius:12px;max-width:600px">
        <h3 style="margin:0">AKA BMW SERVICE - INVOICE</h3><p>Jl. Raya BMW Yogyakarta<br/>WA: 0812-xxxx-xxxx</p><hr/>
        <div id="invDetail">Pilih WO di atas</div>
        <div style="margin-top:20px;display:flex;justify-content:space-between"><div>QRIS & Review</div><div style="width:80px;height:80px;background:#000;color:#fff;display:flex;align-items:center;justify-content:center">QRIS</div></div>
      </div>
      <button id="btnPrint" style="margin-top:12px;background:#00b4d8;color:#000;padding:10px 20px;border:none;border-radius:8px;font-weight:800">CETAK / SAVE PDF</button>
    </div>`;
    document.getElementById('invWO').onchange = async (e)=>{
      const wo = wos.find(x=>x.id===e.target.value);
      if(!wo) return;
      document.getElementById('invDetail').innerHTML = `
        <b>Nopol:</b> ${wo.nopol}<br/><b>Customer:</b> ${wo.customerName}<br/><b>Model:</b> ${wo.model||'-'}<br/><b>Keluhan:</b> ${wo.keluhan||''}<br/><b>Estimasi:</b> Rp ${(wo.estimasi||0).toLocaleString('id-ID')}<br/><b>Status:</b> ${wo.status||'open'}
      `;
    };
    document.getElementById('btnPrint').onclick = ()=> window.print();
  }
});
