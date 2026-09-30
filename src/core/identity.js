export class Identity {
  static getRole(){ return localStorage.getItem('role')||'owner'; }
  static getUser(){ return JSON.parse(localStorage.getItem('user')||'null'); }
}
export default Identity;
