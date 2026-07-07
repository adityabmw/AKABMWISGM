// ============================================================
// AKA BMW ISGM — DIAGNOSTIC VIEW
// Checklist Mekanik & Diagnosa AI
// ============================================================

import diagnosticService from '../services/diagnostic.service.js';

class DiagnosticView {
  constructor() {
    this.container = document.getElementById('diagnosticView');
    this.currentChecklist = null;
    this.currentWO = null;
    this.isLoading = false;
    this.render();
  }

  // ============================================================
  // 1. RENDER
  // ============================================================
  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="diagnostic-container">
        <!-- Header -->
        <div class="diagnostic-header">
          <h2><i class="fas fa-stethoscope"></i> Diagnostic & Checklist</h2>
          <p class="text-muted">AI-Powered Diagnostic Assistant</p>
        </div>

        <!-- AI Diagnosis Section -->
        <div class="card-diagnostic">
          <div class="card-header">
            <i class="fas fa-brain"></i> AI Diagnosis
            <span class="badge bg-primary">Powered by Knowledge Base</span>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <label>Masukkan Keluhan Customer</label>
                <div class="input-group">
                  <input type="text" id="diagnosticInput" class="form-control" placeholder="e.g. 'Cluster mati' atau 'Engine check light menyala'" />
                  <button id="btnDiagnose" class="btn btn-primary">
                    <i class="fas fa-search"></i> Diagnosa
                  </button>
                </div>
                <small class="text-muted">Ketik keluhan, AI akan merekomendasikan checklist</small>
              </div>
              <div class="col-md-4">
                <label>Pilih WO</label>
                <select id="diagnosticWOSelect" class="form-control">
                  <option value="">Pilih WO...</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Overlay -->
        <div id="diagnosticLoading" class="loading-overlay" style="display:none;">
          <div class="loading-content">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <h4>⏳ Please Wait</h4>
            <p>Checklist sedang disiapkan untuk Anda...</p>
            <div class="progress" style="width:80%;margin:0 auto;">
              <div class="progress-bar progress-bar-striped progress-bar-animated" style="width:100%;background:linear-gradient(90deg,#1a8cff,#06d6a0);"></div>
            </div>
          </div>
        </div>

        <!-- Diagnosis Result -->
        <div id="diagnosticResult" style="display:none;">
          <div class="card-diagnostic">
            <div class="card-header">
              <i class="fas fa-clipboard-check"></i> Hasil Diagnosis
              <span class="badge bg-success" id="matchPercentage">-</span>
            </div>
            <div class="card-body">
              <div id="diagnosisSummary"></div>
            </div>
          </div>

          <!-- Pre-Work Checklist -->
          <div class="card-diagnostic">
            <div class="card-header">
              <i class="fas fa-tools"></i> Pre-Work Checklist
              <span class="badge bg-warning">Sebelum Pengerjaan</span>
            </div>
            <div class="card-body">
              <div id="preChecklistContainer"></div>
            </div>
          </div>

          <!-- During-Work Checklist -->
          <div class="card-diagnostic">
            <div class="card-header">
              <i class="fas fa-wrench"></i> During-Work Checklist
              <span class="badge bg-info">Saat Pengerjaan</span>
            </div>
            <div class="card-body">
              <div id="duringChecklistContainer"></div>
            </div>
          </div>

          <!-- Post-Work Checklist -->
          <div class="card-diagnostic">
            <div class="card-header">
              <i class="fas fa-check-double"></i> Post-Work Checklist
              <span class="badge bg-success">Finishing</span>
            </div>
            <div class="card-body">
              <div id="postChecklistContainer"></div>
            </div>
          </div>

          <!-- Progress & Actions -->
          <div class="card-diagnostic">
            <div class="card-header">
              <i class="fas fa-chart-bar"></i> Progress
            </div>
            <div class="card-body">
              <div class="progress-wrapper">
                <div class="progress-label">
                  <span>Checklist Progress</span>
                  <span id="progressPercent">0%</span>
                </div>
                <div class="progress" style="height:20px;">
                  <div id="progressBar" class="progress-bar" style="width:0%;background:linear-gradient(90deg,#1a8cff,#06d6a0);"></div>
                </div>
              </div>
              <div class="action-buttons mt-3">
                <button id="btnSaveChecklist" class="btn btn-success">
                  <i class="fas fa-save"></i> Simpan Checklist
                </button>
                <button id="btnPrintReport" class="btn btn-secondary">
                  <i class="fas fa-print"></i> Print Report
                </button>
                <button id="btnResetChecklist" class="btn btn-danger">
                  <i class="fas fa-undo"></i> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.populateWOSelect();
  }

  // ============================================================
  // 2. BIND EVENTS
  // ============================================================
  bindEvents() {
    document.getElementById('btnDiagnose')?.addEventListener('click', () => this.diagnose());
    document.getElementById('diagnosticInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.diagnose();
    });
    document.getElementById('btnSaveChecklist')?.addEventListener('click', () => this.saveChecklist());
    document.getElementById('btnPrintReport')?.addEventListener('click', () => this.printReport());
    document.getElementById('btnResetChecklist')?.addEventListener('click', () => this.resetChecklist());
    document.getElementById('diagnosticWOSelect')?.addEventListener('change', () => this.loadChecklist());
  }

  // ============================================================
  // 3. POPULATE WO SELECT
  // ============================================================
  populateWOSelect() {
    const select = document.getElementById('diagnosticWOSelect');
    if (!select) return;

    // Get workorders from state
    const workorders = window.STATE?.workorders || [];
    const currentVal = select.value;

    select.innerHTML = '<option value="">Pilih WO...</option>';
    workorders.filter(w => !w.deleted).forEach(w => {
      const opt = document.createElement('option');
      opt.value = w.id;
      opt.textContent = `${w.woNumber} - ${w.customerName} (${w.vehiclePlate || '-'})`;
      if (opt.value === currentVal) opt.selected = true;
      select.appendChild(opt);
    });
  }

  // ============================================================
  // 4. DIAGNOSE (AI)
  // ============================================================
  diagnose() {
    const input = document.getElementById('diagnosticInput');
    const symptom = input?.value?.trim();
    if (!symptom) {
      alert('Masukkan keluhan customer terlebih dahulu!');
      return;
    }

    // Show loading
    this.showLoading();

    setTimeout(() => {
      // Get diagnosis from AI
      const result = diagnosticService.getChecklistBySymptom(symptom);

      if (!result) {
        this.hideLoading();
        alert('Tidak ditemukan diagnosis untuk keluhan tersebut. Silakan konsultasi dengan mekanik senior.');
        return;
      }

      this.currentChecklist = result;
      this.displayResult(result);
      this.hideLoading();
    }, 1500);
  }

  // ============================================================
  // 5. SHOW LOADING
  // ============================================================
  showLoading() {
    const overlay = document.getElementById('diagnosticLoading');
    if (overlay) overlay.style.display = 'flex';
    this.isLoading = true;
  }

  // ============================================================
  // 6. HIDE LOADING
  // ============================================================
  hideLoading() {
    const overlay = document.getElementById('diagnosticLoading');
    if (overlay) overlay.style.display = 'none';
    this.isLoading = false;
  }

  // ============================================================
  // 7. DISPLAY RESULT
  // ============================================================
  displayResult(result) {
    const container = document.getElementById('diagnosticResult');
    if (!container) return;

    // Show result container
    container.style.display = 'block';

    // Update match percentage
    const matchEl = document.getElementById('matchPercentage');
    if (matchEl) {
      matchEl.textContent = `${result.diagnosis.matchPercentage || 0}% Match`;
    }

    // Display diagnosis summary
    const summary = document.getElementById('diagnosisSummary');
    if (summary) {
      summary.innerHTML = `
        <div class="diagnosis-summary">
          <div class="row">
            <div class="col-md-6">
              <strong><i class="fas fa-bug"></i> Diagnosis:</strong>
              <p>${result.diagnosis.diagnosis.map(d => `• ${d}`).join('<br>')}</p>
            </div>
            <div class="col-md-3">
              <strong><i class="fas fa-clock"></i> Estimasi Waktu:</strong>
              <p>${result.estimatedTime} menit</p>
              <strong><i class="fas fa-signal"></i> Difficulty:</strong>
              <p><span class="badge ${result.difficulty === 'easy' ? 'bg-success' : result.difficulty === 'medium' ? 'bg-warning' : 'bg-danger'}">${result.difficulty.toUpperCase()}</span></p>
            </div>
            <div class="col-md-3">
              <strong><i class="fas fa-toolbox"></i> Tools Required:</strong>
              <p>${result.tools.map(t => `• ${t}`).join('<br>')}</p>
            </div>
          </div>
        </div>
      `;
    }

    // Render checklists
    this.renderChecklist('preChecklistContainer', result.preChecklist, 'pre');
    this.renderChecklist('duringChecklistContainer', result.duringChecklist, 'during');
    this.renderChecklist('postChecklistContainer', result.postChecklist, 'post');

    // Update progress
    this.updateProgress();
  }

  // ============================================================
  // 8. RENDER CHECKLIST
  // ============================================================
  renderChecklist(containerId, items, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!items || items.length === 0) {
      container.innerHTML = '<p class="text-muted">Tidak ada checklist untuk tahap ini.</p>';
      return;
    }

    let html = `<div class="checklist-group">`;
    items.forEach((item, index) => {
      const checkedAttr = item.checked ? 'checked' : '';
      const checkedClass = item.checked ? 'checked' : '';
      html += `
        <div class="checklist-item ${checkedClass}" data-id="${item.id}" data-type="${type}">
          <div class="checklist-item-content">
            <input type="checkbox" id="check_${item.id}" ${checkedAttr} />
            <label for="check_${item.id}">
              <span class="checklist-number">${index + 1}.</span>
              ${item.text}
            </label>
            ${item.checked ? `<span class="badge bg-success"><i class="fas fa-check"></i> Done</span>` : ''}
          </div>
          ${item.checked ? `<small class="text-muted">Checked by ${item.checkedBy || 'mechanic'} at ${new Date(item.timestamp).toLocaleString()}</small>` : ''}
        </div>
      `;
    });
    html += `</div>`;

    container.innerHTML = html;

    // Add event listeners for checkboxes
    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const itemId = e.target.id.replace('check_', '');
        const checked = e.target.checked;
        this.toggleChecklistItem(itemId, checked);
      });
    });
  }

  // ============================================================
  // 9. TOGGLE CHECKLIST ITEM
  // ============================================================
  toggleChecklistItem(itemId, checked) {
    if (!this.currentChecklist) return;

    const updated = diagnosticService.updateChecklistItem(
      this.currentChecklist,
      itemId,
      checked,
      'mechanic'
    );

    if (updated) {
      // Update UI
      const itemEl = document.querySelector(`.checklist-item[data-id="${itemId}"]`);
      if (itemEl) {
        if (checked) {
          itemEl.classList.add('checked');
          const label = itemEl.querySelector('label');
          if (label) {
            const badge = document.createElement('span');
            badge.className = 'badge bg-success ms-2';
            badge.innerHTML = '<i class="fas fa-check"></i> Done';
            label.appendChild(badge);
          }
          // Add timestamp
          const timestamp = document.createElement('small');
          timestamp.className = 'text-muted d-block mt-1';
          timestamp.textContent = `Checked by mechanic at ${new Date().toLocaleString()}`;
          itemEl.appendChild(timestamp);
        } else {
          itemEl.classList.remove('checked');
          const badge = itemEl.querySelector('.badge.bg-success');
          if (badge) badge.remove();
          const timestamp = itemEl.querySelector('.text-muted.d-block');
          if (timestamp) timestamp.remove();
        }
      }

      // Update progress
      this.updateProgress();
    }
  }

  // ============================================================
  // 10. UPDATE PROGRESS
  // ============================================================
  updateProgress() {
    if (!this.currentChecklist) return;

    const progress = diagnosticService.getChecklistProgress(this.currentChecklist);
    const percent = progress.percentage || 0;

    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');

    if (progressBar) {
      progressBar.style.width = `${percent}%`;
      progressBar.textContent = `${percent}%`;
    }
    if (progressPercent) {
      progressPercent.textContent = `${percent}% Complete`;
    }
  }

  // ============================================================
  // 11. SAVE CHECKLIST
  // ============================================================
  async saveChecklist() {
    const woSelect = document.getElementById('diagnosticWOSelect');
    const woId = woSelect?.value;

    if (!woId) {
      alert('Pilih WO terlebih dahulu!');
      return;
    }

    if (!this.currentChecklist) {
      alert('Tidak ada checklist untuk disimpan!');
      return;
    }

    const progress = diagnosticService.getChecklistProgress(this.currentChecklist);
    if (progress.percentage < 100) {
      if (!confirm(`Checklist baru ${progress.percentage}% selesai. Lanjutkan menyimpan?`)) {
        return;
      }
    }

    this.showLoading();
    const success = await diagnosticService.saveChecklistToWorkorder(woId, this.currentChecklist);
    this.hideLoading();

    if (success) {
      alert('✅ Checklist berhasil disimpan ke Work Order!');
    } else {
      alert('❌ Gagal menyimpan checklist. Silakan coba lagi.');
    }
  }

  // ============================================================
  // 12. LOAD CHECKLIST
  // ============================================================
  async loadChecklist() {
    const woSelect = document.getElementById('diagnosticWOSelect');
    const woId = woSelect?.value;

    if (!woId) return;

    this.showLoading();
    const checklist = await diagnosticService.getChecklistFromWorkorder(woId);
    this.hideLoading();

    if (checklist) {
      this.currentChecklist = checklist;
      this.displayResult(checklist);
      alert('✅ Checklist berhasil dimuat dari WO!');
    }
  }

  // ============================================================
  // 13. PRINT REPORT
  // ============================================================
  printReport() {
    if (!this.currentChecklist) {
      alert('Tidak ada report untuk dicetak!');
      return;
    }

    const woSelect = document.getElementById('diagnosticWOSelect');
    const woId = woSelect?.value;
    const woData = window.STATE?.workorders?.find(w => w.id === woId) || {};

    const report = diagnosticService.generateReport(this.currentChecklist, woData);

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Popup blocker aktif! Izinkan popup untuk mencetak.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Diagnostic Report - ${report.woNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; background: #fff; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #1a8cff; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { color: #1a8cff; margin: 0; }
            .header p { color: #666; margin: 5px 0; }
            .section { margin: 20px 0; }
            .section-title { font-weight: bold; color: #1a8cff; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            .checklist-item { padding: 5px 0; }
            .checklist-item .checked { color: #2ecc71; }
            .checklist-item .unchecked { color: #ff5a6a; }
            .progress-bar { background: #eee; height: 20px; border-radius: 10px; overflow: hidden; }
            .progress-fill { background: linear-gradient(90deg,#1a8cff,#06d6a0); height: 100%; border-radius: 10px; }
            .footer { text-align: center; margin-top: 40px; color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
            @media print { body { padding: 20px; } .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>AKA BMW ISGM</h1>
            <p>Diagnostic & Checklist Report</p>
            <p><strong>WO Number:</strong> ${report.woNumber} | <strong>Customer:</strong> ${report.customerName} | <strong>Vehicle:</strong> ${report.vehicle}</p>
          </div>

          <div class="section">
            <div class="section-title">📋 Diagnosis</div>
            <p>${report.diagnosis.diagnosis.map(d => `• ${d}`).join('<br>')}</p>
            <p><strong>Difficulty:</strong> ${report.difficulty} | <strong>Estimated Time:</strong> ${report.estimatedTime} minutes</p>
            <p><strong>Tools Required:</strong> ${report.tools.join(', ')}</p>
          </div>

          <div class="section">
            <div class="section-title">🔧 Pre-Work Checklist</div>
            ${report.preChecklist.map(item => `
              <div class="checklist-item">
                ${item.checked ? '✅' : '⬜'} ${item.text}
                ${item.checked ? `<span class="text-muted"> (Checked: ${new Date(item.timestamp).toLocaleString()})</span>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">🔧 During-Work Checklist</div>
            ${report.duringChecklist.map(item => `
              <div class="checklist-item">
                ${item.checked ? '✅' : '⬜'} ${item.text}
                ${item.checked ? `<span class="text-muted"> (Checked: ${new Date(item.timestamp).toLocaleString()})</span>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">✅ Post-Work Checklist</div>
            ${report.postChecklist.map(item => `
              <div class="checklist-item">
                ${item.checked ? '✅' : '⬜'} ${item.text}
                ${item.checked ? `<span class="text-muted"> (Checked: ${new Date(item.timestamp).toLocaleString()})</span>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">📊 Progress</div>
            <p>${report.progress.completed} of ${report.progress.total} items completed (${report.progress.percentage}%)</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${report.progress.percentage}%;"></div>
            </div>
          </div>

          <div class="footer">
            Generated on ${new Date(report.generatedAt).toLocaleString()} by ${report.generatedBy}
            <br>© AKA BMW ISGM - Integrated System Gateway Management
          </div>

          <div class="no-print" style="text-align:center;margin-top:20px;">
            <button onclick="window.print()" style="padding:10px 30px;background:#1a8cff;color:#fff;border:none;border-radius:5px;cursor:pointer;">🖨️ Print</button>
            <button onclick="window.close()" style="padding:10px 30px;background:#666;color:#fff;border:none;border-radius:5px;cursor:pointer;margin-left:10px;">Close</button>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
  }

  // ============================================================
  // 14. RESET CHECKLIST
  // ============================================================
  resetChecklist() {
    if (!this.currentChecklist) return;

    if (!confirm('Reset semua checklist? Semua progress akan hilang.')) return;

    for (const section of ['preChecklist', 'duringChecklist', 'postChecklist']) {
      if (this.currentChecklist[section]) {
        this.currentChecklist[section].forEach(item => {
          item.checked = false;
          item.timestamp = null;
          item.checkedBy = null;
        });
      }
    }

    this.displayResult(this.currentChecklist);
    alert('✅ Checklist telah di-reset!');
  }
}

// ============================================================
// EXPORT
// ============================================================
export default DiagnosticView;