let timer
let highlight = 'rgb(78, 245, 66)'
let defaul = 'white'
let shuffleMode = false
let shufflePlaylist = []
let repeatMode = 1
let isPlaying = false
let songIndex = 0
let del = false


let track = document.createElement('audio')
let media = document.getElementById('videoo')
let tmpMedia = document.createElement('video')
let lastSong
let currentPlaylist = []
let currentPlaylistId

// functions

function stopVideo() {
    $(media).attr('src', '')
    duration = 0
    currentTime = 0
    currentTimeUpdate()
    durationTimeUpdate()
    resetSlider()
    isVideo = false
    clearInterval(timer)
    root.style.setProperty('--value', 0);
    $(songArtist).text('')
    $(songName).text('')
    $(songImg).css('background-image', '')
    isPlaying = false
}

function clearData() {
    $(songArtist).text('')
    $(songName).text('')
    $(songImg).css('background-image', '')
    slider.value = 0
    root.style.setProperty('--value', 0);
    track.src = ''
    pausesong()
    duration = 0
    currentTime = 0
    currentTimeUpdate()
    durationTimeUpdate()
    isPlaying = false
    repeatMode = 1
    root.style.setProperty('--one', '')
    repeat.style.color = 'var(--foreground-color)'
    shuffle.style.color = 'var(--foreground-color)'
    shuffleMode = false
    currentPlaylist = []
    shufflePlaylist = []
}


menuButton.addEventListener('click', () => {
    if (menu.classList.contains('shown')) {
        menu.classList.remove('shown');
        return
    } else menu.classList.add('shown');
})

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if (isVideo) stopVideo()
        $('#videoPlayer').hide()
        isVideo = false
        const target = document.querySelector(tab.dataset.tabTarget)
        if (target.id == 'video' && userData._id == "60bb4eff72e4036898f19ce7") return
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        const forms = $(document.forms)
        for (let i = 0; i < forms.length; i++) {
            forms[i].reset()
        }
        target.classList.add('active')
        menu.classList.remove('shown')
    })
})

changeTheme.addEventListener('click', function theme() {
    if (changeTheme.classList.contains('dark')) {
        fetch('/api/user/changeTheme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userData._id,
                theme: "light"
            })
        })
        changeTheme.classList.remove('dark')
        changeTheme.classList.add('light')
    } else {
        fetch('/api/user/changeTheme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userData._id,
                theme: "dark"
            })
        })
        changeTheme.classList.remove('light')
        changeTheme.classList.add('dark')
    }

    setTheme()
})

function setTheme() {
    if (changeTheme.classList.contains('dark')) {
        highlight = 'rgb(78, 245, 66)'
        defaul = 'white'
        root.style.setProperty('--sidebar-background-color', 'rgb(25, 25, 25)')
        root.style.setProperty('--border-background-color', 'rgb(48, 48, 48)')
        root.style.setProperty('--footer-background-color', 'rgb(37, 37, 37)')
        root.style.setProperty('--background-color', 'rgb(30, 30, 30)')
        root.style.setProperty('--foreground-color', 'rgb(255, 255, 255)')
        root.style.setProperty('--highlight-color', highlight)
        changeTheme.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-moon-stars" viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
      </svg>`
    } else {
        highlight = 'rgb(0, 153, 255)'
        defaul = 'rgb(25,25,25)'
        root.style.setProperty('--sidebar-background-color', 'white')
        root.style.setProperty('--border-background-color', 'rgb(115, 115, 115)')
        root.style.setProperty('--footer-background-color', 'rgb(210, 210, 210)')
        root.style.setProperty('--background-color', 'rgb(220, 220, 220)')
        root.style.setProperty('--foreground-color', 'rgb(54, 54, 54)')
        root.style.setProperty('--highlight-color', highlight)
        changeTheme.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      </svg>`
    }
}

shuffle.addEventListener("click", () => {
    if (currentPlaylist.length == 0) return
    shuffleMode = !shuffleMode
    if (shuffleMode) {
        shuffle.style.color = 'var(--highlight-color)'
        shuffleArray()
        swapPlaylists()
        songIndex = 0
        loadTrack()
        duration = 0
        currentTime = 0
        currentTimeUpdate()
        durationTimeUpdate()
        playsong()
    } else {
        shuffle.style.color = 'var(--foreground-color)'
        swapPlaylists()
    }
});

repeat.addEventListener("click", () => {
    repeatMode += 1
    if (repeatMode > 3) repeatMode -= 3
    if (repeatMode == 1) {
        root.style.setProperty('--one', '')
        repeat.style.color = 'var(--foreground-color)'
    }
    if (repeatMode == 2) repeat.style.color = 'var(--highlight-color)'
    if (repeatMode == 3) root.style.setProperty('--one', '"' + 1 + '"')
});

forward.addEventListener('click', () => {
    if (isVideo) return
    songIndex++
    if (songIndex >= currentPlaylist.length) {
        songIndex--
        return
    }
    loadTrack()
    playsong();

});

back.addEventListener('click', () => {
    if (isVideo) return
    songIndex--
    if (songIndex < 0) {
        songIndex++
        return
    }
    loadTrack()
    playsong();

});

function loadTrack() {

    if (currentPlaylist.length == 0) {
        currentTime = 0
        clearInterval(timer)
        resetSlider()
        track.src = lastSong.path;
        track.volume = volume.value / 100
        $(songImg).css('background-image', 'url(' + lastSong.path + 'image + ')
        $(songArtist).text(lastSong.artist)
        $(songName).text(lastSong.name)
        track.load()
        return
    } else {
        currentTime = 0
        clearInterval(timer)
        resetSlider()
        track.src = currentPlaylist[songIndex].path;
        track.volume = volume.value / 100

        $('#videoPlayer').attr('volume', volume.value / 100)
        $(songImg).css('background-image', 'url(' + currentPlaylist[songIndex].image + ')')
        $(songArtist).text(currentPlaylist[songIndex].artist)
        $(songName).text(currentPlaylist[songIndex].name)
        track.load()
        lastSong = currentPlaylist[songIndex]
    }


}

function justplay() {
    if (isPlaying == false) {
        playsong();

    } else {
        pausesong();
    }
}

function playsong() {

    if (isVideo)
        media.play()
    else if (currentPlaylist.length == 0) return
    else
        track.play()
    isPlaying = true;
    timer = setInterval(slider_position, 100)
    play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
      </svg>`

}

//pause song
function pausesong() {
    if (isVideo)
        media.pause();
    else
        track.pause();
    isPlaying = false;
    clearInterval(timer)
    play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg>`
}

function resetSlider() {
    slider.value = 0;
}

function slider_position() {
    let position = 0
    currentTime += 0.1
    if (!isVideo) duration = Math.trunc(track.duration)
    if (currentTime != duration + 1)
        currentTimeUpdate()
    durationTimeUpdate()
    if (!isNaN(track.duration) || !isNaN(media.duration)) {
        if (isVideo) {
            let d = $('#duration').text().split(':')
            let c = $('#current').text().split(':')
            slider.value = currentTime / duration * 100
        } else
            slider.value = currentTime / duration * 100
        root.style.setProperty('--value', slider.value + '%');
    }
    if (isVideo && currentTime == duration + 1) {
        clearInterval(timer)
        isPlaying = false
        root.style.setProperty('--value', '0');
        play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg>`
        stopVideo()
        $('#videoPlayer').hide()
        $('#video').addClass('active')
    }

    if (!isVideo && track.ended) {
        $('#current').text('0:00')
        isPlaying = false
        root.style.setProperty('--value', '0%');
        play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
      </svg>`
        if (repeatMode == 3) {
            loadTrack();
            playsong();
        } else {
            songIndex++
            if (songIndex == currentPlaylist.length) {
                if (repeatMode == 2) {
                    songIndex = 0
                    loadTrack()
                    playsong();
                } else {
                    songIndex = 0
                    loadTrack()
                }
            } else {
                loadTrack()
                if (currentPlaylist.length !== 0)
                    playsong();
            }
        }

    }
}

function change_duration() {
    let slider_position
    if (isVideo)
        slider_position = media.duration * (slider.value / 100)
    else
        slider_position = track.duration * (slider.value / 100);
    if (isVideo)
        media.currentTime = slider_position
    else
        track.currentTime = slider_position;
}

function volume_change() {
    track.volume = volume.value / 100;
    media.volume = volume.value / 100
}

function showPlaylist(e) {

    let id = $(e.children.playlist_id).text()
    let playlist
    if (playlistsData.length > 1)
        playlist = playlistsData.find(playlist => playlist._id == id)
    else playlist = playlistsData
    if (playlist.songs != currentPlaylist)
        songIndex = 0

    currentPlaylist = playlist.songs
    currentPlaylistId = playlist._id
    console.log(playlistsData)
    $('#playlist-name').text(playlist.name)
    $('#playlist-image').css('background-image', 'url(' + playlist.image + ')')
    loadSongs(playlist.songs)


    if ((playlistsData.length > 1 && currentPlaylistId == playlistsData[0]._id) || playlistsData._id == currentPlaylistId) {
        $('.changePlaylist').css('display', 'none')
        $('.deletePlaylist').css('display', 'none')
        $('.addSong').css('right', '62px')
    } else {
        $('.changePlaylist').css('display', 'block')
        $('.deletePlaylist').css('display', 'block')
        $('.addSong').css('right', '170px')
    }

    tabContents.forEach(tab => {
        tab.classList.remove('active')
    })

    $('#playlistShow').addClass('active')

}

function loadSongs(songs) {
    $('#playlist-songs').html('')
    let number = 1
    songs.forEach(song => {
        $('#playlist-songs').append(
            `<li class="playlists-item show" onclick="chooseTrack(this)">
            <div class="playlists-item-number">${number}</div>
            <div class="playlists-item-image" style="background-image: url(${song.image})"></div>
            <div class="playlists-item-info">
                <div class="info-name">${song.name}</div>
                <div class="info-artist">${song.artist}</div>
            </div>
            <div class="playlists-item-path" style="display: none">${song.path}</div>
            <div class="playlists-item-id" style="display: none">${song._id}</div>
            <button class="playlists-item-delete" onclick="deleteSong(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
            </button>
        </li>`
        )
        number++
    })
}

function deleteSong(e) {
    del = true
    let songId = parseInt($(e.parentNode.children[4]).text())
    fetch('/api/playlist/removeSong', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playlistId: currentPlaylistId,
            songId: songId
        })
    }).then(() => {
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
                let index = 0
                if (playlistsData.length > 1) {
                    index = playlistsData.indexOf(playlist => playlist._id == currentPlaylist)
                }
                if (index == 0) playlistsData = data.playlist
                else playlistsData[index] = data.playlist
                currentPlaylist = data.playlist.songs
                console.log(currentPlaylist)
                loadSongs(currentPlaylist)
                del = false
            })
    })

}

function chooseTrack(e) {

    if (del) return
    if (shuffleMode) {
        shuffleMode = false
        shuffle.style.color = 'var(--foreground-color)'
        swapPlaylists()
    }
    songIndex = parseInt($(e.children[0]).text()) - 1
    const songImage = $(e.children[1]).css('background-image')
    const songName = $(e.children[2].children[0]).text()
    const songArtist = $(e.children[2].children[1]).text()
    const songPath = $(e.children[3]).text()
    if (track.src == 'http://localhost:3000/' + songPath.replaceAll(' ', '%20')) {
        justplay()
        return
    }
    const songId = parseInt($(e.children[4]).text())
    $('#track-image').css('background-image', songImage)
    $('#track-name').text(songName)
    $('#track-artist').text(songArtist)
    currentTime = 0
    currentTimeUpdate()
    loadTrack()
    playsong()

}

function deletePlaylist() {
    fetch('/api/playlist/deletePlaylist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playlistId: currentPlaylistId
        })
    }).then(() => {
        $('#playlistShow').removeClass('active')
        $('#main').addClass('active')
        uploadData(userData)
    })
}

function changePlaylist(e) {
    $('#playlistImageChangePreview').css('background-image', $(e.parentNode.children[0]).css('background-image'))
    $('#playlistNameChange').attr('value', $(e.parentNode.children[1]).text())
}

function showVideoPlaylist() {
    if (userData._id == "60bb4eff72e4036898f19ce7") return
    loadVideos(videoPlaylist.videos)
}

function loadVideos(videos) {
    $('#playlist-video').html('')
    let number = 1
    videos.forEach(video => {
        $('#playlist-video').append(
            `<li class="playlists-item show" onclick="chooseVideo(this)" data-tab-target="#videoPlayer">
            <div class="playlists-item-number">${number}</div>
            <div class="playlists-item-image" style="background-image: url(${video.image})"></div>
            <div class="playlists-item-info">
                <div class="info-name">${video.name}</div>
                <div class="info-artist">${video.artist}</div>
            </div>
            <div class="playlists-item-path" style="display: none">${video.path}</div>
            <div class="playlists-item-id" style="display: none">${video._id}</div>
            <button class="playlists-item-delete" onclick="deleteVideo(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
            </button>
        </li>`
        )
        number++
    })
}

function chooseVideo(e) {

    if (del) return

    let img = $(e.children[1]).css('background-image')
    isVideo = true
    $('#video')[0].classList.remove('active')
    $('#videoPlayer').show()
    $(songImg).css('background-image', img)
    $(songArtist).text($(e.children[2].children[0]).text())
    $(songName).text($(e.children[2].children[1]).text())
    clearInterval(timer)
    media.src = $(e.children[3]).text()
    media.value = volume.value / 100
    media.load()
    currentTime = 0
    resetSlider()
    isPlaying = false
    justplay()
}

function deleteVideo(e) {
    del = true
    let videoId = parseInt($(e.parentNode.children[4]).text())
    fetch('/api/video/removeVideo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playlistId: videoPlaylist._id,
            videoId: videoId
        })
    }).then(() => {
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
                videoPlaylist = data.video.videos
                loadVideos(videoPlaylist)
                del = false
            })
    })
}

media.addEventListener('loadedmetadata', function() {
    if (media.duration == 'Infinity') {

        $(tmpMedia).attr('src', ($(media).attr('src')))
        tmpMedia.currentTime = Number.MAX_SAFE_INTEGER
        tmpMedia.addEventListener('timeupdate', function() {
            duration = Math.trunc(tmpMedia.duration)
        })

    }
})

function currentTimeUpdate() {
    let min = Math.trunc(currentTime / 60)
    let sec = Math.trunc(currentTime % 60)
    if (sec < 10) sec = '0' + sec
    $('#current').text(`${min}:${sec}`)
}

function durationTimeUpdate() {
    let min = Math.trunc(duration / 60)
    let sec = Math.trunc(duration % 60)
    if (sec < 10) sec = '0' + sec
    $('#duration').text(`${min}:${sec}`)
}
shuffleArray()

function shuffleArray() {
    currentPlaylist
    shufflePlaylist = Array.from(currentPlaylist)
    for (var i = shufflePlaylist.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shufflePlaylist[i];
        shufflePlaylist[i] = shufflePlaylist[j];
        shufflePlaylist[j] = temp;
    }
}

function swapPlaylists() {
    let tmp = currentPlaylist
    currentPlaylist = shufflePlaylist
    shufflePlaylist = tmp
}