'use strict'

const gTrans = {
  gallery: {
      en: 'Gallery',
      he: 'גלריה',
  },
  saved: {
      en: 'Saved',
      he: 'שמורים',
  },
  search: {
      en: 'Search by keyword',
      he: 'חיפוש לפי מילת מפתח',
  },
  funny: {
      en: 'Funny',
      he: 'מצחיק',
  },
  comics: {
      en: 'Comics',
      he: 'קומיקס',
  },
  dogs: {
      en: 'Dogs',
      he: 'כלבים',
  },
  drinks: {
      en: 'Drinks',
      he: 'משקאות',
  },
  books: {
      en: 'Books',
      he: 'ספרים',
  }
}

let gCurrLang = 'en'

function getTrans(transKey) {
  // get from gTrans
  let transMap = gTrans[transKey]
  // if key is unknown return 'UNKNOWN'
  if (!transMap) return 'UNKNOWN'
  let transTxt = transMap[gCurrLang]
  // If translation not found - use english
  if (!transTxt) transTxt = transMap.en
  return transTxt
}

function doTrans() {
  // get the data-trans and use getTrans to replace the innerText
  const els = document.querySelectorAll('[data-trans]')
  // console.log('els:', els)
  els.forEach(el => {
    // console.dir(el)
    // console.log('el.dataset.trans:', el.dataset.trans)
    const transKey = el.dataset.trans
    // console.log('transKey:', transKey)
    const transTxt = getTrans(transKey)
    // console.log('transTxt:', transTxt)
    // support placeholder
    if (el.placeholder) el.placeholder = transTxt
    else el.innerText = transTxt
  })
}

function setLang(lang) {
  gCurrLang = lang
  
}

function formatNumSimple(num) {
  return num.toLocaleString(gCurrLang)
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(num)
}

function formatDate(time) {
  const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
  return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
  return kg * 2.20462262185
}

function getPastRelativeFrom(ts) {
  const diff = Date.now() - new Date(ts)
  const seconds = diff / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24

  const formatter = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'auto',
  })
  if (seconds <= 60) return formatter.format(-seconds, 'seconds')
  if (minutes <= 60) return formatter.format(-minutes, 'minutes')
  if (hours <= 24) return formatter.format(-hours, 'hours')
  return formatter.format(-days, 'days')
}
