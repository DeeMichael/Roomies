var userRouter = require('express').Router(),
userController = require(__dirname + '/../controllers/userController.js')


userRouter.route('/user')
          .get(userController.getAll)
          .post(userController.create)

userRouter.route('/login')
          .post(userController.login)

userRouter.use(userController.authenticate)

userRouter.route('/search')
          .post(userController.search)

userRouter.route('/user/:id')
          .get(userController.getSingle)
          .put(userController.update)
          .delete(userController.destroy)

userRouter.route('/me')
          .get(userController.me)

module.exports = userRouter
