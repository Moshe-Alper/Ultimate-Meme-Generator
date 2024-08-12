'use strict'

let gStickersOnCanvas = []

function createSticker(url, pos = null, size = null) {
    const stickerLine = {
        txt: '', 
        size,
        font: '', 
        fillColor: '', 
        strokeColor: '', 
        strokeWidth: 0, 
        align: 'center',
        x: pos.x,
        y: pos.y,
        rotation: 0,
        isDrag: false,
        url 
    }
    gMemeData.lines.push(stickerLine)
    gMemeData.selectedLineIdx = gMemeData.lines.length - 1
}



function moveSticker(dx, dy) {
    const line = gMemeData.lines[gMemeData.selectedLineIdx]
    if (!line.url) return 

    line.x += dx
    line.y += dy
    renderMeme() 
}






