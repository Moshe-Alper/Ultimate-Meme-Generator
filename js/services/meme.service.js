'use strict'

let gImgs = [{ id: 5, url: 'meme-imgs/5.jpg', keywords: ['funny', 'cat'] }]

let gMemeData = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            color: 'red'
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