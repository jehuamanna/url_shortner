const mongoose = require('mongoose')
const sh = require('shorthash')
const validator = require('validator')


const {Schema} = mongoose
const contactSchema = new Schema({
    title: {
        type: String,
        required : true,
        minlength: 3,
        maxlength: 128
    },
    original_url : {
        type: String,
        validate: {
            validator: function(value) {
                return isURL(value)
            }
        },
        required: true,
    },
    tags : {
        type: [String]
    },
    hashed_url: {
        type: String,
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
    clicks : [{
        date: Date,
        ipAddress: String,
        browserName: String,
        osType: String,
        deviceType:String
    }],
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

contactSchema.pre('save',function(next) {
    this.hashed_url = sh.unique(this.original_url)
    next()

})


const Bookmark = mongoose.model('Bookmark', contactSchema)
module.exports ={
    Bookmark
}