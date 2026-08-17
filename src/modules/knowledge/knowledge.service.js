import { db } from '../../firebase.js';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export class KnowledgeService {
  async addArticle(data) {
    const docRef = await addDoc(collection(db, 'knowledge_base'), {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'DRAFT'
    });
    return docRef.id;
  }

  async searchArticles(keyword) {
    // Simple search — nanti bisa upgrade ke full-text
    const snap = await getDocs(collection(db, 'knowledge_base'));
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(a => 
        a.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        a.content?.toLowerCase().includes(keyword.toLowerCase())
      );
  }
}
