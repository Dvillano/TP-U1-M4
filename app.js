const express = require('express')
const mysql = require('mysql');


const app = express();
const PORT = 3000;

app.use(express.json());

// Conexion con mysql
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clases'
});

// Verificar si se pudo conectar a DB
conexion.connect( (error) => {
    if (error){
        throw error;
    }
    console.log('Conexion con la base de datos establecida');
});

exports.conexion = conexion;
//Rutas
const {getEstudiante, getEstudianteById, postEstudiante, putEstudianteById, deleteEstudiante} = require('./rutas/estudiante.js')
const {getMateria, getMateriabyid, getStudentByMateria, getStudentByMateriaAndId, postMateria, putMateriaById, deleteMateriaById} = require('./rutas/materia.js')

//Rutas estudiante
app.get('/estudiante', getEstudiante);
app.get('/estudiante/:id', getEstudianteById);
app.post('/estudiante', postEstudiante);
app.put('/estudiante/:id', putEstudianteById);
app.delete('/estudiante/:id', deleteEstudiante);

//Rutas materia
app.get('/materia', getMateria);
app.get('/materia/:id', getMateriabyid);
app.get('/materia/:id/estudiante', getStudentByMateria);
app.get('/materia/:id/estudiante/:id_estudiante', getStudentByMateriaAndId);
app.post('/materia', postMateria);
app.put('/materia/:id', putMateriaById);
app.delete('/materia/:id', deleteMateriaById);

// Servidor
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto: ', PORT);
})