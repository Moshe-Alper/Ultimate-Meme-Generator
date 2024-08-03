'use strict'

let gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['funny', 'baby'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['funny', 'meme'] }
]

let gMemeData = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add text here',
            size: 40,
            color: '#ffffff'
        }
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function setMemeData(data) {
    gMemeData = {...gMemeData, ...data}
}

function getMemeData() {
    return gMemeData
}

function setLineTxt(txt) {
    gMemeData.lines[gMemeData.selectedLineIdx].txt = txt
    setMemeData({ lines: gMemeData.lines })
}

function getImageData() {
    return gImgs
}

function getImageToCanvas(idx) {
    let img = gImgs.find((img) => img.id === idx)
    return img
}

function setImg(id) {
    gMemeData.selectedImgId = id
}