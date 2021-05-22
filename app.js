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
const {} = require('./rutas/materia.js')

//Rutas
app.get('/estudiante', getEstudiante);
app.get('/estudiante/:id', getEstudianteById);
app.post('/estudiante', postEstudiante);
app.put('/estudiante/:id', putEstudianteById);
app.delete('/estudiante/:id', deleteEstudiante);

// Servidor
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto: ', PORT);
})