//Chequeamos si el usuario esta logueado, para eso corroboramos que tenga un token válido

const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

function jwtVerify(req, res, next){ 

    const token = req.headers.authorization; /* Aqui es donde recibiremos el token desde la request enviado en la cabecera */
    // const token = req.headers.authorization.split(" ")[1]//Alternativa Bearer

    //Chequeamos si nos enviaron un token, de no ser así retornamos un 401 : unauthorized
    if(!token){
        return res.status(401).send({
            ok:false,
            message: 'El token es requerido'
        })
    }

    jwt.verify(token, SECRET, (error, payload) =>{ /* error variable que toma valor si esta mal el token y el payload si esta ok me devuelve lo que guarde en el token */

        if(error){
            return res.status(401).send({
                ok:false,
                message:'Token vendido ó inválido'
            })
        }

        console.log(payload)

        req.user = payload.user /* Cada request que pase por esta función, si el token esta correcto le voy a agregar a la request: req.user (inventada por mi) y le asigno el valor del usuario que tenia guardado en el token */

        next(); /* Método que permite al llegar la etapa permite continuar con la función que sigue, en user.routes despues del middleware */
    }) 



}



module.exports = jwtVerify;