import { Router } from "../../core/router.js";
import issues from "../../data/bmw-common-issues.js";
import { decodeBMWVin } from "../../utils/vin-decoder.js";
Router.register({
  name: "avis",
  render: ()=>{
    document.getElementById('app').innerHTML = `
    <div style="padding:20px;max-width:900px">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
        <img src="/avis_logo.webp" style="width:64px;height:64px;border-radius:12px;background:#131b2b" onerror="this.style.display='none'"/>
        <div><h2 style="color:#00b4d8;margin:0">AVIS - AKA BMW VIRTUAL INTELLIGENCE SYSTEM</h2><small style="color:#8a9bb5">AI Assistant Garage v1.0 • Online • Learning dari 1000+ WO AKA BMW</small></div>
        <div style="margin-left:auto;background:#06d6a0;color:#000;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:800">● LIVE</div>
      </div>
      <div id="avisChat" style="background:#131b2b;border-radius:12px;height:420px;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:8px">
        <div style="background:#0b1220;padding:10px;border-radius:8px"><b style="color:#00b4d8">AVIS:</b> Halo Bos! Saya AVIS. Tanya apa aja soal BMW - VIN, keluhan, estimasi, wiring. Contoh: "F30 N20 getar idle" atau "VIN WBA8E9G..."</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <input id="avisInput" placeholder="Tanya AVIS: F30 getar idle / decode VIN / torque N20..." style="flex:1;padding:12px;border-radius:8px;background:#0b1220;border:1px solid #00b4d8;color:#fff"/>
        <button id="avisSend" style="background:#00b4d8;color:#000;padding:0 20px;border:none;border-radius:8px;font-weight:800">KIRIM</button>
        <button id="avisVoice" style="background:#1e293b;color:#fff;padding:0 16px;border:none;border-radius:8px">🎤</button>
      </div>
      <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap">
        <button class="avisQuick" data-q="F30 getar pas idle">F30 getar idle</button>
        <button class="avisQuick" data-q="N20 oli berkurang">N20 oli berkurang</button>
        <button class="avisQuick" data-q="Decode VIN WBA8E9G...">Decode VIN</button>
        <button class="avisQuick" data-q="Torque cylinder head N20">Torque N20</button>
      </div>
    </div>
    <style>.avisQuick{background:#1e293b;border:1px solid #23304a;color:#8a9bb5;padding:6px 10px;border-radius:20px;font-size:12px;cursor:pointer}</style>`;
    const chat = document.getElementById('avisChat');
    const addMsg = (who, text, color='#fff')=>{
      const d = document.createElement('div'); d.style.cssText = `padding:10px;border-radius:8px;background:${who==='AVIS'?'#0b1220':'#00b4d8'};color:${who==='AVIS'?color:'#000'};align-self:${who==='AVIS'?'flex-start':'flex-end'};max-width:85%`;
      d.innerHTML = `<b style="color:${who==='AVIS'?'#00b4d8':'#000'}">${who}:</b> ${text}`; chat.appendChild(d); chat.scrollTop = chat.scrollHeight;
    };
    const askAVIS = (q)=>{
      addMsg('KAMU', q);
      setTimeout(()=>{
        const low = q.toLowerCase();
        // VIN
        if(low.includes('vin') || q.length>=17){
          const vin = q.match(/[A-HJ-NPR-Z0-9]{17}/i)?.[0] || document.getElementById('avisInput').value.match(/[A-HJ-NPR-Z0-9]{17}/)?.[0];
          if(vin){ const r = decodeBMWVin(vin); addMsg('AVIS', r.valid?`VIN ${vin} → Model: <b>${r.model}</b><br/>Engine: ${r.engine} | Plant: ${r.plant} | WMI: ${r.wmi}<br/>Cek history service di #vehicles`:'VIN harus 17 digit, tanpa I,O,Q', '#06d6a0'); return; }
        }
        const found = issues.filter(i=> i.keywords.some(k=> low.includes(k.toLowerCase())));
        if(found.length){ addMsg('AVIS', found.map(f=>`<b style="color:#ffb703">${f.diag}</b><br/>${f.solusi}<br/>Est: Rp ${f.estimasi.toLocaleString('id-ID')} - <a href="#estimation" style="color:#00b4d8">Buat Estimasi</a>`).join('<hr/>'), '#fff');
        } else if(low.includes('torque')){ addMsg('AVIS','N20 Cylinder Head: <b>8Nm + 90° + 90°</b> (TIS BMW). Connecting rod: 20Nm + 70°. Main bearing: 20Nm + 70°.',' #ffb703');
        } else { addMsg('AVIS','Saya belajar dari database AKA BMW. Coba: "F30 getar idle", "F10 jedug matic", "E90 AC tidak dingin" atau paste VIN 17 digit.', '#8a9bb5'); }
      },400);
    };
    document.getElementById('avisSend').onclick = ()=>{ const v = document.getElementById('avisInput').value.trim(); if(!v) return; askAVIS(v); document.getElementById('avisInput').value=''; };
    document.getElementById('avisInput').onkeydown = (e)=>{ if(e.key==='Enter') document.getElementById('avisSend').click(); };
    document.querySelectorAll('.avisQuick').forEach(b=> b.onclick = ()=> askAVIS(b.dataset.q));
    // Voice
    document.getElementById('avisVoice').onclick = ()=>{
      const rec = new (window.SpeechRecognition||window.webkitSpeechRecognition)(); rec.lang='id-ID'; rec.start();
      rec.onresult = (ev)=>{ document.getElementById('avisInput').value = ev.results[0][0].transcript; document.getElementById('avisSend').click(); };
    };
  }
});
