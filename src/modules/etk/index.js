import { Router } from "../../core/router.js";
import etkData from "../../data/bmw-etk.js";
Router.register({
  name: "etk",
  render: ()=>{
    const data = etkData;
    document.getElementById('app').innerHTML = `
    <div style="padding:20px">
      <h2 style="color:#ffb703">ETK OFFLINE - AKA BMW (Pause tapi jalan)</h2>
      <div style="display:flex;gap:8px;margin:12px 0">
        <input id="etkSearch" placeholder="Cari Part Number / Nama / Model (ex: 11 41 / Oil Filter / F30)" style="flex:1;padding:12px;border-radius:8px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <button id="etkBtn" style="background:#ffb703;color:#000;padding:0 20px;border:none;border-radius:8px;font-weight:800">CARI JALUR</button>
      </div>
      <div id="etkResult" style="display:grid;gap:8px"></div>
      <div style="margin-top:16px;color:#8a9bb5;font-size:12px">Mode: offline JS. Support ?etk&vin= sesuai request awal.</div>
    </div>`;
    const render = (list)=>{
      document.getElementById('etkResult').innerHTML = list.map(p=>`
        <div style="background:#131b2b;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
          <div><b style="color:#00b4d8">${p.part}</b><br/>${p.name} - <span style="color:#8a9bb5">${p.model}</span><br/><small style="color:#ffb703">${p.jalur}</small></div>
          <div style="text-align:right"><div>Rp ${Number(p.price).toLocaleString('id-ID')}</div><div style="color:${p.stock<5?'#ef476f':'#06d6a0'}">Stock: ${p.stock}</div><button onclick="location.hash='inventory'" style="margin-top:6px;background:#00b4d8;border:none;padding:4px 8px;border-radius:4px;color:#000">Cek Inventory</button></div>
        </div>`).join('') || '<p>Ga ketemu</p>';
    };
    render(data);
    const doSearch = ()=>{
      const q = document.getElementById('etkSearch').value.toLowerCase();
      render(data.filter(p=> `${p.part} ${p.name} ${p.model} ${p.jalur}`.toLowerCase().includes(q)));
    };
    document.getElementById('etkBtn').onclick = doSearch;
    document.getElementById('etkSearch').oninput = doSearch;
    // support ?etk query
    const params = new URLSearchParams(location.search);
    if(params.get('etk')!==null){
      const vin = params.get('vin')||'';
      if(vin) document.getElementById('etkSearch').value = vin;
      doSearch();
    }
  }
});
