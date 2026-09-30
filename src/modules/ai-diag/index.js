import { Router } from "../../core/router.js";
import { decodeBMWVin } from "../../utils/vin-decoder.js";
import issues from "../../data/bmw-common-issues.js";
Router.register({
  name: "ai-diag",
  render: ()=>{
    document.getElementById('app').innerHTML = `
    <div style="padding:20px">
      <h2 style="color:#00b4d8">AI DIAGNOSIS BMW + VIN DECODER</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div style="background:#131b2b;padding:12px;border-radius:8px">
          <b>VIN Decoder</b><br/>
          <input id="vinInput" placeholder="WBA8E9G... 17 digit" style="width:100%;margin-top:8px;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
          <button id="btnVin" style="margin-top:8px;width:100%;background:#00b4d8;border:none;padding:8px;border-radius:6px">DECODE</button>
          <div id="vinOut" style="margin-top:8px;color:#8a9bb5"></div>
        </div>
        <div style="background:#131b2b;padding:12px;border-radius:8px">
          <b>Keluhan</b><br/>
          <input id="keluhanInput" placeholder="ex: F30 getar idle" style="width:100%;margin-top:8px;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
          <button id="btnDiag" style="margin-top:8px;width:100%;background:#ffb703;border:none;padding:8px;border-radius:6px">DIAGNOSA</button>
          <div id="diagOut" style="margin-top:8px"></div>
        </div>
      </div>
    </div>`;
    document.getElementById('btnVin').onclick = ()=>{
      const r = decodeBMWVin(document.getElementById('vinInput').value);
      document.getElementById('vinOut').innerHTML = r.valid? `<div style="color:#06d6a0">Model: ${r.model}<br/>Engine:${r.engine}</div>` : `<span style="color:#ef476f">${r.msg}</span>`;
    };
    document.getElementById('btnDiag').onclick = ()=>{
      const q = document.getElementById('keluhanInput').value.toLowerCase();
      const found = issues.filter(i=> i.keywords.some(k=> q.includes(k.toLowerCase())));
      document.getElementById('diagOut').innerHTML = found.length? found.map(f=>`<div style="background:#0b1220;padding:8px;border-radius:6px;margin-top:6px"><b style="color:#ffb703">${f.diag}</b><br/>${f.solusi}<br/><span style="color:#06d6a0">Est Rp ${f.estimasi.toLocaleString('id-ID')}</span></div>`).join('') : '<p>Tidak ada di database</p>';
    };
  }
});
