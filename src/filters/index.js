export function number (number, decimal) {
  decimal = typeof decimal === 'undefined' ? 0 : decimal
  return formatNumber(number, decimal)
}

export function vnd (money, decimal) {
  decimal = typeof decimal === 'undefined' ? 0 : decimal
  return formatNumber(money, decimal) + ' đ'
}

export function gam (gam, decimal) {
  decimal = typeof decimal === 'undefined' ? 0 : decimal
  return formatNumber(gam, decimal) + ' g'
}

export function cm (cm, decimal) {
  decimal = typeof decimal === 'undefined' ? 0 : decimal
  return formatNumber(cm, decimal) + ' cm'
}

export function percent (percent, decimal) {
  decimal = typeof decimal === 'undefined' ? 0 : decimal
  return formatNumber(percent, decimal) + ' %'
}

export function currency (value, decimal) {
  if (value) {
    let number = +value.replace(/[^\d.]/g, '')
    number = isNaN(number) ? 0 : number
    decimal = typeof decimal === 'undefined' ? 0 : decimal
    return formatNumber(number, decimal)
  }
}

function formatNumber (number, places, thousand, decimal) {
  number = number || 0
  places = !isNaN(places = Math.abs(places)) ? places : 2
  thousand = thousand || ','
  decimal = decimal || '.'
  let negative = number < 0 ? '-' : ''
  let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  let j = i.length
  j = j > 3 ? (j % 3) : 0

  return negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}
