const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const passportMiddleware = require('./middleware/passport')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const commentRoutes = require('./routes/comment.routes')
const keys = require('./keys')

const app = express()

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error))

app.use(passport.initialize())
passportMiddleware(passport)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/post', postRoutes)

module.exports = app
