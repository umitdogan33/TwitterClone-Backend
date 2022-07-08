const DataResult = require('./DataResult');
class SuccessDataResult extends DataResult{
    constructor(message,data){
        super(message,true,data)
    }
}
    module.exports = SuccessDataResult;