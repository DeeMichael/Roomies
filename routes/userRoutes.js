var userRouter = require('express').Router(),
userController = require(__dirname + '/../controllers/userController.js')

userRouter.route('/user')
          .get(userController.getAll)
          .post(userController.create)
userRouter.route('/user/:id')
          .get(userController.getSingle)
          .put(userController.update)
//           .delete(userController.destroy)

module.exports = userRouter
