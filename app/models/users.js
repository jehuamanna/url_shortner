const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs =  require('bcryptjs')
const {Schema} = mongoose


const userSchema = Schema({
    username: {
        type:String,
        required: true,
        minlength: 3
    },
    email: {
        type:String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: function() {
                return "invalid email"
            }
        }
    },
    password : {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type:String,
            }
        }
    ]
})


userSchema.pre('save', function(next){
    if(this.isNew) {
        bcryptjs.genSalt(10)
        .then((salt) =>{
            bcryptjs.hash(this.password, salt)
                .then(hashedPassword => {
                    this.password = hashedPassword
                    next()
                }).catch((err) =>{
                    console.log(err)
                })
        })
    }else{
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports= User