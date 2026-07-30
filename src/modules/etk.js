// ============================================================================
// AKA BMW ISGM - ELECTRONIC PARTS CATALOG (ETK) INTEGRATION MODULE
// FILE: src/modules/etk.js
// POSITIONING: Standalone Logistics Hardware Component
// ============================================================================

const ETK_ENDPOINTS = {
  realoem: "https://www.realoem.com/bmw/en/select?vin=",
  bimmercat: "https://bimmercat.com/bmw/vin/decoder/"
};

/**
 * Validasi dan dekode VIN/Sasis unit BMW & MINI
 * @param {string} vin - Nomor sasis 7-digit (Short) atau 17-digit (Full ISO)
 * @param {string} gateway - Rujukan database ('realoem' | 'bimmercat')
 * @returns {Object} Hasil resolusi URL eksternal atau shortcut clipboard
 */
export function resolveBmwEtkLink(vin, gateway = "realoem") {
  if (!vin) return { success: false, message: "Nomor sasis (VIN) kosong." };
  
  const cleanedVin = vin.replace(/[^A-Z0-9]/g, '').toUpperCase();
  
  // Validasi Kepatuhan Standarisasi Sasis BMW Premium
  if (cleanedVin.length !== 7 && cleanedVin.length !== 17) {
    return { success: false, message: "VIN harus tepat berisi 7 digit (Short) atau 17 digit (Full)." };
  }
  if (/[IOQ]/.test(cleanedVin)) {
    return { success: false, message: "Illegal ISO VIN: Huruf I, O, dan Q tidak boleh ada di sasis mobil." };
  }
  
  const baseUrl = ETK_ENDPOINTS[gateway] || ETK_ENDPOINTS.realoem;
  
  return {
    success: true,
    vin: cleanedVin,
    targetUrl: baseUrl + (cleanedVin.length === 17 ? cleanedVin.slice(-7) : cleanedVin),
    iframeCapable: gateway !== "bimmerrefs"
  };
}
