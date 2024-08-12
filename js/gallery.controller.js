'use strict'


// Rendering

function renderGallery(images = []) {
    images = getImageData()
    const elImgGallery = document.querySelector('.gallery-section')

    // elImgGallery.innerHTML = ''

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

function renderKeywords() {
    const keywordsArr = Object.entries(getKeywords())

    const elKeywordsContainer = document.querySelector('.key-words-container')

    const strHTMLs = keywordsArr.map(([key, val]) => 
        `<li class="keywords-search-word" style="font-size: ${val + 10}px;" onclick="onKeywordPressed('${key}')">${key}</li>`
    ).join('')

    elKeywordsContainer.innerHTML = strHTMLs
}

// handle events

function onImgSelect(id) {
    setImg(id)
    renderMeme()
    toggleSections()
}

function onSearchMeme(elInput) {
    const searchVal = elInput.value
    const filteredImgs = getImageData({ keywords: searchVal })

    updateGallery(filteredImgs)
}

function onKeywordPressed(keyword) {
    const keywords = getKeywords()

    if (keywords[keyword] !== undefined) {
        keywords[keyword]++
        setKeywordsCount(keywords)
        renderKeywords()
    }

    const filteredImgs = getImageData({ keywords: keyword })
    updateGallery(filteredImgs)
}


function onSetRandomMeme() {
    const id = getRandomIntInclusive(1, 18)
    const randomText = makeLorem( getRandomInt(3, 5))
    setImg(id)
    removeLine()
    setLineTxt(randomText)
    renderMeme()
    toggleSections()
}

// manage sections

function toggleSections() {
    const elSections = document.querySelector('.gallery-section').classList.contains('hide-section') ? 'gallery-section' : 'editor-section'
    toggleSection(elSections)
    resizeCanvas()
}

function toggleSection(displaySection) {
    const elSections = document.querySelectorAll('.gallery-section, .editor-section, .saved-section')
    elSections.forEach(section => {
        if (section.classList.contains(displaySection)) {
            section.classList.remove('hide-section')
        } else {
            section.classList.add('hide-section')
        }
    })

    const elFilteredField = document.querySelector('.gallery-options')
    if (displaySection === 'gallery-section') {
        elFilteredField.classList.remove('hide-section')
    } else {
        elFilteredField.classList.add('hide-section')
    }

    const elActiveLink = document.querySelector('.nav-bar .active')
    if (elActiveLink) {
        elActiveLink.classList.remove('active')
    }

    const newActiveLink = document.querySelector(`.nav-bar a[href="#${displaySection}"]`)
    if (newActiveLink) {
        newActiveLink.classList.add('active')
    }
}

function setActiveLink(sectionId) {
    const elLinks = document.querySelectorAll('.nav-bar a')
    elLinks.forEach(link => link.classList.remove('active'))

    const activeLink = document.querySelector(`.nav-bar a[href="#${sectionId}"]`)
    if (activeLink) activeLink.classList.add('active')
}

// utility

function setKeywordsCount(keywords) {
    gKeywords = keywords
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    doTrans()
}


function onToggleToGallery() {
    const elActiveLink = document.querySelector('.active')

    if (elActiveLink && elActiveLink.classList.contains('active')) return

    toggleSections()
    setActiveLink()
}

