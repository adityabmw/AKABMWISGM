// ============================================================
// AKA BMW ISGM — EXPORT SERVICE
// Sprint 4: Excel, CSV, PDF Export
// ============================================================

class ExportService {
  constructor() {
    this.formatters = {
      date: (val) => val ? new Date(val).toLocaleDateString('id-ID') : '-',
      currency: (val) => val ? 'Rp ' + Number(val).toLocaleString('id-ID') : 'Rp 0',
      number: (val) => val !== undefined && val !== null ? Number(val).toLocaleString('id-ID') : '0',
      string: (val) => val || '-'
    };
  }

  // ============================================================
  // 1. EXPORT TO EXCEL
  // ============================================================
  toExcel(data, options = {}) {
    const {
      filename = 'export',
      sheetName = 'Sheet1',
      headers = null,
      formatters = {}
    } = options;

    try {
      // Check if XLSX is available
      if (typeof XLSX === 'undefined') {
        console.warn('XLSX library not available, falling back to CSV');
        return this.toCSV(data, options);
      }

      // Format data with headers
      let exportData = data;
      if (headers) {
        exportData = data.map(item => {
          const row = {};
          headers.forEach(h => {
            row[h.label || h.key] = item[h.key] !== undefined ? item[h.key] : '';
          });
          return row;
        });
      }

      // Apply formatters
      const allFormatters = { ...this.formatters, ...formatters };
      exportData = exportData.map(item => {
        const row = {};
        Object.keys(item).forEach(key => {
          const formatter = allFormatters[key];
          row[key] = formatter ? formatter(item[key]) : item[key];
        });
        return row;
      });

      // Create workbook
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      // Auto column width
      const colWidths = [];
      Object.keys(exportData[0] || {}).forEach(key => {
        const maxLen = Math.max(
          key.length,
          ...exportData.map(row => String(row[key] || '').length)
        );
        colWidths.push({ wch: Math.min(Math.max(maxLen + 2, 10), 50) });
      });
      ws['!cols'] = colWidths;

      // Write file
      XLSX.writeFile(wb, filename + '.xlsx');
      return { success: true, filename: filename + '.xlsx' };
    } catch (err) {
      console.error('Export to Excel error:', err);
      throw err;
    }
  }

  // ============================================================
  // 2. EXPORT TO CSV
  // ============================================================
  toCSV(data, options = {}) {
    const {
      filename = 'export',
      headers = null,
      delimiter = ',',
      formatters = {}
    } = options;

    try {
      if (!data || data.length === 0) {
        throw new Error('No data to export');
      }

      // Format data with headers
      let exportData = data;
      let headerKeys = [];

      if (headers) {
        headerKeys = headers.map(h => h.key);
        exportData = data.map(item => {
          const row = {};
          headers.forEach(h => {
            row[h.label || h.key] = item[h.key] !== undefined ? item[h.key] : '';
          });
          return row;
        });
      } else {
        headerKeys = Object.keys(data[0]);
      }

      // Apply formatters
      const allFormatters = { ...this.formatters, ...formatters };
      exportData = exportData.map(item => {
        const row = {};
        Object.keys(item).forEach(key => {
          const formatter = allFormatters[key];
          row[key] = formatter ? formatter(item[key]) : item[key];
        });
        return row;
      });

      // Build CSV
      const headerRow = headerKeys.join(delimiter);
      const rows = exportData.map(item => {
        return headerKeys.map(key => {
          let val = item[key] !== undefined ? item[key] : '';
          if (typeof val === 'string' && (val.includes(delimiter) || val.includes('"'))) {
            val = '"' + val.replace(/"/g, '""') + '"';
          }
          return val;
        }).join(delimiter);
      });

      const csv = [headerRow, ...rows].join('\n');
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return { success: true, filename: filename + '.csv' };
    } catch (err) {
      console.error('Export to CSV error:', err);
      throw err;
    }
  }

  // ============================================================
  // 3. EXPORT TO PDF
  // ============================================================
  toPDF(element, options = {}) {
    const {
      filename = 'export',
      orientation = 'portrait',
      unit = 'mm',
      format = 'a4'
    } = options;

    try {
      // Check if libraries are available
      if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
        throw new Error('html2canvas or jspdf library not available');
      }

      return html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      }).then(canvas => {
        const { jsPDF } = jspdf;
        const doc = new jsPDF(orientation, unit, format);
        const imgWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save(filename + '.pdf');
        return { success: true, filename: filename + '.pdf' };
      });
    } catch (err) {
      console.error('Export to PDF error:', err);
      throw err;
    }
  }

  // ============================================================
  // 4. EXPORT TO JSON
  // ============================================================
  toJSON(data, options = {}) {
    const { filename = 'export', pretty = true } = options;

    try {
      const json = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return { success: true, filename: filename + '.json' };
    } catch (err) {
      console.error('Export to JSON error:', err);
      throw err;
    }
  }

  // ============================================================
  // 5. EXPORT WORKORDER DATA
  // ============================================================
  exportWorkorders(workorders, format = 'excel') {
    const data = workorders.map(w => ({
      'WO Number': w.woNumber || '-',
      'Customer': w.customerName || '-',
      'Vehicle': w.vehiclePlate || '-',
      'SA': w.sa || '-',
      'Technician': w.technician || '-',
      'Status': w.status || '-',
      'Progress': (w.progress || 0) + '%',
      'Total': w.grandTotal || 0,
      'Created': w.createdAt || '-'
    }));

    const options = {
      filename: `workorders_${new Date().toISOString().slice(0, 10)}`,
      headers: [
        { key: 'WO Number', label: 'WO Number' },
        { key: 'Customer', label: 'Customer' },
        { key: 'Vehicle', label: 'Vehicle' },
        { key: 'SA', label: 'SA' },
        { key: 'Technician', label: 'Technician' },
        { key: 'Status', label: 'Status' },
        { key: 'Progress', label: 'Progress' },
        { key: 'Total', label: 'Total' },
        { key: 'Created', label: 'Created' }
      ],
      formatters: {
        'Total': this.formatters.currency,
        'Created': this.formatters.date
      }
    };

    if (format === 'excel') {
      return this.toExcel(data, options);
    } else if (format === 'csv') {
      return this.toCSV(data, options);
    } else {
      return this.toJSON(data, options);
    }
  }

  // ============================================================
  // 6. EXPORT INVOICE DATA
  // ============================================================
  exportInvoices(invoices, format = 'excel') {
    const data = invoices.map(i => ({
      'Invoice': i.invNumber || '-',
      'Customer': i.customerName || '-',
      'Total': i.grandTotal || 0,
      'Status': i.status || '-',
      'Created': i.createdAt || '-'
    }));

    const options = {
      filename: `invoices_${new Date().toISOString().slice(0, 10)}`,
      headers: [
        { key: 'Invoice', label: 'Invoice' },
        { key: 'Customer', label: 'Customer' },
        { key: 'Total', label: 'Total' },
        { key: 'Status', label: 'Status' },
        { key: 'Created', label: 'Created' }
      ],
      formatters: {
        'Total': this.formatters.currency,
        'Created': this.formatters.date
      }
    };

    if (format === 'excel') {
      return this.toExcel(data, options);
    } else if (format === 'csv') {
      return this.toCSV(data, options);
    } else {
      return this.toJSON(data, options);
    }
  }

  // ============================================================
  // 7. EXPORT CUSTOMER DATA
  // ============================================================
  exportCustomers(customers, format = 'excel') {
    const data = customers.map(c => ({
      'Name': c.name || '-',
      'Phone': c.phone || '-',
      'Address': c.address || '-',
      'Total Transactions': c.totalTransaksi || 0,
      'Loyalty Points': c.loyaltyPoints || 0
    }));

    const options = {
      filename: `customers_${new Date().toISOString().slice(0, 10)}`,
      headers: [
        { key: 'Name', label: 'Name' },
        { key: 'Phone', label: 'Phone' },
        { key: 'Address', label: 'Address' },
        { key: 'Total Transactions', label: 'Total Transactions' },
        { key: 'Loyalty Points', label: 'Loyalty Points' }
      ],
      formatters: {
        'Total Transactions': this.formatters.currency
      }
    };

    if (format === 'excel') {
      return this.toExcel(data, options);
    } else if (format === 'csv') {
      return this.toCSV(data, options);
    } else {
      return this.toJSON(data, options);
    }
  }
}

// ============================================================
// EXPORT SINGLETON
// ============================================================
export const exportService = new ExportService();
export default exportService;