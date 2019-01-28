const express = require('express')
const router = express.Router()
const User= require('../models/users')



router.get('/', (req, res)=>{

    User.find()
        .then((user) => {

            res.send(user)
        })
        .catch((err) =>{
            res.send(err)
        })
})


router.post('/register', (req, res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send({
                user,
                notice: 'user added successfully'
            })
        })
        .catch((err) =>{
            res.send(err)
        })
})




router.delete('/:id', (req, res)=>{
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then((user) =>{
            res.send(user)
        })
        .catch((err) =>{
            res.send(err)
        })
})

module.exports = {
    userRouter:router
}