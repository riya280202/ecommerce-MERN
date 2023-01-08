const express = require("express");
const { signup, signin, requireSignin } = require("../controller/auth");
const {check} = require("express-validator");
const router = express.Router();

router.post("/signin", signin);
router.post("/signup",[
    check("firstName")
    .notEmpty()
    .withMessage("First Name is required"),
    check("lastName")
    .notEmpty()
    .withMessage("Last Name is required"),
    check("email")
    .isEmail()
    .withMessage("Valid email is required"),
    check("password")
    .isLength({min: 6})
    .withMessage("Password should be minimum 6 characters")
], signup);


router.post("/profile",requireSignin, (req,res) => {
    res.status(200).json({ user: "profile"})
})
module.exports = router;
