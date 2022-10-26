const express = require('express')
const router = express.Router()

// import projects model 
const projectsHandler = require('../model/projects')

router.get('/users', projectsHandler.users)
router.post('/list', projectsHandler.list)
router.patch('/:id', projectsHandler.patch)
router.post('/add', projectsHandler.add)
router.post('/del', projectsHandler.del)

module.exports = router