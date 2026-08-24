/**
 * ETK Service - Online like bimmerrefs - 0MB
 */
const API_BASE = import.meta.env.DEV? "http://127.0.0.1:5001/akabmwisgm/us-central1" : "";
export class ETKService {
  static async searchVIN(vin7) {
    const clean = vin7.slice(-7).toUpperCase();
    const res = await fetch(`${API_BASE}/etkVIN?vin=${clean}`);
    if (!res.ok) throw new Error("ETK fetch failed");
    const json = await res.json();
    localStorage.setItem(`etk_${clean}`, JSON.stringify(json));
    return json;
  }
  static async searchPart(q) {
    const res = await fetch(`${API_BASE}/etkPart?q=${q}`);
    return res.json();
  }
}
export const ETK = ETKService;
