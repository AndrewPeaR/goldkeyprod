const passport = require("passport");
const bcrypt = require('bcrypt')

const AuthService = require('../services/auth-service')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


class AuthController {

    authCheck(req, res, next) {
        if(req.isAuthenticated()){
            next()
        } else {
            // console.log('не пущу')
            return res.redirect('/auth/login')
        }
    }

    async createUser(req, res) {
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                passwordHash: passwordHash,
                firstname: 'Test',
                lastname: 'Test'
            }
        })
        res.redirect('/auth/login')
    }
    async loginUser(req, res, next) {
        passport.authenticate('local', function(err, user){
            if(err)
                return next(err)
            if(!user)
                return res.send('Укажите пароль')
            req.logIn(user, function(err){
                if(err)
                    return next(err)
                return res.redirect('/admin')
            })
        })(req, res, next)
    }
    logout(req, res) {
        console.log("Выход!");
        req.logout(function(err) {
            if(err)
                return next(err)
            res.redirect('/auth/login')
        })
    }
}

module.exports = new AuthController()