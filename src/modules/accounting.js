// ============================================================================
// AKA BMW ISGM - FINANCIAL ACCOUNTING CORE ENGINE
// FILE: src/modules/accounting.js
// POSITIONING: Standalone Financial Business Logic Component
// ============================================================================

/**
 * Mengkalkulasi mutasi arus kas masuk berdasarkan metode pembayaran POS
 * @param {Array} paymentDocuments - Kumpulan baris dokumen dari collection 'payments'
 * @returns {Object} Neraca ringkas kliring kasir workshop
 */
export function calculateCashierBalance(paymentDocuments) {
  const summary = { cash: 0, transfer: 0, qris: 0, edc: 0, totalRevenue: 0 };
  
  if (!Array.isArray(paymentDocuments) || paymentDocuments.length === 0) {
    return summary;
  }
  
  paymentDocuments.forEach(doc => {
    const data = typeof doc.data === 'function' ? doc.data() : doc;
    const method = String(data.method || 'CASH').toUpperCase();
    const amount = parseFloat(data.amount || 0);
    
    if (method === "CASH") summary.cash += amount;
    else if (method === "TRANSFER") summary.transfer += amount;
    else if (method === "QRIS") summary.qris += amount;
    else if (method === "EDC") summary.edc += amount;
    
    summary.totalRevenue += amount;
  });
  
  return summary;
}
