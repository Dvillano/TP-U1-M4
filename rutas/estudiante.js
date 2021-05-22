const {conexion} = require('../app.js');

const getEstudiante = async (req, res) => {
    try {
        let query = 'SELECT * FROM estudiante';
        let respuesta = qy(query);

        res.status(200).send({'Respuesta:': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

module.exports = {
    getEstudiante
}