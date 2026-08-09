/*
==================================================
 AKA BMW ISGM ENTERPRISE ROUTER (FULLY INTEGRATED)
==================================================
*/
import customer from "../modules/customer/index.js";
import vehicle from "../modules/vehicle/index.js";
import PartsController from "../modules/parts/parts.controller.js";
import settingsView from "../modules/settings/settings.view.js";

class Router {
  constructor() {
    this.routes = new Map();
  }

  register(name, module) {
    this.routes.set(name, module);
  }

  get(name) {
    return this.routes.get(name);
  }

  has(name) {
    return this.routes.has(name);
  }

  list() {
    return [...this.routes.keys()];
  }
}

const router = new Router();

// Daftarkan modul yang sudah aktif secara riil
router.register("customer", customer);
router.register("vehicle", vehicle);

// Aktifkan modul parts & settings ke router inti dengan wrapper init standard
router.register("parts", {
  init: async () => {
    const controller = new PartsController();
    await controller.render(".main-content");
  }
});
router.register("settings", { init: () => settingsView.init() });

// Placeholder untuk modul Sprint berikutnya yang akan diisi fungsionalnya
[
  "dashboard",
  "reception",
  "booking",
  "workorder",
  "inventory",
  "purchasing",
  "finance",
  "invoice",
  "pos",
  "reports",
  "employee",
  "knowledge",
  "etk",
  "wiring",
  "tis",
  "vin",
  "dtc",
  "ista",
  "coding",
  "programming",
  "livedata"
].forEach(m => {
  if (!router.has(m)) {
    router.register(m, { 
      init: () => {
        const container = document.getElementById("main-content") || document.getElementById("content") || document.body;
        if (container) {
          container.innerHTML = `<div class="p-4 text-white bg-dark">Modul ${m} sedang dalam antrean Sprint.</div>`;
        }
      } 
    });
  }
});

export default router;
