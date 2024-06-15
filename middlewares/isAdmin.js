//Este middleware se va a combinar con el middleware de autenticación para verificar si el usuario es administrador o no.

function isAdmin(req, res, next){


    if(req.user?.role === "ADMIN_ROLE"){

        next();

    }else{
        return res.status(400).send({
            ok: false,
            message: "No puede acceder a este método"
        })
    }

}

module.exports = isAdmin;