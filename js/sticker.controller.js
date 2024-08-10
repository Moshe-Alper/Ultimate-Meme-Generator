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
    const stickerUrl = elSticker.src
    const img = new Image()
    img.src = stickerUrl
    
    img.onload = () => {
        const stickerSize = 200
        
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





