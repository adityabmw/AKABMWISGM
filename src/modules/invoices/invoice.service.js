import { db } from '../../utils/firebase.js';
import { collection, onSnapshot } from 'firebase/firestore';

export class InvoiceService {
  constructor(state, bus) {
    this.state = state;
    this.bus = bus;
    this.col = 'invoices';
  }

  load() {
    onSnapshot(collection(db, this.col), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      this.state.set('invoices', data);
      this.bus.emit('invoices:updated', data);
      this.render(data);
    });
  }

  render(data) {
    const container = document.getElementById('view-invoices');
    if (!container) return;
    let html = `<div class="table-wrap"><h4>🧾 Invoices</h4><table><thead><tr><th>#Invoice</th><th>Total</th><th>Status</th></tr></thead><tbody>`;
    data.forEach(inv => {
      const badge = inv.status === 'PAID' ? 'badge-success' : 'badge-danger';
      html += `<tr><td>${inv.invNumber || '-'}</td><td>Rp ${(inv.grandTotal || 0).toLocaleString()}</td><td><span class="badge ${badge}">${inv.status || 'UNPAID'}</span></td></tr>`;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;
  }
}
