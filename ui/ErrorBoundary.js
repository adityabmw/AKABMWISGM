// ============================================================
// AKA BMW ISGM — ERROR BOUNDARY COMPONENT
// Sprint 4: UI Error Boundary
// ============================================================

class ErrorBoundaryComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.errors = [];
    this.isVisible = false;
    this.onError = null;

    if (this.container) {
      this.render();
    }
  }

  // ============================================================
  // 1. RENDER
  // ============================================================
  render() {
    if (!this.container) return;

    if (this.errors.length === 0) {
      this.container.style.display = 'none';
      this.isVisible = false;
      return;
    }

    this.container.style.display = 'block';
    this.isVisible = true;

    const lastError = this.errors[this.errors.length - 1];
    this.container.innerHTML = `
      <div class="error-boundary" style="
        background: #2a1a1a;
        border: 1px solid #ff5a6a;
        border-radius: 12px;
        padding: 16px 20px;
        margin-bottom: 20px;
        color: #ff8a8a;
        position: relative;
      ">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <i class="fas fa-exclamation-triangle" style="color:#ff5a6a;font-size:20px;margin-top:2px;"></i>
          <div style="flex:1;">
            <strong style="display:block;margin-bottom:4px;">${this.escapeHtml(lastError.message || 'Terjadi kesalahan')}</strong>
            ${lastError.context ? `<small style="color:#ff6a6a;display:block;font-size:12px;">Context: ${this.escapeHtml(lastError.context)}</small>` : ''}
            ${lastError.stack ? `<details style="margin-top:8px;"><summary style="cursor:pointer;color:#6a7e9e;font-size:12px;">Detail Error</summary><pre style="background:#0b0f1a;padding:8px;border-radius:4px;margin-top:4px;font-size:11px;color:#a0b4d0;overflow:auto;max-height:150px;">${this.escapeHtml(lastError.stack)}</pre></details>` : ''}
          </div>
          <button onclick="this.closest('.error-boundary').style.display='none'" style="
            background:transparent;
            border:none;
            color:#4a5e7e;
            font-size:18px;
            cursor:pointer;
            padding:0 4px;
          ">×</button>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
          <button onclick="window.location.reload()" style="
            background:#1a8cff;
            border:none;
            border-radius:6px;
            padding:4px 14px;
            color:#fff;
            font-size:12px;
            cursor:pointer;
          "><i class="fas fa-sync"></i> Refresh</button>
          <button onclick="this.closest('.error-boundary').style.display='none'" style="
            background:#1c2740;
            border:none;
            border-radius:6px;
            padding:4px 14px;
            color:#a0b4d0;
            font-size:12px;
            cursor:pointer;
          ">Dismiss</button>
        </div>
      </div>
    `;
  }

  // ============================================================
  // 2. CAPTURE ERROR
  // ============================================================
  captureError(error, context = 'unknown') {
    const errorObj = {
      id: Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6),
      message: error.message || String(error),
      stack: error.stack || '',
      context: context,
      timestamp: new Date().toISOString()
    };

    this.errors.push(errorObj);
    if (this.errors.length > 10) {
      this.errors.shift();
    }

    this.render();

    if (this.onError) {
      this.onError(errorObj);
    }

    return errorObj;
  }

  // ============================================================
  // 3. CLEAR
  // ============================================================
  clear() {
    this.errors = [];
    this.render();
  }

  // ============================================================
  // 4. ESCAPE HTML
  // ============================================================
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ============================================================
  // 5. GET ERRORS
  // ============================================================
  getErrors() {
    return [...this.errors];
  }

  // ============================================================
  // 6. HAS ERRORS
  // ============================================================
  hasErrors() {
    return this.errors.length > 0;
  }

  // ============================================================
  // 7. WRAP FUNCTION
  // ============================================================
  wrap(fn, context = 'wrapped') {
    return async (...args) => {
      try {
        return await fn.apply(this, args);
      } catch (err) {
        this.captureError(err, context);
        throw err;
      }
    };
  }

  // ============================================================
  // 8. SET ON ERROR CALLBACK
  // ============================================================
  setOnError(fn) {
    this.onError = fn;
  }

  // ============================================================
  // 9. SHOW MANUAL ERROR
  // ============================================================
  show(message, context = 'manual') {
    const error = new Error(message);
    error.isManual = true;
    this.captureError(error, context);
  }
}

// ============================================================
// EXPORT
// ============================================================
export function createErrorBoundary(containerId) {
  return new ErrorBoundaryComponent(containerId);
}

export default ErrorBoundaryComponent;