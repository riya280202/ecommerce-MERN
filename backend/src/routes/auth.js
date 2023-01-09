const express = require("express");
const { signup, signin } = require("../controller/auth");
const { validateSignUpRequest, isRequestvalidated, validateSignInRequest } = require("../validators/auth");
const router = express.Router();

router.post("/signin",validateSignInRequest, isRequestvalidated, signin);
router.post("/signup", validateSignUpRequest, isRequestvalidated, signup);


// router.post("/profile",requireSignin, (req,res) => {
//     res.status(200).json({ user: "profile"})
// })
module.exports = router;
