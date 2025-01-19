const mongoose = require("mongoose");

const DatasourceSchema = new mongoose.Schema(
  {
    companyID: { type: String, required: false },
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Number, required: true }, // -1 error, 0 not active, 1 active
    params: { type: Array, required: true },
    nd_trash_deleted: { type: Boolean, required: false },
    nd_trash_deleted_date: { type: Date, required: false },
    createdBy: { type: String, required: false },
    createdOn: { type: Date, required: false },
    statusInfo: { type: Object, required: false },
  },
  { collection: "wst_DataSources" }
);

DataSourcesSchema.statics.changeStatus = async function (datasourceID, status) {
  const result = await this.updateOne(
    { _id: datasourceID },
    { $set: { status: status } }
  );
  return result;
};

DataSourcesSchema.statics.invalidateDatasource = async function (
  datasourceID,
  errorDetails
) {
  const statusInfo = {
    errorCode: errorDetails.errorCode,
    actionCode: errorDetails.actionCode,
    message: errorDetails.message,
    lastDate: new Date(),
  };
  const result = await this.updateOne(
    { _id: datasourceID },
    { $set: { status: -1, statusInfo: statusInfo } }
  );
  return result;
};

const DataSources = mongoose.model("DataSources", DataSourcesSchema);
module.exports = DataSources;
