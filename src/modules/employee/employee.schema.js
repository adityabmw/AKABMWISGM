// ==========================================================
// AKA BMW ISGM
// Employee Schema
// Version : Enterprise 3.0
// ==========================================================

export const EmployeeSchema = {

    // ======================================================
    // IDENTITY
    // ======================================================

    uid: "",

    employeeId: "",

    qrCode: "",

    faceRecognition: "",


    // ======================================================
    // PERSONAL INFORMATION
    // ======================================================

    fullName: "",

    nickName: "",

    gender: "",

    birthPlace: "",

    birthDate: "",

    religion: "",

    maritalStatus: "",

    nationality: "Indonesia",

    identityType: "KTP",

    identityNumber: "",

    phone: "",

    whatsapp: "",

    email: "",

    address: "",

    city: "",

    province: "",

    postalCode: "",

    emergencyContact: "",

    emergencyPhone: "",


    // ======================================================
    // EMPLOYMENT
    // ======================================================

    role: "",

    department: "",

    position: "",

    branch: "MAIN",

    employmentStatus: "PERMANENT",

    joiningDate: "",

    resignDate: "",

    basicSalary: 0,

    overtimeRate: 0,

    allowance: 0,

    incentive: 0,


    // ======================================================
    // BANK
    // ======================================================

    bankName: "",

    bankAccount: "",

    accountHolder: "",


    // ======================================================
    // DOCUMENT
    // ======================================================

    taxNumber: "",

    bpjsHealth: "",

    bpjsEmployment: "",

    drivingLicense: "",


    // ======================================================
    // UNIFORM
    // ======================================================

    shirtSize: "",

    pantsSize: "",

    shoesSize: "",

    bloodType: "",


    // ======================================================
    // PHOTO
    // ======================================================

    photoProfile: "",

    photoFullBody: "",

    photoIdentity: "",

    digitalSignature: "",


    // ======================================================
    // SKILL
    // ======================================================

    skillLevel: "",

    certifications: [],

    specialSkills: [],


    // ======================================================
    // WORKSHOP
    // ======================================================

    currentWorkOrder: "",

    currentVehicle: "",

    currentActivity: "",

    currentStatus: "OFFLINE",


    // ======================================================
    // SYSTEM
    // ======================================================

    isOnline: false,

    lastLogin: null,

    lastLogout: null,

    notes: "",


    // ======================================================
    // AUDIT
    // ======================================================

    createdBy: "",

    updatedBy: "",

    createdAt: null,

    updatedAt: null,

    deletedAt: null,

    deletedBy: "",

    status: "ACTIVE"

};