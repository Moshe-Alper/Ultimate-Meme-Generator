'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
    insertMemeDataForm()
}

function insertMemeDataForm() {
    const { selectedImgId, selectedLineIdx, lines } = getMemeData()
    // console.log('selectedImgId:', selectedImgId)
    // console.log('selectedLineIdx:', selectedLineIdx)
    // console.log('lines:', lines)

}

function renderMeme() {
    let meme = getMemeData()
    drawImg(meme)
}


function drawImg(meme) {
    
    const elImg = new Image()
    const { selectedImgId, lines } = meme

    const imgData = getImageToCanvas(+selectedImgId)


    
    if (!imgData) return
    elImg.src = imgData.url
    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        
        lines.forEach((line, idx) => {
            drawText(line, gElCanvas.width / 2, (gElCanvas.height / 10) + (idx * 50))
        })
    }
}

function drawText(line, x, y) {
    let {txt, size, color} = line

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onAddTxt(elMemeInput) {
    setLineTxt(elMemeInput.value)
    renderMeme()
}

