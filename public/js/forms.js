    /// Registration
    const registerForm = document.forms.registerForm

    registerForm.addEventListener('submit', e => {
        e.preventDefault()
        console.log(registerForm)
        if (registerForm.username.value.replace(/ /g, '') && registerForm.password.value.replace(/ /g, '')) {
            fetch('/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: registerForm.username.value,
                        password: registerForm.password.value
                    })
                }).then(response => response.json())
                .then(data => {
                    fetch('/api/playlist/createPlaylist', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId: data.id,
                            name: "Мой плейлист",
                            image: "/images/default.jpg"
                        })
                    }).then(() => {
                        fetch('/api/video/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userId: data.id
                            })
                        })
                    })
                })
        }
        registerForm.username.value = ''
        registerForm.password.value = ''
        $('#register').removeClass('active')
        $('#login').addClass('active')
    })

    /// Login
    const loginForm = document.forms.loginForm

    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        let user
        if (loginForm.username.value.replace(/ /g, '') && loginForm.password.value.replace(/ /g, '')) {
            fetch('/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: loginForm.username.value,
                        password: loginForm.password.value
                    })
                }).then(response => response.json())
                .then(data => {
                    user = data.user
                    uploadData(user)
                    if (user !== undefined) {
                        root.style.setProperty('--clips-color', 'white')
                        root.style.setProperty('--clips-color-highlight', 'rgb(78, 245, 66)')
                        let list = document.getElementById('drop-menu').children;
                        [...list].forEach(elem => {
                            if (elem == list[0]) elem.classList.remove('show')
                            else elem.classList.add('show')
                        })
                    }
                })
            loginForm.username.value = ''
            loginForm.password.value = ''
            $('#login').removeClass('active')
            $('#main').addClass('active')
        }
    })

    // New playlist
    const addPlaylistForm = document.forms.addPlaylistForm

    addPlaylistForm.addEventListener('submit', e => {
        e.preventDefault()

        if (addPlaylistForm.name.value.replace(/ /g, '')) {
            fetch('/api/playlist/createPlaylist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userData._id,
                        name: addPlaylistForm.name.value,
                        image: playlistImage
                    })
                }).then(response => response.json())
                .then(data => {
                    fetch('/api/playlist/playlists', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userId: userData._id
                            })
                        }).then(response => response.json())
                        .then(data => {
                            playlistsData = data
                        })
                    playlistImage = '/images/default.jpg'
                    addItem(data.playlist)
                    addItemSide(data.playlist)
                    $(`#playlistImageAddPreview`).css('background-image', 'url(' + playlistImage + ')')
                    addPlaylistForm.name.value = ''
                    $('#addPlaylist').removeClass('active')
                    $('#main').addClass('active')
                })
        }
    })

    /// Change password
    const changePasswordForm = document.forms.changePasswordForm

    changePasswordForm.addEventListener('submit', e => {
        e.preventDefault()
        if (changePasswordForm.newPass.value === changePasswordForm.repeatPass.value) {
            fetch('/api/user/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userData._id,
                    oldPassword: changePasswordForm.oldPass.value,
                    newPassword: changePasswordForm.newPass.value
                })
            }).then(() => {
                changePasswordForm.oldPass.value = ''
                changePasswordForm.newPass.value = ''
                changePasswordForm.repeatPass.value = ''
                $('#account').removeClass('active')
                $('#main').addClass('active')
            })
        }
    })

    /// add music default
    const addMusicDefaultForm = document.forms.addMusicDefaultForm

    addMusicDefaultForm.addEventListener('submit', e => {
        e.preventDefault()
        if (addMusicDefaultForm.name.value.replace(/ /g, '') !== '' && addMusicDefaultForm.artist.value.replace(/ /g, '') !== '' && songPath != '') {
            let id
            if (playlistsData.length > 1) id = playlistsData[0]._id
            else id = playlistsData._id
            fetch('/api/playlist/addSong', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        playlistId: id,
                        name: addMusicDefaultForm.name.value,
                        artist: addMusicDefaultForm.artist.value,
                        path: songPath,
                        image: songImage
                    })
                })
                .then(() => {
                    songPath = ''
                    songImage = '/images/defaultsong.jpg'
                    addMusicDefaultForm.name.value = ''
                    addMusicDefaultForm.artist.value = ''
                    fetch('/api/playlist/getSongs', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                playlistId: id
                            })
                        }).then(response => response.json())
                        .then(data => {
                            if (playlistsData.length > 1) {
                                const index = playlistsData.findIndex(playlist => playlist._id == id)
                                playlistsData[index].songs = data.playlist.songs
                            } else if (playlistsData.length != 0) {
                                playlistsData.songs = data.playlist.songs
                            }
                            $('#songImageAddPreviewD').css('background-image', `url(${songImage})`)
                            $('#addMusicDefault').removeClass('active')
                            $('#main').addClass('active')
                        })

                })
        }
    })

    /// add music
    const addMusicForm = document.forms.addMusicForm

    addMusicForm.addEventListener('submit', e => {
        e.preventDefault()
        if (addMusicForm.name.value.replace(/ /g, '') !== '' && addMusicForm.artist.value.replace(/ /g, '') !== '' && songPath != '') {
            fetch('/api/playlist/addSong', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        playlistId: currentPlaylistId,
                        name: addMusicForm.name.value,
                        artist: addMusicForm.artist.value,
                        path: songPath,
                        image: songImage
                    })
                })
                .then(() => {
                    songPath = ''
                    songImage = '/images/defaultsong.jpg'
                    addMusicForm.name.value = ''
                    addMusicForm.artist.value = ''
                    fetch('/api/playlist/getSongs', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                playlistId: currentPlaylistId
                            })
                        }).then(response => response.json())
                        .then(data => {
                            if (playlistsData.length > 1) {
                                const index = playlistsData.findIndex(playlist => playlist._id == currentPlaylistId)
                                playlistsData[index].songs = data.playlist.songs
                            } else if (playlistsData.length != 0) {
                                playlistsData.songs = data.playlist.songs
                            }
                            $('#songImageAddPreview').css('background-image', `url(${songImage})`)
                            $('#addMusic').removeClass('active')
                            $('#main').addClass('active')
                        })

                })
        }
    })

    /// change playlist form
    const changePlaylistForm = document.forms.changePlaylistForm

    changePlaylistForm.addEventListener('submit', e => {
        e.preventDefault();
        playlistImage = $(changePlaylistForm.children[0]).css('background-image')
        playlistImage = playlistImage.slice(5, playlistImage.length - 2)
        if (changePlaylistForm.name.value.replace(/ /g, '') != '') {
            fetch('/api/playlist/updatePlaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playlistId: currentPlaylistId,
                    name: changePlaylistForm.name.value,
                    image: playlistImage
                })
            }).then(() => {
                uploadData(userData)
                playlistImage = './image/default.jpg'
                $('#changePlaylist').removeClass('active')
                $('#main').addClass('active')
            })
        }
    })

    /// add video 
    const addVideoForm = document.forms.addVideoForm

    addVideoForm.addEventListener('submit', e => {
        e.preventDefault()
        if (videoPath != '' && addVideoForm.name.value.replace(/ /g, '') != '' && addVideoForm.artist.value.replace(/ /g, '') != '') {
            fetch('/api/video/addVideo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playlistId: videoPlaylist._id,
                    name: addVideoForm.name.value,
                    artist: addVideoForm.artist.value,
                    path: videoPath,
                    image: videoImage
                })
            }).then(() => {
                videoPath = ''
                videoImage = './images/defaultsong.jpg'
                addVideoForm.name.value = ''
                addVideoForm.artist.value = ''
                fetch('/api/video/videos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId: userData._id
                        })
                    }).then(response => response.json())
                    .then(data => {
                        videoPlaylist = data.video
                        console.log(videoPlaylist)
                        $('#videoImageAddPreview').css('background-image', `url(${videoImage})`)
                        $('#addVideo').removeClass('active')
                        $('#main').addClass('active')
                    })
            })
        }
    })