let patients = require("../data/patients.js");
const crypto = require("crypto");

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

const pacienteModelo = {
    // Función para recuperar todos los pacientes
    recuperaTodosLosPacientes() {
        return patients.map(patient => {
            const patologia = patient.extension?.find(ext => ext.url === "http://example.org/fhir/StructureDefinition/pathology")?.valueString || "Desconocido";
            const direccion = patient.address?.[0]?.city || "Desconocida";
            return{
                id: patient.id,
                nombre: patient.name?.[0]?.given?.[0] || "N/A",
                apellido: patient.name?.[0]?.family || "N/A",
                fechaNacimiento: patient.birthDate || "Desconocida",
                edad: calcularEdad(patient.birthDate),
                genero: patient.gender || "N/A",
                direccion: direccion,
                patologia: patologia 
            };    
        });
    },

    // Función para dar de alta un paciente
    altaPaciente(datosPaciente) {
        const nuevoPatient = {
            resourceType: "Patient",
            id: crypto.randomUUID(),
            name: [
                {
                    family: datosPaciente.apellido,
                    given: [datosPaciente.nombre]
                }
            ],
            gender: datosPaciente.genero,
            birthDate: datosPaciente.fechaNacimiento,
            address: [
                {
                    city: datosPaciente.direccion
                }
            ],
            extension: [
                {
                    url: "http://example.org/fhir/StructureDefinition/pathology",
                    valueString: datosPaciente.patologia
                }
            ]
        };
        patients.push(nuevoPatient);
    },

    // Función para obtener el índice de un paciente por ID
    recuperaIndexPaciente(id) {
        const index = patients.findIndex((e) =>{
            return e.id === id;
        }); // Busca por ID
        return index;
    },

    // Función para obtener un paciente por ID
    recuperaPaciente(id) {
        const index = this.recuperaIndexPaciente(id); // Usa la función existente
        if (index >= 0) {
            return patients[index]; // Devuelve el paciente si se encuentra
        } else {
            console.log(`Paciente con ID ${id} no encontrado`);
            return null;
        }
    },

    // Función para actualizar información de un paciente
    actualizaPaciente(id, datosPaciente) {
        const idx = this.recuperaIndexPaciente(id); // Obtiene el índice
        if (idx >= 0) {
            const pacienteExistente = patients[idx];
            patients[idx] = { ...pacienteExistente,
                name: [
                    {
                        family: datosPaciente.apellido,
                        given: [datosPaciente.nombre]
                    }
                ],
                gender: datosPaciente.genero,
                birthDate: datosPaciente.fechaNacimiento,
                address: [
                    {
                        city: datosPaciente.direccion
                    }
                ],
                extension: [
                    {
                        url: "http://example.org/fhir/StructureDefinition/pathology",
                        valueString: datosPaciente.patologia
                    }
                ]
            };
        } else {
            console.log(`Paciente con ID ${id} no encontrado. No se pudo actualizar.`);
        }
    },

    // Función para eliminar un paciente por ID
    bajaPaciente(id) {
        const inicialLength = patients.length;
        patients = patients.filter(patient => patient.id !== id);
        if (patients.length < inicialLength) {
            console.log(`Paciente con ID ${id} eliminado exitosamente.`);
        } else {
            console.log(`Paciente con ID ${id} no encontrado. No se pudo eliminar.`);
        }
    }
};

module.exports = pacienteModelo;
