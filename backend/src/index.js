const express = require("express");
const env = require("dotenv");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express();



//env initialising
env.config();


const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jhcggji.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect (mongoURI ,function(){
    console.log("Connected to database");
})



app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get("/", function(req, res,next){
    res.status(200).json({
        message: "HII good morning"
    });
})

app.post("/data", (req, res,next) => {
    res.status(200).json({
        message: req.body
    });
})


app.listen(process.env.PORT, () => {
    console.log(`Server started running at ${process.env.PORT}`);
})