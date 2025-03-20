const centroModelo = {
    datosCentro: {
        nombre: "Hospital general Rotterdam",
        telefono: "949383888",
        correo: "correo@correo.com"
    },

    // Método para recuperar los datos del centro
    recuperaDatosCentro() {
        return this.datosCentro;
    }
};

module.exports = centroModelo;
