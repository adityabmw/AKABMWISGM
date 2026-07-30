import { collection, getDocs, writeBatch } from "firebase/firestore";
import { DB } from "../../config/firebase.config.js";

class SettingsView {
  init() {
    console.log("SETTINGS CORE CONNECTED TO INTERFACE DOM");
    this.renderIntoDOM();
  }

  renderIntoDOM() {
    // Menembak kontainer settingsView bawaan di index.html
    const target = document.getElementById("settingsView");
    if (!target) return;

    target.innerHTML = `
      <div class="aka-card mb-4 border-start border-warning border-4">
        <h4 class="fw-bold text-warning"><i class="fa-solid fa-sliders"></i> System & Workshop Configuration Profiles</h4>
        <p class="text-secondary mb-0">Konfigurasi data identitas bengkel AKA BMW</p>
      </div>

      <div class="aka-card mb-4">
        <h5 class="fw-bold text-info mb-3">Workshop Corporate Profile</h5>
        <div class="row g-3">
          <div class="col-md-6"><label class="form-label">Nama Workshop Resmi</label><input id="settingWorkshopName" class="form-control" value="AKA BMW SERVICE"></div>
          <div class="col-md-6"><label class="form-label">Nomor WhatsApp Corporate Hotline</label><input id="settingPhone" class="form-control" value="08129000xxxx"></div>
          <div class="col-md-12"><label class="form-label">Alamat Fisik Workshop Utama</label><textarea id="settingAddress" class="form-control" rows="2">Jl. Komp. Gudang Peluru No.A1, Jakarta, Indonesia</textarea></div>
        </div>
      </div>

      <div class="aka-card mb-4 border border-danger border-1">
        <h5 class="fw-bold text-danger mb-2"><i class="fa-solid fa-triangle-exclamation"></i> Danger Zone - Reset Database</h5>
        <p class="text-secondary small">Aksi di bawah ini akan menghapus total seluruh rekaman transaksi operasional (Customers, Vehicles, Work Orders, Bookings, dan Logs) dari server Cloud Firestore.</p>
        <button id="btnGlobalReset" class="btn btn-danger btn-sm fw-bold mt-2">
          <i class="fa-solid fa-trash-can"></i> HAPUS SELURUH DATA INPUTAN
        </button>
      </div>

      <div class="aka-card">
        <button id="btnSaveSettings" class="btn btn-warning"><i class="fa-solid fa-floppy-disk"></i> 💾 Save Global Configuration Data</button>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const btnReset = document.getElementById("btnGlobalReset");
    if (!btnReset) return;

    btnReset.addEventListener("click", async () => {
      const confirm1 = confirm("⚠️ PERINGATAN KESELAMATAN DATABASE!\n\nApakah Pak Bos Adit benar-benar yakin ingin menghapus SELURUH data inputan dari sistem? Aksi ini permanen.");
      if (!confirm1) return;

      const confirm2 = confirm("KONFIRMASI TERAKHIR:\n\nSemua data registrasi pelanggan, unit kendaraan, log audit, dan dokumen pengerjaan WO AKA BMW akan dibersihkan dari server Cloud. Eksekusi sekarang, Pak Bos?");
      if (!confirm2) return;

      try {
        btnReset.disabled = true;
        btnReset.innerText = "PURGING CLOUD DATABASE...";

        const collectionsToPurge = ["customers", "vehicles", "workorders", "bookings", "audit_logs"];
        
        for (const colName of collectionsToPurge) {
          const snap = await getDocs(collection(DB, colName));
          if (snap.empty) continue;

          const batch = writeBatch(DB);
          snap.docs.forEach(docSnap => {
            batch.delete(docSnap.ref);
          });
          await batch.commit();
        }

        alert("🎯 Sukses Mutlak! Cloud Firestore telah berhasil dibersihkan dari seluruh data inputan!");
        window.location.reload();
      } catch (error) {
        alert("Gagal mengeksekusi reset: " + error.message);
        btnReset.disabled = false;
        btnReset.innerText = "HAPUS SELURUH DATA INPUTAN";
      }
    });
  }
}

export default new SettingsView();
