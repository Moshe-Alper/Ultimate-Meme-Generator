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

function getImageData() {
    return gImgs
}

function toggleSections() {
    const elGallerySection = document.querySelector('.gallery-section')
    const elEditorSection = document.querySelector('.editor-section')

    elGallerySection.classList.toggle('hide-section')
    elEditorSection.classList.toggle('hide-section')
}