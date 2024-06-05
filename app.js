const express = require('express')
const app = express();

const user_routes = require('./routes/user.routes')
const product_routes = require('./routes/product.routes')


app.use(express.json()) /* Agregar esta sentencia para que la app pueda leer el body que le mando con la request */

app.use("/api", [user_routes, product_routes]) /* Le agrego el "/api" para que la sume a la ruta base para acceder luego a las rutas definidas */

/* app.get("/", (req, res) => {

    res.send("Respuesta del servidor al path raiz")
    console.log(process.env.SERVER_PORT)
}) */ /* Me la llevo a "routes" */

module.exports = app; /* Exporto app para que pueda leerlo desde index.js */

