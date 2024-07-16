
const Product = require('../models/product.model')

async function getProducts(req, res){
    try {
        
        const page = req.query.page || 0;
        const limit = req.query.limit || 3;

        const filter = []

        if(req.query.name) filter.push({name: {$regex: req.query.name, $options: 'i'}})/* Que se fije en la propiedad name hay algun producto que incluya en alguna parte el name y ademas en optiones "i" que sea insensitvo a mayusculas y minusculas */
        if(req.query.category) filter.push({category: req.query.category})
        if(req.query.minPrice) filter.push({price: {$gte: req.query.minPrice}})
        if(req.query.maxPrice) filter.push({price:{$lte: req.query.maxPrice}})
        
            
        if(filter.length === 0) filter.push({})
        console.log(filter)
                
        const products = await Product.find({
            
            $and: filter

            // $and:[

            //     {price: {$gte:minPrice}},
            //     {price: {$lte:maxPrice}},
            //     {category: queryCat}


            // ]/* Condiciones en el find que deberá cumplir todas si es and y alguna si es or */

        }) /* Si viene el parametro queryCat buscamos por ese valor,sino por cualquier categoria cuyo valor no sea igual a nulo */
                                      .populate("category", "name")
                                      .skip(page * limit)
                                      .limit(limit); /* Populate y cual quiero desplegar y que traiga solo el "name", puedo usar varios */

        const total = await Product.countDocuments({
            $and: filter
        });

        res.status(200).send({
            ok: true,
            message: "Productos obtenidos correctamente",
            products,
            total
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener los productos"
        })
    }
}

async function getProductById(req, res){
   try {
    
    const id = req.params.id;

    const product = await Product.findById(id).populate("category", "name");

    if(!product){
        return res.status(404).send({
            ok: false,
            message: "No se pudo encontrar el producto"
        })
    }

    res.status(200).send({
        ok: true,
        message: "Producto obtenido correctamente",
        product
    })

   } catch (error) {
    console.log(error)
    res.status(500).send({
        ok:false,
        message:"Error al obtener el producto"
    })
   }
}

async function deleteProduct(req, res){
    try {
        const id = req.params.id

        const deletedProduct = await Product.findByIdAndDelete(id)
        
        if(!deletedProduct){
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            })
        }

        res.status(200).send({
            ok: true,
            message: "Producto eliminado correctamente",
            deletedProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al eliminar  el producto"
        })
    }
}

async function createProduct(req, res){
    try {
        /* console.log(req.file) */

        
        const product = new Product(req.body)
        
        if(req.file?.filename){
            product.image = req.file.filename;
        }
        
        const newProduct = await product.save()

        res.status(201).send({
            ok:true,
            message: "Producto creado correctamente",
            product: newProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "Error al crear producto"
        })
    }
}

async function updateProduct(req, res){
    try {
       const id = req.params.id

       const newData = req.body;

       if(req.file?.filename){
        newData.image = req.file.filename
       }else{
         delete newData.image
       }

       newData.updatedAt = Date.now()

       console.log(newData, id)


       const updatedProduct = await Product.findByIdAndUpdate(id, newData, {new:true})

       if(!updatedProduct){
        return res.status(404).send({
            ok: false,
            message: "Producto no encontrado"
        })
       }

       res.status(200).send({
        ok: true,
        message: "Producto actualizado correctamente",
        updatedProduct
       })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al actualizar producto"
        })
    }
}


module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}