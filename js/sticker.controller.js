const stickerUrls = [
    'stickers/sticker_1.png',
    'stickers/sticker_2.png',
    'stickers/sticker_3.png',
    'stickers/sticker_4.png',
    'stickers/sticker_5.png',
    'stickers/sticker_6.png',
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
    const stickerUrl = elSticker.src
    const img = new Image()
    img.src = stickerUrl
    
    img.onload = () => {
        const stickerSize = Math.min(img.width, img.height, 100)
        
        const x = (gElCanvas.width - stickerSize) / 2
        const y = (gElCanvas.height - stickerSize) / 2

        const position = { x, y }

        createSticker(stickerUrl, position, stickerSize)
        addStickerToMeme(stickerUrl, position, stickerSize)
    }
}

function addStickerToMeme(stickerUrl, position) {
    const memeData = getMemeData()
    
    if (!memeData.stickers) {
        memeData.stickers = []
    }
    
    const sticker = {
        url: stickerUrl,
        pos: position,
        size: 100
    }

    memeData.stickers.push(sticker)
    renderMeme()
}





