function Map(width, height, backgroundColor) {
  this.width = width
  this.backgroundColor = backgroundColor
  this.height = height
}

Map.prototype.create = function () {
  const div = document.createElement('div')
  div.style.width = this.width + 'px'
  div.style.height = this.height + 'px'
  div.style.background = this.backgroundColor
  div.classList.add('map')
  div.id = 'map'
  document.getElementsByClassName('content')[0].appendChild(div)
}
