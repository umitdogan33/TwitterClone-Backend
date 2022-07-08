const Mongoose = require("mongoose");

const TweetShema = new Mongoose.Schema({
    sharing:{type:Mongoose.Types.ObjectId,ref:"users"},
    likes:[{type:Mongoose.Types.ObjectId,ref:"users"}],
    answers: [{type:Mongoose.Types.ObjectId,ref:"tweets"}],
},{timestamps:true,versionKey:false})

module.exports=Mongoose.model("tweets",TweetShema)
