const User = require("../models/user");
const jwt = require("jsonwebtoken")

exports.signup= (req,res) => {


    User.findOne({email: req.body.email})
    .exec((error,user) => {
        if(user) return res.status(400).json({
            message: "User already exists"
        })

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const _user = new User({ 
            firstName,
            lastName,
            email,
            password,  
            username: Math.random().toString()
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
                const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
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

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
     
    }else{
      return res.status(400).json({ message: "Authorization required" });
    }
    
    next();
  };1