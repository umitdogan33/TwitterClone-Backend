const Result = require('./Result');
class SuccessResult extends Result {
    constructor(message) {
        super(message,true);
    }
}

module.exports = SuccessResult;