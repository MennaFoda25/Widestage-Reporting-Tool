const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    console.log("Model: ", Model);
    // Build query
   // const documentsCounts = await new Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
    //  .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

// const asyncHandler = require("express-async-handler");
// const ApiError = require("../utils/apiError");

// // exports.create = (model) => {
// //   asyncHandler(async (req, res) => {
// //     // Extract required data from request body
// //     const data = req.body;

// //     // Set createdBy and createdOn if userid query param is present
// //     if (req.query.userid) {
// //       if (req.isAuthenticated()) {
// //         data.createdBy = req.user._id;
// //         data.createdOn = new Date();
// //       } else {
// //         data.createdBy = null;
// //         data.createdOn = null;
// //       }
// //     }

// //     // Set companyID if companyid query param is present
// //     if (req.query.companyid && req.isAuthenticated()) {
// //       data.companyID = req.user.companyID;
// //     }

// //     // Handle trash condition
// //     if (req.query.trash) {
// //       data.nd_trash_deleted = false;
// //     }

// //     // Determine the username of the requester
// //     const user = req.isAuthenticated() ? req.user.username : "unsigned user";

// //     // Initialize nd_history if not present
// //     if (!data.nd_history) {
// //       data.nd_history = [];
// //     }

// //     // Add creation details to nd_history
// //     data.nd_history.push({
// //       text: `Created on ${new Date()} by ${user}`,
// //       user_id: req.isAuthenticated() ? req.user._id : null,
// //       user_name: req.isAuthenticated() ? req.user.username : null,
// //       user_companyID: req.isAuthenticated() ? req.user.companyID : null,
// //       user_companyName: req.isAuthenticated() ? req.user.companyName : null,
// //     });

// //     // Attempt to create the item in the model
// //     const item = await this.model.create(data);

// //     // Respond with success message and created item
// //     return res
// //       .status(201)
// //       .send({ result: 1, msg: "Item created", item: item.toObject() });
// //   });
// //   // Handle any errors that may occur
// //   return next(new ApiError(`Error creating this user`, 500)); // Use a custom ApiError to encapsulate errors
// // };

// exports.updateOne = (model) => {
//   asyncHandler(async (req, res) => {
//     // Destructure the request for easier access to properties
//     const { body: data, query, user } = req;

//     // Extract the ID from the data and create a find object
//     const { _id: id } = data;
//     const find = generateFindFields(req, id);

//     // Remove keys that should not be included in the update
//     const { id: _, _id: __, ...updateData } = data; // Using destructuring and rest operator to exclude id and _id

//     // Conditionally set user ID and company ID based on authentication and query parameters
//     if (query.userid) {
//       updateData.user_id = req.isAuthenticated() ? user._id : null;
//     }
//     if (query.companyid) {
//       updateData.companyID = req.isAuthenticated() ? user.companyID : null;
//     }

//     // Determine the username of the requester
//     const currentUser = req.isAuthenticated() ? user.username : "unsigned user";

//     // Initialize nd_history if not present
//     if (!updateData.nd_history) {
//       updateData.nd_history = [];
//     }

//     // Add update details to nd_history
//     updateData.nd_history.push({
//       text: `Updated on ${new Date()} by ${currentUser}`,
//       user_id: req.isAuthenticated() ? user._id : null,
//       user_name: req.isAuthenticated() ? user.username : null,
//       user_companyID: req.isAuthenticated() ? user.companyID : null,
//       user_companyName: req.isAuthenticated() ? user.companyName : null,
//     });

//     // Update the document in the model
//     const result = await this.model.update(find, { $set: updateData });

//     // Determine the number of affected records
//     const numAffected = result.n || result.nModified || 0;

//     if (numAffected > 0) {
//       res.send({ result: 1, msg: `${numAffected} record(s) updated.` });
//     } else {
//       return next(
//         new ApiError("Error updating record, no records have been updated.")
//       );
//     }
//     // Handle any errors during the update process
//     res.send({ result: 0, msg: `Error with updating` });
//   });
// };

// exports.deleteOne = (Model) => {
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const doc = await Model.findByIdAndDelete(id);

//     if (!doc) {
//       return next(new ApiError(`Id is invalid`, 404));
//     }
//     // Check the result
//     if (result.deletedCount > 0) {
//       res({ result: 1, msg: `${result.deletedCount} item(s) deleted.` });
//     } else {
//       res.send({
//         result: 0,
//         msg: "Error deleting items, no item has been deleted.",
//       });
//     }
//     res.status(204).send();
//   });
// };
