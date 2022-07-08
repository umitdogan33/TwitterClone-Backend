const Result = require("./Result");

class ErrorResult extends Result{
    constructor(message){
        super(message,false);
    }
}

module.exports = ErrorResult;