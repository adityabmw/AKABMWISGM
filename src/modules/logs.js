// ============================================================================
// AKA BMW ISGM - COMPLIANCE AUDIT LOGGER PROTOCOL
// FILE: src/modules/logs.js
// POSITIONING: Isolated Security Middleware Agent
// ============================================================================

/**
 * Membentuk cetak biru dokumen log audit terstandarisasi sebelum didorong ke server Cloud
 * @param {string} operatorName - Nama Karyawan pelaksana aksi
 * @param {string} operatorRole - Peran jabatan pelaksana
 * @param {string} module - Wilayah area kerja ERP
 * @param {string} action - Aktivitas (Insert/Update/Purge/Void)
 * @param {string} detail - Deskripsi pelengkap data rekam jejak
 * @returns {Object} Dokumen log forensik valid
 */
export function createAuditPayload(operatorName, operatorRole, module, action, detail) {
  return {
    operator: operatorName || "System Automated Trigger",
    role: operatorRole || "UNKNOWN",
    module: String(module).toUpperCase(),
    action: String(action).toUpperCase(),
    detail: detail || "No further operational details provided.",
    timestamp: new Date().toISOString(),
    clientMetadata: {
      userAgent: navigator.userAgent,
      platform: navigator.platform
    }
  };
}
