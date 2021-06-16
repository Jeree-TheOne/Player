const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema({
    userId: {
        type: String
    },
    videos: {
        type: Array
    },
}, )

const Video = mongoose.model('Video', videoSchema)
module.exports = Video