const Router = require('express');
const router = new Router()
const userController = require('../controller/user.controller')

router.get('/', userController.getUsers)
router.put('/:id', userController.updateUserStatus)
router.delete('/:id', userController.deleteUser)

module.exports = router;