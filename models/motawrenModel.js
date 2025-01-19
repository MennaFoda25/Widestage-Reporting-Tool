// models/GenericModel.js
// const mongoose = require("mongoose");

// // Create a schema without strict structure
// const genericSchema = new mongoose.Schema({}, { strict: false }); // Allow arbitrary data
// const GenericModel = mongoose.model("Motawren", genericSchema); // Change "GenericCollection" to your desired collection name

// module.exports = GenericModel;

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const motawrenSchema = new mongoose.Schema({
  CommunicationParameters: {
    className: { type: String, required: false },
    active: { type: Boolean, required: false },
    port: { type: String, required: false },
    baudRate: { type: Number, required: false },
    ackTimeout: { type: Number, required: false },
    parity: { type: String, required: false },
    stopBit: { type: Number, required: false },
    dataBitsSize: { type: Number, required: false },
    linkAddSize: { type: Number, required: false },
    mode: { type: Number, required: false },
    ca: { type: String, required: false },
    ioa: { type: String, required: false },
    cot: { type: String, required: false },
    originatorAddress: { type: String, required: false },
  },

  alarm_level:[ {
    name: { type: String, required: false },
    colorValue: { type: String, required: false },
    type: { type: String, required: false },
    order: { type: Number, required: false },
  }],
//   alarm_level_type: {
//     textMap: {
//       ar: { type: String, required: true },
//       en: { type: String, required: true },
//     },
//     value: { type: Number, required: true },
//   },
//   attribute: {
//     dataObject: { type: String, required: true }, // Adjust type accordingly if it's not a string
//     name: { type: String, required: true },
//     className: { type: String, required: true },
//   },
//   auxiliary_transformer_element: {
//     primaryBayCatalog: { type: String, required: true }, // Assuming it's a string; adjust if otherwise
//     name: { type: String, required: true },
//     className: { type: String, required: true },
//     secondaryBayCatalog: { type: String, required: true }, // Assuming it's a string; adjust if otherwise
//   },
//   bay_catalog: {
//     switchGearCatalog: { type: String, required: true }, // Assuming it's a string; adjust if otherwise
//     voltageCode: { type: String },
//     bayTypeLookUp: { type: String, required: true }, // Assuming it's a string; adjust if otherwise
//     voltageCodeNo: { type: String },
//     name: { type: String, required: true },
//     className: { type: String, required: true },
//     failureDataPointId: { type: String }, // Assuming it's a string; adjust if otherwise
//     type: { type: String, required: true },
//   },

//   bay_type_lookup: [
//     {
//       typeInFile: { type: String, required: true },
//       textMap: {
//         ar: { type: String, required: true },
//         en: { type: String, required: true },
//       },
//       namePrefix: { type: String, required: true },
//       value: { type: String, required: true },
//     },
//     { _id: false },
//   ],
//   bus_section_catalog: [
//     {
//       switchGearCatalog: { type: String, required: true },
//       sectionNumber: { type: String, required: true },
//       name: { type: String, required: true },
//       className: { type: String, required: true },
//       busBarTypeLookUp: { type: String, required: true },
//     },
//     { _id: false },
//   ],
//   busbar_type_lookup: [
//     {
//       textMap: {
//         ar: { type: String, required: true },
//         en: { type: String, required: true },
//       },
//       value: { type: String, required: true },
//     },
//     { _id: false },
//   ],
//   catalog_object_lookup: [
//     {
//       level: { type: String, required: true },
//       name: {
//         ar: { type: String, required: true },
//         en: { type: String, required: true },
//       },
//       type: { type: String, required: true },
//       order: { type: String, required: true },
//     },
//     { _id: false },
//   ],
//   catalog: [
//     {
//       code: { type: String, required: true },
//       name: { type: String, required: true },
//       disableCodeEdit: { type: Boolean, default: false },
//       className: { type: String, required: true },
//       conditions: [
//         {
//           conditionRules: { type: String, required: true },
//           eventState: { type: String, required: true },
//           alarmLevel: { type: String, required: true },
//         },
//       ],
//       disableDelete: { type: Boolean, default: false },
//     },
//     { _id: false },
//   ],
//   circuitbreaker_catalog_element: [
//     {
//       defaultStates: { type: Boolean, default: false },
//       name: { type: String, required: true },
//       className: { type: String, required: true },
//       defaultDrawingStates: {
//         defaultState: { type: String, required: true },
//         stateValues: [
//           {
//             drawingStateLookUp: { type: String, required: true },
//             value: { type: String },
//           },
//         ],
//       },
//       bayCatalog: { type: String, required: true }, // Reference to bay catalog
//     },
//     { _id: false },
//   ],
//   command_configuration: [
//     {
//       pendingColor: { type: String, required: true },
//       commandTimeOut: { type: Number, required: true },
//       succeededColor: { type: String, required: true },
//       failedColor: { type: String, required: true },
//       className: { type: String, required: true },
//     },
//     { _id: false },
//   ],
//   common_state: [
//     {
//       color: { type: String, required: true },
//       name: { type: String, required: true },
//       className: { type: String, required: true },
//       type: { type: String, required: true },
//       labelMap: {
//         ar: { type: String, required: true },
//         en: { type: String, required: true },
//       },
//       flash: { type: Boolean, default: false },
//       order: { type: String },
//     },
//     { _id: false },
//   ],
//   communication_lookup: [
//     {
//       textMap: {
//         ar: { type: String, required: true },
//         en: { type: String, required: true },
//       },
//       value: { type: String, required: true },
//     },
//     { _id: false },
//   ],
//   conditional_point: [
//     {
//       conditionPointCoditions: [
//         {
//           condition: { type: String, required: true },
//           name: { type: String, required: true },
//           value: { type: Number, required: true },
//         },
//       ],
//       dataPointsIds: { type: String, required: true },
//       name: { type: String, required: true },
//       className: { type: String, required: true },
//       messageMap: {
//         en: { type: String, required: true },
//       },
//       category: { type: String }, // Use ObjectId if necessary
//     },
//     { _id: false },
//   ],
}); // Prevents Mongoose from auto-generating _id on subdocuments

const MotawrenSchema = mongoose.model("motawren", motawrenSchema);

const dataPath = path.join(__dirname, "..", "/utils", "data.json");

// const testMotawren = new MotawrenSchema(
//   JSON.parse(fs.readFileSync(dataPath, "utf-8"))
// );

fs.readFile(dataPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  try {
    const jsonData = JSON.parse(data);
    console.log(jsonData);

    const testMotawren = new MotawrenSchema(jsonData);

    if (fs.existsSync(dataPath)) {
      console.log("File exists");
    } else {
      console.error("File does not exist at path:", dataPath);
    }

    testMotawren
      .save()
      .then(() => {
        console.log("Document saved successfully.");
      })
      .catch((saveError) => {
        console.error("Error saving document:", saveError);
      });
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});

module.exports = MotawrenSchema;
