const mongoose = require("mongoose");

const hash = require('')

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    companyID: String,
    status: String,
    email: String,
    language: String,
    salt: String,
    hash: String,
    hash_verify_account: String,
    hash_change_password: String,
    change_password: Boolean,
    roles: [],
    filters: [],
    contextHelp: [],
    dialogs: [],
    accessToken: String,
    startDate: {type: Date, default: Date.now },
    endDate: {type: Date},
    history: String,
    title: String,
    companyName: String,
    department: String,
    businessUnit: String,
    brand: String,
    unit: String,
    customFilter1: String,
    customFilter2: String,
    customFilter3: String,
    customFilter4: String,
    customFilter5: String,
    customFilter6: String,
    customFilter7: String,
    customFilter8: String,
    customFilter9: String,
    customFilter10: String,
    facebook: {
        id: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        name: String
    },
    google: {
        email: String,
        name: String
    },
    last_login_date: {type: Date},
    last_login_ip: {type: String},
    privateSpace: [],
    defaultDocument: {type: String},
    defaultDocumentType: {type: String},
    nd_trash_deleted:{type: Boolean},
    nd_trash_deleted_date: {type: Date},
    createdBy: {type: String},
    createdOn: {type: Date},
    companyData: {}

})
