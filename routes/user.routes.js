
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller')

//GET users
// router.get("/users", (req, res) => {
//     res.send("GET users")
// }) /* Lo paso a user.routes */

router.get("/users", userController.getUsers)

//GET users by id

//POST users
router.post("/users", userController.postUser)

//DELETE users
router.delete("/users", userController.deleteUser)
//PUT users
//POST login


module.exports = router;