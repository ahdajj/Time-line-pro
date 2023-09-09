const express = require("express")
const route = express.Router()
const controleFun = require('../Controller/Controller')
const authFun = require('../Controller/authContoller')



route.get('/', (req,res)=>{res.redirect('/home')})
route.get('/home',controleFun.postDisplay)
route.get('/comment',authFun.userAuth,controleFun.allDisplay)
route.get('/signup',authFun.logInAuth, (req,res)=>{res.render('signup')})
route.get('/login',authFun.logInAuth, (req,res)=>{res.render('login',{err:''})})
route.get('/logout',controleFun.logout)

route.post('/signup',controleFun.signupUser)
route.post('/login',controleFun.logInUser)
route.post('/',controleFun.creatPost)
route.post('/comment/:id', controleFun.creatComment)


module.exports = route