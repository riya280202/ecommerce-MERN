const {check, validationResult} = require("express-validator");

exports.validateSignUpRequest = [
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
];

exports.validateSignInRequest = [
    check("email")
    .isEmail()
    .withMessage("Valid email is required"),
    check("password")
    .isLength({min: 6})
    .withMessage("Password should be minimum 6 characters")
];

exports.isRequestvalidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
            errors: errors.array()[0].msg
        })
    }
    next();
}