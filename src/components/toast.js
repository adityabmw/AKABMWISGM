export function initToast() {
  window.showToast = (msg, type = 'info', duration = 3000) => {
    const container = document.getElementById('toastContainer') || (() => {
      const c = document.createElement('div');
      c.id = 'toastContainer';
      c.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
      document.body.appendChild(c);
      return c;
    })();

    const colors = {
      success: '#2ecc71',
      error: '#ff5a6a',
      warning: '#f1c40f',
      info: '#1a8cff'
    };

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: #141b2b; border: 1px solid #1c2740; border-radius: 10px;
      padding: 12px 20px; color: #e8edf5; font-size: 13px;
      display: flex; align-items: center; gap: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      border-left: 4px solid ${colors[type] || colors.info};
      animation: slideIn 0.2s ease;
    `;
    toast.innerHTML = `<span>${msg}</span><span style="cursor:pointer;color:#4a5e7e;margin-left:12px;" onclick="this.parentElement.remove()">✕</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };
}
