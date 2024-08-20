const Router = require("express").Router;
const router = new Router();

const AuthController = require('../controllers/auth-controller')

router.post('/register', AuthController.createUser)
router.post('/login', AuthController.loginUser)

router.get('/login', (req, res) => {
    res.render('pages/login.ejs', {user: ''})
})
router.get('/register', (req, res) => {
    res.render('register.ejs')
})
router.get('/logout', AuthController.logout)

module.exports = router