const httpStatus = require('http-status');
const tweetService = require('../services/TweetService');
const ErrorResult = require("../scripts/utilities/results/ErrorResult");
const SuccessDataResult = require("../scripts/utilities/results/SuccessDataResult");
const SuccessResult = require("../scripts/utilities/results/SuccessResult");
class TweetController {

    create(req, res) {

        const content = req.body.content
            const datas = content.split(" ")
            const newDatas = [];
             datas.forEach(hashtag => {
                 if(hashtag.startsWith("#")){
                     console.log("hashtag",hashtag)
                     newDatas.push(hashtag)
                 }
            });
            req.body.hashtag = newDatas;

        tweetService.insert(req.body).then((response) => {
            res.status(httpStatus.OK).send(new SuccessResult("success"));
        })
            .catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ErrorResult("hatayla karşılaştık"));
            })
    }

    list(req, res) {
        tweetService.list().then((response) => {
            res.status(httpStatus.OK).send(new SuccessDataResult("success", response));
        }).catch((err) => {
            res.status(httpStatus.BAD_REQUEST).send(new ErrorResult("hatayla karşılaştık"));
        })
    }

    addComment(req, res) {
        const tweetId = req.params.id;
        req.body.sharing = req.user;
        tweetService.read({ _id: tweetId }).then((mainTweet) => {
            if (mainTweet == null) {
                res.status(httpStatus.BAD_REQUEST).send(new ErrorResult("Tweet bulunamadı!"));
            }

            tweetService.insert(req.body).then((response) => {
                mainTweet.answers.push(response);
                
                mainTweet.save().then((resn) => {
                }).catch((errs) => {
                    res.status(httpStatus.BAD_REQUEST).send(new ErrorResult("hatayla karşılaştık"));
                })
            }).catch((err2) => {
                res.status(httpStatus.BAD_REQUEST).send("hatayla karşılaştık");
            })
            res.status(httpStatus.OK).send(new SuccessResult("Başarılı"));
        }).catch((err) => {
            res.status(httpStatus.BAD_REQUEST).send("hatayla karşılaştık");
        })
    }

    reTweet(req,res){
        let tweetId = req.params.tweetId
        const userId = req.user._id
        console.log("userId",userId)
        tweetService.readById(tweetId).then((mainTweet)=>{
            console.log(mainTweet)
            if(mainTweet == null){
                res.status(httpStatus.BAD_REQUEST).send(new ErrorResult("Tweet bulunamadı!"));
            }

            let data = {
                ...mainTweet.toObject(),
                "personRetweeted":userId,
            }
            delete data._id
             
            

            tweetService.insert(data).then((response)=>{
                res.status(httpStatus.OK).send(new SuccessResult("Başarılı"));
            }).catch((err2)=>{
                res.status(httpStatus.BAD_REQUEST).send(new ErrorResult("Başarısız"));
            })
            
        }).catch((err)=>{
            res.status(httpStatus.BAD_REQUEST).send(new ErrorResult("Tweet bulunamadı!"));
        })
    }

    hashtagCalculator(req,res){
        let array = [];
        let arrayelements = null;
        let number = null;

        let hashtags = [];
        tweetService.list().then((data)=>{
            data.forEach(row => {
                row.hashtag.forEach(hashtagone => {
                    hashtags.push(hashtagone);
                });
            });

           
            hashtags.map((hashtag)=>{
                arrayelements = array.find(hd => hd.name == hashtag);
                if(arrayelements != null){
                    arrayelements.count++;
                }
                else{
                    array.push({name:hashtag,count:1});
                }
            })
                   
            res.status(httpStatus.OK).send(new SuccessDataResult("Başarılı",array));

        }).catch((err)=>{
            res.status(httpStatus.BAD_REQUEST).send(new ErrorResult("hatayla karşılaştık"));
        })
    }

    deneme(data,name){
        if(data.name == name){
            return true;
        }
        return false;
    }
}

module.exports = new TweetController();