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
    }
module.exports=UserService;