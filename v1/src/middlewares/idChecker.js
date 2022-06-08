const ApiError = require("../errors/apiError");

const idChecker = (field) => (req,res,next) => {
    // const idField = field || "id";
    if(!req.params[field || "id"]?.match(/^[0-9a-fA-F]{24}$/)){
        next(new ApiError("Lütfen geçerli bir ID giriniz",400));
        return;
    }	
    next();
}

module.exports = idChecker;