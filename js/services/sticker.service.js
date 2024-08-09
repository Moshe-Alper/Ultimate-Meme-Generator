'use strict'

let gStickersOnCanvas = []
let gSelectedSticker = null
const center = {  }

function createSticker(url, pos = { x: 100, y: 300 }, size = 20) {
    const sticker = {
        pos,
        url,
        size,
        isDrag: false
    }
    gStickersOnCanvas.push(sticker)
    gSelectedSticker = sticker
}

function getStickersOnCanvas() {
    return gStickersOnCanvas
}

function getSelectedSticker() {
    return gSelectedSticker
}
    


