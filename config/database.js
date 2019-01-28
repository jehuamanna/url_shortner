const mongoose = require('mongoose')
// DB configuration
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/url-shortner', {useNewUrlParser: true})
    .then(()=> {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('Error connecting to db')
    })

module.exports = {
    mongoose
}