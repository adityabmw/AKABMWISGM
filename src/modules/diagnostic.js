// ============================================================================
// AKA BMW ISGM - DEEP DIAGNOSTIC FAULT CODE LOOKUP MODULE
// FILE: src/modules/diagnostic.js
// POSITIONING: Isolated Technical Intelligence Component
// BRAND COMPLIANCE: BMW & MINI (DME, DDE, EGS, DSC, CAS, FEM, BDC, KOMBI)
// ============================================================================

const BMW_FAULT_DICTIONARY = {
  "101F01": "DME: Air-mass system, plausibility: calculated air mass in intake pipe implausible",
  "120308": "DME: Charging pressure control, plausibility: Pressure too low",
  "1A1008": "DME: Injection valve cylinder 1, activation: Short circuit to ground",
  "2F44": "CAS: EWS electronic vehicle immobilization system, manipulating protection",
  "480A": "DSC: Brake pad wear sensor, front axle, replace sensor",
  "4FF6": "EGS: Gearbox control ratio monitoring, clutch E implausible",
  "CDA7": "KOMBI: Message (status, reverse gear, 0x3B0) faulty, receiver KOMBI",
  "P0300": "DME: Random/Multiple Cylinder Misfire Detected"
};

/**
 * Melakukan lookup kode kerusakan (DTC) BMW secara instan
 * @param {string} code - Kode eror hexadesimal atau OBD2 standar
 * @returns {Object} Hasil diagnosa terstruktur
 */
export function lookupBMWFaultCode(code) {
  if (!code) return { success: false, message: "Parameter kode eror kosong." };
  
  const cleanCode = code.trim().toUpperCase();
  const description = BMW_FAULT_DICTIONARY[cleanCode];
  
  if (description) {
    return {
      success: true,
      code: cleanCode,
      description: description,
      severity: cleanCode.startsWith("12") || cleanCode.startsWith("1A") ? "CRITICAL (Engine Drop/Limp Mode)" : "WARNING (Check Component)",
      actionPlan: "Jalankan ABL (Airbag/Engine Test Plan) via ISTA-D/INPA untuk verifikasi sirkuit kelistrikan fisik."
    };
  }
  
  return {
    success: false,
    code: cleanCode,
    description: "Kode tidak ditemukan di database lokal. Disarankan sinkronisasi online dengan server TIS pusat.",
    severity: "UNKNOWN",
    actionPlan: "Lakukan pembacaan ulang modul via scanner Diagzone / Autel."
  };
}
