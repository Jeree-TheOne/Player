const express = require('express')
const router = express.Router()

const PlaylistController = require('../controllers/PlaylistController')

router.post('/createPlaylist', PlaylistController.create)
router.post('/playlists', PlaylistController.get)
router.post('/updatePlaylist', PlaylistController.update)
router.post('/deletePlaylist', PlaylistController.destroy)
router.post('/addSong', PlaylistController.addSong)
router.post('/removeSong', PlaylistController.removeSong)
router.post('/getSongs', PlaylistController.getSongs)

module.exports = router