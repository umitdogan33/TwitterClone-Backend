const express = require("express");
const router = express.Router();
const controller = require("../controllers/Tweets");
const authenticeToken = require("../middlewares/authenticate");

router.route("/").post(controller.create);
router.route("/").get(controller.list);
router.route("/:id").post(controller.addComment);
router.route("/retweet/:tweetId").post(authenticeToken,controller.reTweet);

module.exports = router;