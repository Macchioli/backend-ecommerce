const express = require('express')
const app = express();

// const user_routes = require('./routes/user.routes')
// const product_routes = require('./routes/product.routes')
// const category_routes = require('./routes/category.routes') //!Enviado al Index de routes para no hacer tan verboso app.js
const cors = require('cors')

const api_routes = require("./routes/index.routes")

//Share public folder
app.use(express.static('public'))

//CORS
app.use(cors())/* Habilito CORS para que podamos acceder desde nuestro front */

app.use(express.json()) /* Agregar esta sentencia para que la app pueda leer el body que le mando con la request */



app.use("/api", api_routes) //!En index.routes /* Le agrego el "/api" para que la sume a la ruta base para acceder luego a las rutas definidas */

/* app.get("/", (req, res) => {

    res.send("Respuesta del servidor al path raiz")
    console.log(process.env.SERVER_PORT)
}) */ /* Me la llevo a "routes" */

module.exports = app; /* Exporto app para que pueda leerlo desde index.js */

