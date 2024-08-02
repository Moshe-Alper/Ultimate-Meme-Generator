'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}

function renderMeme() {
drawImg()
}

function drawImg() {
    const elImg = new Image()
    elImg.src = 'meme-imgs/2.jpg'
    elImg.onload = () => {
        console.log('img loaded')
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        drawText('Add Text Here', gElCanvas.width / 2, gElCanvas.height / 2)
    }
}


function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    console.log('draw text');
}

