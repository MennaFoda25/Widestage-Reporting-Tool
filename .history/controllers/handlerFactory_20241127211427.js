const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

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
        done({ result: 0, msg: "Error deleting items, no item has been deleted." });
    }
    res.status(204).send();
  });
};
