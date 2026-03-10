const express = require('express')
const userController = require("../controllers/user.controller")
const userRoter = express.Router()

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRoter.post("/follow/:userid")

module.exports = userRoter