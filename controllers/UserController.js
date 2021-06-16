const User = require('../models/User')

const register = (req, res, next) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        image: "",
        theme: "dark"
    })

    user.save().
    then(() => {
        res.json({ id: user._id })
    })
}

const login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    User.findOne({ $and: [{ username: username }, { password: password }] })
        .then(user => {
            if (user) {
                res.json({
                    user
                })
            } else {
                res.json({
                    message: 'Error'
                })
            }
        })
}

const changeImage = (req, res, next) => {
    let userId = req.body.userId
    let image = req.body.image

    User.findByIdAndUpdate({ _id: userId }, { image })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}

const changePassword = (req, res, next) => {
    let userId = req.body.userId
    let oldPassword = req.body.oldPassword
    let newPassword = req.body.newPassword

    User.findOneAndUpdate({ $and: [{ _id: userId }, { password: oldPassword }] }, { password: newPassword })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}

const changeTheme = (req, res, next) => {
    let userId = req.body.userId
    let theme = req.body.theme

    User.findOneAndUpdate({ _id: userId }, { theme })
        .then(() => {
            res.json({
                message: 'Success'
            })
        })
}



module.exports = {
    register,
    login,
    changeImage,
    changePassword,
    changeTheme
}