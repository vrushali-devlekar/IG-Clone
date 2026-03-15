const express = require('express')
const userController = require("../controllers/user.controller")
const { followUserController } = require("../controllers/user.controller")
const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router()

// #region agent log
fetch('http://127.0.0.1:7451/ingest/3d550d3a-ff66-418a-a277-40e39bfad48c', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Debug-Session-Id': '94c3c6'
  },
  body: JSON.stringify({
    sessionId: '94c3c6',
    runId: 'pre-fix',
    hypothesisId: 'H1-H2',
    location: 'src/routes/user.routes.js:beforeRoute',
    message: 'Types of follow route handlers',
    data: {
      identifyUserType: typeof identifyUser,
      userControllerKeys: Object.keys(userController || {}),
      followUserControllerType: typeof followUserController
    },
    timestamp: Date.now()
  })
}).catch(() => {});
// #endregion agent log

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

module.exports = userRouter