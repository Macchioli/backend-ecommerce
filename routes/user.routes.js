
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller')

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
router.delete("/users/:id", userController.deleteUser)
//PUT users
router.put("/users/:id", userController.updateUser)
//POST login


module.exports = router;