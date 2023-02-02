const express = require("express");
const { initalData } = require("../../controller/admin/initialData");
const { requireSignin, adminMiddleware } = require("../../middleware");
const router = express.Router();

router.post("/initialData", requireSignin, adminMiddleware, initalData);


// router.post("/profile",requireSignin, (req,res) => {
//     res.status(200).json({ user: "profile"})
// })
module.exports = router;
