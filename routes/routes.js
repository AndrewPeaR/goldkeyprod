const Router = require('express').Router
const router = new Router()
const postsRouter = require('./posts')
const adminRouter = require('./admin')
const authRouter = require('./auth')
const questionsRouter = require('./questions')
const { authCheck } = require('../controllers/auth-controller')

router.use('/auth', authRouter)
router.use('/posts', postsRouter)
router.use('/questions', questionsRouter)
router.use('/admin', authCheck, adminRouter)

module.exports = router