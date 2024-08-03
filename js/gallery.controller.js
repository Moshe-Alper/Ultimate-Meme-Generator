'use strict'

renderGallery()

function renderGallery() {
    const images = getImageData()
    const elImgGallery = document.querySelector('.gallery-section')



    const strHTMLs = images.map(image => {
        const { id, keywords, url } = image
        return `
        <article class="meme-list-item"><img src="${url}" alt="meme-image" onclick="onImgSelect('${id}')"></article>
        `
    })

    elImgGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(id) {
    setImg(id)
    renderMeme()
}