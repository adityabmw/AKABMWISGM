// ================================================================
// AKA BMW ISGM
// Master Seeder
// ================================================================

import { MasterServices } from "./master.service.js";

import { MASTER_CATEGORY } from "./master.data.js";

class MasterSeeder {

    async seedRoles() {

        const roles = [

            "OWNER",

            "ADMINISTRATOR",

            "SERVICE_ADVISOR",

            "HEAD_MECHANIC",

            "MECHANIC",

            "PURCHASING",

            "FINANCE",

            "CASHIER"

        ];

        for (const role of roles) {

            await MasterServices.create({

                code: role,

                name: role,

                category: MASTER_CATEGORY.ROLE

            });

        }

    }

}

const MasterSeed = new MasterSeeder();

export {

    MasterSeed,

    MasterSeeder

};