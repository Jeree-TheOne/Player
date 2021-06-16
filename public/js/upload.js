$("#imageUpload").change(function() {
    menu.classList.remove('shown')
    Avatar(this)
})

function Avatar(input) {
    const file = input.files[0]
    if (file != undefined) {
        formData = new FormData()
        if (file.type.match(/image.*/)) {
            formData.append("image", file)
            fetch('/api/upload/uploadImage', {
                    method: "POST",
                    body: formData
                }).then(response => response.json())
                .then(data => {
                    image = 'images/' + data.filename
                    icoContainer.innerHTML = `<div class="avatar-preview">
                                                <div id="imagePreview">
                                                </div>
                                            </div>`
                    $('#imagePreview').css('background-image', 'url(' + image + ')')
                    fetch('/api/user/changeImage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId: userData._id,
                            image: image
                        })
                    })
                })
        }
    }
}

$('#playlistImageAdd').change(function() {
    playlist(this)
})

$('#songImageAdd').change(function() {
    song(this)
})
let playlistImage = '/images/default.jpg'

function playlist(input) {
    const file = input.files[0]
    if (file != undefined) {
        formData = new FormData()
        formData.append("image", file)
        fetch('/api/upload/uploadImage', {
                method: "POST",
                body: formData
            }).then(response => response.json())
            .then(data => {
                image = 'images/' + data.filename
                $(`#playlistImageAddPreview`).css('background-image', 'url(' + image + ')')
                playlistImage = image
            })
    }
}

let songImage = '/images/defaultsong.jpg'

function song(input) {
    const file = input.files[0]
    if (file != undefined) {
        formData = new FormData()
        formData.append("image", file)
        fetch('/api/upload/uploadImage', {
                method: "POST",
                body: formData
            }).then(response => response.json())
            .then(data => {
                image = 'images/' + data.filename
                $(`#songImageAddPreviewD`).css('background-image', 'url(' + image + ')')
                songImage = image
            })
    }
}

$('#songAdd').change(function() {
    music(this)
})
$('#songAddD').change(function() {
    music(this)
})
let songPath = ''

function music(input) {
    const file = input.files[0]
    if (file != undefined) {
        formData = new FormData()
        formData.append("song", file)
        fetch('/api/upload/uploadSong', {
                method: "POST",
                body: formData
            }).then(response => response.json())
            .then(data => {
                audio = 'music/' + data.filename
                songPath = audio
            })
    }
    // if (input.files && input.files[0]) {
    //     var reader = new FileReader();
    //     reader.onload = function(e) {

    //         $(`#songPreview`).attr('src', e.target.result)
    //         songPath = e.target.result
    //     }
    //     reader.readAsDataURL(input.files[0]);
    // }
}

$('#playlistImageChange').change(function() {
    playlistUpdate(this)
})

function playlistUpdate(input) {
    const file = input.files[0]
    if (file != undefined) {
        formData = new FormData()
        formData.append("image", file)
        fetch('/api/upload/uploadImage', {
                method: "POST",
                body: formData
            }).then(response => response.json())
            .then(data => {
                image = 'images/' + data.filename
                $(`#playlistImageChangePreview`).css('background-image', 'url(' + image + ')')
                playlistImage = image
            })
    }
}

$('#videoAdd').change(function() {
    video(this)
})

videoPath = ''

function video(input) {
    const file = input.files[0]
    if (file != undefined) {
        formData = new FormData()
        formData.append("video", file)
        fetch('/api/upload/uploadVideo', {
                method: "POST",
                body: formData
            }).then(response => response.json())
            .then(data => {
                videoPath = 'video/' + data.filename
            })
    }
}

$('#videoImageAdd').change(function() {
    videoImageAdd(this)
})
let videoImage = './images/defaultsong.jpg'

function videoImageAdd(input) {
    const file = input.files[0]
    if (file != undefined) {
        formData = new FormData()
        formData.append("image", file)
        fetch('/api/upload/uploadImage', {
                method: "POST",
                body: formData
            }).then(response => response.json())
            .then(data => {
                image = 'images/' + data.filename
                $(`#videoImageAddPreview`).css('background-image', 'url(' + image + ')')
                videoImage = image
            })
    }
}