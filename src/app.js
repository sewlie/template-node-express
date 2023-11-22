const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const postRoutes = require('./routes/post-routes')
const rewardsRoutes = require('./routes/rewards-routes')

const keys = require('./config/keys')
const passportSetup = require('./config/passport-setup')

const app = express()

app.set('view engine','ejs')
app.engine('ejs',require('ejs').__express)

//cookie settings
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

//setup CSS
app.use(express.static(__dirname))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongodb.dbURL)
.then(() => {
    console.log('connected to db')
})

app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)
app.use('/post',postRoutes)
app.use('/rewards',rewardsRoutes)

app.get('/', (req,res) => {
    //res.send("homepage")
    res.redirect('/profile/user')
})

app.get('/sewlie', (req,res) => {
    res.redirect('https://sewlie.com')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})