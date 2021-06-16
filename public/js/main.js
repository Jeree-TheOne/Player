function defaultUser() {
    tabs.forEach(tab => {
        const target = document.querySelector(tab.dataset.tabTarget)
        $(target).removeClass('active');
    })
    $('#main').addClass('active');
    menu.classList.remove('shown')
    fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "Guest",
                password: ""
            })
        })
        .then(response => response.json())
        .then(data => {
            userData = data.user
            uploadData(userData)
        })

    let list = document.getElementById('drop-menu').children;
    [...list].forEach(elem => {
        if (elem == list[0]) elem.classList.add('show')
        else elem.classList.remove('show')
    })
    icoContainer.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
  </svg>`
    root.style.setProperty('--clips-color', 'rgb(90, 90, 90')
    root.style.setProperty('--clips-color-highlight', 'rgb(90, 90, 90)')
    clearData()
    setTheme()
}

function uploadData(user) {
    userData = user
    if (userData !== undefined && userData !== null) {
        playlists.innerHTML = ""
        $('#main').html('')
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
                if (playlistsData.length > 1) {
                    currentPlaylist = playlistsData[0].songs
                    currentPlaylistId = playlistsData[0]._id
                } else {
                    currentPlaylist = playlistsData.songs
                    currentPlaylistId = playlistsData._id
                }
                //loadTrack()
                if (data.length > 1) {
                    data.forEach(playlist => {
                        addItem(playlist)
                        addItemSide(playlist)
                    })
                } else {
                    addItem(data)
                    addItemSide(data)
                }
                if (userData._id != "60bb4eff72e4036898f19ce7")
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
                    })
            })
        document.getElementById('profile-name').innerText = userData.username
        if (userData.image != '') {
            icoContainer.innerHTML = `<div class="avatar-preview">
            <div id="imagePreview">
            </div>
        </div>`
            $('#imagePreview').css('background-image', 'url(' + userData.image + ')')
        }
        $('#changeTheme').removeClass('dark')
        $('#changeTheme').removeClass('light')
        $('#changeTheme').addClass(userData.theme)
        clearData()
        setTheme()

    }
}

defaultUser()

function addItemSide(playlist) {
    let li = `<div class="playlist-item" data-tab-target="#playlistShow" onclick="showPlaylist(this)" style="cursor: pointer;">
                        <div style="background-image: url(${playlist.image})"></div>
                        <span class="nav-text">
                            ${playlist.name}
                        </span>
                        <span id="playlist_id" style="display: none">${playlist._id}</span>
                    </div>`
    $('#playlists').append(li)
}

function addItem(playlist) {
    let image = playlist.image
    let name = playlist.name
    let id = playlist._id
    let template = `<div class="item_playlist" onclick="showPlaylist(this)" data-tab-target="#playlistShow" style='background:var(--sidebar-background-color);
    margin: 10px; cursor: pointer;'>
    <div class="playlist_img" style="background-image: url(${image}); ">
    </div>
      
      <span>${name}</span>
      <span id="playlist_id" style="display: none">${id}</span>
    </div>`
    $('#main').append(Mustache.render(template));
}