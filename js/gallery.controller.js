'use strict'


function renderGallery(images = []) {
    images = getImageData()
    const elImgGallery = document.querySelector('.gallery-section')

    elImgGallery.innerHTML = '';

    if (!images.length) {
        elImgGallery.innerHTML = `<p>No matching images were found...</p>`
        return
    }

    const strHTMLs = images.map(image => {
        const { id, keywords, url } = image
        return `
        <article class="meme-list-item"><img src="${url}" alt="meme-image" onclick="onImgSelect('${id}')"></article>
        `
    })

    elImgGallery.innerHTML += strHTMLs.join('')
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

function onSearchMeme(elInput) {
    const searchVal = elInput.value
    const filteredImgs = getImageData({ keywords: searchVal })

    updateGallery(filteredImgs)
}

function updateGallery(filteredImgs) {
    const elImgGallery = document.querySelector('.gallery-section')

    elImgGallery.innerHTML = ''

    if (!filteredImgs.length) {
        elImgGallery.innerHTML = `<p>No matching images were found...</p>`
        return
    }

    const strHTMLs = filteredImgs.map(image => {
        const { id, keywords, url } = image
        return `
        <article class="meme-list-item"><img src="${url}" alt="meme-image" onclick="onImgSelect('${id}')"></article>
        `
    })

    elImgGallery.innerHTML = strHTMLs.join('')
}


function toggleSections() {
    const elGallerySection = document.querySelector('.gallery-section')
    const elEditorSection = document.querySelector('.editor-section')

    elGallerySection.classList.toggle('hide-section')
    elEditorSection.classList.toggle('hide-section')

    const elFilterSearchField = document.querySelector('.filter-search-field')
    elFilterSearchField.classList.toggle('hide-section')

    resizeCanvas()

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