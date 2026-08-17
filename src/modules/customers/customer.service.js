import { db } from '../../utils/firebase.js';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

export class CustomerService {
  constructor(state, bus) {
    this.state = state;
    this.bus = bus;
    this.col = 'customers';
  }

  load() {
    onSnapshot(collection(db, this.col), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      this.state.set('customers', data);
      this.bus.emit('customers:updated', data);
      this.render(data);
    });
  }

  render(data) {
    const container = document.getElementById('view-customers');
    if (!container) return;
    let html = `<div class="table-wrap"><h4>👥 Customers</h4><table><thead><tr><th>Nama</th><th>HP</th><th>Poin</th></tr></thead><tbody>`;
    data.forEach(c => {
      html += `<tr><td>${c.name || '-'}</td><td>${c.phone || '-'}</td><td>${c.loyaltyPoints || 0}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;
  }
}
