const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    songs: {
        type: Array
    },
}, )

const Playlist = mongoose.model('Playlist', playlistSchema)
module.exports = Playlist