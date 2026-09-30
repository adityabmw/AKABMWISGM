import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
Router.register({
  name: "reception",
  render: ()=>{
    document.getElementById('app').innerHTML = `
    <div style="padding:20px;max-width:900px">
      <h2 style="color:#00b4d8">RECEPTION - AKA BMW (Quick Flow)</h2>
      <p style="color:#8a9bb5">Alur sesuai rute: Reception -> Customers -> Vehicles -> WorkOrders</p>
      <div style="background:#131b2b;padding:16px;border-radius:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div style="grid-column:span 2;color:#06d6a0;font-weight:700">CUSTOMER</div>
        <input id="rPhone" placeholder="HP / WA" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="rName" placeholder="Nama Customer" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <div style="grid-column:span 2;color:#00b4d8;font-weight:700;margin-top:8px">VEHICLE (BMW)</div>
        <input id="rNopol" placeholder="Nopol (B 1234 XYZ)" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="rModel" placeholder="Model (F30, G20, E90)" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="rVin" placeholder="VIN 17 digit" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="rKm" placeholder="KM" type="number" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <div style="grid-column:span 2;color:#ffb703;font-weight:700;margin-top:8px">WORK ORDER</div>
        <input id="rKeluhan" placeholder="Keluhan / Service" style="grid-column:span 2;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <select id="rPrioritas" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff">
          <option>Normal</option><option>Urgent</option><option>Booking</option>
        </select>
        <input id="rEstimasi" type="number" placeholder="Estimasi Biaya" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <button id="btnSaveReception" style="grid-column:span 2;background:#00b4d8;color:#000;padding:14px;border:none;border-radius:8px;font-weight:900;font-size:16px">SIMPAN - BUAT CUSTOMER+VEHICLE+WO</button>
        <div id="rStatus" style="grid-column:span 2;color:#8a9bb5"></div>
      </div>
      <div style="margin-top:16px"><a href="#workorders" style="color:#06d6a0">Lihat WorkOrders →</a> | <a href="#customers" style="color:#8a9bb5">Customers →</a></div>
    </div>`;
    document.getElementById('btnSaveReception').onclick = async ()=>{
      const btn = document.getElementById('btnSaveReception');
      btn.disabled=true; btn.innerText='Menyimpan...';
      try{
        const phone = document.getElementById('rPhone').value.trim();
        const name = document.getElementById('rName').value.trim();
        const nopol = document.getElementById('rNopol').value.trim().toUpperCase();
        const model = document.getElementById('rModel').value.trim();
        const vin = document.getElementById('rVin').value.trim().toUpperCase();
        const km = document.getElementById('rKm').value;
        const keluhan = document.getElementById('rKeluhan').value.trim();
        const prioritas = document.getElementById('rPrioritas').value;
        const estimasi = Number(document.getElementById('rEstimasi').value||0);
        if(!phone||!name||!nopol){ alert('HP, Nama, Nopol wajib'); btn.disabled=false; btn.innerText='SIMPAN - BUAT CUSTOMER+VEHICLE+WO'; return; }
        document.getElementById('rStatus').innerText='Membuat customer...';
        const custId = await Firestore.create('customers',{name, phone, hp:phone, createdBy:'reception'});
        document.getElementById('rStatus').innerText='Membuat vehicle...';
        const vehId = await Firestore.create('vehicles',{nopol, plate:nopol, model, vin, km:Number(km||0), customerId:custId, customerName:name});
        document.getElementById('rStatus').innerText='Membuat workorder...';
        const woId = await Firestore.create('workorders',{nopol, vehicleId:vehId, customerId:custId, customerName:name, model, vin, keluhan, complaint:keluhan, prioritas, estimasi, status:'open', createdBy:'reception'});
        document.getElementById('rStatus').innerHTML = `<span style="color:#06d6a0">SUKSES! Customer:${custId} Vehicle:${vehId} WO:${woId}</span>`;
        btn.innerText='SUKSES - Buat lagi?';
        btn.disabled=false;
        setTimeout(()=>location.hash='workorders',1200);
      }catch(e){ document.getElementById('rStatus').innerHTML=`<span style="color:#ef476f">Error: ${e.message}</span>`; btn.disabled=false; btn.innerText='COBA LAGI'; console.error(e); }
    };
  }
});
export function initReception(){}
