/**
 * ETK Page - Bimmerrefs style UI untuk ISGM Dark Theme
 */
import { ETK } from "./etk.service.js";

export function renderETKPage() {
  return `
  <div style="padding:20px; max-width:900px; margin:auto; color:#e5e7eb; background:#0f172a; min-height:100vh">
    <h1 style="font-size:24px; font-weight:bold; margin-bottom:16px">🔍 ETK Online - AKA BMW</h1>
    
    <div style="display:flex; gap:10px; margin-bottom:20px">
      <input id="etk-vin" placeholder="Masukkan 7 digit VIN terakhir (mis: F123456)" 
        style="flex:1; padding:12px; border-radius:8px; background:#1e293b; border:1px solid #334155; color:white">
      <button id="etk-search" style="padding:12px 20px; background:#2563eb; color:white; border-radius:8px; font-weight:bold">Search</button>
    </div>

    <div style="display:flex; gap:10px; margin-bottom:20px">
      <input id="etk-part" placeholder="Atau cari Part Number (mis: 11427508966)" 
        style="flex:1; padding:12px; border-radius:8px; background:#1e293b; border:1px solid #334155; color:white">
      <button id="etk-search-part" style="padding:12px 20px; background:#10b981; color:white; border-radius:8px; font-weight:bold">Cari Part</button>
    </div>

    <div id="etk-result" style="background:#1e293b; border-radius:12px; padding:16px; min-height:200px; border:1px solid #334155">
      <p style="opacity:0.6">Hasil ETK akan muncul di sini... (mirip bimmerrefs)</p>
    </div>

    <div style="margin-top:12px; font-size:12px; opacity:0.5">
      Source: RealOEM / Bimmercat via AKA Cloud Function • Cache otomatis di Firestore
    </div>
  </div>
  `;
}

export function initETKPage() {
  document.body.innerHTML = renderETKPage();
  
  document.getElementById("etk-search").onclick = async () => {
    const vin = document.getElementById("etk-vin").value.trim();
    if (!vin) return alert("Isi VIN 7 digit!");
    const resultEl = document.getElementById("etk-result");
    resultEl.innerHTML = "⏳ Loading ETK...";
    try {
      const data = await ETK.searchVIN(vin);
      resultEl.innerHTML = `<pre style="white-space:pre-wrap; font-size:12px">${JSON.stringify(data, null, 2).slice(0, 5000)}</pre>
        <button style="margin-top:12px; padding:10px; background:#f59e0b; border-radius:8px; color:black; font-weight:bold">+ Add to Work Order</button>`;
    } catch (e) {
      resultEl.innerHTML = `<p style="color:#ef4444">Error: ${e.message}<br>Function belum deploy? Jalankan firebase deploy --only functions</p>`;
    }
  };

  document.getElementById("etk-search-part").onclick = async () => {
    const q = document.getElementById("etk-part").value.trim();
    if (!q) return;
    const resultEl = document.getElementById("etk-result");
    resultEl.innerHTML = "⏳ Searching part...";
    try {
      const data = await ETK.searchPart(q);
      resultEl.innerHTML = `<pre style="white-space:pre-wrap; font-size:12px">${JSON.stringify(data, null, 2).slice(0, 5000)}</pre>`;
    } catch (e) {
      resultEl.innerHTML = `<p style="color:#ef4444">Error: ${e.message}</p>`;
    }
  };
}

// Auto-init kalau diakses via ?page=etk
if (location.search.includes("etk")) {
  initETKPage();
}
