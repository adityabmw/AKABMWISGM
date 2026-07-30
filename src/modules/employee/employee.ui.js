import employeeController from "./employee.controller.js";

class EmployeeUI {
  init() {
    console.log("Employee UI Module Initialized");
    this.bindEvents();
  }

  bindEvents() {
    const btn = document.getElementById("btnRefreshEmployee");
    if (btn) {
      btn.addEventListener("click", () => this.refreshTable());
    }
  }

  refreshTable() {
    console.log("Refreshing employee data grid...");
  }
}

export default new EmployeeUI();
