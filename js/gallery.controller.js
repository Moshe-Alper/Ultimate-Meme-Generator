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
    toggleSections()
}

function onToggleToGallery() {
    const elActiveLink = document.querySelector('.active')

    if (elActiveLink && elActiveLink.classList.contains('active')) return
    

    toggleSections()

    setActiveLink()
}

function toggleSections() {
    const elGallerySection = document.querySelector('.gallery-section')
    const elEditorSection = document.querySelector('.editor-section')

    elGallerySection.classList.toggle('hide-section')
    elEditorSection.classList.toggle('hide-section')

    const elActiveLink = document.querySelector('.active')
    if (elActiveLink) {
        elActiveLink.classList.toggle('active')
    }
}

function setActiveLink() {
    const allLinks = document.querySelectorAll('.nav-bar a')
    allLinks.forEach(link => link.classList.remove('active'))

    const galleryLink = document.querySelector('.nav-bar a[href="#"]:first-of-type')
    if (galleryLink) {
        galleryLink.classList.add('active')
    }
}