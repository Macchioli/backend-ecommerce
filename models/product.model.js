const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
        index: true, /* Parametro index nos permite formar un índice de esta propiedad lo que luego me permitirá generar búsquedas por este medio*/
        trim: true
    },
    price:{
        type: Number,
        min: 0,
        max: 10000000,
        required: true
    },
    description: {
        type: String,
        minlength: 0,
        maxlength: 400,
        required: true,
        trim: true
    },
    image:{
        type: String, /* Tipo string ya que guardaremos el nombre del archivo con el que iremos a buscar la imagen */
        trim: true
    },
    createdAt:{
        type: Number,
        default: Date.now /* para que por defecto cuando se crea el objeto inserte la fecha de creación, sin parentesis para evitar que todos los productos creen la misma fecha sino sobreescribe */
    },
    active:{
        type: Boolean,
        default: true,  
    },
    updatedAt:{
        type: Number,
        default: Date.now /* Misma que cuando se creo, pero cuando se actualiza se modificará */
    },
    category:{
        type: String,
        required: true,
        index: true
    }
})

module.exports = mongoose.model("Product", productSchema) /* Dependiendo del nombre que le damos en la base de datos en Mongo creará una colección llamada productS (plural y minuscula) */