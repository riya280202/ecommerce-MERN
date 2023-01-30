const express = require("express");
const { initalData } = require("../../controller/admin/initialData");
const router = express.Router();

router.post("/initialData", initalData);


// router.post("/profile",requireSignin, (req,res) => {
//     res.status(200).json({ user: "profile"})
// })
module.exports = router;
