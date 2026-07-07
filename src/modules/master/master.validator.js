// ================================================================
// AKA BMW ISGM
// Master Validator
// ================================================================

class MasterValidator {

    validate(data) {

        if (!data.code) {

            throw new Error("Master Code wajib diisi.");

        }

        if (!data.name) {

            throw new Error("Master Name wajib diisi.");

        }

        if (!data.category) {

            throw new Error("Master Category wajib diisi.");

        }

        return true;

    }

}

const MasterValidation = new MasterValidator();

export {

    MasterValidation,

    MasterValidator

};