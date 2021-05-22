const {conexion} = require('../app.js');
const util = require('util');


const qy = util.promisify(conexion.query).bind(conexion); // Permite el uso de async/await en la conexion mysql

//GET 
const getEstudiante = async (req, res) => {
    try {
        let query = 'SELECT * FROM estudiante';
        let respuesta = await qy(query);

        res.status(200).send({'Respuesta:': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

const getEstudianteById = async (req, res) => {
    try {
        let query = 'SELECT * FROM estudiante WHERE id = ?'
        let respuesta = await qy(query, [req.params.id]) //Params porque el id  va en la URL

        res.status(200).send({'Respuesta:': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

//POST
const postEstudiante = async (req, res) => {
    try {
        let nombre = req.body.nombre.toUpperCase();
        let apellido = req.body.apellido.toUpperCase();
        let id_materia = req.body.id_materia

        if (!nombre || !apellido || !id_materia){
            res.status(413).send('Faltan datos');
        }

        query = 'SELECT * FROM estudiante WHERE nombre = ? AND apellido = ?';
        respuesta = await qy(query, [nombre, apellido]);

        if (respuesta.length > 0){
            res.status(413).send('Este estudiante ya esta registrado');
        }

        query = 'SELECT id FROM materia WHERE id = ?'
        respuesta = await qy(query, [id_materia]);

        if (respuesta == 0){
            res.status(413).send('Esa materia no existe');
        }


        query = 'INSERT INTO estudiante(nombre, apellido, id_materia) VALUES(?, ? ,?)';
        respuesta = await qy(query, [nombre, apellido, id_materia]);


        res.send({'respuesta': respuesta});

    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

//PUT 
const putEstudianteById = async (req, res) => {
    try {
        let id_materia = req.body.id_materia

        if (!id_materia){
            res.stats(413).send('No ingresaste la materia nueva');
        }
    
        let  query = 'SELECT id FROM materia WHERE id = ?'
        let respuesta = await qy(query, [id_materia]);

        if (respuesta == 0){
            res.status(413).send('Esa materia no existe');
        }

        query = 'UPDATE estudiante SET id_materia = ? WHERE id = ?'
        respuesta = await qy(query, [id_materia, req.params.id]);

        res.send({'respuesta': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

//DELETE
const deleteEstudiante = async (req, res) => {
    try {
        let query = 'DELETE FROM estudiante WHERE id = ?'
        let respuesta = await qy(query, [req.params.id]);

        res.send({'respuesta': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
} 

module.exports = {
    getEstudiante,getEstudianteById,postEstudiante, putEstudianteById, deleteEstudiante
}