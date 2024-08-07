'use strict'

// listen for color


function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}


function toggleSections() {
    const elGallerySection = document.querySelector('.gallery-section')
    const elEditorSection = document.querySelector('.editor-section')

    elGallerySection.classList.toggle('hide-section')
    elEditorSection.classList.toggle('hide-section')
}



document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.palette').addEventListener('click', function () {
        document.getElementById('fillColor').click()
    })

    document.getElementById('fillColor').addEventListener('input', function () {
        onChangeFillColor(this.value)
    })

    document.querySelector('.stroke').addEventListener('click', function () {
        document.getElementById('color-line').click()
    })

    document.getElementById('color-line').addEventListener('input', function () {
        onChangeStrokeColor(this.value)
    })
})

