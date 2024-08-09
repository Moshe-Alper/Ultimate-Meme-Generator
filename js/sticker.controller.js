const stickerUrls = [
    '/img/stickers/sticker_1.png',
    '/img/stickers/sticker_2.png',
    '/img/stickers/sticker_3.png',
    '/img/stickers/sticker_4.png',
    '/img/stickers/sticker_5.png',
]

function renderStickerContainer() {
    const elStickerContainer = document.querySelector('.stickers-container')
    elStickerContainer.innerHTML = ''

    stickerUrls.forEach(url => {
        const elSticker = document.createElement('img')
        elSticker.src = url
        elSticker.alt = 'sticker'
        elSticker.draggable = true
        elSticker.onmousedown = (event) => onStickerSelect(event, elSticker)

        elStickerContainer.appendChild(elSticker)
    })
}

function onStickerSelect(event, elSticker) {
    const stickerUrl = elSticker.src;
    // the event if need to drag from the options menu
    const x = gElCanvas.width / 2;
    const y = gElCanvas.height / 2

    const position = { x, y }

    createSticker(stickerUrl, position)
    addStickerToMeme(stickerUrl, position)
}

function addStickerToMeme(stickerUrl, position) {
    const memeData = getMemeData();
    
    if (!memeData.stickers) {
        memeData.stickers = []
    }
    
    const sticker = {
        url: stickerUrl,
        pos: position,
        size: 100
    }

    memeData.stickers.push(sticker)
    drawSticker()
}

function drawSticker() {
    let meme = getMemeData()
    if (meme.stickers && meme.stickers.length > 0) {
        meme.stickers.forEach(sticker => {
            const img = new Image()
            img.src = sticker.url

            img.onload = () => {
                gCtx.drawImage(img, sticker.pos.x, sticker.pos.y, sticker.size, sticker.size);
            }
        })
    }
}



