const express = require("express");
const centroRouter = express.Router();
const centroModelo = require("../modelo/centroModelo.js");

// GET: Mostrar información del centro
centroRouter.get("/", (req, res) => {
    const datos = centroModelo.recuperaDatosCentro();
    res.render("pages/centro", { datos });
});

module.exports = centroRouter;
