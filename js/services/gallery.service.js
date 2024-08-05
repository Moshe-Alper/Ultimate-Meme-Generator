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
