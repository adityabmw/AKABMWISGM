// ============================================================
// AKA BMW ISGM — DATABASE SERVICE LAYER
// Sprint 2-3: Data Integrity & Performance
// ============================================================

import { db, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, where, orderBy, limit, startAfter, getDoc, runTransaction, writeBatch } from '../core/firebase.js';
import { COLLECTIONS } from '../core/constants.js';
import { logAudit } from './audit.service.js';
import { auth } from '../core/firebase.js';

// ============================================================
// 1. GENERIC CRUD OPERATIONS
// ============================================================

export class DatabaseService {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
  }

  // CREATE
  async create(data) {
    try {
      const user = auth.currentUser;
      const docData = {
        ...data,
        createdAt: new Date().toISOString(),
        createdBy: user?.uid || 'system',
        status: 'ACTIVE',
        deleted: false,
        version: 1
      };
      
      const docRef = await addDoc(this.collectionRef, docData);
      
      await logAudit({
        action: 'CREATE',
        collection: this.collectionName,
        docId: docRef.id,
        changes: { after: docData }
      });
      
      return { success: true, id: docRef.id, data: docData };
    } catch (err) {
      console.error(`Error creating ${this.collectionName}:`, err);
      throw err;
    }
  }

  // READ (Single)
  async get(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists) {
        return null;
      }
      
      return { id: docSnap.id, ...docSnap.data() };
    } catch (err) {
      console.error(`Error getting ${this.collectionName}:`, err);
      throw err;
    }
  }

  // READ (All with filters)
  async getAll(filters = [], sort = null, limitCount = null) {
    try {
      let q = this.collectionRef;
      
      // Apply filters
      for (const filter of filters) {
        q = query(q, where(filter.field, filter.operator, filter.value));
      }
      
      // Apply sorting
      if (sort) {
        q = query(q, orderBy(sort.field, sort.direction || 'asc'));
      }
      
      // Apply limit
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const snapshot = await getDocs(q);
      const results = [];
      snapshot.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      
      return results;
    } catch (err) {
      console.error(`Error getting all ${this.collectionName}:`, err);
      throw err;
    }
  }

  // READ (Paginated)
  async getPaginated(pageSize = 10, lastDoc = null, filters = [], sort = null) {
    try {
      let q = this.collectionRef;
      
      // Apply filters
      for (const filter of filters) {
        q = query(q, where(filter.field, filter.operator, filter.value));
      }
      
      // Apply sorting
      if (sort) {
        q = query(q, orderBy(sort.field, sort.direction || 'asc'));
      }
      
      // Apply pagination
      if (lastDoc) {
        q = query(q, startAfter(lastDoc), limit(pageSize));
      } else {
        q = query(q, limit(pageSize));
      }
      
      const snapshot = await getDocs(q);
      const results = [];
      let lastVisible = null;
      
      snapshot.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
        lastVisible = doc;
      });
      
      return {
        data: results,
        lastDoc: lastVisible,
        hasMore: results.length === pageSize
      };
    } catch (err) {
      console.error(`Error getting paginated ${this.collectionName}:`, err);
      throw err;
    }
  }

  // UPDATE
  async update(id, data) {
    try {
      const user = auth.currentUser;
      const docRef = doc(db, this.collectionName, id);
      
      // Get old data for audit
      const oldDoc = await getDoc(docRef);
      const oldData = oldDoc.exists ? oldDoc.data() : null;
      
      const updateData = {
        ...data,
        updatedAt: new Date().toISOString(),
        updatedBy: user?.uid || 'system',
        version: (oldData?.version || 0) + 1
      };
      
      await updateDoc(docRef, updateData);
      
      await logAudit({
        action: 'UPDATE',
        collection: this.collectionName,
        docId: id,
        changes: { before: oldData, after: updateData }
      });
      
      return { success: true, id, data: updateData };
    } catch (err) {
      console.error(`Error updating ${this.collectionName}:`, err);
      throw err;
    }
  }

  // SOFT DELETE
  async softDelete(id) {
    try {
      const user = auth.currentUser;
      const docRef = doc(db, this.collectionName, id);
      
      await updateDoc(docRef, {
        deleted: true,
        deletedAt: new Date().toISOString(),
        deletedBy: user?.uid || 'system'
      });
      
      await logAudit({
        action: 'DELETE',
        collection: this.collectionName,
        docId: id,
        changes: { after: { deleted: true } }
      });
      
      return { success: true, id };
    } catch (err) {
      console.error(`Error deleting ${this.collectionName}:`, err);
      throw err;
    }
  }

  // RESTORE
  async restore(id) {
    try {
      const docRef = doc(db, this.collectionName, id);
      
      await updateDoc(docRef, {
        deleted: false,
        deletedAt: null,
        deletedBy: null,
        restoredAt: new Date().toISOString()
      });
      
      await logAudit({
        action: 'UPDATE',
        collection: this.collectionName,
        docId: id,
        changes: { after: { deleted: false } }
      });
      
      return { success: true, id };
    } catch (err) {
      console.error(`Error restoring ${this.collectionName}:`, err);
      throw err;
    }
  }

  // BATCH WRITE
  async batchWrite(operations) {
    try {
      const batch = writeBatch(db);
      
      for (const op of operations) {
        const ref = doc(db, this.collectionName, op.id);
        
        if (op.type === 'set') {
          batch.set(ref, { ...op.data, updatedAt: new Date().toISOString() });
        } else if (op.type === 'update') {
          batch.update(ref, { ...op.data, updatedAt: new Date().toISOString() });
        } else if (op.type === 'delete') {
          batch.update(ref, { deleted: true, deletedAt: new Date().toISOString() });
        }
      }
      
      await batch.commit();
      return { success: true, count: operations.length };
    } catch (err) {
      console.error(`Error batch writing ${this.collectionName}:`, err);
      throw err;
    }
  }

  // TRANSACTION
  async transaction(id, updateFn) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const result = await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        if (!docSnap.exists) {
          throw new Error('Document not found');
        }
        
        const newData = updateFn(docSnap.data());
        transaction.update(docRef, {
          ...newData,
          updatedAt: new Date().toISOString(),
          version: (docSnap.data().version || 0) + 1
        });
        
        return newData;
      });
      
      return { success: true, data: result };
    } catch (err) {
      console.error(`Error in transaction ${this.collectionName}:`, err);
      throw err;
    }
  }
}

// ============================================================
// 2. SPECIFIC SERVICES
// ============================================================

export class CustomerService extends DatabaseService {
  constructor() {
    super(COLLECTIONS.CUSTOMERS);
  }
  
  async findByPhone(phone) {
    const results = await this.getAll([
      { field: 'phone', operator: '==', value: phone },
      { field: 'deleted', operator: '==', value: false }
    ]);
    return results.length > 0 ? results[0] : null;
  }
  
  async getLoyaltyPoints(phone) {
    const customer = await this.findByPhone(phone);
    return customer?.loyaltyPoints || 0;
  }
  
  async addLoyaltyPoints(phone, amount) {
    const customer = await this.findByPhone(phone);
    if (!customer) return null;
    
    const points = Math.floor(amount / 1000000) * 10;
    const newPoints = (customer.loyaltyPoints || 0) + points;
    const newTotal = (customer.totalTransaksi || 0) + amount;
    
    await this.update(customer.id, {
      loyaltyPoints: newPoints,
      totalTransaksi: newTotal
    });
    
    return { points, newPoints, newTotal };
  }
}

export class VehicleService extends DatabaseService {
  constructor() {
    super(COLLECTIONS.VEHICLES);
  }
  
  async findByPlate(plate) {
    const results = await this.getAll([
      { field: 'plate', operator: '==', value: plate.toUpperCase() },
      { field: 'deleted', operator: '==', value: false }
    ]);
    return results.length > 0 ? results[0] : null;
  }
  
  async findByOwner(ownerId) {
    return await this.getAll([
      { field: 'ownerId', operator: '==', value: ownerId },
      { field: 'deleted', operator: '==', value: false }
    ]);
  }
}

export class WorkOrderService extends DatabaseService {
  constructor() {
    super(COLLECTIONS.WORKORDERS);
  }
  
  async getActive() {
    return await this.getAll([
      { field: 'status', operator: 'in', value: ['PROSES', 'WAITING_PARTS'] },
      { field: 'deleted', operator: '==', value: false }
    ]);
  }
  
  async getByCustomer(customerPhone) {
    return await this.getAll([
      { field: 'customerPhone', operator: '==', value: customerPhone },
      { field: 'deleted', operator: '==', value: false }
    ]);
  }
  
  async updateProgress(id, progress) {
    return await this.update(id, { progress });
  }
  
  async updateStatus(id, status) {
    return await this.update(id, { status });
  }
}

export class InvoiceService extends DatabaseService {
  constructor() {
    super(COLLECTIONS.INVOICES);
  }
  
  async getUnpaid() {
    return await this.getAll([
      { field: 'status', operator: '==', value: 'UNPAID' },
      { field: 'deleted', operator: '==', value: false }
    ]);
  }
  
  async getByCustomer(customerName) {
    return await this.getAll([
      { field: 'customerName', operator: '==', value: customerName },
      { field: 'deleted', operator: '==', value: false }
    ]);
  }
}

export class PartsService extends DatabaseService {
  constructor() {
    super(COLLECTIONS.PARTS);
  }
  
  async getLowStock(threshold = 10) {
    return await this.getAll([
      { field: 'stock', operator: '<=', value: threshold },
      { field: 'deleted', operator: '==', value: false }
    ]);
  }
  
  async updateStock(partNumber, quantity) {
    const results = await this.getAll([
      { field: 'partNumber', operator: '==', value: partNumber },
      { field: 'deleted', operator: '==', value: false }
    ]);
    
    if (results.length === 0) return null;
    
    const part = results[0];
    const newStock = (part.stock || 0) + quantity;
    
    await this.update(part.id, { stock: Math.max(0, newStock) });
    return { partId: part.id, oldStock: part.stock, newStock: Math.max(0, newStock) };
  }
}

// ============================================================
// 3. EXPORT INSTANCES
// ============================================================

export const customerService = new CustomerService();
export const vehicleService = new VehicleService();
export const workOrderService = new WorkOrderService();
export const invoiceService = new InvoiceService();
export const partsService = new PartsService();