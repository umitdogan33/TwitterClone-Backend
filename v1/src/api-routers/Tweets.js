const express = require("express");
const router = express.Router();
const controller = require("../controllers/Tweets");

router.route("/").post(controller.create);
router.route("/").get(controller.list);

module.exports = router;