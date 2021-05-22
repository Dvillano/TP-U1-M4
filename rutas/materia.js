const {conexion} = require('../app.js');
const util = require('util');


const qy = util.promisify(conexion.query).bind(conexion); 

//GET 
const getMateria = async (req, res) => {
    try {
        let query = 'SELECT * FROM materia';
        let respuesta = await qy(query);

        res.status(200).send({'Respuesta:': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

const getMateriabyid = async (req, res) => {
    try {

        let query = 'SELECT * FROM materia WHERE id = ?'
        let respuesta = await qy(query, [req.params.id])

        if (respuesta.length == 0){
            res.status(413).send('Esa materia no existe');
        }

        res.status(200).send({'Respuesta:': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

const getStudentByMateria = async (req, res) => {
    try {

        let query = 'SELECT * FROM materia WHERE id = ?'
        let respuesta = await qy(query, [req.params.id])

        if (respuesta.length == 0){
            res.status(413).send('Esa materia no existe');
        }

        query = 'SELECT * FROM estudiante WHERE id_materia = ?'
        respuesta = await qy(query, [req.params.id])

        res.status(200).send({'Respuesta:': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

const getStudentByMateriaAndId = async (req, res) => {
    try {
        let query = 'SELECT * FROM materia WHERE id = ?'
        let respuesta = await qy(query, [req.params.id])

        if (respuesta.length == 0){
            res.status(413).send('Esa materia no existe');
        }

        query = 'SELECT * FROM estudiante WHERE id_materia = ? AND id = ?'
        respuesta = await qy(query, [req.params.id, req.params.id_estudiante])
        
        res.status(200).send({'Respuesta:': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

const postMateria = async (req, res) => {
    try {
        if (!req.body.nombre){
            throw new Error ('Falta enviar el nombre');
        }

        let query = 'SELECT id FROM materia WHERE nombre = ?';
        let respuesta = await qy(query, [req.body.nombre.toUpperCase()]);

        if (respuesta.length > 0) {
            throw new Error ('Esa materia ya existe');
        }

        query = 'INSERT INTO materia (nombre) VALUE (?)';
        respuesta = await qy(query, [req.body.nombre.toUpperCase()]);

        res.send({'respuesta': respuesta});

    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

const putMateriaById = async (req, res) => {
    try {
        let nombre = req.body.nombre

        if (!nombre){
            res.stats(413).send('No ingresaste el nombre de la materia');
        }
    
        let  query = 'SELECT id FROM materia WHERE id = ?'
        let respuesta = await qy(query, [req.params.id]);

        if (respuesta == 0){
            res.status(413).send('Esa materia no existe');
        }

        query = 'UPDATE materia SET nombre = ? WHERE id = ?'
        respuesta = await qy(query, [nombre, req.params.id]);

        res.send({'respuesta': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

const deleteMateriaById = async (req, res) => {
    try {

        let query = 'SELECT * FROM estudiante WHERE id_materia = ?';
        let respuesta = await qy(query, [req.params.id]);

        // Verificar que la categoria tenga productos para no borrarla 
        if (respuesta.length > 0){
            throw new Error('Esta materia tiene estudiantes asociados no se puede borrar');
        }

        query = 'DELETE FROM materia WHERE id = ?'
        respuesta = await qy(query, [req.params.id]);

        res.send({'respuesta': respuesta});
    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message});
    }
}

module.exports = {
    getMateria, getStudentByMateria, getStudentByMateriaAndId, postMateria,getMateriabyid, putMateriaById, deleteMateriaById
}