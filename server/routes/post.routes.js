const passport = require('passport')
const {Router} = require('express')
const {create, getAll, getById, update, remove, addView, getAnalytics} = require('../controllers/post.controller')
const upload = require('../middleware/upload')
const router = Router()

router.post(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  upload.single('image'),
  create
)

router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  getById
)

router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  update
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  remove
)

router.get(
  '/admin/get/analytics',
  passport.authenticate('jwt', {session: false}),
  getAnalytics
)

router.get('/', getAll)
router.get('/:id', getById)
router.put('/add/view/:id', addView)

module.exports = router
