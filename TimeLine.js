const express = require('express');
const mongoose = require('mongoose');
const router = require('./Config/Routes')
const app = express();
const cookieParser = require('cookie-parser')


const dburi = 'mongodb+srv://ahd:JnZoTn5lLZpOSWNa@cluster0.eh9taen.mongodb.net/timeline?retryWrites=true&w=majority'
mongoose.connect(dburi)
.then((result)=> app.listen(3000))  
.catch((err)=> console.log(err));



app.set('view engine','ejs');  


app.use(express.static('public')) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(router)




