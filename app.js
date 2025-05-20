// import
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

// import DB connection
const connection = require("./init/mongoDB");


// import todo route
const todoRoute = require("./routes/todo");

// init app
const app = express();
connection();


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",todoRoute);


// view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

module.exports=app;