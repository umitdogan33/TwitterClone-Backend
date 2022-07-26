const express = require("express")
const UserController = require("../controllers/Users");
const schemas = require("../validations/Users");
const validate = require("../middlewares/validate.js")
const logger = require("../scripts/logger/User.js")
const authenticeToken = require("../middlewares/authenticate")
const router = express.Router();
const authorize = require("../middlewares/authorization")

router.route("/").get(UserController.index);
// router.post("/",create);
router.route("/").post(validate(schemas.CreateValidation,logger),UserController.create)
router.route("/").patch(authenticeToken,UserController.update)
router.route("/login").post(validate(schemas.LoginValidation,logger),UserController.login)
router.route("/reset-password").post(UserController.resetPassword)
router.route("/change-password").post(authenticeToken,validate(schemas.ChangePasswordValidation),UserController.changePassword)
router.route("/update-profile-image").post(authenticeToken,UserController.updateProfileImage)
router.route("/:id").delete(authenticeToken,authorize(["admin"]),UserController.deleteUser)
router.route("/addrole/:id").post(authenticeToken,authorize(["admin"]),UserController.addRoles)
router.route("/finduser/:userName").get(UserController.findUserByUsername)
router.route("/blockuser").post(authenticeToken,UserController.blockUser)

module.exports=router;