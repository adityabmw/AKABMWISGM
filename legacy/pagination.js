// ============================================================
// AKA BMW ISGM — PAGINATION COMPONENT
// Sprint 2-3: Reusable Pagination
// ============================================================

export class Pagination {
  constructor({
    containerId,
    totalItems = 0,
    pageSize = 10,
    currentPage = 1,
    onPageChange = null,
    theme = 'dark'
  }) {
    this.containerId = containerId;
    this.totalItems = totalItems;
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.onPageChange = onPageChange;
    this.theme = theme;
    this.totalPages = Math.ceil(totalItems / pageSize);
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    if (this.totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    const styles = this.getStyles();
    let html = `<nav aria-label="Page navigation">
      <ul class="pagination pagination-sm justify-content-center" style="margin:0;">`;

    // Previous button
    html += `<li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${this.currentPage - 1}" style="${styles.pageLink}">«</a>
    </li>`;

    // Page numbers
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(this.totalPages, this.currentPage + 2);

    if (startPage > 1) {
      html += `<li class="page-item"><a class="page-link" href="#" data-page="1" style="${styles.pageLink}">1</a></li>`;
      if (startPage > 2) {
        html += `<li class="page-item disabled"><span class="page-link" style="${styles.pageLinkDisabled}">...</span></li>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === this.currentPage;
      html += `<li class="page-item ${isActive ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}" style="${isActive ? styles.pageLinkActive : styles.pageLink}">${i}</a>
      </li>`;
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        html += `<li class="page-item disabled"><span class="page-link" style="${styles.pageLinkDisabled}">...</span></li>`;
      }
      html += `<li class="page-item"><a class="page-link" href="#" data-page="${this.totalPages}" style="${styles.pageLink}">${this.totalPages}</a></li>`;
    }

    // Next button
    html += `<li class="page-item ${this.currentPage === this.totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${this.currentPage + 1}" style="${styles.pageLink}">»</a>
    </li>`;

    html += `</ul></nav>`;
    container.innerHTML = html;

    // Event listeners
    container.querySelectorAll('a.page-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (page && page !== this.currentPage && page >= 1 && page <= this.totalPages) {
          this.goTo(page);
        }
      });
    });
  }

  goTo(page) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.render();
    if (this.onPageChange) {
      this.onPageChange(page);
    }
  }

  setTotalItems(totalItems) {
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
    this.render();
  }

  getStyles() {
    if (this.theme === 'dark') {
      return {
        pageLink: 'background:#141b2b;border-color:#1c2740;color:#a0b4d0;',
        pageLinkActive: 'background:#1a8cff;border-color:#1a8cff;color:#fff;',
        pageLinkDisabled: 'background:#141b2b;border-color:#1c2740;color:#4a5e7e;'
      };
    }
    return {
      pageLink: 'background:#fff;border-color:#dee2e6;color:#0d1625;',
      pageLinkActive: 'background:#1a8cff;border-color:#1a8cff;color:#fff;',
      pageLinkDisabled: 'background:#fff;border-color:#dee2e6;color:#6c757d;'
    };
  }

  destroy() {
    const container = document.getElementById(this.containerId);
    if (container) container.innerHTML = '';
  }
}

// ============================================================
// 2. FACTORY FUNCTION
// ============================================================
export function createPagination(config) {
  return new Pagination(config);
}