import moment from 'moment'

export function generateUrl (url, key, params) {
  if (url.indexOf('?') > -1) {
    url = `${url}&${key}=${params}`
  } else {
    url = `${url}?${key}=${params}`
  }
  return url
}

export function formatNumber (number, places, thousand, decimal) {
  number = number || 0
  places = !isNaN(places = Math.abs(places)) ? places : 2
  thousand = thousand || ','
  decimal = decimal || '.'
  let negative = number < 0 ? '-' : ''
  let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  let j = i.length > 3 ? i.length % 3 : 0
  return negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}

export function removeComma (number) {
  return number.replace(/,/g, '')
}

export function removeDot (number) {
  return number.replace(/./g, '')
}

export function removeString (str) {
  return str.replace(/\D/g, '')
}

export function formatDate (value, formatStr = 'YYYY-MM-DD') {
  if (value) {
    return moment(value).format(formatStr)
  }
  return ''
}

export function formatUnixTime (value, formatStr = 'YYYY-MM-DD HH:mm') {
  if (value) {
    return moment.unix(value).format(formatStr)
  }
  return ''
}

export function browserNotify (options = {body: null, image: null, url: null}, title = 'Goship thông báo', icon = '/static/logo-notify.png', timeout = 10000) {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
    gerenateNotify(options, title, icon, timeout)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        gerenateNotify(options, title, icon, timeout)
      }
    })
  }
}

function gerenateNotify (options, title, icon, timeout) {
  options.icon = icon
  let notification = new Notification(title, options)
  if (timeout) {
    setTimeout(function () {
      notification.close()
    }, timeout)
  }
  if (options.url) {
    notification.onclick = function (event) {
      notification.close()
      event.preventDefault()
      window.open(options.url)
    }
  }
}
