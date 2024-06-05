const User = require ('../models/user.model')

function getUsers(req, res){
    res.send("GET Users desde controlador")
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
    
        const user = new User(req.body)

        console.log(user)

        const newUser = await user.save();

        res.status(201).send(newUser)    
        

    } catch (error) {
        res.status(500).send("Error al crear el usuario") /* 500: Error interno */
        console.log(error)
    }

   /*  res.send("POST Users desde controlador") */
}

function deleteUser(req, res){
    res.send("DELETE user desde el controlador")
}

module.exports = {
    getUsers,
    postUser,
    deleteUser
}