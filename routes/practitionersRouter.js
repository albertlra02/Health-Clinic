const express = require('express');
const practitionersRouter = express.Router();
const modelo = require("../modelo/practitionersModelo.js");

practitionersRouter.use(express.urlencoded({ extended: true }));

// Ruta para listar médicos
practitionersRouter.get('/', (req, res) => {
    const medicos = modelo.recuperaTodosLosMedicos().map(medico => ({ 
        id: medico.id, 
        apellido: medico.apellido 
    }));
    res.render('pages/practitioners/practitionersLista', {medicos}); // Renderiza la vista 'medicos.ejs' y pasa el array de médicos
});

// GET -- Mostrar la página para añadir un medico
practitionersRouter.get('/alta', (req, res) => {
    res.render("pages/practitioners/practitionersAlta");
});

// POST -- Guardar la información del nuevo medico
practitionersRouter.post('/alta', (req, res) => {
    const medico ={
        apellido: req.body.apellido
    };
    modelo.altaMedico(medico);
    res.redirect("/practitioners");
});

//Ruta para actualizar medicos

// GET -- Mostrar la página para editar un medico
practitionersRouter.get('/edita/:id', (req, res) => {
    const idMedico = req.params.id;
    const medico = modelo.recuperaMedico(idMedico); // Aquí se usa directamente un valor literal
    if (medico) {
        res.render('pages/practitioners/practitionersActualiza', { medico: { id: medico.id, apellido: medico.apellido } });
    } else {
        res.status(404).send("Médico no encontrado");
    }
});

// POST -- Actualizar la información de un medico
practitionersRouter.post('/edita/:id', (req, res) => {
    const medico = {
        apellido: req.body.apellido
    };
    modelo.actualizaMedico(req.params.id, medico);
    res.redirect('/practitioners');
});

// GET -- Eliminar un medico
practitionersRouter.get('/baja/:id', (req, res) => {
    const idMedico=req.params.id;
    modelo.bajaMedico(idMedico); // Valor literal en lugar de dinámico
    res.redirect('/practitioners');
});

module.exports = practitionersRouter;
