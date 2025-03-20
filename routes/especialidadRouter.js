const express = require('express');
const especialidadRouter = express.Router();

const datos = ['Cardiología', 'Dermatología', 'Neurología'];

especialidadRouter.get('/', (req, res) => {
    res.render('pages/especialidad', { datos });
});

module.exports = especialidadRouter;
