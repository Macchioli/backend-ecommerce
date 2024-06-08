const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    fullname: {
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 80
    },
    email: {
        type: String, 
        required:true, 
        unique: true, 
        minLength: 5, 
        maxLength: 100, 
        trim: true,
        validate:{
            validator: (value) => {
                const regex = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/
                return regex.test(value)
            } /* Valido por medio de un pattern */
        } 
    }, /* Trim borra espacios evitando errores de tipeo */
    password: {
        type: String, 
        required: true, 
        minLength: 4, 
        maxLength: 100,
        trim: true /* Evitamos espacios en principio y final */
    },
    bornDate: {
        type:Date, 
        required: true
    },
    location: {
        type: String
    },
    role: {
        type: String, 
        default:"CLIENT_ROLE", 
        enum:["ADMIN_ROLE", "CLIENT_ROLE", "USER_ROLE"]
    } /* Declaro el valor por defecto y enumero las posibles entradas */

})

module.exports = mongoose.model("User", userSchema) /* El nombre define el nombre de la colección en la base de datos "User" al peticionar lo pasa a minuscula y pluraliza "users" */