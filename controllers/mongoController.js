const DataModel = require("../models/mongoModel");
const generateFindFields = require("../utils/generateDataResource");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const slugify = require("slugify");
const { Model } = require("mongoose");
const factory = require("../controllers/handlerFactory");

class Controller {
  constructor(model) {
    this.model = model;
  }

  findAll(req, res) {
    const features = new ApiFeatures(this.model.find(), req.query)
      .filter()
      .sort()
      .limitFields();

    const items = features.mongooseQuery;
    const countDocuments = this.model.countDocuments();

    features.paginate(countDocuments);

    res.json({
      result: 1,
      pagination: features.paginationResult,
      items,
    });
  }

  findOne(req, res) {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ result: 0, msg: "id is required" });
    }

    const find = this.generateFindFields(req, id);
    const item = this.model.findOne(find);

    if (!item) {
      return res.status(400).json({ result: 0, msg: "Item not found" });
    }

    res.json({ result: 1, item: item.toObject() });
  }

  update(req, res) {
    const data = req.body;
    const id = data._id;

    if (!id) {
      return res.status(400).json({ result: 0, msg: "'id' is required." });
    }

    const find = this.generateFindFields(req, id);
    delete data._id;

    data.nd_history = data.nd_history || [];
    data.nd_history.push({
      text: `Updated on ${new Date()}`,
      user_id: req.user ? req.user._id : null,
    });

    const result = this.model.update(find, { $set: data });

    if (result.nMoodified > 0) {
      res.json({ result: 1, msg: `${result.nMoodified} recod(s) updated` });
    } else {
      res.json({ result: 0, msg: "no record updated" });
    }
  }

  generateMandatoryFilters(req) {
    const mandatoryFilters = [];

    if (req.query.trash) {
      mandatoryFilters.push({ nd_trash_deleted: false });
    }
    if (req.user) {
      mandatoryFilters.push({ companyID: req.user.companyID });
    }
    return mandatoryFilters;
  }

  prepareCreateData(data, req) {
    if (req.user) {
      data.createdBy = req.user._id;
      data.createdOn = new Date();
    }
    data.nd_trash_deleted = false;
    data.nd_history = data.nd_history || [];
    data.nd_history.push({
      text: `Created on ${new Date()} by ${req.user.username || "unsigned user"}`,
      user_id: req.user ? req.user._id : null,
    });
    return data;
  }
  generateFindFields(req, id) {
    const mandatoryFilters = [{ _id: id }];
    const filters = this.generateMandatoryFilters(req);
    return { $and: [...mandatoryFilters, ...filters] };
  }
}
module.exports = Controller;

//exports.getAll = factory.getAll(Model);
// (Model, modelName = "") =>
//   asyncHandler(async (req, res) => {
//     let filter = req.filterObj || {};
//     const documentsCounts = await Model.countDocuments();
//     const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
//       .paginate(documentsCounts)
//       .filter()
//       .search(modelName)
//       .limitFields()
//       .sort();

//     const { mongooseQuery, paginationResult } = apiFeatures;
//     const documents = await mongooseQuery;

//     res.status(200).json({
//       results: documents.length,
//       paginationResult,
//       data: documents,
//     });
//   });
