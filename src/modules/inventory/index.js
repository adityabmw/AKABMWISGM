import { Router } from "../../core/router.js";
import { Firestore } from "../../core/firestore.js";
Router.register({
  name: "inventory",
  render: async () => {
    const el = document.getElementById('app');
    el.innerHTML = `
      <div style="padding:20px;max-width:1100px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h2 style="color:#00b4d8">INVENTORY - PARTS BMW</h2>
          <div style="display:flex;gap:8px"><input id="searchPart" placeholder="Cari part number / nama..." style="width:260px;padding:9px;border-radius:8px;border:1px solid #1e293b;background:#0b1220;color:#fff"/><button id="btnAddPart" class="btn" style="background:#00b4d8;color:#000;padding:9px 14px;border-radius:8px;font-weight:700">+ Part</button></div>
        </div>
        <div id="partsStatus" style="color:#8a9bb5;margin-bottom:8px;font-size:12px">Loading parts...</div>
        <div style="background:#131b2b;border:1px solid #1e293b;border-radius:12px;overflow:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead style="background:#0f172a;color:#8a9bb5"><tr><th style="padding:10px;text-align:left">Part Number</th><th style="padding:10px;text-align:left">Nama Part</th><th style="padding:10px">Stok</th><th style="padding:10px">Harga Jual</th><th style="padding:10px">Aksi</th></tr></thead>
            <tbody id="partsTbody"><tr><td colspan="5" style="padding:20px;text-align:center;color:#8a9bb5">Loading...</td></tr></tbody>
          </table>
        </div>
      </div>`;

    async function loadParts(){
      const status = document.getElementById('partsStatus');
      try{
        let data = await Firestore.getAll('parts');
        if(!data.length) data = await Firestore.getAll('inventory'); // fallback nama lama
        if(!data.length) data = await Firestore.getAll('stock');
        status.textContent = `Ditemukan ${data.length} parts dari koleksi ${data.length?'parts/inventory':'-'} • ${data.length?'Firestore OK':'Cek Rules'}`;
        const tbody = document.getElementById('partsTbody');
        if(!data.length){
          tbody.innerHTML = `<tr><td colspan="5" style="padding:24px;text-align:center"><div style="color:#ffb703">Belum ada data parts di Firestore</div><small style="color:#8a9bb5">Buka Firebase Console → Firestore → collection 'parts' → Add document. Atau klik + Part di atas untuk tambah manual.</small></td></tr>`;
          return;
        }
        const render = (list)=>{
          tbody.innerHTML = list.map(p=>`
            <tr style="border-top:1px solid #1e293b">
              <td style="padding:10px;font-family:monospace;color:#00b4d8">${p.partNumber||p.no||'-'}</td>
              <td style="padding:10px">${p.partName||p.name||'-'}</td>
              <td style="padding:10px;text-align:center">${p.stock??p.qty??0} Pcs</td>
              <td style="padding:10px;text-align:right">Rp ${(p.sellPrice||p.price||0).toLocaleString('id-ID')}</td>
              <td style="padding:10px;text-align:center"><button onclick="navigator.clipboard.writeText('${p.partNumber||''}')" style="background:#0b1220;border:1px solid #1e293b;color:#8a9bb5;padding:4px 8px;border-radius:6px;cursor:pointer">Copy</button></td>
            </tr>`).join('');
        };
        render(data);
        document.getElementById('searchPart').oninput = (e)=>{
          const q = e.target.value.toLowerCase();
          const filtered = data.filter(p=> (p.partNumber||'').toLowerCase().includes(q) || (p.partName||p.name||'').toLowerCase().includes(q));
          render(filtered);
        };
      }catch(err){
        status.textContent = 'Error: '+err.message;
        document.getElementById('partsTbody').innerHTML = `<tr><td colspan="5" style="padding:20px;color:#ef476f">Error load: ${err.message}<br/><small>Cek Firestore Rules → allow read,write: if true;</small></td></tr>`;
      }
    }
    loadParts();
    document.getElementById('btnAddPart').onclick = async ()=>{
      const pn = prompt('Part Number:'); if(!pn) return;
      const name = prompt('Nama Part:'); if(!name) return;
      const stock = parseInt(prompt('Stok:')||'0');
      const price = parseInt(prompt('Harga Jual:')||'0');
      await Firestore.add('parts',{partNumber:pn, partName:name, stock, sellPrice:price, createdAt:Date.now()});
      alert('Part ditambah'); loadParts();
    };
  }
});
