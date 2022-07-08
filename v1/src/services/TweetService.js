const BaseService = require('./BaseService');
const TweetsModel = require('../models/Tweet');

class TweetService extends BaseService{
    constructor(){
        super(TweetsModel);
    }
}

module.exports = new TweetService();