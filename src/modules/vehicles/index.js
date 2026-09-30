import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
Router.register({
  name: "vehicles",
  render: async ()=>{
    const app = document.getElementById('app');
    app.innerHTML = `<div style="padding:20px"><h2 style="color:#00b4d8">VEHICLES</h2><div id="vlist">Loading...</div></div>`;
    const data = await Firestore.getAll("vehicles");
    document.getElementById('vlist').innerHTML = data.length ? data.map(v=>`<div style="background:#131b2b;padding:10px;margin:6px 0;border-radius:6px">${v.nopol||v.plate} - ${v.model||v.type} - VIN:${v.vin||'-'}</div>`).join('') : '<p style="color:#8a9bb5">Belum ada kendaraan</p>';
  }
});
export function initVehicles(){}
