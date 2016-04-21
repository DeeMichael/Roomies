var userRouter = require('express').Router(),
userController = require(__dirname + '/../controllers/userController.js')

userRouter.route('/users/signup')
          .post(userController.signup)


module.exports = userRouter
