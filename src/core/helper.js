export class Helper {
  static formatRupiah(n){ return "Rp "+Number(n||0).toLocaleString("id-ID"); }
  static formatDate(d){ return new Date(d).toLocaleDateString("id-ID"); }
  static generateId(){ return Date.now().toString(36)+Math.random().toString(36).slice(2); }
}
export default Helper;
