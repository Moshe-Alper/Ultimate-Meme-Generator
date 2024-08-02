'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}

function renderMeme() {
    let meme = getMeme()
    drawImg(meme)
}

function drawImg(meme) {
    const elImg = new Image()
    const { selectedImgId, lines } = meme
    const imgData = gImgs.find(img => img.id === selectedImgId)

    if (!imgData) return

    elImg.src = imgData.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        lines.forEach((line, idx) => {
            drawText(line.txt, gElCanvas.width / 2, (gElCanvas.height / 10) + (idx * 50), line.size, line.color)
        })
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
}

