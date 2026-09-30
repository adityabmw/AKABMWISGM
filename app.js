import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyC9tLGHRc-_8gnNsUOfLQDTshbEAVHaR7c",
  authDomain: "akabmwisgm.firebaseapp.com",
  projectId: "akabmwisgm",
  storageBucket: "akabmwisgm.firebasestorage.app",
  messagingSenderId: "317584647702",
  appId: "1:317584647702:web:8d7b6dbd9334f973eeb737"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// CORE - JANGAN DIRUBAH
import "./src/core/router.js";
import "./src/core/auth.js";
import "./src/core/firestore.js";

// MODULES - SEMUA YANG UDAH DITANAM TETAP DI-IMPORT (jangan dihapus)
import "./src/modules/dashboard/index.js";
import "./src/modules/reception/index.js";
import "./src/modules/customers/index.js";
import "./src/modules/vehicles/index.js";
import "./src/modules/workorders/index.js";
import "./src/modules/estimation/index.js";
import "./src/modules/invoices/index.js";
import "./src/modules/inventory/index.js";
import "./src/modules/cashier/index.js";
import "./src/modules/history/index.js";
import "./src/modules/etk/index.js";
import "./src/modules/wiring/index.js";
import "./src/modules/ai-diag/index.js";
import "./src/modules/mechanic/index.js";
import "./src/modules/booking/index.js";
import "./src/modules/master/index.js";
import "./src/modules/report/index.js";
import "./src/modules/avis/index.js";

import { Router } from "./src/core/router.js";

function render(){
  const cur = (location.hash.replace('#','').split('?')[0]||'dashboard');
  document.getElementById('curRoute').innerText = cur.toUpperCase();
  document.querySelectorAll('.nav-route').forEach(a=>{
    a.classList.toggle('active', a.hash===`#${cur}`);
  });
  try{
    if(Router.routes[cur]) Router.routes[cur].render();
    else document.getElementById('app').innerHTML = `<div style="padding:20px"><h2>${cur.toUpperCase()}</h2><p style="color:#8a9bb5">Module belum ada, tapi route ${cur} terdaftar di Router.</p></div>`;
  }catch(e){
    console.error('[Router render]',cur,e);
    document.getElementById('app').innerHTML = `<div style="padding:20px"><h2 style="color:#ef476f">Error di ${cur}</h2><p>${e.message}</p><pre style="background:#131b2b;padding:12px;border-radius:8px;overflow:auto;color:#8a9bb5;font-size:11px">${e.stack||''}</pre><button onclick="location.hash='#dashboard'" class="btn btn-primary" style="margin-top:10px">Kembali Dashboard</button></div>`;
  }
}

// Auth guard - biar gak stuck loading setelah login
onAuthStateChanged(auth, (user)=>{
  const info = document.getElementById('userInfo');
  if(info) info.textContent = user? user.email : 'Guest';
  if(!user && location.pathname!=='/login.html' &&!location.hash.includes('login')){
    // jangan redirect paksa biar bisa lihat dashboard guest dulu, kalo mau paksa login uncomment baris bawah
    // location.href = '/login.html';
  }
  render();
});

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', ()=>{
  Router.init?.();
  render();
  const btn = document.getElementById('btnLogout');
  if(btn) btn.onclick = ()=> signOut(auth).then(()=>location.href='/login.html');
});

console.log("ISGM Original Structure Restored + AVIS System Intact - ", Object.keys(Router.routes).length, " modules");
