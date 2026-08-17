import { db } from '../../firebase.js';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export class HistoryService {
  async getVehicleHistory(vehicleId) {
    const q = query(
      collection(db, 'work_orders'),
      where('vehicleId', '==', vehicleId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async getCustomerHistory(customerId) {
    const q = query(
      collection(db, 'work_orders'),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}
