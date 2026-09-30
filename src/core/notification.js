export class Notification {
  static show(m,t='info'){ console.log(`[${t}] ${m}`); }
  static success(m){ this.show(m,'success'); }
  static error(m){ this.show(m,'error'); }
}
export default Notification;
