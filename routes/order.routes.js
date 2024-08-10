

const router = require('express').Router();

const orderController = require('../controllers/order.controller')

const auth = require('../middlewares/auth')

//Crear orden
router.post("/orders", auth, orderController.postOrder)

//Obtener todas las ordenes (admin)
//! router.get("/orders", orderController.getOrders)
router.get("/orders/:idUser?", auth ,orderController.getOrders); //Parametro opcional: /orders/idUser? 

//Obtener ordenes por ID de usuario
//!router.get("/orders/user/:id", orderController.getOrderByUserId) //Realizado dentro del mismo obtener todas las ordenes

//Obtener una orden específica por ID idOrder
//! router.get("/orders/:id", orderController.getOrderById)



//Editar orden
//!roueter.put("/orders/:id")

//Borrar orden va a depender de nuestra app (opcional*)
//!router.delete("/orders/:id")

module.exports = router;