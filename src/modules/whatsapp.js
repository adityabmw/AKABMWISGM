// ============================================================================
// AKA BMW ISGM - CRM WHATSAPP NOTIFICATION ENGINE
// FILE: src/modules/whatsapp.js
// POSITIONING: Isolated Outbound Communication Tool
// ============================================================================

const TEMPLATE_SCRIPTS = {
  CHECK_IN: "Halo Pak/Bu [CUSTOMER_NAME] ,\n\nUnit BMW/MINI Anda dengan No. Polisi [PLATE] telah resmi masuk di bengkel AKA BMW SERVICE untuk proses antrean pemeriksaan awal.\n\nNomor Registrasi: [DOC_NO]\nTerima kasih atas kepercayaan Anda.",
  WO_READY: "Yth. Pak/Bu [CUSTOMER_NAME] ,\n\nProses perbaikan unit Anda dengan No. Polisi [PLATE] telah SELESAI dikerjakan dengan hasil Quality Control aman.\n\nTotal tagihan: [TOTAL_BILL]. Silakan melakukan pengambilan unit di kasir AKA BMW SERVICE.",
  REMINDER: "Halo Pak/Bu [CUSTOMER_NAME] ,\n\nIni adalah pengingat otomatis dari AKA BMW SERVICE. Unit Anda ([PLATE]) sudah memasuki periode jadwal perawatan berkala (ganti oli/tune up).\n\nSilakan lakukan booking jadwal via advisor kami."
};

/**
 * Membentuk string URL Whatsapp API siap tembak
 * @param {string} phone - Nomor tujuan
 * @param {string} type - Jenis template script
 * @param {Object} params - Objek data pengganti variabel
 * @returns {string} URL Wa link siap buka
 */
export function buildWhatsAppLink(phone, type, params = {}) {
  if (!phone) return "";
  
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.substring(1);
  
  let msg = TEMPLATE_SCRIPTS[type] || params.customMessage || "";
  
  // Replace Tokens Object Key Mapping
  msg = msg.replace("[CUSTOMER_NAME]", params.customerName || "Pelanggan")
           .replace("[PLATE]", params.plate || "-")
           .replace("[DOC_NO]", params.docNo || "-")
           .replace("[TOTAL_BILL]", params.totalBill || "Rp 0");
           
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}
