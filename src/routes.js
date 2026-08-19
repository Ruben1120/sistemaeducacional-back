const express = require("express");
const routes = express.Router();
const Login = require("./controllers/LoginController");

routes.post("/login", Login);


module.exports = routes;
