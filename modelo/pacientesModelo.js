let pacientes = require("../data/pacientes.js");
const crypto = require("crypto");

const pacienteModelo = {
    // Función para recuperar todos los pacientes
    recuperaTodosLosPacientes() {
        return pacientes; // Devuelve la lista de pacientes
    },

    // Función para dar de alta un paciente
    altaPaciente(datosPaciente) {
        const id = crypto.randomUUID(); // Genera un ID único
        datosPaciente["id"] = id; // Agrega el ID al paciente
        pacientes.push(datosPaciente); // Añade el paciente al array
    },

    // Función para obtener el índice de un paciente por ID
    recuperaIndexPaciente(id) {
        const index = pacientes.findIndex((e) =>{
            return e.id === id;
        }); // Busca por ID
        return index;
    },

    // Función para obtener un paciente por ID
    recuperaPaciente(id) {
        const index = this.recuperaIndexPaciente(id); // Usa la función existente
        console.log(index);
        if (index >= 0) {
            return pacientes[index]; // Devuelve el paciente si se encuentra
        } else {
            console.log("Paciente no encontrado");
            return null;
        }
    },

    // Función para actualizar información de un paciente
    actualizaPaciente(id, datosPaciente) {
        const idx = this.recuperaIndexPaciente(id); // Obtiene el índice
        if (idx >= 0) {
            pacientes[idx] = { id, ...datosPaciente }; // Actualiza el paciente
        } else {
            console.log("Paciente no encontrado, no se pudo actualizar");
        }
    },

    // Función para eliminar un paciente por ID
    bajaPaciente(id) {
        pacientes=pacientes.filter((e)=>{
            return e.id !=id;
        });
    }
};

module.exports = pacienteModelo;