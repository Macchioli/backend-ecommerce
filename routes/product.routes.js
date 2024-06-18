const express = require('express')
const router = express.Router();
const productController = require('../controllers/product.controller')

//GET products
router.get('/products', productController.getProducts)


//GET product by id

//POST products

//DELETE products (id)

//PUT products (id)
module.exports = router;