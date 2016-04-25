var userRouter = require('express').Router(),
userController = require(__dirname + '/../controllers/userController.js')


userRouter.route('/user')
          .post(userController.create)
userRouter.route('/login')
          .post(userController.login)


userRouter.use(userController.authenticate)

userRouter.route('/user')
          .get(userController.getAll)
userRouter.route('/search')
          .post(userController.search)
userRouter.route('/send')
          .get(userController.sendMessage)
userRouter.route('/user/:username')
          .get(userController.getSingle)
          .put(userController.update)
          .delete(userController.destroy)
userRouter.route('/me')
          .get(userController.me)

module.exports = userRouter
