// ============================================================
// AKA BMW ISGM — ANALYTICS SERVICE
// Sprint 4: Firebase Analytics & Monitoring
// ============================================================

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.isProduction = import.meta.env?.VITE_ENVIRONMENT === 'production';
    this.userId = null;
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.maxEvents = 100;
    this.flushInterval = 5000;
    this.flushTimer = null;
  }

  // ============================================================
  // 1. INITIALIZE
  // ============================================================
  init() {
    if (this.isInitialized) return;

    // Check if Firebase Analytics is available
    if (window.firebase && window.firebase.analytics) {
      try {
        this.analytics = window.firebase.analytics();
        this.isInitialized = true;
        console.log('✅ Firebase Analytics initialized');
      } catch (err) {
        console.warn('Firebase Analytics not available:', err);
      }
    }

    // Set up auto-flush
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.flushInterval);

    // Track page views
    this.trackPageView();

    // Track errors
    this.setupErrorTracking();
  }

  // ============================================================
  // 2. GENERATE SESSION ID
  // ============================================================
  generateSessionId() {
    return Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
  }

  // ============================================================
  // 3. SET USER ID
  // ============================================================
  setUserId(userId) {
    this.userId = userId;
    if (this.isInitialized && this.analytics) {
      this.analytics.setUserId(userId);
    }
  }

  // ============================================================
  // 4. SET USER PROPERTIES
  // ============================================================
  setUserProperties(props) {
    if (this.isInitialized && this.analytics) {
      Object.keys(props).forEach(key => {
        this.analytics.setUserProperties({ [key]: props[key] });
      });
    }
  }

  // ============================================================
  // 5. TRACK EVENT
  // ============================================================
  trackEvent(name, params = {}) {
    const event = {
      name: name,
      params: {
        ...params,
        session_id: this.sessionId,
        timestamp: new Date().toISOString()
      }
    };

    // Store locally
    this.events.push(event);
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    // Send to Firebase Analytics
    if (this.isProduction && this.isInitialized && this.analytics) {
      try {
        this.analytics.logEvent(name, event.params);
      } catch (err) {
        console.warn('Analytics event error:', err);
      }
    }

    // Console log in development
    if (!this.isProduction) {
      console.log('📊 Analytics:', name, event.params);
    }
  }

  // ============================================================
  // 6. TRACK PAGE VIEW
  // ============================================================
  trackPageView(title = null) {
    const params = {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    };

    if (this.isProduction && this.isInitialized && this.analytics) {
      this.analytics.logEvent('page_view', params);
    }

    if (!this.isProduction) {
      console.log('📊 Page View:', params);
    }
  }

  // ============================================================
  // 7. TRACK ERROR
  // ============================================================
  trackError(error, fatal = false) {
    this.trackEvent('exception', {
      description: error.message || String(error),
      fatal: fatal,
      stack: error.stack
    });
  }

  // ============================================================
  // 8. SETUP ERROR TRACKING
  // ============================================================
  setupErrorTracking() {
    window.addEventListener('error', (event) => {
      this.trackError(event.error || event.message, true);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(event.reason, true);
    });
  }

  // ============================================================
  // 9. TRACK USER ACTION
  // ============================================================
  trackAction(action, category = 'user_action', label = null, value = null) {
    this.trackEvent('user_action', {
      action,
      category,
      label,
      value
    });
  }

  // ============================================================
  // 10. TRACK BUSSINESS EVENT
  // ============================================================
  trackBusinessEvent(type, data = {}) {
    this.trackEvent('business_event', {
      type,
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  // ============================================================
  // 11. TRACK WORKORDER EVENT
  // ============================================================
  trackWorkorderEvent(action, workorder) {
    this.trackBusinessEvent('workorder', {
      action,
      wo_number: workorder.woNumber,
      customer: workorder.customerName,
      total: workorder.grandTotal,
      status: workorder.status
    });
  }

  // ============================================================
  // 12. TRACK INVOICE EVENT
  // ============================================================
  trackInvoiceEvent(action, invoice) {
    this.trackBusinessEvent('invoice', {
      action,
      invoice_number: invoice.invNumber,
      customer: invoice.customerName,
      total: invoice.grandTotal,
      status: invoice.status
    });
  }

  // ===========================================================
  // 13. FLUSH EVENTS
  // ============================================================
  flush() {
    if (this.events.length === 0) return;

    // In production, send to Firebase
    if (this.isProduction && this.isInitialized && this.analytics) {
      // Events are already sent individually via trackEvent
      // Just clear the local queue
      this.events = [];
    } else {
      // In development, just log the queue
      if (this.events.length > 0) {
        console.log('📊 Events Queue:', this.events.length, 'events');
        this.events = [];
      }
    }
  }

  // ============================================================
  // 14. GET EVENTS
  // ============================================================
  getEvents() {
    return [...this.events];
  }

  // ============================================================
  // 15. CLEAR EVENTS
  // ============================================================
  clearEvents() {
    this.events = [];
  }

  // ============================================================
  // 16. DESTROY
  // ============================================================
  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    this.flush();
    this.isInitialized = false;
  }
}

// ============================================================
// EXPORT SINGLETON
// ============================================================
export const analyticsService = new AnalyticsService();
export default analyticsService;