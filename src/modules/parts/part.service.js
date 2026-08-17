import { db } from '../../utils/firebase.js';
import { collection, onSnapshot } from 'firebase/firestore';

export class PartService {
  constructor(state, bus) {
    this.state = state;
    this.bus = bus;
    this.col = 'parts';
  }

  load() {
    onSnapshot(collection(db, this.col), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      this.state.set('parts', data);
      this.bus.emit('parts:updated', data);
      this.render(data);
    });
  }

  render(data) {
    const container = document.getElementById('view-parts');
    if (!container) return;
    let html = `<div class="table-wrap"><h4>🧩 Parts</h4><table><thead><tr><th>Part #</th><th>Nama</th><th>Stok</th></tr></thead><tbody>`;
    data.forEach(p => {
      html += `<tr><td>${p.partNumber || '-'}</td><td>${p.partName || '-'}</td><td>${p.stock || 0}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;
  }
}
