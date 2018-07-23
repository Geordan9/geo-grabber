const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models");

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

let authed = false;

app.use(express.static("public"));
app.use("/materialize", express.static("./node_modules/materialize-css/dist"));
app.use("/materialize-iconfont", express.static("./node_modules/material-design-icons/iconfont"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/media-recorder", express.static("./node_modules/media-recorder-js"))

mongoose.connect(`mongodb://localhost:27017/accounts`, {useNewUrlParser: true,});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require("./routes/api-routes.js")(app, db);

app.post("/login", (req, res) => {
  if(req.body.pass) authed = true;
  res.json({authed});
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
