const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')
/* const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin') */

//GET Categories
router.get('/categories', categoryController.getCategories)

//POST Categories
router.post('/categories',categoryController.createCategory)


module.exports = router;