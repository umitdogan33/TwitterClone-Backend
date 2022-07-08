const httpStatus = require('http-status');
const tweetService = require('../services/TweetService');
const ErrorResult = require("../scripts/utilities/results/ErrorResult");
const SuccessDataResult = require("../scripts/utilities/results/SuccessDataResult");
const SuccessResult = require("../scripts/utilities/results/SuccessResult");

class TweetController{

    create(req,res){
        tweetService.insert(req.body).then((response)=>{
            res.status(httpStatus.OK).send(new SuccessResult("success"));
        })
        .catch((err)=>{
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ErrorResult("hatayla karşılaştık"));
        })
    }

    list(req,res){
        tweetService.list().then((response)=>{
            res.status(httpStatus.OK).send(new SuccessDataResult("success",response));
        }).catch((err)=>{
            res.status(httpStatus.BAD_REQUEST).send(new ErrorResult("hatayla karşılaştık"));
        })
    }
}

module.exports = new TweetController();