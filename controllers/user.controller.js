const User = require ('../models/user.model')

const bcrypt = require("bcrypt")
const saltRounds = 10 /* Nivel de computo que consumirá bcrypt para hashear la contraseña cuanto mas grande el nro más compleja la encriptación aunque demora más, 10 nro acorde */

const jwt = require ('jsonwebtoken')
const secret = process.env.SECRET;

async function getUserById(req, res){
    try {
        const id = req.params.id;

        const user = await User.findById(id).select({password: 0, bornDate:0}) /* Puedo con select descartar parametros que no quiero recibir */

        if(!user){
            return res.status(404).send({
                ok:false,
                message:"No se pudo encontrar el usuario"
            })
        }

        res.status(200).send({
            ok:true,
            message:"Usuario encontrado",
            user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "Usuario no encontrado"
        })
    }
}

async function getUsers(req, res){
    // res.send("GET Users desde controlador")

    try {
        const users = await User.find().select({password: 0}) /* No devuelve password */

        res.status(200).send({
            ok:true,
            message: "Usuarios obtenidos correctamente",
            users

        })

    } catch (error) {

        console.log(error)

        //Devolvemos una respuesta con un codigo 500 de internal error
        res.status(500).send({
            ok:false,
            message: "Error al obtener usuarios"
        })
    }
}

async function postUser(req, res){

    // console.log(req.body) /* Imprimo lo que va con la request en el body */

    // if(req.user.role !== "ADMIN_ROLE"){
    //     req.body.role = "CLIENT_ROLE";
    // } /* Condiciono que solo el usuario que hace la petición sea ADMIN para poder dar el valor del ROLE, sino por defecto que sea CLIENT */

    // const user = new User(req.body)

    // console.log(user)

    // user.save()
    //     .then(() =>{
    //         res.send(user)
    //     })
    //     .catch(error => {
    //         res.send("Error al crear usuario")
    //     })

    /* ALTERNATIVA TRY CATCH con Async y Await */

    try {
        if(req.user?.role !== "ADMIN_ROLE"){
            req.body.role = "CLIENT_ROLE";
        } /* Condiciono que solo el usuario que hace la petición sea ADMIN para poder dar el valor del ROLE, sino por defecto que sea CLIENT */
    
        //Encriptar la contraseña antes de guardarla en la base de datos (por medio de la libreria bcrypt)
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)

        const user = new User(req.body)

        console.log(user)

        const newUser = await user.save();

        //Borrar propiedad password
        newUser.password = undefined; /* Para cuandoo lo devolvamos seteamos el password a undefined para evitar que llegue  al front por más que este hasheado */

        res.status(201).send(newUser)    
        

    } catch (error) {
        res.status(500).send("Error al crear el usuario") /* 500: Error interno */
        console.log(error)
    }

   /*  res.send("POST Users desde controlador") */
}

async function deleteUser(req, res){
    // res.send("DELETE user desde el controlador")
    // console.log(req.params)

    
    try {
        const id = req.params.id /* id nombre que le di al param en la ruta user.routes */

        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser){
            return res.status(404).send({
                ok: false,
                message: "Usuario no encontrado"
            })
        } /* Hago return para cortar la función */

        res.status(200).send({
            ok: true,
            message: "El usuario fue borrado correctamente"
        })
        
    } catch (error) {
        res.status(500).send({
            ok:false,
            message: "Error al borrar el usuario"
        })
    }
}

async function updateUser(req, res){
    try {
        const id = req.params.id

        if(req.user.role !== 'ADMIN_ROLE' && req.user._id !== id){ /* Propiedad de req agregada en el middleware */
            return res.status(400).send({
                ok: false,
                message: 'No puede editar este usuario'
            })
        }
        // res.send("Update User")
        console.log(id)

        const newData = req.body;

        //TODO: Hashear password en el update
        if(req.body.password){

        }

        //TODO: Resetear Role

        const updatedUser= await User.findByIdAndUpdate(id, newData, {new: true}) /* new:true opcion que agrego para que cuando guarde en "updatedUser" sea el actualizado y no su version anterior */
        
        if(!updatedUser){
            return res.status(404).send({
                ok: false,
                message:"No se encontró el usuario"
            })
        }

        res.status(200).send({
            ok:true,
            message:"El usuario se actualizo correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"No se pudo actualizar el usuario"
        })
    }
}


async function login (req, res){
    // res.status(200).send({
    //     ok:true,
    //     message: 'Login correcto'

    // }) /* Para prueba */

    try {
        //Obtener email y password que me envia el usuario en el body
        const email = req.body.email?.toLowerCase(); /* Si existe el email que aplique tolowercase */
        const password = req.body.password;

        if(!email || !password){
            return res.status(400).send({
                ok:false,
                message:"Email y password son requeridos"
            })
        }

        console.log(email, password)

        //Chequear si el usuario existe y obtenerlo
        const user = await User.findOne({email: {$regex: email, $options: "i"}}) /* Me genera una nueva expresión regular devolveria independientemente de que el usr haya mandado mayus o minus*/

        
        /* Buscar solo un usuario que cumpla la condición */
        
        //Si no existe devuelvo error 404
        if(!user){
            return res.status(404).send({
                ok:false,
                message: 'Datos incorrectos'
            })
        }

        console.log(user)


        //Comparar el password enviado con el guardado en la BD. (el pass de la db esta hasheado entonces usamois bcrypt para comparar)
        const match = await bcrypt.compare(password, user.password)

        //Datos no coinciden => error
        
        if(!match){
            return res.status(400).send({
                ok:false,
                message: "Datos incorrectos"
            })
        }

        //Saco datos sensibles
        user.password = undefined;

        //Generar un token de login
        const token = jwt.sign({user}, secret, {expiresIn: '2m'}) /* Token expira en 2 min */

        //Si esta todo ok => login
        res.status(200).send({
            ok:true,
            message: 'Login correcto',
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message:'Error al hacer el login'
        })
    }
    
}

module.exports = {
    getUsers,
    postUser,
    deleteUser,
    updateUser,
    getUserById,
    login
}