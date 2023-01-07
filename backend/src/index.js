const express = require("express");
const env = require("dotenv");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express();

//routes
const userRoutes = require("./routes/user");



//env initialising
env.config();


const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jhcggji.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect (mongoURI ,function(){
    console.log("Connected to database");
})





// app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", userRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server started running at ${process.env.PORT}`);
})