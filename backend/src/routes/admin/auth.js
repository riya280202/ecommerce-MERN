const express = require("express");
const { signup, signin, requireSignin } = require("../../controller/admin/auth");
const { validateSignUpRequest, isRequestvalidated, validateSignInRequest } = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signin", validateSignInRequest, isRequestvalidated, signin);
router.post("/admin/signup", validateSignUpRequest, isRequestvalidated, signup);


// router.post("/profile",requireSignin, (req,res) => {
//     res.status(200).json({ user: "profile"})
// })
module.exports = router;
