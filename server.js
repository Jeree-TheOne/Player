const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const upload = require('express-fileupload')

const PlaylistRoute = require('./routes/playlist')
const UserRoute = require('./routes/user')
const VideoRoute = require('./routes/video')
const UploadRoute = require('./routes/upload')

mongoose.connect('mongodb://localhost:27017/app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', err => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json())
app.use(express.static("public"))
app.use('/music', express.static('music'))
app.use('/images', express.static('images'))
app.use('/video', express.static('video'))
app.use(upload())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/playlist', PlaylistRoute)
app.use('/api/user', UserRoute)
app.use('/api/upload', UploadRoute)
app.use('/api/video', VideoRoute)