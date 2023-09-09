const Post = require('../models/Posts')
const Comment = require('../models/Comments')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const signupUser =(req,res)=>{
    if(req.body.password!== ''){
        var hash = bcrypt.hashSync(req.body.Password, 12)
        let userObj ={
            ...req.body,
            Password:hash
        }     
    const newUser = new Users(userObj)
    newUser.save()
    .then (()=>{
        res.redirect('/home')
    })
    .catch(err =>{
        console.log(err)
    })
 }
}

const logInUser = (req,res)=>{
    Users.findOne({Email:req.body.Email})
      .then(user => {
        if(user !== null){
            let correctPass = bcrypt.compareSync(req.body.Password,user.Password);
            if (correctPass){
                let dataFortoken = {                               
                    id:user._id, 
                    Name: user.Name,
                    email:user.Email,
                    post:user.post
                }
                let userToken=jwt.sign({dataFortoken},'this is a random text for jwt sign')
                res.cookie('jwt', userToken)
                res.redirect('/comment')
            }else{
                res.render('login' ,{err: 'password is not correct'})
            }

        }else {
            res.render('login',{err:'user is not registerd'})
        }
      })
      .catch(err =>{
        console.log(err)
      })
}    

const postDisplay = (req,res)=>{
    Post.find().sort({createdAt: -1})   
    .then((result)=>{
       res.render('index',{posts: result});
    })
    .catch((err)=>{
        console.log(err)
    })
}

const allDisplay = (req,res)=>{
    Post.find()
    .populate("comment")
        .sort({created_at: -1})
        .then((data)=>{
            console.log(data)
             res.render('Comment',{comment:data.comment , posts:data});
             })
             .catch((err)=>{
                console.log(err)
            })
}
    
const creatPost = (req,res)=>{

    jwt.verify(req.cookies.jwt ,'this is a random text for jwt sign' , function (err , decodedUser){
        if (err){
            console.log('issue with verify token',err)
        } else {
              res.userId = decodedUser.dataFortoken.id
              res.userFulname = decodedUser.dataFortoken.Name
        } 
        })

    const post = new Post({
        ...req.body,
        title:res.userFulname,
        userId:res.userId
    });  
    post.save()
    .then((result)=>{
        Users.findById(res.userId)
        .then((user)=>{
            user.post.push(post._id)
            user.save()
             .then(()=>{
                res.redirect('/comment')
             })
             .catch((err)=>{
                console.log(err)
             })
        })
        .catch((err)=>{
            console.log(err)
        })
     })
    .catch((err)=>{
       console.log(err)
    })
}

const creatComment = (req,res)=>{
    
    jwt.verify(req.cookies.jwt ,'this is a random text for jwt sign' , function (err , decodedUser){
        if (err){
            console.log('issue with verify token',err)
        } else {
              res.userId = decodedUser.dataFortoken.id
        } 
        }) 

    const comment = new Comment({
        body: req.body.body,
        PostId:req.params.id,
        userId:res.userId
    })
    comment.save()
    .then((result)=>{
        Post.findById(req.params.id)
        .then((Post)=>{
            Post.comment.push(comment._id)
            Post.save()
             .then(()=>{
                Users.findById(res.userId)
                .then((user)=>{
                    user.comment.push(comment._id)
                    user.save()
                     .then(()=>{
                        res.redirect('/comment')
                     })
                     .catch((err)=>{
                        console.log(err)
                     })
                })
                .catch((err)=>{
                    console.log(err)
                })
             })
             .catch((err)=>{
                console.log(err)
             })
        })
        .catch((err)=>{
            console.log(err)
         })
    })
    .catch((err)=>{
       console.log(err)
    })
}

const logout = (req,res)=>{
    res.clearCookie('jwt');
    res.redirect('/home')
}



module.exports = {
    signupUser,
    logInUser,
    postDisplay,
    allDisplay,
    creatPost,
    creatComment,
    logout
}




// const allDisplay = (req,res)=>{
//     Post.find()
//     .populate("comment")
//     .sort({created_at: -1})
//     .then((data)=>{
//         Comment.find().sort({createdAt: -1}) 
//         .populate('PostId')
//         .then((result)=>{
//          res.render('Comment',{comment:result , posts:data});
//          })
//          .catch((err)=>{
//             console.log(err)
//         })
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }