const express = require('express');
const patientsRouter = express.Router();
const modelo = require('../modelo/patientsModelo.js');

patientsRouter.use(express.urlencoded({ extended: true }));

// Ruta para listar pacientes
patientsRouter.get('/', (req, res) => {
    const pacientes = modelo.recuperaTodosLosPacientes();
    const pacientesSimplificados = pacientes.map(paciente => ({
        id: paciente.id,
        apellido: paciente.apellido,
        fechaNacimiento: paciente.fechaNacimiento,
        genero: paciente.genero
    }));
    res.render('pages/patients/patientsLista', { pacientes: pacientesSimplificados });
});

// GET -- Mostrar la página para añadir un paciente
patientsRouter.get('/alta', (req, res) => {
    res.render('pages/patients/patientsAlta');
});

// POST -- Guardar la información del nuevo paciente
patientsRouter.post('/alta', (req, res) => {
    const paciente = {
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero
    };
    modelo.altaPaciente(paciente);
    res.redirect('/patients');
});

// GET -- Mostrar la página para editar un paciente
patientsRouter.get('/edita/:id', (req, res) => {
    const idPaciente = req.params.id;
    const paciente = modelo.recuperaPaciente(idPaciente);
    if (paciente) {
        const pacienteSimplificado = {
            id: paciente.id,
            apellido: paciente.apellido,
            fechaNacimiento: paciente.fechaNacimiento,
            genero: paciente.genero
        };
        res.render('pages/patients/patientsActualiza', { paciente: pacienteSimplificado });
    } else {
        res.status(404).send('Paciente no encontrado');
    }
});

// POST -- Actualizar la información de un paciente
patientsRouter.post('/edita/:id', (req, res) => {
    const pacienteActualizado = {
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero
    };
    modelo.actualizaPaciente(req.params.id, pacienteActualizado);
    res.redirect('/patients');
});

// GET -- Eliminar un paciente
patientsRouter.get('/baja/:id', (req, res) => {
    const idPaciente = req.params.id;
    modelo.bajaPaciente(idPaciente);
    res.redirect('/patients');
});

module.exports = patientsRouter;
