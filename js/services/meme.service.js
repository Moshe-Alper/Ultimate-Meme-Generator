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

function setMemeData(data) {
    gMemeData = {...gMemeData, ...data}
}

function getMemeData() {
    return gMemeData
}

function getLine() {
    return  gMemeData.lines[gMemeData.selectedLineIdx]
}

function setLineTxt(txt) {
    getLine().txt = txt
    setMemeData({ lines: gMemeData.lines })
}


function getImageToCanvas(idx) {
    let img = getImageData().find((img) => img.id === idx)
    return img
}

function setImg(id) {
    gMemeData.selectedImgId = id
}

function addLine() {
    const newLine = _createLine()
    gMemeData.lines.push(newLine)
    gMemeData.selectedLineIdx = gMemeData.lines.length - 1
}

function switchLine() {
    const { lines, selectedLineIdx } = gMemeData   
    gMemeData.selectedLineIdx = (selectedLineIdx + 1) % lines.length

}


function isLineClicked(pos) {
    let currLine = gMemeData.lines[gMemeData.selectedLineIdx]
    const { x, y } = currLine
    const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2)
    return distance <= currLine.size + currLine.txt.length
}

function setLineDrag(isDrag) {
    gMemeData.lines[gMemeData.selectedLineIdx].isDrag = isDrag
  }


function moveLine(line, dx, dy) {
    line.x += dx
    line.y += dy

}

function _createLine() {

    yOffset += 50

    let line = {
        txt: 'Add text here',
        size: 50,
        font: 'arial',
        fillColor: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 2,
        x: 270,
        y: 50 + yOffset,
        isDrag: false
    }
    return line
}





