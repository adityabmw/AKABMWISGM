import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
Router.register({
  name: "booking",
  render: ()=>{
    document.getElementById('app').innerHTML = `
    <div style="padding:20px;max-width:600px">
      <h2 style="color:#00b4d8">BOOKING ONLINE - Antrian Live</h2>
      <div style="background:#131b2b;padding:16px;border-radius:12px;display:grid;gap:10px">
        <input id="bName" placeholder="Nama" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="bPhone" placeholder="HP" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="bNopol" placeholder="Nopol" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <input id="bDate" type="date" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <select id="bJam" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"><option>08:00</option><option>10:00</option><option>13:00</option><option>15:00</option></select>
        <button id="bSave" style="background:#00b4d8;color:#000;padding:12px;border:none;border-radius:8px;font-weight:800">BOOKING SEKARANG</button>
      </div>
    </div>`;
    document.getElementById('bSave').onclick = async ()=>{
      const data = {name:document.getElementById('bName').value, phone:document.getElementById('bPhone').value, nopol:document.getElementById('bNopol').value, date:document.getElementById('bDate').value, jam:document.getElementById('bJam').value, status:'booked'};
      await Firestore.create('bookings', data);
      alert('Booking OK'); location.hash='reception';
    };
  }
});
