require('dotenv').config(); /* Creo la variable que me permite la librería para acceder a .env que manejará datos sensibles. Lo hago al principio del script */

const mongoose = require('mongoose')

const app = require('./app') /* Importo de desde app.js */

// const express = require('express'); Pasa a app.js

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("\x1b[35m Conectado a la DB \x1b[37m" )

        app.listen(process.env.SERVER_PORT, () => { /* Leo la variable de entorno que definí en .env como "SERVER_PORT" */

        console.log("\x1b[36m Servidor funcionado en puerto 3000 \x1b[37m") 
    })
        
    })
    .catch(error => console.log(error))
  
// app.listen(process.env.SERVER_PORT, () => { /* Leo la variable de entorno que definí en .env como "SERVER_PORT" */

//     console.log("Servidor funcionado en puerto 3000")
// }) /* Lo pasamos dentro del then => del servidor cuando se conecta a la DB */