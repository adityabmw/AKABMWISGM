/**
 * Master Seeder - Idempotent
 * Running 2x tidak akan duplikat
 */
import { MasterServices } from "./master.service.js";
import { MASTER_CATEGORY } from "./master.data.js";

const SEED_DATA = [
  { code: "WAREHOUSE-MAIN", name: "Gudang Utama", category: MASTER_CATEGORY.WAREHOUSE },
  { code: "WAREHOUSE-USED", name: "Gudang Bekas", category: MASTER_CATEGORY.WAREHOUSE },
  { code: "RACK-A1", name: "Rak A1", category: MASTER_CATEGORY.RACK },
  { code: "SHIFT-PAGI", name: "Shift Pagi", category: MASTER_CATEGORY.SHIFT },
  { code: "SHIFT-SIANG", name: "Shift Siang", category: MASTER_CATEGORY.SHIFT },
  { code: "PRIO-LOW", name: "Low", category: MASTER_CATEGORY.JOB_PRIORITY },
  { code: "PRIO-HIGH", name: "High", category: MASTER_CATEGORY.JOB_PRIORITY },
  { code: "ROLE-OWNER", name: "Owner", category: MASTER_CATEGORY.ROLE },
  { code: "ROLE-MECHANIC", name: "Mechanic", category: MASTER_CATEGORY.ROLE },
];

export async function seedMaster() {
  console.log("🌱 Seeding master data (idempotent)...");
  let created = 0, skipped = 0;
  for (const item of SEED_DATA) {
    try {
      await MasterServices.create(item);
      created++;
      console.log(` + Created ${item.code}`);
    } catch (e) {
      if (e.message.includes("Duplicate")) { skipped++; }
      else console.warn(` ! Skip ${item.code}: ${e.message}`);
    }
  }
  console.log(`✅ Seed done: ${created} created, ${skipped} skipped (already exists)`);
  return { created, skipped };
}
