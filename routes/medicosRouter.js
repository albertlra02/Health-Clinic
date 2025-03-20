const express = require('express');
const medicosRouter = express.Router();
const modelo = require("../modelo/medicosModelo.js");

medicosRouter.use(express.urlencoded({ extended: true }));

// Ruta para listar médicos
medicosRouter.get('/', (req, res) => {
    const medicos = modelo.recuperaTodosLosMedicos();
    res.render('pages/medicos/medicosLista', {medicos}); // Renderiza la vista 'medicos.ejs' y pasa el array de médicos
});

// GET -- Mostrar la página para añadir un medico
medicosRouter.get('/alta', (req, res) => {
    res.render("pages/medicos/medicosAlta");
});

// POST -- Guardar la información del nuevo medico
medicosRouter.post('/alta', (req, res) => {
    const medico = { id: req.body.id, nombre: req.body.nombre, apellido: req.body.apellido,
        especialidad: req.body.especialidad, experiencia: parseInt(req.body.experiencia), centro: req.body.centro };
    modelo.altaMedico(medico);
    res.redirect("/medicos");
});

//Ruta para actualizar medicos

// GET -- Mostrar la página para editar un medico
medicosRouter.get('/edita/:id', (req, res) => {
    const idMedico = req.params.id;
    const medico = modelo.recuperaMedico(idMedico); // Aquí se usa directamente un valor literal
    res.render('pages/medicos/medicosActualiza', { medico });
});

// POST -- Actualizar la información de un medico
medicosRouter.post('/edita/:id', (req, res) => {
    const idMedico = req.params.id;
    modelo.actualizaMedico(idMedico, req.body); // También con un valor fijo en lugar de parámetros dinámicos
    res.redirect('/medicos');
});

// GET -- Eliminar un medico
medicosRouter.get('/baja/:id', (req, res) => {
    const idMedico=req.params.id;
    modelo.bajaMedico(idMedico); // Valor literal en lugar de dinámico
    res.redirect('/medicos');
});

module.exports = medicosRouter;