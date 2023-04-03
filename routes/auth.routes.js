const Router = require('express');
const router = new Router()
const AuthController = require('../controller/auth.controller')

router.post('/signup', AuthController.signUp)
router.post('/signin', AuthController.signIn)


module.exports = router;