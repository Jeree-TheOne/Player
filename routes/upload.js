const express = require('express')
const router = express.Router()
const upload = require('express-fileupload')

router.post('/uploadImage', (req, res) => {
    if (req.files) {
        let file = req.files.image
        let filename = file.name
        file.mv('./images/' + filename, err => {
            if (err)
                res.json({ err })
            else {
                res.json({ filename })
            }
        })
    }
})

router.post('/uploadSong', (req, res) => {
    if (req.files) {
        let file = req.files.song
        let filename = file.name
        file.mv('./music/' + filename, err => {
            if (err)
                res.json({ err })
            else {
                res.json({ filename })
            }
        })
    }
})

router.post('/uploadVideo', (req, res) => {
    if (req.files) {
        let file = req.files.video
        let filename = file.name
        file.mv('./video/' + filename, err => {
            if (err)
                res.json({ err })
            else
                res.json({ filename })
        })
    }
})

module.exports = router