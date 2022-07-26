const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
    full_name:String,
    userName:String,
    password:String,
    email: String,
    friends:[{type:Mongoose.Types.ObjectId,ref:"users"}],
    blockedFriends:[{type:Mongoose.Types.ObjectId,ref:"users"}],
    friendsWaiting:[{type:Mongoose.Types.ObjectId,ref:"users"}],
    profil_image:String,
    roles: [{type:Mongoose.Types.ObjectId,ref:"operationClaims"}],
},{timestamps:true,versionKey:false})

module.exports=Mongoose.model("users",UserSchema)
