const ProjectService = require("../services/Users");
const httpStatus = require("http-status");
const JWT = require("jsonwebtoken")
const userOperationClaims = require("../services/UserOperationClaims")
const ApiError = require("../errors/ApiError");
const httpStatusCode = require("http-status");
const service = new ProjectService();

const authorize  = (claims) =>(req,res,next) =>{
    let userClaims = [];
    let success = false;
    service.list({_id:req.user._id}).then((users)=>{
        userClaims = users.roles;
    },(e)=>{
        return next(new ApiError("NOT FOUND",404))
    })

    claims.forEach(claim => {
        if(userClaims.includes(claim)){
            success = true;
        }
        return next(new ApiError("UNAUTHORIZED",httpStatusCode.UNAUTHORIZED))
    });

    
     next();
}

module.exports = authorize;