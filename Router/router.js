const express = require("express");
const router = express.Router();
const userController = require("../Controller/controller");
const validate = require("../Middleware/auth_middleware");
const singUpSchema = require("../Validator/auth_validator");

router.route("/getAll").get(userController.getAll);
router.route("/create").post(validate(singUpSchema), userController.create);
router.route("/update/:id").put(userController.update);
router.route("/delete/:id").delete(userController.del);
router.route("/signin").post(userController.signIn);

module.exports = router;
