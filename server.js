const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

let authed = false;

app.post("/login", (req, res) => {
  console.log("Yo");
  if(req.body.pass) authed = true;
  res.json({authed});
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
