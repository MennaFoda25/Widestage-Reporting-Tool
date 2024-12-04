const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.deleteOne = (Model) => {
  asyncHandler(async (req, res) => {

    if(!req.params.id)(
        return this.deleteOne({})
    )
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new ApiError(`Id is invalid`, 404));
    }
    res.status(204).send();
  });
};
