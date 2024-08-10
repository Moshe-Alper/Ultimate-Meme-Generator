'use strict'

const gKeywords = {'funny': 12,'comics': 16, 'dogs': 2, 'drinks': 5, 'books': 9}

let gImgs = []

function createImgs() {
    gImgs = []
    for (let i = 1; i <= 18; i++) {
        gImgs.push({
            id: i,
            url: `meme-imgs/${i}.jpg`,
            keywords: getRandomKeywords()
        })
    }

}

function getRandomKeywords() {
    const keywordsArr = Object.keys(gKeywords)
    const shuffled = keywordsArr.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2)
}

function getKeywords() {
    return gKeywords
}



function getImageData(filterBy = {}) {
    if (!gImgs.length) createImgs()

    let imgs = gImgs
    if (filterBy.keywords) imgs = _filterImgs(imgs, filterBy)
    return imgs
}


function _filterImgs(images, filterBy) {
    return images.filter(image => 
        image.keywords.some(keyword => keyword.toLowerCase().includes(filterBy.keywords.toLowerCase()))
    )
}

