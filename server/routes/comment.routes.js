const {Router} = require('express')
const {create} = require('../controllers/comment.controller')
const router = Router()

router.post('/', create)

module.exports = router
