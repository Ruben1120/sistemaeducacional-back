const express = require("express");
const routes = express.Router();
const Login = require("./controllers/LoginController");
const RegistroAula = require("./controllers/AulaController").store;
const ListaAulas = require("./controllers/AulaController").index;
const deleteAula = require("./controllers/AulaController").remove;
const listaAula = require("./controllers/AulaController").show;
const editaAula = require("./controllers/AulaController").update;
routes.post("/login", Login);

routes.post("/registro-aula", RegistroAula);
routes.get("/registro-aula", ListaAulas);
routes.get("/registro-aula/:id", listaAula);
routes.delete("/registro-aula/:id", deleteAula);
routes.put("/registro-aula/:id", editaAula);
module.exports = routes;
