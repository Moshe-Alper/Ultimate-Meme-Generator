'use strict'

let gKeywords = {'funny': 4,'comics': 2, 'dogs': 18, 'drinks': 5, 'books': 9}

let gImgs = []

function createImgs() {
    gImgs = []
    for (let i = 1; i <= 24; i++) {
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

function addImgToGallery(imgUrl, keywords) {
    gImgs.push({
        id: makeId(),
        url: imgUrl,
        keywords: keywords || getRandomKeywords() 
    })
}

// factory

function _filterImgs(images, filterBy) {
    return images.filter(image => 
        image.keywords.some(keyword => keyword.toLowerCase().includes(filterBy.keywords.toLowerCase()))
    )
}

function addUploadImg(imgUrl) {
    gImgs.unshift({
        id: makeId(),
        url: imgUrl,
        keywords: getRandomKeywords() 
    })
}