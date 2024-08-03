'use strict'

renderGallery()

function renderGallery() {
    const elImgGallery = document.querySelector('.gallery-section')
    console.log('elImgGallery:', elImgGallery)

    elImgGallery.innerHTML = `
                <article class="meme-list-item"><img src="/meme-imgs/1.jpg" alt="meme-image"></article>
                <article class="meme-list-item"><img src="/meme-imgs/2.jpg" alt="meme-image"></article>
    `

    // elImgGallery.innerHTML = strHTMLs.join('')
}