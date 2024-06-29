const express = require('express')
const router = express.Router();
const productController = require('../controllers/product.controller')
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin')
const upload = require('../middlewares/upload')

//GET products
router.get('/products', productController.getProducts)

//GET product by id
router.get('/products/:id', productController.getProductById)


//!Rutas que solo pueda usar o consumir un Admin
//POST products
router.post('/products',[auth, isAdmin, upload], productController.createProduct)

//DELETE products (id)
router.delete('/products/:id', [auth, isAdmin], productController.deleteProduct)

//PUT products (id)
router.put('/products/:id', [auth, isAdmin, upload], productController.updateProduct)


module.exports = router;