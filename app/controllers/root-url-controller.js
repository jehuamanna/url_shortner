const express = require('express')
const router = express.Router()
const { Bookmark } = require('../models/bookmark')



router.get('/:hash', (req, res) => {
    // console.log(req.useragent)
    console.log(req.connection.remoteAddress)

    click = {
        date: Date.now(),
        ipAddress: req.connection.remoteAddress,
        browserName: req.useragent.browser,
        osType: req.useragent.os,
        deviceType: req.useragent.isDesktop ? 'desktop' : 'mobile'
    }
    const hash = req.params.hash


    Bookmark.findOneAndUpdate({hashed_url:hash}, {$push:{clicks:click}}, { new: true})
        .then((bookmark) => {
            res.redirect(bookmark.original_url)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/', (req, res) => {
    res.send("Welcome to url shortner")
})


module.exports = {
    rootUrlRouter: router
}