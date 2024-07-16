

const router = require('express').Router();

const orderController = require('../controllers/order.controller')

//Crear orden
router.post("/orders", orderController.postOrder)

//Obtener todas las ordenes (admin)
//! router.get("/orders", orderController.getOrders)

//Obtener ordenes por ID de usuario
//!router.get("/orders/user/:id", orderController.getOrderByUserId)

//Obtener una orden específica por ID idOrder
//! router.get("/orders/:id", orderController.getOrderById)


//Editar orden
//!roueter.put("/orders/:id")

//Borrar orden va a depender de nuestra app (opcional*)
//!router.delete("/orders/:id")

module.exports = router;