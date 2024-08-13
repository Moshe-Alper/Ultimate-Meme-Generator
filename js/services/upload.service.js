'use strict'
function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        //* If the response is ok, call the onSuccess callback function, 
        //* that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}


// UPLOAD


function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
    toggleSections()
    // resizeCanvas()

}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let elImg = new Image()
        elImg.src = event.target.result

        // Store the uploaded image's URL in gMemeData
        gMemeData.imgUrl = elImg.src
        gMemeData.selectedImgId = makeId() 
        
        // Add the new image to the gallery
        // addImageToGallery(elImg.src, keyword)

        addUploadImg(elImg.src)

        elImg.onload = () => {
            onImageReady(elImg)
            updateGallery(gImgs)
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(elImg) {
    // Draw the img on the canvas
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function getImgByUrl(url) {
    return gImgs.find(img => img.url === url)
}

// Web Share API

document.addEventListener('DOMContentLoaded', () => {
    const webShareAPI = document.querySelector('.api-button')
    const resultPara = document.querySelector('.result')
  
    webShareAPI.addEventListener('click', () => {
      let shareData = {
        title: 'Ultimate Meme Generator',
        text: 'Share your Meme!',
        url: 'https://moshik-alper.github.io/Ultimate-Meme-Generator/',
      }
  
      if (!navigator.canShare) {
        resultPara.textContent = 'Web Share API not available'
        return
      }
      if (!navigator.canShare(shareData)) {
        resultPara.textContent = 'Share data unsupported, disallowed, or invalid'
        return
      }
      navigator.share(shareData)
        .then(() => resultPara.textContent = 'MDN shared successfully')
        .catch((e) => resultPara.textContent = 'Error: ' + e)
    })
  })
  
