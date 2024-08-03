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

    document.querySelector('input[name="color"]').value = lines[selectedLineIdx].color

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

function onOpenShareModal() {
    document.querySelector('.share-modal').showModal()
}

function onCloseShareModal() {
    document.querySelector('.share-modal').close()
}

function onDownloadMeme(elLink) {
    const meme = getMemeData()
    const imgData = getImageToCanvas(+meme.selectedImgId)
    const keywords = imgData.keywords.join('-')
    

    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    // Set a name for the downloaded file
    elLink.download = `meme-${keywords}.png`
}

function onPickColor(color) {
    const memeData = getMemeData()
    memeData.lines[memeData.selectedLineIdx].color = color
    setMemeData({ lines: memeData.lines })
    renderMeme()
}

function onUpdateLineSize(size) {
    const memeData = getMemeData()
    memeData.lines[memeData.selectedLineIdx].size += size
    setMemeData({ lines: memeData.lines })
    renderMeme()
}
