const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    products:[
        {
            id: {type: Schema.Types.ObjectId, required: true},
            price: {type: Number, required: true, min: 0, max: 10000000},
            quantity: {type: Number, required: true, min: 1, default: 1},
        }
    ],
    user: {type: Schema.Types.ObjectId, required: true},
    total: {type: Number, required: true},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: Date.now},
    status:{type: String, required:true, default:"open", enum: ["open", "inprogress", "delivered", "cancelled"]},
    active:{type:Boolean, default: true}

})

/* 
    products: [
        idProducto: ObjectId()
        price,
        quantity:
    ],
    createdAt: fecha creación,
    payment: {
    type:
    date:
    }
    user: ObjectId()
    updateAt: fecha actualización
    total
    status: "pending", "completed", "cancelled"
    address
    closedAt:
    receivedAt:
    active: boolean
 */

module.exports = mongoose.model('Order', orderSchema)