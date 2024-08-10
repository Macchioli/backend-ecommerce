const Order = require('../models/order.model')
const Product = require('../models/product.model')

async function postOrder(req, res){

    
   
   console.log(req.body)
    try {
    
    if(req.user._id !== req.body.user) {
        return res.status(400).send({
            ok: false,
            message: "No puedes crear una orden para otro usuario"
        })
    } /* Chequeo que la orden sea enviada por un usuario habilitado */

    if(req.body.products.length === 0){
        return res.status(400).send({
            ok: false,
            message: "La orden no puede estar vacía"
        })
    } /* Chequear que no mande una orden vacía */

    await orderProductPriceVerification(req.body.products, req.body.total)

    const order = new Order(req.body);

    //Crear una función que lea cada producto recibido y uno por uno internamente hago un doble check con el valor del precio del producto almacenado en la base de datos.



    const newOrder = await order.save();

    res.status(201).send({
        ok: true,
        message: "Orden creada correctamente",
        order: newOrder
    })

   } catch (error) {
    console.log(error)
    res.status(500).send({
        ok: false,
        message: "Error al crear orden"
    })
   }
}

async function orderProductPriceVerification(products, total){

    try {
        let totalOrder = 0;
        for(let prod of products){

            totalOrder += prod.price * prod.quantity;
            const product = await Product.findById(prod.product)

            if(!product || product.price !== prod.price){
                throw new Error(`El producto con id ${prod.product} no existe o el precio no coincide`)
            }

        } /* Uso for y no foreach es porque el foreach no permite el await y el for si */

        if(totalOrder !== total){
            throw new Error("El total no es correcto")
        }

    } catch (error) {
        console.log(error);
        throw new Error("Error al verificar los precios de productos")
    }

}

async function getOrders(req, res){

    try {

        const id = req.params.idUser; /* Si no viene en la petición es opcional quedará como undefined */


        /* El usuario en su role es un ADMIN va a devolver todas las ordenes, ahora si no es admin, vamos a buscar todas las ordenes cuya propiedad "user" tengo el mismo id que el (solo las ordenes del usuario logueado) */
        const filter = req.user.role === "ADMIN_ROLE"   
                                        ? id ? {user: id} : {} //True del ternario
                                        :{user:req.user._id} //False del ternario
        /* END FILTER */
        
        const orders = await Order.find(filter).populate("user", "fullname email") /* Despliega en la petición además el dato del usuario que vincula (id) y le pido solo el fullname y email */
                                        .populate("products.product")

        if(orders.length === 0){
            return res.status(404).send({
                ok:false,
                message:"No se encontraron ordenes"
            })
        }

        return res.status(200).send({
            ok:true,
            message:"Ordenes obtenidas correctamente",
            orders
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message:"Error al obtener ordenes"
        })
    }

}

module.exports = {
    postOrder,
    getOrders
}