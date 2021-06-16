let icoContainer = document.getElementById('profile-ico')
let menuButton = document.getElementById('menu-open')
let menu = document.getElementById('menu')
let tabs = document.querySelectorAll('[data-tab-target]')
let tabContents = document.querySelectorAll('[data-tab-content]')
let changeTheme = document.getElementById('changeTheme')
let shuffle = document.getElementById('random')
let play = document.getElementById('play')
let forward = document.getElementById('forward')
let back = document.getElementById('back')
let repeat = document.getElementById('repeat')
let songName = document.getElementById('track-name')
let songArtist = document.getElementById('track-artist')
let songImg = document.getElementById('track-image')
let slider = document.getElementById('slider')
let duration = 0
let currentTime = 0
let isVideo = false

let addPlaylist = document.getElementById('addPlaylist')

let userData
let playlistsData
let videoPlaylist

let volume = document.getElementById('volume')
let volumePic = document.getElementById('volume-pic')
let root = document.documentElement

var rangeSlider = function() {
    let range = $('#slider')
    let value

    range.on('input', function() {
        $(this).next(value).html(this.value);
        currentTime = Math.trunc(duration * this.value / 100)
        if (!isVideo) { track.currentTime = currentTime } else media.currentTime = currentTime
        root.style.setProperty('--value', this.value + '%');
        currentTimeUpdate()
    });
}
var rangeVolume = function() {
    let range = $('#volume')
    let value

    range.on('input', function() {
        $(this).next(value).html(this.value);
        root.style.setProperty('--volume', this.value + '%');
        volumeChange()
        volume_change()
    });
}
rangeSlider()
rangeVolume()

function volumeChange() {
    if (volume.value > 49) volumePic.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
    <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
    </svg>`
    else if (volume.value > 0) volumePic.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-volume-down-fill" viewBox="0 0 16 16">
    <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/>
    </svg>`
    else volumePic.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
    <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
  </svg>`

}
root.style.setProperty('--volume', '10%')