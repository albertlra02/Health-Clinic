const express = require('express');
const indexRouter = express.Router();

const especialidadRouter = require('./especialidadRouter');
const pacienteRouter = require('./pacienteRouter');
const medicosRouter = require('./medicosRouter');
const practitionersRouter = require('./practitionersRouter');
const patientsRouter = require('./patientsRouter');
const centroRouter = require("./centroRouter");

// Rutas principales
indexRouter.use('/especialidad', especialidadRouter);
indexRouter.use('/pacientes', pacienteRouter);
indexRouter.use('/medicos', medicosRouter);
indexRouter.use('/practitioners', practitionersRouter);
indexRouter.use('/patients', patientsRouter);
indexRouter.use('/centro', centroRouter);

// Ruta para la página de inicio
indexRouter.get('/', (req, res) => {
    res.render('pages/inicio', { mensaje: 'Bienvenidos a la clínica' });
  });

// Ruta para manejar errores 404
indexRouter.all('*', (req, res) => {
    res.status(404);
    res.render('pages/inicio', { mensaje: 'Página no encontrada' });
});

module.exports = indexRouter;
