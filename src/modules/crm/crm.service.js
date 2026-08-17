import { db } from '../../firebase.js';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';

export class CRMService {
  async addFollowUp(data) {
    const docRef = await addDoc(collection(db, 'crm_followups'), {
      ...data,
      createdAt: Timestamp.now(),
      status: 'PENDING'
    });
    return docRef.id;
  }

  async getPendingFollowUps() {
    const q = query(
      collection(db, 'crm_followups'),
      where('status', '==', 'PENDING')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}
