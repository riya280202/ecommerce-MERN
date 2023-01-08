const express = require("express");
const { signup, signin, requireSignin } = require("../controller/auth");
const {check} = require("express-validator");
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);


router.post("/profile",requireSignin, (req,res) => {
    res.status(200).json({ user: "profile"})
})
module.exports = router;
