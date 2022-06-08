const express = require("express");
const router = express.Router();
const {create} = require("../controllers/OperationClaims")

router.post("/add",create);

module.exports = router;