const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/changeImage', UserController.changeImage)
router.post('/changePassword', UserController.changePassword)
router.post('/changeTheme', UserController.changeTheme)

module.exports = router