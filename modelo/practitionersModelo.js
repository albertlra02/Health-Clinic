let practitioners = require("../data/practitioners.js");
const crypto = require("crypto");

const medicoModelo = {
    //funcion listado
    recuperaTodosLosMedicos(){
        return practitioners.map(practitioner => {
            // Buscar extensiones específicas
            const experiencia = practitioner.extension?.find(ext => ext.url === "http://example.org/fhir/extensions#yearsOfExperience")?.valueInteger || 0;
            const centro = practitioner.extension?.find(ext => ext.url === "http://example.org/fhir/extensions#hospital")?.valueString || "Desconocido";

            return {
                id: practitioner.id,
                nombre: practitioner.name[0]?.given[0] || "N/A",
                apellido: practitioner.name[0]?.family || "N/A",
                especialidad: practitioner.qualification[0]?.code.text || "General",
                experiencia: experiencia,
                centro: centro
            };
        });
    },

    // Función para añadir un médico
    altaMedico(datosMedico) {
        const nuevoPractitioner = {
            resourceType: "Practitioner",
            id: crypto.randomUUID(),
            name: [
                {
                    family: datosMedico.apellido,
                    given: [datosMedico.nombre]
                }
            ],
            qualification: [
                {
                    code: { text: datosMedico.especialidad }
                }
            ]
        };
        practitioners.push(nuevoPractitioner);
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
        const resource = practitioners.find((p) => p.id === id);
        if (!resource) return null;
        return {
            id: resource.id,
            apellido: resource.name[0].family,
            nombre: resource.name[0].given.join(" "),
            especialidad: resource.qualification?.[0]?.code?.text || "N/A"
        };
    },

    // Función para actualizar información de un medico
    actualizaMedico(id, datosMedico) {
        const idx = practitioners.findIndex((p) => p.id === id);
        if (idx === -1) return;
        practitioners[idx] = {
            ...practitioners[idx],
            name: [
                {
                    family: datosMedico.apellido,
                    given: [datosMedico.nombre]
                }
            ],
            qualification: [
                {
                    code: { text: datosMedico.especialidad }
                }
            ]
        };
    },

    // Función para eliminar un medico por ID
    bajaMedico(id) {
        practitioners = practitioners.filter((p) => p.id !== id);
    }
};

module.exports = medicoModelo;