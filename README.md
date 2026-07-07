// ============================================================
// AKA BMW ISGM — MAIN APPLICATION LOGIC (ES2023)
// SPRINT 1.1 — CONSOLIDATED VERSION
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // 1. FIREBASE INIT
  // ============================================================
  const firebaseConfig = {
    apiKey: "AIzaSyC9tLGHRc-_8gnNsUOfLQDTshbEAVHaR7c",
    authDomain: "akabmwisgm.firebaseapp.com",
    projectId: "akabmwisgm",
    storageBucket: "akabmwisgm.firebasestorage.app",
    messagingSenderId: "317584647702",
    appId: "1:317584647702:web:8d7b6dbd9334f973eeb737"
  };

  if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();
  db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
  auth.languageCode = 'id';

  // ============================================================
  // 2. GLOBAL STATE
  // ============================================================
  const STATE = {
    customers: [],
    vehicles: [],
    workorders: [],
    parts: [],
    checkins: [],
    invoices: [],
    estimations: [],
    users: [],
    userRole: 'OWNER',
    currentUser: null,
    isAuthenticated: false,
    listeners: [],
    charts: { revenue: null, status: null, report: null },
    activeChats: [
      {
        id: 'c1',
        name: 'Pak Budi E46',
        phone: '628123456789',
        unread: true,
        time: '10:15',
        lastMsg: 'Part packing rocker cover carter oli apa sudah ready Pak Adit?',
        msgs: [{ sender: 'in', text: 'Part packing rocker cover carter oli apa sudah ready Pak Adit?', time: '10:15' }]
      }
    ],
    activeChatId: null
  };

  // ============================================================
  // 3. DOM REFS
  // ============================================================
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  const DOM = {
    loading: $('loadingScreen'),
    authPage: $('authPage'),
    dashboardPage: $('dashboardPage'),
    toastContainer: $('toastContainer'),

    // Auth
    loginEmail: $('loginEmail'),
    loginPassword: $('loginPassword'),
    loginRole: $('loginRole'),
    btnLogin: $('btnLogin'),
    togglePass: $('togglePasswordVisBtn'),
    btnSignOut: $('btnSignOutClick'),

    // KPI
    kpiTotalCustomer: $('kpiTotalCustomer'),
    kpiTotalVehicle: $('kpiTotalVehicle'),
    totalWO: $('totalWO'),
    kpiWaitingParts: $('kpiWaitingParts'),
    liveProcess: $('liveProcess'),
    cardInvoice: $('cardInvoice'),

    // Charts
    revenueChart: $('revenueChart'),
    woStatusChart: $('woStatusChart'),
    reportChart: $('reportChart'),

    // Tables
    customerTable: $('customerTable'),
    vehicleTable: $('vehicleTable'),
    woTableBody: $('woTableBody'),
    workOrderTable: $('workOrderTable'),
    inventoryTable: $('inventoryTable'),
    invoiceTable: $('invoiceTable'),
    recentCheckinList: $('recentCheckinList'),
    radarHistoryTableBody: $('radarHistoryTableBody'),
    dashWaNotificationTable: $('dashWaNotificationTable'),
    userTable: $('userTable'),

    // Forms
    customerName: $('customerName'),
    customerPhone: $('customerPhone'),
    customerAddress: $('customerAddress'),
    btnAddCustomer: $('btnAddCustomer'),

    vehicleCustomer: $('vehicleCustomer'),
    vehiclePlate: $('vehiclePlate'),
    vehicleVin: $('vehicleVin'),
    vehicleModel: $('vehicleModel'),
    btnAddVehicle: $('btnAddVehicle'),

    checkinNumber: $('checkinNumber'),
    checkinCustomer: $('checkinCustomer'),
    checkinPlate: $('checkinPlate'),
    checkinVin: $('checkinVin'),
    checkinModel: $('checkinModel'),
    checkinKm: $('checkinKm'),
    checkinComplaint: $('checkinComplaint'),
    btnCheckIn: $('btnCheckIn'),

    woNumber: $('woNumber'),
    woCustomer: $('woCustomer'),
    woVehicle: $('woVehicle'),
    woTechnician: $('woTechnician'),
    woServiceAdvisor: $('woServiceAdvisor'),
    woLaborPrice: $('woLaborPrice'),
    woStatus: $('woStatus'),
    woProgressRange: $('woProgressRange'),
    btnCreateWO: $('btnCreateWO'),

    estimationNumber: $('estimationNumber'),
    estimationWO: $('estimationWO'),
    estimationCustomer: $('estimationCustomer'),
    estimationGrandTotal: $('estimationGrandTotal'),
    btnSaveEstimation: $('btnSaveEstimation'),

    invoiceNumber: $('invoiceNumber'),
    invoiceWO: $('invoiceWO'),
    invoiceCustomer: $('invoiceCustomer'),
    invoiceGrandTotal: $('invoiceGrandTotal'),
    invoiceStatusInput: $('invoiceStatusInput'),
    btnSaveInvoice: $('btnSaveInvoice'),

    partNumber: $('partNumber'),
    partName: $('partName'),
    partStock: $('partStock'),
    partSellPrice: $('partSellPrice'),
    btnAddInventory: $('btnAddInventory'),

    radarSearchInput: $('radarSearchInput'),
    btnSearchRadar: $('btnSearchRadar'),
    radarResultSection: $('radarResultSection'),
    radarProfileData: $('radarProfileData'),

    aiSearchQuery: $('aiSearchQuery'),
    btnAskAi: $('btnAskAi'),
    aiResponseContainer: $('aiResponseContainer'),
    aiResponseOutput: $('aiResponseOutput'),

    etkVin: $('etkVin'),
    etkPartNumber: $('etkPartNumber'),
    btnEtkSearch: $('btnEtkSearch'),

    btnWdsMain: $('btnWdsMain'),
    btnWdsTis: $('btnWdsTis'),

    waTerminalChatList: $('waTerminalChatList'),
    waChatActiveTitle: $('waChatActiveTitle'),
    waChatActiveMessages: $('waChatActiveMessages'),
    waTerminalInputText: $('waTerminalInputText'),
    btnWaTerminalSend: $('btnWaTerminalSend'),

    mechanicProgressListStream: $('mechanicProgressListStream'),
    recentActivityAuditLogViewport: $('recentActivityAuditLogViewport'),
    liveWorkOrderList: $('liveWorkOrderList'),

    qaNewWO: $('qaNewWO'),
    qaNewCustomer: $('qaNewCustomer'),
    qaInvoice: $('qaInvoice'),
    qaCheckin: $('qaCheckin'),

    currentUserRole: $('currentUserRole'),
    topbarUserName: $('topbarUserName'),

    // New from inline script
    lastBackupTime: $('lastBackupTime'),
    reminderList: $('reminderList'),
    userEmail: $('userEmail'),
    userPass: $('userPass'),
    userRoleSelect: $('userRoleSelect'),
    btnAddUser: $('btnAddUser'),
    btnBackup: $('btnBackup'),
    btnRestore: $('btnRestore'),
    exportExcel: $('exportExcel'),
    exportPDF: $('exportPDF'),
    refreshReminder: $('refreshReminder'),
    pageTitle: $('pageTitle'),
    globalSearch: $('globalSearch'),
    woPreviewList: $('woPreviewList'),
    activityLog: $('activityLog'),
    lihatSemuaWO: $('lihatSemuaWO')
  };

  // ============================================================
  // 4. TOAST SYSTEM
  // ============================================================
  function showToast(message, type = 'info', duration = 4000) {
    const container = DOM.toastContainer;
    if (!container) {
      const newContainer = document.createElement('div');
      newContainer.id = 'toastContainer';
      newContainer.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
      document.body.appendChild(newContainer);
      return showToast(message, type, duration);
    }

    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-xmark',
      warning: 'fa-triangle-exclamation',
      info: 'fa-circle-info'
    };

    const colors = {
      success: '#2ecc71',
      error: '#ff5a6a',
      warning: '#f1c40f',
      info: '#1a8cff'
    };

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: #141b2b;
      border: 1px solid #1c2740;
      border-radius: 10px;
      padding: 12px 20px;
      color: #e8edf5;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      animation: slideIn 0.2s ease;
    `;

    toast.innerHTML = `
      <i class="fa-solid ${icons[type] || icons.info}" style="color:${colors[type] || colors.info};"></i>
      <span>${message}</span>
      <i class="fa-solid fa-times" style="cursor:pointer;color:#4a5e7e;margin-left:8px;" onclick="this.parentElement.remove()"></i>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, duration);
  }
  window.showToast = showToast;

  // ============================================================
  // 5. LOADING UTILITY
  // ============================================================
  function showLoading(show = true) {
    if (DOM.loading) DOM.loading.style.display = show ? 'flex' : 'none';
  }

  // ============================================================
  // 6. UTILITY FUNCTIONS
  // ============================================================
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatRupiah(amount) {
    if (amount === undefined || amount === null) return 'Rp 0';
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
  }

  function generateNumber(prefix) {
    return prefix + '-' + Date.now().toString().slice(-6);
  }

  // ============================================================
  // 7. AUDIT LOG SERVICE
  // ============================================================
  async function logAudit({
    action,
    collection,
    docId,
    changes = null,
    metadata = {},
    status = 'SUCCESS'
  }) {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn('Audit log: No user logged in');
        return;
      }

      await db.collection('audit_logs').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
        userEmail: user.email || 'unknown',
        userRole: user.customClaims?.role || localStorage.getItem('aka_isgm_session_role') || 'unknown',
        action,
        collection,
        docId,
        changes: changes || null,
        metadata: {
          userAgent: navigator.userAgent,
          ...metadata
        },
        status,
        version: '1.0'
      });
    } catch (err) {
      console.error('Audit log error:', err);
    }
  }

  // ============================================================
  // 8. AUTH FUNCTIONS
  // ============================================================
  async function handleLogin(e) {
    e.preventDefault();
    const email = DOM.loginEmail?.value.trim();
    const password = DOM.loginPassword?.value;
    const role = DOM.loginRole?.value;

    if (!email || !password || !role) {
      showToast('Mohon isi semua data login!', 'warning');
      return;
    }

    const btn = DOM.btnLogin;
    btn.disabled = true;
    btn.textContent = 'Loading...';

    try {
      await auth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('aka_isgm_session_role', role);

      await logAudit({
        action: 'LOGIN',
        collection: 'auth',
        docId: auth.currentUser?.uid || 'unknown',
        metadata: { email }
      });

      showToast('Login berhasil! Selamat datang.', 'success');
    } catch (err) {
      showToast('Gagal Login: ' + err.message, 'error');
      btn.disabled = false;
      btn.textContent = 'Login';
    }
  }

  function handleSignOut() {
    const userId = auth.currentUser?.uid;
    auth.signOut();
    localStorage.removeItem('aka_isgm_session_role');

    if (userId) {
      logAudit({
        action: 'LOGOUT',
        collection: 'auth',
        docId: userId
      });
    }

    showToast('Anda telah keluar.', 'info');
  }

  function togglePasswordVisibility() {
    const input = DOM.loginPassword;
    if (!input) return;
    const icon = DOM.togglePass;
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.className = 'fa-regular fa-eye';
    } else {
      input.type = 'password';
      if (icon) icon.className = 'fa-regular fa-eye-slash';
    }
  }

  // ============================================================
  // 9. PAGE NAVIGATION
  // ============================================================
  const viewMap = {
    navDash: 'dashboardView',
    navCust: 'customerView',
    navVehicle: 'vehicleView',
    navRec: 'receptionView',
    navWO: 'workOrderView',
    navParts: 'inventoryView',
    navEstimation: 'estimationView',
    navInvoice: 'invoiceView',
    navRadar: 'vehicleRadarView',
    navAskAka: 'askAkaView',
    navBmwEtk: 'bmwEtkView',
    navWiring: 'wiringDiagramView',
    navWhitespace: 'whatsappCenterView',
    navReports: 'reportsView',
    navReminder: 'reminderView',
    navUsers: 'usersView',
    navBackup: 'backupView'
  };

  const pageTitles = {
    dashboardView: 'Dashboard <small>Ringkasan hari ini</small>',
    customerView: 'Customer <small>Kelola data pelanggan</small>',
    vehicleView: 'Kendaraan <small>Data kendaraan</small>',
    receptionView: 'Check-in <small>Reception & check-in</small>',
    workOrderView: 'Work Order <small>Kelola WO</small>',
    inventoryView: 'Inventaris <small>Manajemen parts</small>',
    estimationView: 'Estimasi <small>Buat estimasi</small>',
    invoiceView: 'Invoice <small>Kelola tagihan</small>',
    vehicleRadarView: 'Vehicle Radar <small>Scan kendaraan</small>',
    askAkaView: 'ASK AKA AI <small>Tanya mekanik AI</small>',
    bmwEtkView: 'BMW ETK <small>Parts catalog</small>',
    wiringDiagramView: 'Wiring Diagram <small>WDS & TIS</small>',
    whatsappCenterView: 'WhatsApp Center <small>Komunikasi customer</small>',
    reportsView: 'Laporan <small>Analisis pendapatan</small>',
    reminderView: 'Reminder Service <small>Jadwal servis</small>',
    usersView: 'User Management <small>Kelola akses</small>',
    backupView: 'Backup & Restore <small>Keamanan data</small>'
  };

  function showView(viewId) {
    const allViews = [
      'dashboardView', 'customerView', 'vehicleView', 'receptionView',
      'workOrderView', 'inventoryView', 'estimationView', 'invoiceView',
      'vehicleRadarView', 'askAkaView', 'bmwEtkView', 'wiringDiagramView',
      'whatsappCenterView', 'reportsView', 'reminderView', 'usersView', 'backupView'
    ];

    allViews.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('d-none');
    });

    const target = document.getElementById(viewId);
    if (target) target.classList.remove('d-none');

    if (DOM.pageTitle) {
      DOM.pageTitle.innerHTML = pageTitles[viewId] || viewId;
    }

    // Trigger refresh untuk view tertentu
    if (viewId === 'reportsView') renderReportChart();
    if (viewId === 'reminderView') renderReminder();
    if (viewId === 'usersView') renderUsers();
  }

  function setActiveNav(navId) {
    document.querySelectorAll('.sidebar-item').forEach(el => {
      el.classList.remove('active');
    });

    const activeEl = document.getElementById(navId);
    if (activeEl) {
      activeEl.classList.add('active');
    }
  }

  function setupNavigation() {
    Object.keys(viewMap).forEach(navId => {
      const el = document.getElementById(navId);
      if (!el) return;
      el.addEventListener('click', function(e) {
        e.preventDefault();
        const viewId = viewMap[navId];
        showView(viewId);
        setActiveNav(navId);
      });
    });

    // Quick action buttons
    if (DOM.qaNewWO) {
      DOM.qaNewWO.addEventListener('click', () => document.getElementById('navWO')?.click());
    }
    if (DOM.qaNewCustomer) {
      DOM.qaNewCustomer.addEventListener('click', () => document.getElementById('navCust')?.click());
    }
    if (DOM.qaInvoice) {
      DOM.qaInvoice.addEventListener('click', () => document.getElementById('navInvoice')?.click());
    }
    if (DOM.qaCheckin) {
      DOM.qaCheckin.addEventListener('click', () => document.getElementById('navRec')?.click());
    }
    if (DOM.lihatSemuaWO) {
      DOM.lihatSemuaWO.addEventListener('click', () => document.getElementById('navWO')?.click());
    }

    showView('dashboardView');
    setActiveNav('navDash');
  }

  // ============================================================
  // 10. AUTH PAGE / DASHBOARD TOGGLE
  // ============================================================
  function showAuthPage() {
    if (DOM.authPage) DOM.authPage.classList.remove('d-none');
    if (DOM.dashboardPage) DOM.dashboardPage.classList.add('d-none');
  }

  function showDashboard() {
    if (DOM.authPage) DOM.authPage.classList.add('d-none');
    if (DOM.dashboardPage) DOM.dashboardPage.classList.remove('d-none');
    setTimeout(renderCharts, 300);
  }

  function updateUserUI(role) {
    if (DOM.currentUserRole) DOM.currentUserRole.textContent = role;
    if (DOM.topbarUserName) DOM.topbarUserName.textContent = STATE.currentUser?.displayName || 'Pak Adit';

    const restricted = {
      TECHNICIAN: ['navCust', 'navEstimation', 'navInvoice', 'navParts', 'navUsers', 'navBackup'],
      PARTS: ['navCust', 'navEstimation', 'navInvoice', 'navRec', 'navWO', 'navUsers', 'navBackup'],
      CASHIER: ['navVehicle', 'navRadar', 'navRec', 'navWO', 'navParts', 'navWiring', 'navBmwEtk', 'navUsers', 'navBackup']
    };

    Object.values(viewMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('d-none');
    });

    if (restricted[role]) {
      restricted[role].forEach(navId => {
        const el = document.getElementById(navId);
        if (el) el.classList.add('d-none');
      });
    }
  }

  // ============================================================
  // 11. REALTIME FIRESTORE LISTENERS
  // ============================================================
  let listenersActive = false;

  function startRealtimeListeners() {
    if (listenersActive) return;
    listenersActive = true;

    const unsubCust = db.collection('customers').onSnapshot((snap) => {
      STATE.customers = [];
      snap.forEach(doc => STATE.customers.push({ id: doc.id, ...doc.data() }));
      renderCustomers(STATE.customers);
      updateCustomerDropdowns(STATE.customers);
      updateKPI();
    }, (err) => console.error('Customer listener error:', err));
    STATE.listeners.push(unsubCust);

    const unsubVeh = db.collection('vehicles').onSnapshot((snap) => {
      STATE.vehicles = [];
      snap.forEach(doc => STATE.vehicles.push({ id: doc.id, ...doc.data() }));
      renderVehicles(STATE.vehicles);
      updateVehicleDropdown(STATE.vehicles);
      updateKPI();
    }, (err) => console.error('Vehicle listener error:', err));
    STATE.listeners.push(unsubVeh);

    const unsubWO = db.collection('workorders').onSnapshot((snap) => {
      STATE.workorders = [];
      snap.forEach(doc => STATE.workorders.push({ id: doc.id, ...doc.data() }));
      renderWorkOrders(STATE.workorders);
      renderWOTableDashboard(STATE.workorders);
      updateWODropdowns(STATE.workorders);
      updateKPI();
      renderLiveWOList(STATE.workorders);
      renderMechanicProgress(STATE.workorders);
      renderCharts();
    }, (err) => console.error('WO listener error:', err));
    STATE.listeners.push(unsubWO);

    const unsubParts = db.collection('parts').onSnapshot((snap) => {
      STATE.parts = [];
      snap.forEach(doc => STATE.parts.push({ id: doc.id, ...doc.data() }));
      renderInventory(STATE.parts);
      updateKPI();
    }, (err) => console.error('Parts listener error:', err));
    STATE.listeners.push(unsubParts);

    const unsubCheckin = db.collection('checkins').onSnapshot((snap) => {
      STATE.checkins = [];
      snap.forEach(doc => STATE.checkins.push({ id: doc.id, ...doc.data() }));
      renderCheckinTable(STATE.checkins);
      updateKPI();
    }, (err) => console.error('Checkin listener error:', err));
    STATE.listeners.push(unsubCheckin);

    const unsubInv = db.collection('invoices').onSnapshot((snap) => {
      STATE.invoices = [];
      snap.forEach(doc => STATE.invoices.push({ id: doc.id, ...doc.data() }));
      renderInvoices(STATE.invoices);
      updateKPI();
    }, (err) => console.error('Invoice listener error:', err));
    STATE.listeners.push(unsubInv);

    const unsubEst = db.collection('estimations').onSnapshot((snap) => {
      STATE.estimations = [];
      snap.forEach(doc => STATE.estimations.push({ id: doc.id, ...doc.data() }));
    }, (err) => console.error('Estimation listener error:', err));
    STATE.listeners.push(unsubEst);

    const unsubUsers = db.collection('users').onSnapshot((snap) => {
      STATE.users = [];
      snap.forEach(doc => STATE.users.push({ id: doc.id, ...doc.data() }));
      renderUsers();
    }, (err) => console.error('Users listener error:', err));
    STATE.listeners.push(unsubUsers);
  }

  function clearListeners() {
    STATE.listeners.forEach(unsub => {
      if (typeof unsub === 'function') unsub();
    });
    STATE.listeners = [];
    listenersActive = false;
  }

  // ============================================================
  // 12. RENDER FUNCTIONS
  // ============================================================
  function renderCustomers(data) {
    const tbody = DOM.customerTable;
    if (!tbody) return;
    let html = '';
    data.forEach(d => {
      html += `<tr>
        <td>${escapeHtml(d.name || '-')}</td>
        <td>+${escapeHtml(d.phone || '-')}</td>
        <td>${escapeHtml(d.address || '-')}</td>
        <td>${formatRupiah(d.totalTransaksi)}</td>
        <td><span class="badge bg-purple" style="background:#6d28d9;color:#fff;">${d.loyaltyPoints || 0} Pts</span></td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="5" class="text-muted text-center">Belum ada data</td></tr>';
  }

  function renderVehicles(data) {
    const tbody = DOM.vehicleTable;
    if (!tbody) return;
    let html = '';
    data.forEach(d => {
      html += `<tr>
        <td>${escapeHtml(d.plate || '-')}</td>
        <td>${escapeHtml(d.model || '-')}</td>
        <td>${escapeHtml(d.ownerName || '-')}</td>
        <td>${escapeHtml(d.vin || '-')}</td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="4" class="text-muted text-center">Belum ada data</td></tr>';
  }

  function renderWorkOrders(data) {
    const tbody = DOM.workOrderTable;
    if (!tbody) return;
    let html = '';
    data.forEach(d => {
      const statusClass = d.status === 'PROSES' ? 'b-proses' : d.status === 'WAITING_PARTS' ? 'b-parts' : 'b-diag';
      html += `<tr>
        <td>${escapeHtml(d.woNumber || '-')}</td>
        <td>${escapeHtml(d.customerName || '-')}</td>
        <td><span class="badge-status ${statusClass}">${escapeHtml(d.status || '-')}</span></td>
        <td>${d.progress || 0}%</td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="4" class="text-muted text-center">Belum ada WO</td></tr>';
  }

  function renderWOTableDashboard(data) {
    const tbody = DOM.woTableBody;
    if (!tbody) return;
    let html = '';
    const today = new Date().toISOString().slice(0, 10);
    const filtered = data.filter(d => d.createdAt && d.createdAt.slice(0, 10) === today).slice(0, 10);
    filtered.forEach((d, i) => {
      html += `<tr>
        <td>${i + 1}</td>
        <td>${escapeHtml(d.woNumber || '-')}</td>
        <td>${escapeHtml(d.customerName || '-')} / ${escapeHtml(d.vehiclePlate || '-')}</td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="3" class="text-muted text-center">Tidak ada WO hari ini</td></tr>';

    const preview = DOM.woPreviewList;
    if (preview) {
      let ph = '';
      data.slice(0, 5).forEach(w => {
        const badge = w.status === 'PROSES' ? 'badge-proses' : w.status === 'SELESAI' ? 'badge-selesai' : 'badge-waiting';
        ph += `<tr><td>${escapeHtml(w.woNumber || '-')}</td><td>${escapeHtml(w.customerName || '-')}</td><td><span class="badge ${badge}">${escapeHtml(w.status || '-')}</span></td></tr>`;
      });
      preview.innerHTML = ph || '<tr><td colspan="3" class="text-muted text-center">Belum ada WO</td></tr>';
    }
  }

  function renderInventory(data) {
    const tbody = DOM.inventoryTable;
    if (!tbody) return;
    let html = '';
    data.forEach(d => {
      html += `<tr>
        <td>${escapeHtml(d.partNumber || '-')}</td>
        <td>${escapeHtml(d.partName || '-')}</td>
        <td>${d.stock || 0} Pcs</td>
        <td>${formatRupiah(d.sellPrice)}</td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="4" class="text-muted text-center">Belum ada part</td></tr>';
  }

  function renderCheckinTable(data) {
    const tbody = DOM.recentCheckinList;
    if (!tbody) return;
    let html = '';
    data.slice(0, 10).forEach(d => {
      html += `<tr>
        <td>${escapeHtml(d.checkinNo || '-')}</td>
        <td>${escapeHtml(d.customerName || '-')}</td>
        <td>${escapeHtml(d.plate || '-')}</td>
        <td><span class="badge-status b-proses">${escapeHtml(d.status || 'CHECK_IN')}</span></td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="4" class="text-muted text-center">Belum ada checkin</td></tr>';
  }

  function renderInvoices(data) {
    const tbody = DOM.invoiceTable;
    if (!tbody) return;
    let html = '';
    let unpaid = 0;
    data.forEach(d => {
      if (d.status === 'UNPAID') unpaid++;
      const statusClass = d.status === 'PAID' ? 'b-proses' : 'b-parts';
      html += `<tr>
        <td>${escapeHtml(d.invNumber || '-')}</td>
        <td>${formatRupiah(d.grandTotal)}</td>
        <td><span class="badge-status ${statusClass}">${escapeHtml(d.status || '-')}</span></td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="3" class="text-muted text-center">Belum ada invoice</td></tr>';
    if (DOM.cardInvoice) DOM.cardInvoice.textContent = unpaid;
  }

  function renderLiveWOList(data) {
    const container = DOM.liveWorkOrderList;
    if (!container) return;
    let html = '';
    const active = data.filter(d => d.status === 'PROSES').slice(0, 5);
    active.forEach(d => {
      html += `<div class="live-wo-item">
        <div class="live-wo-left">
          <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=100" class="live-wo-thumb" alt="car" />
          <div class="live-wo-info">
            <div class="w-no">${escapeHtml(d.woNumber || '-')}</div>
            <div class="w-desc">${escapeHtml(d.vehiclePlate || '-')}</div>
          </div>
        </div>
        <div class="live-wo-right">
          <span class="badge-status b-proses">${escapeHtml(d.status || 'PROSES')}</span>
        </div>
      </div>`;
    });
    container.innerHTML = html || '<div class="text-muted text-center py-2">Tidak ada WO aktif</div>';
  }

  function renderMechanicProgress(data) {
    const container = DOM.mechanicProgressListStream;
    if (!container) return;
    const mechanics = ['Andi', 'Budi', 'Cahyo', 'Dedi', 'Eko'];
    let html = '';
    mechanics.forEach((name) => {
      const progress = Math.min(100, Math.floor(Math.random() * 80) + 10);
      html += `<div class="mech-progress-row">
        <div class="mech-profile-box">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" class="mech-mini-avatar" alt="${name}" />
          <span>${name}</span>
        </div>
        <div class="mech-pbar-container"><div class="mech-pbar-fill" style="width:${progress}%;"></div></div>
        <span style="font-size:10px;color:#62768f;">${progress}%</span>
      </div>`;
    });
    container.innerHTML = html;
  }

  function renderUsers() {
    const tbody = DOM.userTable;
    if (!tbody) return;
    let html = '';
    STATE.users.forEach(u => {
      html += `<tr>
        <td>${escapeHtml(u.email || '-')}</td>
        <td>${escapeHtml(u.role || '-')}</td>
        <td>${escapeHtml(u.uid || '-')}</td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="3" class="text-muted text-center">Belum ada user</td></tr>';
  }

  function renderReminder() {
    const div = DOM.reminderList;
    if (!div) return;

    const reminders = STATE.workorders.filter(w => w.status === 'SELESAI' && w.createdAt).slice(0, 5);

    if (reminders.length) {
      div.innerHTML = reminders.map(w =>
        `<div style="padding:6px 0;border-bottom:1px solid #1c2740;">
          🔔 ${escapeHtml(w.customerName)} - ${escapeHtml(w.vehiclePlate)} (${escapeHtml(w.woNumber)}) siap service berkala
        </div>`
      ).join('');
    } else {
      div.innerHTML = '<div class="text-muted">Tidak ada reminder aktif</div>';
    }
  }

  function renderReportChart() {
    const canvas = DOM.reportChart;
    if (!canvas) return;

    if (STATE.charts.report) {
      STATE.charts.report.destroy();
    }

    STATE.charts.report = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [{
          label: 'Pendapatan (Juta)',
          data: [15, 24, 19, 35, 28, 42],
          backgroundColor: '#1a8cff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#a0b4d0' }
          }
        },
        scales: {
          x: { ticks: { color: '#a0b4d0' } },
          y: { ticks: { color: '#a0b4d0' } }
        }
      }
    });
  }

  // ============================================================
  // 13. DROPDOWN UPDATES
  // ============================================================
  function updateCustomerDropdowns(customers) {
    const selects = ['checkinCustomer', 'woCustomer', 'vehicleCustomer'];
    selects.forEach(id => {
      const sel = document.getElementById(id);
      if (!sel) return;
      const currentVal = sel.value;
      sel.innerHTML = '<option value="">Pilih Customer...</option>';
      customers.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.phone || c.id;
        opt.textContent = c.name || c.phone || 'Unknown';
        if (opt.value === currentVal) opt.selected = true;
        sel.appendChild(opt);
      });
    });
  }

  function updateVehicleDropdown(vehicles) {
    const sel = DOM.woVehicle;
    if (!sel) return;
    const currentVal = sel.value;
    sel.innerHTML = '<option value="">Pilih Kendaraan...</option>';
    vehicles.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = `${v.plate || '-'} - ${v.model || '-'}`;
      opt.dataset.plate = v.plate || '';
      if (opt.value === currentVal) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function updateWODropdowns(workorders) {
    ['estimationWO', 'invoiceWO'].forEach(id => {
      const sel = document.getElementById(id);
      if (!sel) return;
      const currentVal = sel.value;
      sel.innerHTML = '<option value="">Pilih Referensi WO...</option>';
      workorders.forEach(w => {
        const opt = document.createElement('option');
        opt.value = w.id;
        opt.textContent = `${w.woNumber || '-'} - ${w.customerName || '-'}`;
        opt.dataset.custname = w.customerName || '';
        opt.dataset.total = w.grandTotal || 0;
        if (opt.value === currentVal) opt.selected = true;
        sel.appendChild(opt);
      });
    });
  }

  // ============================================================
  // 14. KPI UPDATE
  // ============================================================
  function updateKPI() {
    if (DOM.kpiTotalCustomer) DOM.kpiTotalCustomer.textContent = STATE.customers.length;
    if (DOM.kpiTotalVehicle) DOM.kpiTotalVehicle.textContent = STATE.vehicles.length;
    if (DOM.totalWO) DOM.totalWO.textContent = STATE.workorders.filter(w => w.status === 'PROSES').length;
    if (DOM.liveProcess) DOM.liveProcess.textContent = STATE.workorders.filter(w => w.status === 'PROSES').length;
    if (DOM.kpiWaitingParts) {
      const waiting = STATE.workorders.filter(w => w.status === 'WAITING_PARTS').length;
      DOM.kpiWaitingParts.textContent = waiting;
    }
    if (DOM.cardInvoice) {
      const today = new Date().toISOString().slice(0, 10);
      const count = STATE.checkins.filter(c => c.createdAt && c.createdAt.slice(0, 10) === today).length;
      DOM.cardInvoice.textContent = count;
    }

    const log = DOM.activityLog;
    if (log) {
      const recent = STATE.workorders.slice(0, 5).map(w =>
        `${w.woNumber} - ${w.customerName} (${w.status})`
      ).join('\n');
      log.textContent = recent || 'Belum ada aktivitas';
    }
  }

  // ============================================================
  // 15. CHARTS
  // ============================================================
  function renderCharts() {
    const ctxR = DOM.revenueChart;
    if (ctxR) {
      if (STATE.charts.revenue) STATE.charts.revenue.destroy();
      STATE.charts.revenue = new Chart(ctxR.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
          datasets: [{
            label: 'Pendapatan (Juta)',
            data: [15, 24, 19, 35, 28, 42],
            borderColor: '#06d6a0',
            tension: 0.2,
            fill: false,
            pointBackgroundColor: '#06d6a0'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#62768f', font: { size: 9 } } } },
          scales: {
            x: { ticks: { color: '#62768f', font: { size: 8 } }, grid: { color: 'rgba(255,255,255,0.03)' } },
            y: { ticks: { color: '#62768f', font: { size: 8 } }, grid: { color: 'rgba(255,255,255,0.03)' } }
          }
        }
      });
    }

    const ctxS = DOM.woStatusChart;
    if (ctxS) {
      if (STATE.charts.status) STATE.charts.status.destroy();
      const proses = STATE.workorders.filter(w => w.status === 'PROSES').length;
      const selesai = STATE.workorders.filter(w => w.status === 'SELESAI').length;
      STATE.charts.status = new Chart(ctxS.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Dalam Proses', 'Selesai'],
          datasets: [{
            data: [proses || 1, selesai || 1],
            backgroundColor: ['#00b4d8', '#06d6a0'],
            borderColor: ['#0d1625', '#0d1625'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { color: '#62768f', font: { size: 9 }, boxWidth: 10 } }
          }
        }
      });
    }
  }

  // ============================================================
  // 16. WHATSAPP CENTER
  // ============================================================
  function renderWaDashboardWidgets() {
    const tbody = DOM.dashWaNotificationTable;
    if (!tbody) return;
    let html = '';
    STATE.activeChats.forEach(c => {
      html += `<tr>
        <td><b>${escapeHtml(c.name)}</b></td>
        <td>${escapeHtml(c.lastMsg)}</td>
        <td>${escapeHtml(c.time)}</td>
        <td><span class="badge bg-danger">LIVE</span></td>
        <td><button class="btn btn-sm btn-success py-0" onclick="window.openChatFromDashboard('${c.id}')">Buka</button></td>
      </tr>`;
    });
    tbody.innerHTML = html || '<tr><td colspan="5" class="text-muted text-center">Tidak ada chat</td></tr>';
  }

  function renderWaTerminalChats() {
    const container = DOM.waTerminalChatList;
    if (!container) return;
    let html = '';
    STATE.activeChats.forEach(c => {
      html += `<button class="list-group-item bg-dark text-white border-secondary small" onclick="window.selectWaTerminalChat('${c.id}')">${escapeHtml(c.name)}</button>`;
    });
    container.innerHTML = html || '<div class="text-muted p-2">Tidak ada chat</div>';
  }

  function selectWaTerminalChat(id) {
    STATE.activeChatId = id;
    const chat = STATE.activeChats.find(c => c.id === id);
    if (!chat) return;
    if (DOM.waChatActiveTitle) DOM.waChatActiveTitle.textContent = chat.name;
    const container = DOM.waChatActiveMessages;
    if (!container) return;
    let html = '';
    chat.msgs.forEach(m => {
      html += `<div class="d-flex ${m.sender === 'in' ? 'justify-content-start' : 'justify-content-end'} mb-1">
        <div class="p-2 rounded ${m.sender === 'in' ? 'bg-secondary' : 'bg-primary'}" style="max-width:80%;font-size:12px;">
          ${escapeHtml(m.text)}
        </div>
      </div>`;
    });
    container.innerHTML = html || '<div class="text-muted text-center p-3">Tidak ada pesan</div>';
    container.scrollTop = container.scrollHeight;
  }

  function sendWaMessage() {
    const input = DOM.waTerminalInputText;
    if (!input || !input.value.trim()) return;
    const chat = STATE.activeChats.find(c => c.id === STATE.activeChatId);
    if (!chat) {
      showToast('Pilih chat terlebih dahulu.', 'warning');
      return;
    }
    const msg = input.value.trim();
    chat.msgs.push({ sender: 'out', text: msg, time: new Date().toLocaleTimeString() });
    input.value = '';
    selectWaTerminalChat(STATE.activeChatId);
    setTimeout(() => {
      chat.msgs.push({ sender: 'in', text: '👍 Pesan diterima, akan segera diproses.', time: new Date().toLocaleTimeString() });
      selectWaTerminalChat(STATE.activeChatId);
      showToast('Pesan terkirim!', 'success');
    }, 800);
  }

  window.openChatFromDashboard = function(id) {
    document.getElementById('navWhitespace')?.click();
    setTimeout(() => selectWaTerminalChat(id), 200);
  };
  window.selectWaTerminalChat = selectWaTerminalChat;

  // ============================================================
  // 17. ASK AKA AI
  // ============================================================
  function processAiSearch() {
    const query = DOM.aiSearchQuery?.value.trim().toLowerCase();
    const output = DOM.aiResponseOutput;
    const container = DOM.aiResponseContainer;
    if (!query) {
      showToast('Ketik pertanyaan mekanik!', 'warning');
      return;
    }
    if (container) container.classList.remove('d-none');
    if (output) {
      output.innerHTML = `<div class="spinner-border spinner-border-sm text-purple me-2"></div> Menganalisis data...`;
    }

    setTimeout(() => {
      let response = '';
      const foundParts = STATE.parts.filter(p =>
        (p.partName && p.partName.toLowerCase().includes(query)) ||
        (p.partNumber && p.partNumber.toLowerCase().includes(query))
      );
      let stockInfo = '';
      if (foundParts.length > 0) {
        stockInfo = `<br><br><strong>📦 Stok Gudang:</strong><br>`;
        foundParts.forEach(p => {
          stockInfo +=
            `- <b>${escapeHtml(p.partName)}</b> (${escapeHtml(p.partNumber)}) | Stok: <span class="text-warning">${p.stock || 0} pcs</span><br>`;
        });
      }

      if (query.includes('e46') && (query.includes('jumper') || query.includes('regulator'))) {
        response =
          `<strong>💡 SOLUSI INSTRUMEN CLUSTER MATI TOTAL (E46 Bypass):</strong><br>Bypass pin 12V supply utama langsung ke terminal regulator internal PCB cluster. Solder kawat halus lalu seal menggunakan lem UV insulator.`;
      } else if (query.includes('dtc') || query.includes('error') || query.includes('kode')) {
        response =
          `<strong>🔍 DIAGNOSTIC DTC:</strong><br>Untuk kode error BMW, gunakan ISTA+ atau INPA. Pastikan baterai stabil. Baca kode error lengkap dari modul DME, EGS, DSC.`;
      } else if (query.includes('coding') || query.includes('esys')) {
        response =
          `<strong>💻 CODING BMW:</strong><br>Gunakan E-Sys dengan database PSdZData terbaru. Pastikan koneksi ICOM/ENET stabil. Backup FA/VO sebelum coding.`;
      } else {
        response =
          `<strong>🔧 ASK AKA HELP:</strong><br>Topik "${escapeHtml(query)}" — Silakan scan DTC dengan ISTA+ terlebih dahulu. Periksa TIS untuk prosedur resmi.${stockInfo}`;
      }

      if (output) output.innerHTML = response;
    }, 400);
  }

  // ============================================================
  // 18. VEHICLE RADAR
  // ============================================================
  function processRadarSearch() {
    const query = DOM.radarSearchInput?.value.trim().toUpperCase();
    const resultSection = DOM.radarResultSection;
    const profileData = DOM.radarProfileData;
    const historyBody = DOM.radarHistoryTableBody;

    if (!query) {
      showToast('Masukkan Nopol / VIN!', 'warning');
      return;
    }

    const vehicle = STATE.vehicles.find(v =>
      (v.plate && v.plate.toUpperCase().includes(query)) ||
      (v.vin && v.vin.toUpperCase().includes(query))
    );

    if (!vehicle) {
      showToast('Kendaraan tidak ditemukan!', 'error');
      if (resultSection) resultSection.classList.add('d-none');
      return;
    }

    if (resultSection) resultSection.classList.remove('d-none');

    if (profileData) {
      profileData.innerHTML = `
        <div class="col-md-4"><strong>Model:</strong><br>${escapeHtml(vehicle.model || '-')}</div>
        <div class="col-md-4"><strong>Plat No:</strong><br><span class="badge bg-warning text-dark font-monospace">${escapeHtml(vehicle.plate || '-')}</span></div>
        <div class="col-md-4"><strong>VIN:</strong><br>${escapeHtml(vehicle.vin || '-')}</div>
        <div class="col-md-12 mt-3"><div class="alert alert-info py-2 small mb-0"><i class="fa-solid fa-brain me-2"></i><b>Medical Record:</b> Unit terpantau sehat dalam perawatan berkala AKA BMW SERVICE.</div></div>
      `;
    }

    const relatedWO = STATE.workorders.filter(w => w.vehiclePlate && w.vehiclePlate.toUpperCase() === vehicle.plate.toUpperCase());
    if (historyBody) {
      let html = '';
      if (relatedWO.length === 0) {
        html = '<tr><td colspan="6" class="text-center text-muted">Belum ada rekam transaksi.</td></tr>';
      } else {
        relatedWO.forEach(w => {
          html += `<tr>
            <td>${w.createdAt ? w.createdAt.slice(0, 10) : '-'}</td>
            <td>${escapeHtml(w.woNumber || '-')}</td>
            <td>SA: ${escapeHtml(w.sa || '-')}</td>
            <td>${formatRupiah(w.grandTotal)}</td>
            <td><span class="badge-status ${w.status === 'PROSES' ? 'b-proses' : 'b-parts'}">${escapeHtml(w.status || '-')}</span></td>
            <td><button class="btn btn-sm btn-success py-0" onclick="window.open('https://web.whatsapp.com/send?phone=628123456789&text=Halo%20Unit%20Anda%20Waktunya%20Service','_blank')"><i class="fa-brands fa-whatsapp"></i></button></td>
          </tr>`;
        });
      }
      historyBody.innerHTML = html;
    }
  }

  // ============================================================
  // 19. CRUD OPERATIONS
  // ============================================================
  async function safeWrite(operation, successMsg) {
    try {
      await operation();
      showToast(successMsg || 'Berhasil!', 'success');
      return true;
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
      console.error(err);
      return false;
    }
  }

  async function addCustomer() {
    const name = DOM.customerName?.value.trim();
    const phone = DOM.customerPhone?.value.trim();
    const address = DOM.customerAddress?.value.trim();
    if (!name || !phone) {
      showToast('Nama dan WA wajib diisi!', 'warning');
      return;
    }
    await safeWrite(async () => {
      const docRef = await db.collection('customers').add({
        name, phone, address: address || '',
        totalTransaksi: 0,
        loyaltyPoints: 0,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid || 'system',
        status: 'ACTIVE'
      });

      await logAudit({
        action: 'CREATE',
        collection: 'customers',
        docId: docRef.id,
        changes: { after: { name, phone, address } }
      });

      DOM.customerName.value = '';
      DOM.customerPhone.value = '';
      DOM.customerAddress.value = '';
    }, 'Customer berhasil ditambahkan!');
  }

  async function addVehicle() {
    const customerId = DOM.vehicleCustomer?.value;
    const plate = DOM.vehiclePlate?.value.trim().toUpperCase();
    const vin = DOM.vehicleVin?.value.trim().toUpperCase();
    const model = DOM.vehicleModel?.value.trim();
    if (!customerId || !plate || !vin) {
      showToast('Customer, Plat, dan VIN wajib diisi!', 'warning');
      return;
    }
    const customer = STATE.customers.find(c => (c.phone || c.id) === customerId);
    await safeWrite(async () => {
      const docRef = await db.collection('vehicles').add({
        ownerId: customerId,
        ownerName: customer ? customer.name : 'Unknown',
        plate,
        vin,
        model: model || '-',
        color: 'Black',
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid || 'system',
        status: 'ACTIVE'
      });

      await logAudit({
        action: 'CREATE',
        collection: 'vehicles',
        docId: docRef.id,
        changes: { after: { plate, vin, model } }
      });

      DOM.vehiclePlate.value = '';
      DOM.vehicleVin.value = '';
      DOM.vehicleModel.value = '';
    }, 'Kendaraan berhasil ditambahkan!');
  }

  async function addCheckin() {
    const customerPhone = DOM.checkinCustomer?.value;
    const plate = DOM.checkinPlate?.value.trim().toUpperCase();
    const vin = DOM.checkinVin?.value.trim().toUpperCase();
    const model = DOM.checkinModel?.value.trim();
    const km = DOM.checkinKm?.value;
    const complaint = DOM.checkinComplaint?.value.trim();
    if (!customerPhone || !plate) {
      showToast('Customer dan Plat wajib diisi!', 'warning');
      return;
    }
    const customer = STATE.customers.find(c => (c.phone || c.id) === customerPhone);
    await safeWrite(async () => {
      const docRef = await db.collection('checkins').add({
        checkinNo: DOM.checkinNumber?.value || generateNumber('CHK'),
        customerName: customer ? customer.name : 'Unknown',
        customerPhone: customerPhone,
        plate,
        vin: vin || '-',
        model: model || '-',
        odometer: parseInt(km) || 0,
        complaint: complaint || '-',
        status: 'CHECK_IN',
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid || 'system'
      });

      await logAudit({
        action: 'CREATE',
        collection: 'checkins',
        docId: docRef.id,
        changes: { after: { plate, vin, model, km, complaint } }
      });

      generateCheckinNumber();
      DOM.checkinPlate.value = '';
      DOM.checkinVin.value = '';
      DOM.checkinModel.value = '';
      DOM.checkinKm.value = '';
      DOM.checkinComplaint.value = '';
    }, 'Check-in berhasil!');
  }

  async function createWO() {
    const customerPhone = DOM.woCustomer?.value;
    const vehicleId = DOM.woVehicle?.value;
    const technician = DOM.woTechnician?.value.trim();
    const sa = DOM.woServiceAdvisor?.value.trim();
    const labor = parseFloat(DOM.woLaborPrice?.value) || 0;
    const status = DOM.woStatus?.value || 'PROSES';
    const progress = parseInt(DOM.woProgressRange?.value) || 0;

    if (!customerPhone || !vehicleId) {
      showToast('Customer dan Kendaraan wajib dipilih!', 'warning');
      return;
    }
    const customer = STATE.customers.find(c => (c.phone || c.id) === customerPhone);
    const vehicle = STATE.vehicles.find(v => v.id === vehicleId);
    await safeWrite(async () => {
      const docRef = await db.collection('workorders').add({
        woNumber: DOM.woNumber?.value || generateNumber('WO'),
        customerName: customer ? customer.name : 'Unknown',
        customerPhone: customerPhone,
        vehiclePlate: vehicle ? vehicle.plate : '-',
        sa: sa || '-',
        technician: technician || '-',
        grandTotal: labor + 1000000,
        status: status,
        progress: progress,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid || 'system'
      });

      await logAudit({
        action: 'CREATE',
        collection: 'workorders',
        docId: docRef.id,
        changes: { after: { customerName: customer?.name, vehiclePlate: vehicle?.plate, status, progress } }
      });

      generateWONumber();
      DOM.woTechnician.value = '';
      DOM.woServiceAdvisor.value = '';
      DOM.woLaborPrice.value = '';
      DOM.woProgressRange.value = '';
    }, 'Work Order berhasil dirilis!');
  }

  async function saveEstimation() {
    const woId = DOM.estimationWO?.value;
    if (!woId) {
      showToast('Pilih WO terlebih dahulu!', 'warning');
      return;
    }
    const wo = STATE.workorders.find(w => w.id === woId);
    await safeWrite(async () => {
      const docRef = await db.collection('estimations').add({
        estNumber: DOM.estimationNumber?.value || generateNumber('EST'),
        customerName: wo ? wo.customerName : '-',
        workOrderReferenceId: woId,
        grandTotal: wo ? wo.grandTotal : 0,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid || 'system',
        status: 'PENDING'
      });

      await logAudit({
        action: 'CREATE',
        collection: 'estimations',
        docId: docRef.id,
        changes: { after: { customerName: wo?.customerName, grandTotal: wo?.grandTotal } }
      });

      generateEstimationNumber();
    }, 'Estimasi tersimpan!');
  }

  async function saveInvoice() {
    const woId = DOM.invoiceWO?.value;
    if (!woId) {
      showToast('Pilih WO terlebih dahulu!', 'warning');
      return;
    }
    const wo = STATE.workorders.find(w => w.id === woId);
    const status = DOM.invoiceStatusInput?.value || 'PAID';
    await safeWrite(async () => {
      const docRef = await db.collection('invoices').add({
        invNumber: DOM.invoiceNumber?.value || generateNumber('INV'),
        customerName: wo ? wo.customerName : '-',
        targetPhone: wo ? wo.customerPhone : null,
        grandTotal: wo ? wo.grandTotal : 0,
        status: status,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid || 'system'
      });

      await logAudit({
        action: 'CREATE',
        collection: 'invoices',
        docId: docRef.id,
        changes: { after: { customerName: wo?.customerName, grandTotal: wo?.grandTotal, status } }
      });

      if (status === 'PAID' && wo && wo.customerPhone) {
        await incrementLoyaltyPoints(wo.customerPhone, wo.grandTotal || 0);
      }
      generateInvoiceNumber();
    }, 'Invoice berhasil diterbitkan!');
  }

  async function addInventory() {
    const partNumber = DOM.partNumber?.value.trim().toUpperCase();
    const partName = DOM.partName?.value.trim();
    const stock = parseInt(DOM.partStock?.value) || 0;
    const sellPrice = parseFloat(DOM.partSellPrice?.value) || 0;
    if (!partNumber || !partName) {
      showToast('Part Number dan Nama wajib diisi!', 'warning');
      return;
    }
    await safeWrite(async () => {
      const docRef = await db.collection('parts').add({
        partNumber,
        partName,
        stock,
        sellPrice,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid || 'system',
        status: 'ACTIVE'
      });

      await logAudit({
        action: 'CREATE',
        collection: 'parts',
        docId: docRef.id,
        changes: { after: { partNumber, partName, stock, sellPrice } }
      });

      DOM.partNumber.value = '';
      DOM.partName.value = '';
      DOM.partStock.value = '';
      DOM.partSellPrice.value = '';
    }, 'Part berhasil ditambahkan!');
  }

  async function addUser() {
    const email = DOM.userEmail?.value.trim();
    const password = DOM.userPass?.value;
    const role = DOM.userRoleSelect?.value;

    if (!email || !password || !role) {
      showToast('Email, Password, dan Role wajib diisi!', 'warning');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      await db.collection('users').doc(uid).set({
        email,
        role,
        uid,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.uid || 'system'
      });

      await auth.currentUser.getIdToken(true);

      await logAudit({
        action: 'CREATE',
        collection: 'users',
        docId: uid,
        changes: { after: { email, role } }
      });

      DOM.userEmail.value = '';
      DOM.userPass.value = '';
      showToast('User berhasil ditambahkan!', 'success');
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  }

  // ============================================================
  // 20. LOYALTY POINTS
  // ============================================================
  async function incrementLoyaltyPoints(phone, amount) {
    try {
      const q = db.collection('customers').where('phone', '==', phone);
      const snap = await q.get();
      if (snap.empty) return;
      const doc = snap.docs[0];
      const currentTotal = doc.data().totalTransaksi || 0;
      const currentPoints = doc.data().loyaltyPoints || 0;
      const addedPoints = Math.floor(amount / 1000000) * 10;
      await doc.ref.update({
        totalTransaksi: currentTotal + amount,
        loyaltyPoints: currentPoints + addedPoints
      });
      showToast(`+${addedPoints} Poin Loyalty!`, 'success');
    } catch (err) {
      console.error('Loyalty error:', err);
    }
  }

  // ============================================================
  // 21. BACKUP SYSTEM
  // ============================================================
  function backupData() {
    const data = {
      customers: STATE.customers,
      vehicles: STATE.vehicles,
      workorders: STATE.workorders,
      parts: STATE.parts,
      invoices: STATE.invoices,
      checkins: STATE.checkins,
      users: STATE.users,
      exportedAt: new Date().toISOString(),
      exportedBy: auth.currentUser?.email || 'unknown'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_aka_bmw_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    if (DOM.lastBackupTime) {
      DOM.lastBackupTime.textContent = new Date().toLocaleString();
    }

    logAudit({
      action: 'EXPORT',
      collection: 'backup',
      docId: 'backup_' + new Date().toISOString(),
      changes: { before: null, after: { type: 'full_backup' } }
    });

    showToast('Backup berhasil!', 'success');
  }

  function restoreData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async function(ev) {
        try {
          const data = JSON.parse(ev.target.result);

          if (!data.customers || !data.vehicles) {
            showToast('File backup tidak valid!', 'error');
            return;
          }

          if (!confirm(`Restore ${data.customers.length} customer, ${data.vehicles.length} vehicle?`)) {
            return;
          }

          const batch = db.batch();

          for (const item of data.customers) {
            const ref = db.collection('customers').doc(item.id);
            batch.set(ref, item);
          }

          for (const item of data.vehicles) {
            const ref = db.collection('vehicles').doc(item.id);
            batch.set(ref, item);
          }

          await batch.commit();

          await logAudit({
            action: 'RESTORE',
            collection: 'backup',
            docId: 'restore_' + new Date().toISOString(),
            changes: { after: { type: 'full_restore' } }
          });

          showToast('Restore data berhasil!', 'success');
        } catch (err) {
          showToast('Error restore: ' + err.message, 'error');
        }
      };
      reader.readAsText(file);
    };

    input.click();
  }

  // ============================================================
  // 22. GENERATE NUMBER HELPERS
  // ============================================================
  function generateCheckinNumber() {
    if (DOM.checkinNumber) DOM.checkinNumber.value = generateNumber('CHK');
  }
  function generateWONumber() {
    if (DOM.woNumber) DOM.woNumber.value = generateNumber('WO');
  }
  function generateEstimationNumber() {
    if (DOM.estimationNumber) DOM.estimationNumber.value = generateNumber('EST');
  }
  function generateInvoiceNumber() {
    if (DOM.invoiceNumber) DOM.invoiceNumber.value = generateNumber('INV');
  }

  // ============================================================
  // 23. BMW ETK & WIRING
  // ============================================================
  function searchETK() {
    const vin = DOM.etkVin?.value.trim().toUpperCase();
    const partNo = DOM.etkPartNumber?.value.trim().toUpperCase();
    if (partNo) {
      const found = STATE.parts.find(p => p.partNumber === partNo);
      if (found) {
        showToast(`📦 Part: ${found.partName} | Stok: ${found.stock} pcs | Harga: ${formatRupiah(found.sellPrice)}`, 'info', 6000);
      } else {
        showToast(`Part ${partNo} tidak ditemukan di gudang.`, 'warning');
      }
    }
    if (vin) {
      window.open(`https://bimmerrefs.com/vin/${vin}`, '_blank');
    } else if (!partNo) {
      showToast('Masukkan VIN atau Part Number.', 'warning');
    }

    logAudit({
      action: 'READ',
      collection: 'etk',
      docId: partNo || vin || 'unknown',
      metadata: { vin, partNo }
    });
  }

  function openWDS() {
    window.open('https://www.bmw-wiring-diagram.com/', '_blank');
    logAudit({
      action: 'READ',
      collection: 'wds',
      docId: 'wds_access',
      metadata: { source: 'wds_button' }
    });
  }

  function openTIS() {
    window.open('https://www.newtis.info/', '_blank');
    logAudit({
      action: 'READ',
      collection: 'tis',
      docId: 'tis_access',
      metadata: { source: 'tis_button' }
    });
  }

  // ============================================================
  // 24. EVENT BINDING
  // ============================================================
  function bindEvents() {
    DOM.btnLogin?.addEventListener('click', handleLogin);
    DOM.btnSignOut?.addEventListener('click', handleSignOut);
    DOM.togglePass?.addEventListener('click', togglePasswordVisibility);

    DOM.btnAddCustomer?.addEventListener('click', addCustomer);
    DOM.btnAddVehicle?.addEventListener('click', addVehicle);
    DOM.btnCheckIn?.addEventListener('click', addCheckin);
    DOM.btnCreateWO?.addEventListener('click', createWO);
    DOM.btnSaveEstimation?.addEventListener('click', saveEstimation);
    DOM.btnSaveInvoice?.addEventListener('click', saveInvoice);
    DOM.btnAddInventory?.addEventListener('click', addInventory);
    DOM.btnAddUser?.addEventListener('click', addUser);

    DOM.btnSearchRadar?.addEventListener('click', processRadarSearch);
    DOM.btnAskAi?.addEventListener('click', processAiSearch);
    DOM.aiSearchQuery?.addEventListener('keypress', (e) => { if (e.key === 'Enter') processAiSearch(); });

    DOM.btnEtkSearch?.addEventListener('click', searchETK);
    DOM.btnWdsMain?.addEventListener('click', openWDS);
    DOM.btnWdsTis?.addEventListener('click', openTIS);

    DOM.btnWaTerminalSend?.addEventListener('click', sendWaMessage);
    DOM.waTerminalInputText?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendWaMessage(); });

    DOM.btnBackup?.addEventListener('click', backupData);
    DOM.btnRestore?.addEventListener('click', restoreData);
    DOM.refreshReminder?.addEventListener('click', renderReminder);

    DOM.exportExcel?.addEventListener('click', () => {
      showToast('Fitur Export Excel akan datang di Sprint 4', 'info');
    });
    DOM.exportPDF?.addEventListener('click', () => {
      showToast('Fitur Export PDF akan datang di Sprint 4', 'info');
    });

    DOM.woCustomer?.addEventListener('change', function() {
      const phone = this.value;
      const sel = DOM.woVehicle;
      if (!sel) return;
      const currentVal = sel.value;
      sel.innerHTML = '<option value="">Pilih Kendaraan...</option>';
      STATE.vehicles.forEach(v => {
        if (v.ownerId === phone || v.ownerPhone === phone) {
          const opt = document.createElement('option');
          opt.value = v.id;
          opt.textContent = `${v.plate || '-'} - ${v.model || '-'}`;
          opt.dataset.plate = v.plate || '';
          if (opt.value === currentVal) opt.selected = true;
          sel.appendChild(opt);
        }
      });
    });

    DOM.checkinCustomer?.addEventListener('change', function() {
      const phone = this.value;
      const vehicle = STATE.vehicles.find(v => v.ownerId === phone || v.ownerPhone === phone);
      if (vehicle) {
        if (DOM.checkinPlate) DOM.checkinPlate.value = vehicle.plate || '';
        if (DOM.checkinVin) DOM.checkinVin.value = vehicle.vin || '';
        if (DOM.checkinModel) DOM.checkinModel.value = vehicle.model || '';
      }
    });

    DOM.estimationWO?.addEventListener('change', function() {
      const opt = this.options[this.selectedIndex];
      if (DOM.estimationCustomer) DOM.estimationCustomer.value = opt?.dataset?.custname || '';
      if (DOM.estimationGrandTotal) DOM.estimationGrandTotal.value = opt?.dataset?.total || 0;
    });

    DOM.invoiceWO?.addEventListener('change', function() {
      const opt = this.options[this.selectedIndex];
      if (DOM.invoiceCustomer) DOM.invoiceCustomer.value = opt?.dataset?.custname || '';
      if (DOM.invoiceGrandTotal) DOM.invoiceGrandTotal.value = opt?.dataset?.total || 0;
    });

    DOM.globalSearch?.addEventListener('keyup', function() {
      const q = this.value.toLowerCase();
      document.querySelectorAll('.table-wrap table tbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  // ============================================================
  // 25. AUTH STATE LISTENER
  // ============================================================
  function initAuthListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        STATE.isAuthenticated = true;
        STATE.currentUser = user;
        const role = localStorage.getItem('aka_isgm_session_role') || 'OWNER';
        STATE.userRole = role;
        showDashboard();
        startRealtimeListeners();
        updateUserUI(role);
        setTimeout(() => {
          renderWaDashboardWidgets();
          renderWaTerminalChats();
        }, 300);
      } else {
        STATE.isAuthenticated = false;
        STATE.currentUser = null;
        clearListeners();
        showAuthPage();
      }
    });
  }

  // ============================================================
  // 26. INIT
  // ============================================================
  function initApp() {
    showLoading(true);
    setupNavigation();
    generateCheckinNumber();
    generateWONumber();
    generateEstimationNumber();
    generateInvoiceNumber();
    bindEvents();
    initAuthListener();
    renderWaDashboardWidgets();
    renderWaTerminalChats();

    showLoading(false);
    console.log('🚀 AKA BMW ISGM v4.0 — Sprint 1.1 Complete');
    console.log('✅ Consolidated version ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();