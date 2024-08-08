'use strict'

const keywords = ['funny', 'comics', 'dogs', 'drinks', 'books']


let gImgs = []

for (let i = 1; i <= 18; i++) {
    gImgs.push({
        id: i,
        url: `meme-imgs/${i}.jpg`,
        keywords: getRandomKeywords()
    })
}

function getRandomKeywords() {
    const shuffled = keywords.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2)
}

function getImageData(filterBy = {}) {
    let imgs = gImgs
    if (filterBy.keywords) imgs = _filterImgs(imgs, filterBy)
    return imgs
}


function _filterImgs(images, filterBy) {
    return images.filter(image => 
        image.keywords.some(keyword => keyword.toLowerCase().includes(filterBy.keywords.toLowerCase()))
    )
}
