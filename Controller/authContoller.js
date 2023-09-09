// const Post = require('../models/Posts')
// const Comment = require('../models/Comments')
// const Users = require('../models/Users')
// const bcrypt = require('bcrypt')
// require('./Controller');
const jwt = require('jsonwebtoken')



const userAuth = (req ,res , next ) =>{
    if(req.cookies.jwt){
      jwt.verify(req.cookies.jwt ,'this is a random text for jwt sign' , function (err , decodedUser){
          if (err){
              console.log('issue with verify token',err)
          } else {
               res.locals.userId = decodedUser.dataFortoken.id
               res.locals.userFulname = decodedUser.dataFortoken.Name
               res.locals.userEmail = decodedUser.dataFortoken.Email
          }  
      } )           
      next()
    }else {
      res.redirect('/login')
    }
}

const logInAuth = (req ,res , next ) =>{
  if(req.cookies.jwt){
        res.redirect('/home')
  }else {
      next()
  }
}



module.exports = {
    userAuth,
    logInAuth
}