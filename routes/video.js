const express = require('express')
const router = express.Router()

const VideoController = require('../controllers/VideoController')

router.post('/create', VideoController.create)
router.post('/addVideo', VideoController.addVideo)
router.post('/removeVideo', VideoController.removeVideo)
router.post('/videos', VideoController.getVideos)

module.exports = router