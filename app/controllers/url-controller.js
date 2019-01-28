const express = require('express')
const router = express.Router()
const { Bookmark } = require('../models/bookmark')

router.get('/tags/', (req, res) => {
    let names = req.query.names
    if (!names) {
        const tags = req.query.names.split(',')
        Bookmark.find({ tags: { "$in": tags } })
            .then((bookmark) => {
                res.send(bookmark)
            })
            .catch((err) => {
                console.log('ii')
                res.send(err)
            })
    }

})


router.get('/tags/:name', (req, res) => {
    const name = req.params.name
    console.log(name)
    Bookmark.find({ tags: name })
        .then((bookmarks) => {
            res.send(bookmarks)
        })
        .catch((err) => {
            res.send(err)
        })
})



router.get('/', (req, res) => {
    Bookmark.find()
        .then((bookmarks) => {
            res.send(bookmarks)
        })
        .catch((err) => {
            res.status(404).send('Error - route not found')
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Bookmark.findById(id)
        .then((bookmark) => {
            res.send(bookmark)
        })
        .catch((err) => {
            res.status(404).send('Error - route not found')
        })
})

router.post('/', (req, res) => {
    const body = req.body
    const bookmark = new Bookmark(body)
    bookmark.save()
        .then((bookmark) => {
            res.send(bookmark)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Bookmark.findByIdAndUpdate(id, body, { new: true })
        .then((bookmark) => {
            res.send(bookmark)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Bookmark.findByIdAndDelete(id)
        .then((bookmark) => {
            res.send(bookmark)
        })
        .catch((err) => {
            res.send(err)
        })
})


router.get('*', function (req, res) {
    res.status(404).send('Error - route not found');
});

module.exports = {
    bookmarkRouter: router
}