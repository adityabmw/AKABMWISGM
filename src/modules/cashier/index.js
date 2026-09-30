import { Router } from "../../core/router.js";
Router.register({
  name: "cashier",
  render: ()=>{
    document.getElementById('app').innerHTML = `
    <div style="padding:20px">
      <h2 style="color:#00b4d8">CASHIER - Quick Invoice</h2>
      <div style="background:#131b2b;padding:16px;border-radius:12px;max-width:500px">
        <input id="cNopol" placeholder="Nopol / WO ID" style="width:100%;padding:10px;margin-bottom:8px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <input id="cJasa" type="number" placeholder="Jasa" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
          <input id="cPart" type="number" placeholder="Part" style="padding:10px;border-radius:6px;background:#0b1220;border:1px solid #23304a;color:#fff"/>
        </div>
        <div style="margin-top:12px;padding:12px;background:#0b1220;border-radius:8px"><div>Total: <b id="cTotal" style="color:#06d6a0;font-size:20px">Rp 0</b></div></div>
        <button id="cPay" style="width:100%;margin-top:12px;background:#06d6a0;color:#000;padding:12px;border:none;border-radius:8px;font-weight:800">BAYAR & CETAK</button>
      </div>
    </div>`;
    const calc = ()=>{
      const j = Number(document.getElementById('cJasa').value||0);
      const p = Number(document.getElementById('cPart').value||0);
      document.getElementById('cTotal').innerText = 'Rp '+(j+p).toLocaleString('id-ID');
    };
    document.getElementById('cJasa').oninput = calc;
    document.getElementById('cPart').oninput = calc;
    document.getElementById('cPay').onclick = ()=>alert('Invoice '+document.getElementById('cNopol').value+' Lunas - '+document.getElementById('cTotal').innerText);
  }
});
