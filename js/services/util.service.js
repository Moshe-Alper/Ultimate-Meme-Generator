'use strict'

// listen for color

function makeId(length = 5) {
	var id = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		id += possible.charAt(getRandomInt(0, possible.length))
	}
	return id
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function makeLorem(wordCount = 100) {
	const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
	var txt = ''

	while (wordCount-- > 0) {
		txt += words[getRandomInt(0, words.length)] + ' '
	}
	return txt
}

function getWord(isUpperCase) {
	const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	const length = Math.floor(Math.random() * (5 - 2) + 2)
	let word = ''

	for (let i = 0; i <= length; i++) {
		word += chars[Math.floor(Math.random() * (25 - 0 + 1) + 0)]
	}

	if (isUpperCase) word = word.charAt(0).toUpperCase() + word.substring(1)
	return word
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function addColorPickerListeners() {
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
}