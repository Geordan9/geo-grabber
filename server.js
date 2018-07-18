const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const request = require("request");
var https = require('https');
var fs = require('fs');

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

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});