const httpStatus = require("http-status");
const JWT = require("jsonwebtoken")
const authenticeToken = (req,res,next)=>{
    // const authHeader = req.headers["Authorization"]
    // const token =authHeader && authHeader.split(" ")[1]
    const token = req.headers?.authorization?.split(" ")[1] || null;
    // console.log(token)
    if(token==null){
        return  res.status(httpStatus.UNAUTHORIZED).send({error: "bu işelemi yapmak için giriş yapmalısınız"})
    }
    const decodedToken = JWT.decode(token);
    // console.log("decodedToken.header",decodedToken.header)
    // console.log("decodedToken.payload",decodedToken.payload)
    const now = Math.floor(Date.now() / 1000)

    // if(decodedToken.exp<now){
    //     return  res.status(httpStatus.UNAUTHORIZED).send({error: "süresi geçmiş"})
    // }

    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err, user)=>{
        if(err){
            return res.status(httpStatus.FORBIDDEN).send({error : err})
        }


        req.user=user?._doc;
        next();
    });
}

module.exports=authenticeToken;