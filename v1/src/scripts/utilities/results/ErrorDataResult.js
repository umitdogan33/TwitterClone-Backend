const DataResult = require("./DataResult");

class ErrorDataResult extends DataResult{
    constructor(message,data){
        super(message,false,data)
    }
}

module.exports =ErrorDataResult;