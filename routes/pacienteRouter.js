const express = require('express');
const pacienteRouter = express.Router();
const modelo = require("../modelo/pacientesModelo.js");


pacienteRouter.use(express.urlencoded({ extended: true }));

// Ruta para listar pacientes
pacienteRouter.get('/', (req, res) => {
    const pacientes = modelo.recuperaTodosLosPacientes();
    res.render('pages/pacientes/pacientesLista', { pacientes });
});

// GET -- Mostrar la página para dar de alta un paciente
pacienteRouter.get('/alta', (req, res) => {
    res.render("pages/pacientes/pacientesAlta");
});

// POST -- Guardar la información del nuevo paciente
pacienteRouter.post('/alta', (req, res) => {
    const paciente = { id: req.body.id, nombre: req.body.nombre, apellido: req.body.apellido, 
        edad: parseInt(req.body.edad), genero: req.body.genero, direccion: req.body.direccion, patologia: req.body.patologia };
    modelo.altaPaciente(paciente);
    res.redirect("/pacientes");
});

//Ruta para actualizar pacientes

// GET -- Mostrar la página para editar un paciente
pacienteRouter.get('/edita/:id', (req, res) => {
    const idPaciente = req.params.id;
    const paciente = modelo.recuperaPaciente(idPaciente); // Aquí se usa directamente un valor literal
    res.render('pages/pacientes/pacientesActualiza', { paciente });
});

// POST -- Actualizar la información de un paciente
pacienteRouter.post('/edita/:id', (req, res) => {
    const idPaciente = req.params.id;
    modelo.actualizaPaciente(idPaciente, req.body); // También con un valor fijo en lugar de parámetros dinámicos
    res.redirect('/pacientes');
});

// GET -- Eliminar un paciente
pacienteRouter.get('/baja/:id', (req, res) => {
    const idPaciente=req.params.id;
    modelo.bajaPaciente(idPaciente); // Valor literal en lugar de dinámico
    res.redirect('/pacientes');
});

module.exports = pacienteRouter;
