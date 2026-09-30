import { Router } from "../../core/router.js";
import wiring from "../../data/bmw-wiring.js";
Router.register({
  name: "wiring",
  render: ()=>{
    document.getElementById('app').innerHTML = `
    <div style="padding:20px">
      <h2 style="color:#ffb703">WIRING DIAGRAM BMW - ISTA LINK</h2>
      <input id="wirSearch" placeholder="Cari F30, N20, DSC" style="width:100%;max-width:500px;padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
      <div id="wirList" style="margin-top:12px;display:grid;gap:8px"></div>
    </div>`;
    const render = (list)=>{
      document.getElementById('wirList').innerHTML = list.map(w=>`
        <div style="background:#131b2b;padding:12px;border-radius:8px;display:flex;justify-content:space-between">
          <div><b>${w.model}</b> - ${w.system}<br/><small style="color:#8a9bb5">${w.desc}</small></div>
          <button style="background:#00b4d8;border:none;padding:6px 12px;border-radius:6px">Buka Diagram</button>
        </div>`).join('');
    };
    render(wiring);
    document.getElementById('wirSearch').oninput = (e)=>{
      const q = e.target.value.toLowerCase();
      render(wiring.filter(x=> `${x.model} ${x.system} ${x.desc}`.toLowerCase().includes(q)));
    };
  }
});
