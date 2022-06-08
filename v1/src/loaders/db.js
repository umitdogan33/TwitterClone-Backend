const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open",() =>{
    console.log("db bağlantısı başarılı");
});


const  connectDb = async() => {
    await Mongoose.connect('mongodb://localhost:27017/twitterclone',{
        useNewUrlParser : true,
        useUnifiedTopology:true,
    })
}
module.exports ={
    connectDb
}