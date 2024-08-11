'use strict'

let gStickersOnCanvas = []

function createSticker(url, pos = { x: 50, y: 300 }, size = 20) {
    const sticker = {
        pos,
        url,
        size,
        isDrag: false
    }
    gStickersOnCanvas.push(sticker)
    gMemeData.selectedStickerIdx = gStickersOnCanvas.length - 1
}

function getStickersOnCanvas() {
    return gStickersOnCanvas
}

function getSelectedSticker() {
    if (gMemeData.selectedStickerIdx === null) return null
    return gStickersOnCanvas[gMemeData.selectedStickerIdx]
}

function isStickerClicked(clickedPos) {
    const selectedSticker = getSelectedSticker()
    if (!selectedSticker) return false

    const { pos, size } = selectedSticker

    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)

    return distance <= size / 2
}

function setStickerDrag(isDrag) {
    const selectedSticker = getSelectedSticker()
    if (!selectedSticker) return
    selectedSticker.isDrag = isDrag
}

function moveSticker(dx, dy) {
    const selectedSticker = getSelectedSticker()
    selectedSticker.pos.x += dx
    selectedSticker.pos.y += dy
}

function switchSticker() {
    const memeData = getMemeData()

    const { stickers, selectedStickerIdx } = memeData
    if (stickers.length === 0) return

    let newStickerIdx = selectedStickerIdx === null ? 0 : selectedStickerIdx + 1

    if (newStickerIdx >= stickers.length) {
        newStickerIdx = 0
    }
    setMemeData({ selectedStickerIdx: newStickerIdx })
}




