const Result = require("./Result");

class DataResult extends Result{
    constructor(message,success,data){
        super(message,success);
        this.data = data;
    }
}

module.exports = DataResult;