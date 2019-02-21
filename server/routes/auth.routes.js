const {Router} = require('express')
const {login, create} = require('../controllers/auth.controller')
const router = Router()

router.post('/admin/login', login)
router.post('/admin/create', create)

module.exports = router
