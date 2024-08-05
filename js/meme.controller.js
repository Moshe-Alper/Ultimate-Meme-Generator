'use strict'

let gElCanvas
let gCtx
let gStartPos = { x: 0, y: 0 }
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    renderMeme()
    insertMemeDataForm()
}

function insertMemeDataForm() {
    const { selectedImgId, selectedLineIdx, lines } = getMemeData()

    document.querySelector('input[name="fill-color"]').value = lines[selectedLineIdx].fillColor
    document.querySelector('input[name="stroke-color"]').value = lines[selectedLineIdx].strokeColor
    document.querySelector('input[name="meme-text"]').value = ''


}

function renderMeme() {
    let meme = getMemeData()
    renderFrameToLine()
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
        
        lines.forEach(line => {
            drawText(line)
        })
    }
}

function drawText(line) {
    let {txt, size, fillColor, strokeColor, strokeWidth, x, y} = line
    
    gCtx.lineWidth = strokeWidth
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    renderFrameToLine()
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
    let elTextInput = document.querySelector('.meme-text-input')

    elTextInput.value = ''
    addLine()
    
    elTextInput = document.querySelector('.meme-text-input')
    onAddTxt({value: 'Add text here'})

    insertMemeDataForm()
    renderMeme()
}

function onSwitchLine() {
    switchLine(),
    insertMemeDataForm()
    renderMeme()
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()

}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    document.addEventListener('touchend', onUp)
}



function onDown(ev) {
    const pos = getEvPos(ev)
  
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
  }


function onMove(ev) {
    const line = getLine()
    if (!line.isDrag) return

    const pos = getEvPos(ev)
  
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(line, dx, dy)

    gStartPos = pos

    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}


function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse screen dragging event
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function renderFrameToLine() {
    const memeData = getMemeData()
    const line = memeData.lines[memeData.selectedLineIdx]

    if (!line) return

    measureText(line)

    const { width, height } = measureText(line)
    const padding = 5

    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 4
    gCtx.strokeRect(line.x - width / 2 - padding, line.y - height / 2 - padding, width + padding * 2, height + padding * 2)

}
function measureText(line) {
    gCtx.font = `${line.size}px Arial`
    const metrics = gCtx.measureText(line.txt)
    const width = metrics.width
    const height = line.size 
    return { width, height }
}


function onSetFont(values) {
    console.log('this.value:', this.value)
}