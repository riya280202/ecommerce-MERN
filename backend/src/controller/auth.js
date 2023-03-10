const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup= (req,res) => {


    User.findOne({email: req.body.email})
    .exec(async (error,user) => {
        if(user) return res.status(400).json({
            message: "User already exists"
        })

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        const _user = new User({ 
            firstName,
            lastName,
            email,
            hashPassword,  
            username: shortid.generate()
        })

        _user.save((error,data) => {
                if(error) {
                    return res.status(400).json({
                    message: error
                })
            }

            if(data){
                res.status(201).json({
                    // message: "user created successfully"
                    message: "User created successfully"
                })
            }
        })
    })
}

exports.signin = (req,res) => {
    User.findOne({ email: req.body.email})
    .exec((error, user) => {
        if (error){
            res.status(400).json({
                message: error
            })
        }
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({ _id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
                const {_id, firstName, lastName, email, role, fullName} = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                })
            }else{
                res.status(400).json({
                    message: "Invalid Password"
                })
            }
        } else{
            res.status(400).json({
                message: "User doesnt exist"
            })
        }
    })
}

