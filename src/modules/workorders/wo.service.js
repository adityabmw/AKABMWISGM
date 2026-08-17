import { db } from '../../utils/firebase.js';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export class WOService {
  constructor(state, bus) {
    this.state = state;
    this.bus = bus;
    this.col = 'workorders';
  }

  load() {
    onSnapshot(query(collection(db, this.col), orderBy('createdAt', 'desc')), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      this.state.set('workorders', data);
      this.bus.emit('workorders:updated', data);
      this.render(data);
      this.renderDashboard(data);
    });
  }

  render(data) {
    const container = document.getElementById('view-workorders');
    if (!container) return;
    let html = `<div class="table-wrap"><h4>🔧 Work Orders</h4><table><thead><tr><th>WO</th><th>Customer</th><th>Status</th></tr></thead><tbody>`;
    data.forEach(w => {
      const badge = w.status === 'SELESAI' ? 'badge-success' : 'badge-warning';
      html += `<tr><td>${w.woNumber || '-'}</td><td>${w.customerName || '-'}</td><td><span class="badge ${badge}">${w.status || 'PROSES'}</span></td></tr>`;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;
  }

  renderDashboard(data) {
    const tbody = document.querySelector('#view-dashboard .wo-preview');
    if (!tbody) return;
    tbody.innerHTML = data.slice(0, 5).map(w => `
      <tr><td>${w.woNumber || '-'}</td><td>${w.customerName || '-'}</td>
      <td><span class="badge ${w.status === 'SELESAI' ? 'badge-success' : 'badge-warning'}">${w.status || 'PROSES'}</span></td></tr>
    `).join('');
  }
}
