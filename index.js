const express = require('express')
const fs = require('fs')
const path = require('path')
require('./config/database')
const useragent = require('express-useragent')
const port = 3002
const app = express()
app.use(express.json())
app.use(useragent.express())
const morgan = require('morgan')

const { bookmarkRouter} = require('./app/controllers/url-controller')
const { rootUrlRouter } = require('./app/controllers/root-url-controller')
const { userRouter} = require('./app/controllers/user-controller')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))


// app.use('/bookmarks/tags', tagsRouter)
app.use('/users', userRouter)
app.use('/bookmarks', bookmarkRouter)
app.use('/', rootUrlRouter)

app.get('*', function(req, res){
    res.status(404).send('Error - route not found');
  });

app.listen(port, () => {
    console.log('server is up and running in port ', port)
})