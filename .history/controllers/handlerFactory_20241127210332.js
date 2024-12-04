const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");


exports.deleteOne = (Model)=>{
    asyncHandler(async(req,res)=>{
        const {id} = req.params
        const doc = await Model.findByIdAndDelete(id)

        if(!doc){
            return next (new A)
        }
    })
}