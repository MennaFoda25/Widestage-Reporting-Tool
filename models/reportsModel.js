const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    companyID: { type: String, required: false }, // ID of the company associated with the report
    reportName: { type: String, required: true },
    reportType: { type: String, default: "database" }, // Type of report (e.g., database, file)
    reportDescription: {
      type: String,
      default: "Report generated from database query",
    }, // Description of the report
    reportSubType: { type: String, required: true }, // Subtype of the report (e.g., json, csv)
    properties: { type: Object, default: {} }, // Additional properties (can be customized)
    query: { type: Object, default: {} }, // Query used to generate the report
    owner: { type: String, required: true }, // Owner of the report (user ID or name)
    createdBy: { type: String, required: true }, // Creator of the report (user ID or name)
    createdOn: { type: Date, default: Date.now }, // Timestamp when the report was created
    history: { type: Array, default: [] }, // History of changes (can be used for auditing)
    parentFolder: { type: String, default: "reports" }, // Folder where the report is stored
    isPublic: { type: Boolean, default: false }, // Whether the report is public or private
    nd_trash_deleted: { type: Boolean, default: false }, // Whether the report is deleted
    nd_trash_deleted_date: { type: Date }, // Timestamp when the report was deleted
    selectedLayerID: { type: String }, // ID of the selected layer (if applicable)
    filePath: { type: String, required: true }, // Path to the report file
  },
  { collection: "Reports" }
); // Use the 'wst_Reports' collection

const Reports = mongoose.model("Reports", reportSchema);
module.exports = Reports;
