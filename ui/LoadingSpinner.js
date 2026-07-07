l// ============================================================
// AKA BMW ISGM — LOADING SPINNER COMPONENT
// Sprint 4: Reusable Loading Indicators
// ============================================================

class LoadingSpinner {
  constructor(options = {}) {
    this.options = {
      size: options.size || 'medium',
      color: options.color || '#1a8cff',
      message: options.message || 'Loading...',
      fullscreen: options.fullscreen || false,
      container: options.container || null
    };

    this.element = null;
    this.visible = false;
    this.parentElement = null;

    this.sizes = {
      small: { width: '1.5rem', height: '1.5rem', fontSize: '12px' },
      medium: { width: '2.5rem', height: '2.5rem', fontSize: '14px' },
      large: { width: '4rem', height: '4rem', fontSize: '16px' }
    };
  }

  // ============================================================
  // 1. CREATE ELEMENT
  // ============================================================
  create() {
    const size = this.sizes[this.options.size] || this.sizes.medium;

    const wrapper = document.createElement('div');
    wrapper.className = 'loading-spinner-wrapper';
    wrapper.style.cssText = `
      display: ${this.visible ? 'flex' : 'none'};
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      ${this.options.fullscreen ? 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background:rgba(11,15,26,0.85);' : 'padding:20px;'}
      ${this.options.fullscreen ? '' : 'min-height:100px;'}
    `;

    const spinner = document.createElement('div');
    spinner.className = 'spinner-border';
    spinner.style.cssText = `
      width: ${size.width};
      height: ${size.height};
      color: ${this.options.color};
    `;
    spinner.setAttribute('role', 'status');

    const srOnly = document.createElement('span');
    srOnly.className = 'visually-hidden';
    srOnly.textContent = 'Loading...';
    spinner.appendChild(srOnly);

    const message = document.createElement('span');
    message.textContent = this.options.message;
    message.style.cssText = `
      color: #6a7e9e;
      font-size: ${size.fontSize};
      font-weight: 500;
    `;

    wrapper.appendChild(spinner);
    wrapper.appendChild(message);

    this.element = wrapper;

    // Add to container if specified
    if (this.options.container) {
      const container = typeof this.options.container === 'string'
        ? document.getElementById(this.options.container)
        : this.options.container;

      if (container) {
        container.appendChild(wrapper);
        this.parentElement = container;
      }
    }

    return wrapper;
  }

  // ============================================================
  // 2. SHOW
  // ============================================================
  show() {
    this.visible = true;
    if (!this.element) {
      this.create();
    } else {
      this.element.style.display = 'flex';
    }
    return this;
  }

  // ============================================================
  // 3. HIDE
  // ============================================================
  hide() {
    this.visible = false;
    if (this.element) {
      this.element.style.display = 'none';
    }
    return this;
  }

  // ============================================================
  // 4. TOGGLE
  // ============================================================
  toggle() {
    return this.visible ? this.hide() : this.show();
  }

  // ============================================================
  // 5. SET MESSAGE
  // ============================================================
  setMessage(message) {
    this.options.message = message;
    if (this.element) {
      const msgEl = this.element.querySelector('span:last-child');
      if (msgEl) msgEl.textContent = message;
    }
    return this;
  }

  // ============================================================
  // 6. SET SIZE
  // ============================================================
  setSize(size) {
    this.options.size = size;
    const sizes = this.sizes[size] || this.sizes.medium;
    if (this.element) {
      const spinner = this.element.querySelector('.spinner-border');
      if (spinner) {
        spinner.style.width = sizes.width;
        spinner.style.height = sizes.height;
      }
      const msg = this.element.querySelector('span:last-child');
      if (msg) {
        msg.style.fontSize = sizes.fontSize;
      }
    }
    return this;
  }

  // ============================================================
  // 7. SET COLOR
  // ============================================================
  setColor(color) {
    this.options.color = color;
    if (this.element) {
      const spinner = this.element.querySelector('.spinner-border');
      if (spinner) {
        spinner.style.color = color;
      }
    }
    return this;
  }

  // ===========================================================
  // 8. DESTROY
  // ===========================================================
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
    this.visible = false;
  }

  // ============================================================
  // 9. WRAP ASYNC FUNCTION
  // ============================================================
  wrap(fn, showMessage = 'Processing...') {
    return async (...args) => {
      this.setMessage(showMessage).show();
      try {
        const result = await fn.apply(this, args);
        this.hide();
        return result;
      } catch (err) {
        this.hide();
        throw err;
      }
    };
  }
}

// ============================================================
// 10. FACTORY FUNCTIONS
// ============================================================
export function createSpinner(options = {}) {
  return new LoadingSpinner(options);
}

export function showGlobalSpinner(message = 'Loading...') {
  const spinner = new LoadingSpinner({
    message: message,
    fullscreen: true,
    size: 'large'
  });
  spinner.show();
  return spinner;
}

export function hideGlobalSpinner() {
  const wrappers = document.querySelectorAll('.loading-spinner-wrapper');
  wrappers.forEach(el => el.style.display = 'none');
}

// ============================================================
// EXPORT DEFAULT
// ============================================================
export default LoadingSpinner;