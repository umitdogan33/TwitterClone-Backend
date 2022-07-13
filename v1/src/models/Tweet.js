const Mongoose = require("mongoose");

const TweetShema = new Mongoose.Schema({
    content: String,
    personRetweeted:{type:Mongoose.Types.ObjectId,ref:"users"},
    retweetPermission:{type:String,enum:["Everyone","OnlyFriends","OnlyMe"]},
    sharing:{type:Mongoose.Types.ObjectId,ref:"users"},
    likes:[{type:Mongoose.Types.ObjectId,ref:"users"}],
    answers: [{type:Mongoose.Types.ObjectId,ref:"tweets"}],
},{timestamps:true,versionKey:false})

module.exports=Mongoose.model("tweets",TweetShema)
