let medicos = require("../data/medicos.js");
const crypto = require("crypto");

const medicoModelo = {
    //funcion listado
    recuperaTodosLosMedicos(){
        return medicos; 
    },

    // Función para añadir un médico
    altaMedico(datosMedico) {
        const id = crypto.randomUUID(); // Genera un ID único
        datosMedico["id"] = id; // Agrega el ID al medico
        medicos.push(datosMedico); // Añade el medico al array
    },

    // Función para obtener el índice de un medico por ID
    recuperaIndexMedico(id) {
        const index = medicos.findIndex((e) =>{
            return e.id === id;
        }); // Busca por ID
        return index;
    },
   
    // Función para obtener un medico por ID
    recuperaMedico(id) {
        const index = this.recuperaIndexMedico(id); // Usa la función existente
        if (index >= 0) {
            return medicos[index]; // Devuelve el medico si se encuentra
        } else {
            console.log("medico no encontrado");
            return null;
        }
    },

    // Función para actualizar información de un medico
    actualizaMedico(id, datosMedico) {
        const idx = this.recuperaIndexMedico(id); // Obtiene el índice
        if (idx >= 0) {
            medicos[idx] = { id, ...datosMedico }; // Actualiza el medico
        } else {
            console.log("Medico no encontrado, no se pudo actualizar");
        }
    },

    // Función para eliminar un medico por ID
    bajaMedico(id) {
        medicos=medicos.filter((e)=>{
            return e.id !=id;
        });
    }
}

module.exports = medicoModelo;