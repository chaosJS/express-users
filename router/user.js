const express = require('express')
const router = express.Router()

// import user model 
const userHandler = require('../model/user')

router.post('/register', userHandler.register)
router.post('/login', userHandler.login)
router.post('/me', userHandler.me)
router.get('/logout', userHandler.logout)

module.exports = router