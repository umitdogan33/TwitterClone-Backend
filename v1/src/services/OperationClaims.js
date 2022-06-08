const BaseService = require("./BaseService");
const OperationClaimModel = require("../models/OperationClaim");
class OperationClaimsService extends BaseService{
    constructor() {
        super(OperationClaimModel)
    }
}

module.exports = new OperationClaimsService();