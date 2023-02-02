const express = require("express");
const env = require("dotenv");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path");


const app = express();

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");


//env initialising
env.config();


// const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jhcggji.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const mongoURI = "mongodb://localhost:27017/Ecommerce"
mongoose.connect (mongoURI ,function(){
    console.log("Connected to database");
})





app.use(cors());
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server started running at ${process.env.PORT}`);
})