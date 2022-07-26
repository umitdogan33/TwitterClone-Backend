const User = require("../models/UserModel")
const BaseService = require("./BaseService");

class UserService extends BaseService{
    constructor() {
        super(User)
    }

    list(where){
        return User.find(where || {})
        .populate({
            path:"roles",
            select:"name"
        })
    }

    searchFunc(query){
        return User.find({"full_name" : new RegExp(query, 'i')}) 
        
        // {full_name: "/umit/"}
    }
    }
   
module.exports=UserService;