/* URL Shorter By Pan Chen*/
'use strict'
const log = console.log
log('Express server')
var bodyParser = require('body-parser')
const express = require('express')

const app = express()
var session = require('express-session')

app.use(express.static(__dirname + '/pub'))
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(bodyParser.json())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

const mongoose = require('./mongoose.js')
const schemas = require('./schemas.js')
const urlSchema = schemas.urlSchema
const userSchema = schemas.userSchema
const Url = mongoose.model('url', urlSchema, 'url')
const User = mongoose.model('user', userSchema, 'user')
const Bcrypt = require("bcryptjs");
app.use(express.static(__dirname + '/public'))
app.get('/',function(req,res) {
    if (req.session.loggedin) {
        res.sendFile(__dirname + '/public/homepage.html')
    }
    else {
        res.redirect(302, "/login")
    }
})


app.get('/signup',function(req,res) {
    res.sendFile(__dirname + '/public/signup.html')
})

app.get('/login',function(req,res) {
    res.sendFile(__dirname + '/public/login.html')
})



app.get('/checker',function(req,res) {
    Url.find({'maker': req.session.username}, function(err, links){
         res.send(links)
    })
})


app.post('/add-user', (req, res) => {
    req.body.user.password = Bcrypt.hashSync(req.body.user.password, 10)
    let user = new User(req.body.user)

    user.save(function (err, user) {
        if (err) return console.error(err)
        res.send("success")
    })
})


app.post('/change-password', (req, res) => {
    req.body.newPassword = Bcrypt.hashSync(req.body.newPassword, 10);

    User.findOneAndUpdate({username: req.session.username}, {$set:{password: req.body.newPassword}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        else {
            res.send("success")
        }
    })
})

app.post('/auth', (req, res) => {
    User.findOne({username: req.body.user.username}, function(err, user) {
        if (err) return console.error(err)
        if (user === null) {
            res.send("The Username doesn't exist!")
        }
        else if (!Bcrypt.compareSync(req.body.user.password, user.password)) {
            res.send("The Username and Password doesn't match!")
        }
        else {
            req.session.loggedin = true
            req.session.username = user.username
            req.session.quote = user.quote
            res.send("success")
        }
    })
})


app.post('/add', (req, res) => {


    if(req.session.quote <= 0 ) {
        res.send("quote not enough")
    }
    else if(!(/^[a-z0-9]+$/.test(req.body.shortUrl))) {
        res.send("illegal char")
    }
    else {
        var url = new Url(
            {
                fullUrl: req.body.fullUrl,
                shortUrl: req.body.shortUrl,
                maker: req.session.username
            })
        url.save(function (err, url) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) 
                {
                    res.send("duplicated shorturl")
                }
                else {
                    if (err) return console.error(err)
                }
            }
            else {
                User.findOneAndUpdate(
                    { 'username': req.session.username},
                    { '$inc': { 'quote': -1 } }, 
                    function (err, user) {
                        if (err) throw err
                        req.session.quote -= 1
                        res.send("success")
                    }
                )
            }
            })  
    }
})


app.post('/delete', (req, res) => {
    Url.findOneAndRemove({shortUrl : req.body.shortUrl}, function (err,url){
        const username = url.maker
        User.findOneAndUpdate(
            { 'username': username},
            { '$inc': { 'quote': +1 } }, 
            function (err, user) {
                if (err) throw err
                req.session.quote += 1
                res.send("success")
            }
        )
      })
})

app.get('/:shortUrl([0-9|a-z]+)', (req, res) => {
    const shorUrl = req.params.shortUrl
    Url.findOne(
        {
            shortUrl: shorUrl
        }, 
        function (err, url) 
        {
            if (err) return console.error(err)
            if (url == undefined) {
                res.send("nothing found")
            }
            else {
                const fullUrl = url.fullUrl
                res.redirect(302, fullUrl)
            }
        }
    
    )
})

const port = process.env.PORT || 43030
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
