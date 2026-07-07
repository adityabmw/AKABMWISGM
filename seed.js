// ============================================================
// AKA BMW ISGM — FIREBASE CLOUD FUNCTIONS
// Sprint 1.1 — RBAC & Custom Claims
// ============================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// ============================================================
// 1. SET CUSTOM CLAIMS ON USER CREATE
// ============================================================
exports.setCustomClaimsOnCreate = functions.auth.user().onCreate(async (user) => {
  try {
    // Ambil role dari Firestore users collection
    const userDoc = await admin.firestore().collection('users').doc(user.uid).get();
    const role = userDoc.exists ? userDoc.data().role : 'TECHNICIAN';
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(user.uid, { role });
    
    console.log(`✅ Custom claims set for ${user.email}: ${role}`);
    return { success: true, uid: user.uid, role };
  } catch (err) {
    console.error('❌ Error setting custom claims:', err);
    throw err;
  }
});

// ============================================================
// 2. SYNC ROLE FROM FIRESTORE TO CLAIMS
// ============================================================
exports.syncUserRole = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    try {
      const { userId } = context.params;
      const newData = change.after.data();
      const role = newData.role || 'TECHNICIAN';
      
      await admin.auth().setCustomUserClaims(userId, { role });
      console.log(`✅ Role synced for ${userId}: ${role}`);
      
      return { success: true, userId, role };
    } catch (err) {
      console.error('❌ Error syncing role:', err);
      throw err;
    }
  });

// ============================================================
// 3. VALIDATE ROLE BEFORE CRITICAL OPERATIONS
// ============================================================
exports.validateRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User not authenticated');
  }
  
  try {
    const { uid } = context.auth;
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }
    
    const role = userDoc.data().role;
    const requiredRole = data.requiredRole;
    
    // Hierarchy: OWNER > ADMIN > SERVICE_ADVISOR > TECHNICIAN > PARTS > CASHIER
    const hierarchy = {
      'OWNER': 6,
      'ADMIN': 5,
      'SERVICE_ADVISOR': 4,
      'TECHNICIAN': 3,
      'PARTS': 2,
      'CASHIER': 1
    };
    
    const hasAccess = (hierarchy[role] || 0) >= (hierarchy[requiredRole] || 0);
    
    return {
      uid,
      role,
      requiredRole,
      hasAccess,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error('❌ Error validating role:', err);
    throw new functions.https.HttpsError('internal', 'Error validating role');
  }
});

// ============================================================
// 4. GET USER ROLE
// ============================================================
exports.getUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User not authenticated');
  }
  
  try {
    const { uid } = context.auth;
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    
    return {
      uid,
      role: userDoc.exists ? userDoc.data().role : 'TECHNICIAN',
      email: userDoc.exists ? userDoc.data().email : null,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error('❌ Error getting user role:', err);
    throw new functions.https.HttpsError('internal', 'Error getting user role');
  }
});

// ============================================================
// 5. CREATE ADMIN USER (ONLY FOR SETUP)
// ============================================================
exports.createAdminUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User not authenticated');
  }
  
  try {
    const { uid } = context.auth;
    const callerDoc = await admin.firestore().collection('users').doc(uid).get();
    const callerRole = callerDoc.exists ? callerDoc.data().role : null;
    
    // Hanya OWNER yang bisa create admin
    if (callerRole !== 'OWNER') {
      throw new functions.https.HttpsError('permission-denied', 'Only OWNER can create admin users');
    }
    
    const { email, password, role } = data;
    
    if (!email || !password || !role) {
      throw new functions.https.HttpsError('invalid-argument', 'Email, password, and role required');
    }
    
    // Create user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      emailVerified: true
    });
    
    // Save to Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
      role,
      uid: userRecord.uid,
      createdAt: new Date().toISOString(),
      createdBy: uid
    });
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });
    
    return {
      success: true,
      uid: userRecord.uid,
      email,
      role
    };
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
    throw new functions.https.HttpsError('internal', err.message);
  }
});

// ============================================================
// 6. GET ALL USERS WITH ROLES (ADMIN ONLY)
// ============================================================
exports.getAllUsers = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User not authenticated');
  }
  
  try {
    const { uid } = context.auth;
    const callerDoc = await admin.firestore().collection('users').doc(uid).get();
    const callerRole = callerDoc.exists ? callerDoc.data().role : null;
    
    if (callerRole !== 'OWNER' && callerRole !== 'ADMIN') {
      throw new functions.https.HttpsError('permission-denied', 'Only ADMIN or OWNER can view all users');
    }
    
    const usersSnapshot = await admin.firestore().collection('users').get();
    const users = [];
    
    usersSnapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      users,
      count: users.length,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error('❌ Error getting users:', err);
    throw new functions.https.HttpsError('internal', err.message);
  }
});

// ============================================================
// 7. DELETE USER (ADMIN ONLY)
// ============================================================
exports.deleteUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User not authenticated');
  }
  
  try {
    const { uid } = context.auth;
    const callerDoc = await admin.firestore().collection('users').doc(uid).get();
    const callerRole = callerDoc.exists ? callerDoc.data().role : null;
    
    if (callerRole !== 'OWNER') {
      throw new functions.https.HttpsError('permission-denied', 'Only OWNER can delete users');
    }
    
    const { targetUid } = data;
    
    if (!targetUid) {
      throw new functions.https.HttpsError('invalid-argument', 'Target UID required');
    }
    
    // Delete from Auth
    await admin.auth().deleteUser(targetUid);
    
    // Delete from Firestore
    await admin.firestore().collection('users').doc(targetUid).delete();
    
    return {
      success: true,
      deletedUid: targetUid,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error('❌ Error deleting user:', err);
    throw new functions.https.HttpsError('internal', err.message);
  }
});