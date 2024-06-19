
const Category = require('../models/category.model')

async function getCategories(req, res){
    try {
        console.log("hola")
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "No se pudieron obtener las categorias"
        })
    }
}
async function createCategory(req, res){
    try {
        const category = new Category(req.body);

        const newCategory = await category.save();

        res.status(201).send({
            ok: true,
            message: "Categoria creada correctamente",
            category: newCategory
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "No se pudo crear las categorias"
        })
    }
}


module.exports = {
    createCategory,
    getCategories
}