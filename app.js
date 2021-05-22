const express = require('express')
const mysql = require('mysql');
const util = require('util');

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

const qy = util.promisify(conexion.query).bind(conexion); // Permite el uso de async/await en la conexion mysql

//Rutas
const {} = require('./rutas/estudiante.js')
const {} = require('./rutas/materia.js')


// Servidor
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto: ', PORT);
})