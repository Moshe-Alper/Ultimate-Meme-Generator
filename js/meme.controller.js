'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()

    // resizeCanvas()
    renderMeme()
    insertMemeDataForm()
}

// Event Listeners

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', resizeCanvas)
    gElCanvas.addEventListener('click', onLineClick)
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

// Canvas Operations

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // console.log('elContainer.clientWidth :', elContainer.clientWidth)
    // console.log(' elContainer.clientHeight:',  elContainer.clientHeight)
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight

    renderMeme()
}

function resize() {
    var elContainer = document.querySelector('.canvas-container')
    var width = elContainer.offsetWidth
    var height = elContainer.offsetWidth

    gElCanvas.width = width
    gElCanvas.height = height
    drawImg(meme)
}

// Meme Rendering

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
    let { txt, size, font, fillColor, strokeColor, strokeWidth, align, x, y } = line

    gCtx.lineWidth = strokeWidth
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    renderFrameToLine()
}

// User Interactions

function onAddTxt(elMemeInput) {
    setLineTxt(elMemeInput.value)
    renderMeme()
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


function onSetFontFamily(font) {
    const memeData = getMemeData()
    memeData.lines[memeData.selectedLineIdx].font = font
    setMemeData({ lines: memeData.lines })
    renderMeme()
}

function onSetAlignment(ev, align) {
    const memeData = getMemeData()
    const line = memeData.lines[memeData.selectedLineIdx]
    
    if (!line) return
    line.align = align
    
    const pos = getEvPos(ev)
    // console.log('pos:', pos)
    
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
    onAddTxt({ value: 'Add text here' })

    insertMemeDataForm()
    renderMeme()
}

function onSwitchLine() {
    switchLine(),
    insertMemeDataForm()
    renderMeme()
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

function onLineClick(ev) {
    const pos = getEvPos(ev)
    const memeData = getMemeData()
    const lines = memeData.lines

    const clickedLine = lines.find(line => {
        const { width, height } = measureText(line)
        const padding = 5

        const left = line.x - width / 2 - padding
        const right = line.x + width / 2 + padding
        const top = line.y - height / 2 - padding
        const bottom = line.y + height / 2 + padding

        return pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom
    })

    if (clickedLine) {
        const lineIdx = lines.indexOf(clickedLine)
        setSelectedLineIdx(lineIdx)
        insertMemeDataForm()
        renderMeme()
    }
}

// Utility Functions

function insertMemeDataForm() {
    const { selectedImgId, selectedLineIdx, lines } = getMemeData()

    document.querySelector('input[name="fill-color"]').value = lines[selectedLineIdx].fillColor
    document.querySelector('input[name="stroke-color"]').value = lines[selectedLineIdx].strokeColor
    document.querySelector('input[name="meme-text"]').value = ''
}

function setSelectedLineIdx(idx) {
    const memeData = getMemeData()
    memeData.selectedLineIdx = idx
    setMemeData(memeData)
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

function measureText(line) {
    gCtx.font = `${line.size}px ${line.font}`
    const metrics = gCtx.measureText(line.txt)
    const width = metrics.width
    const height = line.size
    return { width, height }
}
