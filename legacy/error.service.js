// ============================================================
// AKA BMW ISGM — ERROR SERVICE
// Sprint 4: Error Handling & Logging
// ============================================================

class ErrorService {
  constructor() {
    this.errors = [];
    this.maxErrors = 50;
    this.listeners = [];
    this.isProduction = import.meta.env?.VITE_ENVIRONMENT === 'production';
  }

  // ============================================================
  // 1. CAPTURE ERROR
  // ============================================================
  capture(error, context = 'unknown', metadata = {}) {
    const errorObj = {
      id: this.generateId(),
      message: error.message || String(error),
      stack: error.stack || '',
      context: context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      metadata: metadata,
      isFatal: error.isFatal || false
    };

    this.errors.push(errorObj);
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Log ke console
    console.error(`[ErrorService] ${context}:`, error);
    if (error.stack) {
      console.error(error.stack);
    }

    // Notify listeners
    this.notifyListeners(errorObj);

    // Send to analytics
    this.sendToAnalytics(errorObj);

    return errorObj;
  }

  // ============================================================
  // 2. GENERATE ID
  // ============================================================
  generateId() {
    return Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
  }

  // ============================================================
  // 3. NOTIFY LISTENERS
  // ============================================================
  notifyListeners(error) {
    this.listeners.forEach(listener => {
      try {
        listener(error);
      } catch (err) {
        console.error('Error in listener:', err);
      }
    });
  }

  // ============================================================
  // 4. ADD LISTENER
  // ============================================================
  addListener(fn) {
    if (typeof fn === 'function') {
      this.listeners.push(fn);
    }
  }

  // ============================================================
  // 5. REMOVE LISTENER
  // ============================================================
  removeListener(fn) {
    this.listeners = this.listeners.filter(l => l !== fn);
  }

  // ============================================================
  // 6. SEND TO ANALYTICS
  // ============================================================
  sendToAnalytics(error) {
    if (this.isProduction && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: error.isFatal || false
      });
    }

    // Send to Firebase Crashlytics if available
    if (window.firebase && window.firebase.crashlytics) {
      window.firebase.crashlytics().log(error.message);
      if (error.isFatal) {
        window.firebase.crashlytics().recordError(error);
      }
    }
  }

  // ============================================================
  // 7. GET ERRORS
  // ============================================================
  getErrors() {
    return [...this.errors];
  }

  // ============================================================
  // 8. CLEAR ERRORS
  // ============================================================
  clear() {
    this.errors = [];
  }

  // ============================================================
  // 9. WRAP ASYNC FUNCTION
  // ============================================================
  wrap(fn, context = 'wrapped') {
    return async (...args) => {
      try {
        return await fn.apply(this, args);
      } catch (err) {
        this.capture(err, context);
        throw err;
      }
    };
  }

  // ============================================================
  // 10. WRAP SYNC FUNCTION
  // ============================================================
  wrapSync(fn, context = 'wrapped') {
    return (...args) => {
      try {
        return fn.apply(this, args);
      } catch (err) {
        this.capture(err, context);
        throw err;
      }
    };
  }

  // ============================================================
  // 11. SHOW ERROR TOAST
  // ============================================================
  showError(error, fallbackMessage = 'Terjadi kesalahan') {
    const message = error.message || fallbackMessage;
    if (window.showToast) {
      window.showToast(message, 'error');
    } else {
      alert(message);
    }
  }

  // ============================================================
  // 12. CREATE ERROR BOUNDARY
  // ============================================================
  createBoundary(componentName) {
    return {
      componentDidCatch: (error, info) => {
        this.capture(error, componentName, { componentStack: info.componentStack });
      },
      wrap: (fn) => this.wrap(fn, componentName)
    };
  }
}

// ============================================================
// EXPORT SINGLETON
// ============================================================
export const errorService = new ErrorService();
export default errorService;