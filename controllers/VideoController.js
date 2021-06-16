const Video = require('../models/Video')

const create = (req, res, next) => {
    let video = new Video({
        userId: req.body.userId,
        videos: []
    })
    video.save()
        .then(() => {
            res.json({
                video
            })
        })
}

const addVideo = (req, res, next) => {
    let playlistId = req.body.playlistId

    let videoData = {
        _id: Date.now(),
        name: req.body.name,
        artist: req.body.artist,
        path: req.body.path,
        image: req.body.image
    }

    Video.findByIdAndUpdate({ _id: playlistId }, { $push: { videos: videoData } })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}

const removeVideo = (req, res, next) => {
    let playlistId = req.body.playlistId
    let videoId = req.body.videoId

    Video.findByIdAndUpdate({ _id: playlistId }, { $pull: { videos: { _id: videoId } } })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}

const getVideos = (req, res, next) => {
    let userId = req.body.userId

    Video.findOne({ userId: userId })
        .then(video => {
            res.json({
                video
            })
        })
}

module.exports = {
    create,
    addVideo,
    removeVideo,
    getVideos
}