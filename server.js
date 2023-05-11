
const express = require("express");
const app = express();
const cors = require("cors"); 
const mongoose = require("mongoose");
const UserRoute = require("./routes/user_route");
const SellerRoute = require("./routes/seller_route");
const ProductRoute = require("./routes/product_route");
const bodyParser = require("body-parser");
const FileRoute = require("./routes/file_route");
const ProductDetail = require("./routes/productdetail_route");
const { MONGODB_URL } = require("./config");
const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL;
const { PAYPAL_CLIENT_ID } = require("./config");
global.__basedir = __dirname;
mongoose.set("strictQuery", true);
//setting up the connection with the database
mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", () => {
  console.log("Database Connection Successful ");
});
mongoose.connection.on("error", (error) => {
  console.log("Database connection failed");
});
app.use(cors());
app.use(express.json()); //it will get the data in json format
app.use("/", UserRoute); //for buyer login and signup
app.use("/", SellerRoute); //for seller login and signup
app.use("/", ProductRoute); //for product upload
app.use("/", FileRoute); //for uploading the file and download the file
app.use("/", ProductDetail); //to show product detail

app.listen(port, () => {
  console.log(`Server started at ${baseUrl}:${port}`);
});