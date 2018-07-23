const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
const https = require('https');
const fs = require('fs');

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/materialize", express.static("./node_modules/materialize-css/dist"));
app.use("/materialize-iconfont", express.static("./node_modules/material-design-icons/iconfont"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));

mongoose.connect(`mongodb://localhost:27017/accounts`, {useNewUrlParser: true,});

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app, db);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});