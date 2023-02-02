const express = require("express");
const { createPage } = require("../../controller/admin/page");
const { upload, requireSignin, adminMiddleware } = require("../../middleware");
const router = express.Router();


router.post("/page/create",requireSignin, adminMiddleware, upload.fields([
    {
      name: "banners",  
    },
    {
        name: "products",  
      }
]),createPage)


module.exports = router;
