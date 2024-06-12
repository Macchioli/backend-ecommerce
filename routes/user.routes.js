
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller')

const auth = require('../middlewares/auth')


//GET users
// router.get("/users", (req, res) => {
//     res.send("GET users")
// }) /* Lo paso a user.routes */

router.get("/users", userController.getUsers)

//GET users by id
router.get("/users/:id", userController.getUserById)


//POST users
router.post("/users", userController.postUser)

//DELETE users
// router.delete("/users/:id", userController.deleteUser) /* Primera prueba */
router.delete("/users/:id", userController.deleteUser) /* Haremos un middleware para que chequee que el token sea válido y otro que sea role admin */
//PUT users
router.put("/users/:id", auth, userController.updateUser) /* Paso por la función middleware auth, si quiero dos o mas middlewares debería ponerlos en array [auth, ___, ___] */
//POST login
router.post("/login", userController.login) /* va con post asi mandamos en el body los datos */

module.exports = router;