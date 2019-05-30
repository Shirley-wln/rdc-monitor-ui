var express = require("express");
var proxy = require("http-proxy-middleware");
var path = require("path");
var app = express();

app.use(express.static(__dirname + "/"));

const {
  IMANAGER_API_SERVER = "http://127.0.0.1:8390",
  IMANAGER_USERNAME = "admin",
  IMANAGER_PASSWORD = "admin"
} = process.env;

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/account", function(req, res) {
  res.send({ username: IMANAGER_USERNAME, password: IMANAGER_PASSWORD });
});

app.use(
  "/imanager",
  proxy({
    target: IMANAGER_API_SERVER,
    secure: false,
    localAddress: "0.0.0.0",
    changeOrigin: true
  })
);

app.use("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

var server = app.listen(8080, function() {
  console.log("8080");
});
