const express = require("express");
const env = require("dotenv");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express();

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");



//env initialising
env.config();


// const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jhcggji.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const mongoURI = "mongodb://localhost:27017/Ecommerce"
mongoose.connect (mongoURI ,function(){
    console.log("Connected to database");
})





// app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server started running at ${process.env.PORT}`);
})