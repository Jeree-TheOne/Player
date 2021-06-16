const Playlist = require('../models/Playlist')

const create = (req, res, next) => {
    let playlist = new Playlist({
        userId: req.body.userId,
        name: req.body.name,
        image: req.body.image,
        songs: [],
    })
    playlist.save()
        .then(() => {
            res.json({
                playlist
            })
        })

}

const get = (req, res, next) => {
    let userId = req.body.userId

    Playlist.find({ userId: userId }).then(playlists => {
        if (playlists) {
            if (playlists.length == 1)
                res.json(playlists[0])
            else
                res.json([...playlists])
        } else {
            res.json({
                message: 'Error'
            })
        }
    })
}

const update = (req, res, next) => {
    let playlistId = req.body.playlistId

    let updatedData = {
        name: req.body.name,
        image: req.body.image
    }

    Playlist.findByIdAndUpdate({ _id: playlistId }, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}

const destroy = (req, res, next) => {
    let playlistId = req.body.playlistId

    Playlist.findByIdAndRemove({ _id: playlistId })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}

const addSong = (req, res, next) => {
    let playlistId = req.body.playlistId

    let songData = {
        _id: Date.now(),
        name: req.body.name,
        artist: req.body.artist,
        path: req.body.path,
        image: req.body.image
    }

    Playlist.findByIdAndUpdate({ _id: playlistId }, { $push: { songs: songData } })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}

const removeSong = (req, res, next) => {
    let playlistId = req.body.playlistId
    let songId = req.body.songId

    Playlist.findByIdAndUpdate({ _id: playlistId }, { $pull: { songs: { _id: songId } } })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}

const getSongs = (req, res, next) => {
    let playlistId = req.body.playlistId

    Playlist.findById({ _id: playlistId })
        .then(playlist => {
            res.json({ playlist })
        })
}

module.exports = {
    create,
    get,
    update,
    destroy,
    addSong,
    removeSong,
    getSongs
}