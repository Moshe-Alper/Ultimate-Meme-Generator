'use strict'

let yOffset = 0

let gMemeData = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        _createLine()
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

// Meme Data Management

function setMemeData(data) {
    gMemeData = {...gMemeData, ...data}
}

function getMemeData() {
    return gMemeData
}

function getLine() {
    return gMemeData.lines[gMemeData.selectedLineIdx]
}

function setLineTxt(txt) {
    getLine().txt = txt
    setMemeData({ lines: gMemeData.lines })
}

function setImg(id) {
    gMemeData.selectedImgId = id
}

// Image Handling

function getImageToCanvas(idx) {
    let img = getImageData().find((img) => img.id === idx)
    return img
}

// Line Management

function addLine() {
    const newLine = _createLine()
    gMemeData.lines.push(newLine)
    gMemeData.selectedLineIdx = gMemeData.lines.length - 1
}

function switchLine() {
    const { lines, selectedLineIdx } = gMemeData   
    gMemeData.selectedLineIdx = (selectedLineIdx + 1) % lines.length
}

function removeLine() {
    const { lines, selectedLineIdx } = gMemeData   
    if (lines.length === 0) return
    
    lines.splice(selectedLineIdx, 1)
    
    if (selectedLineIdx >= lines.length) {
        gMemeData.selectedLineIdx = lines.length - 1
    }

    if (lines.length === 0) {
        gMemeData.selectedLineIdx = 0
    }
}

function isLineClicked(pos) {
    let currLine = gMemeData.lines[gMemeData.selectedLineIdx]
    const { x, y } = currLine
    const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2)
    return distance <= currLine.size + currLine.txt.length
}

function setLineDrag(isDrag) {
    const { lines, selectedLineIdx } = gMemeData
    if (lines.length <= 0) return

    if (selectedLineIdx < lines.length) lines[selectedLineIdx].isDrag = isDrag
}


function moveLine(line, dx, dy) {
    line.x += dx
    line.y += dy
}

// Factory Function

function _createLine() {
    yOffset += 50

    let line = {
        txt: 'Add text here',
        size: 50,
        font: 'arial',
        fillColor: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 2,
        align: 'center',
        x: 270,
        y: 50 + yOffset,
        isDrag: false
    }
    return line
}