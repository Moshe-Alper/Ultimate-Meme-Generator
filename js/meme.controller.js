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

    document.querySelector('input[name="fill-color"]').value = lines[selectedLineIdx].fillColor
    document.querySelector('input[name="stroke-color"]').value = lines[selectedLineIdx].strokeColor


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
    let {txt, size, fillColor, strokeColor} = line
    
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
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

function onChangeFillColor(fillColor) {
    const memeData = getMemeData()
    memeData.lines[memeData.selectedLineIdx].fillColor = fillColor
    setMemeData({ lines: memeData.lines })
    renderMeme()
}

function onChangeStrokeColor(strokeColor) {
    const memeData = getMemeData()
    memeData.lines[memeData.selectedLineIdx].strokeColor = strokeColor
    setMemeData({ lines: memeData.lines })
    renderMeme()
}

function onUpdateLineSize(size) {
    const memeData = getMemeData()
    memeData.lines[memeData.selectedLineIdx].size += size
    setMemeData({ lines: memeData.lines })
    renderMeme()
}

function onAddLIne() {
    console.log('line');
    // const {} = 
    let elTextInput = document.querySelector('.meme-text-input')
    elTextInput = ''
    console.log('elTextInput:', elTextInput)
    renderMeme()

}