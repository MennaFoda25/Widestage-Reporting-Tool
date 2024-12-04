const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

Controller.method(
  "update",
  asyncHandler(async function (req, res) {
    // Destructure the request for easier access to properties
    const { body: data, query, user } = req;

    // Extract the ID from the data and create a find object
    const { _id: id } = data;
    const find = generateFindFields(req, id);

    // Remove keys that should not be included in the update
    const { id: _, _id: __, ...updateData } = data; // Using destructuring and rest operator to exclude id and _id

    // Conditionally set user ID and company ID based on authentication and query parameters
    if (query.userid) {
      updateData.user_id = req.isAuthenticated() ? user._id : null;
    }
    if (query.companyid) {
      updateData.companyID = req.isAuthenticated() ? user.companyID : null;
    }

    // Determine the username of the requester
    const currentUser = req.isAuthenticated() ? user.username : "unsigned user";

    // Initialize nd_history if not present
    if (!updateData.nd_history) {
      updateData.nd_history = [];
    }

    // Add update details to nd_history
    updateData.nd_history.push({
      text: `Updated on ${new Date()} by ${currentUser}`,
      user_id: req.isAuthenticated() ? user._id : null,
      user_name: req.isAuthenticated() ? user.username : null,
      user_companyID: req.isAuthenticated() ? user.companyID : null,
      user_companyName: req.isAuthenticated() ? user.companyName : null,
    });

      // Update the document in the model
      const result = await this.model.update(find, { $set: updateData });

      // Determine the number of affected records
      const numAffected = result.n || result.nModified || 0;

      if (numAffected > 0) {
        res({ result: 1, msg: `${numAffected} record(s) updated.` });
      } else {
        return next ({
          result: 0,
          msg: "Error updating record, no records have been updated.",
        });
      }
    
      // Handle any errors during the update process
      res({ result: 0, msg: err.message });
    
  })
);

exports.deleteOne = (Model) => {
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new ApiError(`Id is invalid`, 404));
    }
    // Check the result
    if (result.deletedCount > 0) {
      done({ result: 1, msg: `${result.deletedCount} item(s) deleted.` });
    } else {
      done({
        result: 0,
        msg: "Error deleting items, no item has been deleted.",
      });
    }
    res.status(204).send();
  });
};
