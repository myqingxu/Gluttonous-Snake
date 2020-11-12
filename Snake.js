function Snake(data) {
  this.length = data.length
  this.speek = data.speek
  this.size = data.size
  this.bodyColor = data.bodyColor
  this.headColor = data.headColor
}

Snake.prototype.create = function (mapId) {
  const snake = document.createElement('div')
  const head = document.createElement('div')

  snake.classList.add('snake')
  head.classList.add('head')
  head.style.width = this.size + 'px'
  head.style.height = this.size + 'px'
  head.style.background = this.headColor

  for (let i = 0; i < this.length; i++) {
    const bodyNode = document.createElement('div') // 身子节点
    bodyNode.style.width = this.size + 'px'
    bodyNode.style.height = this.size + 'px'
    bodyNode.style.background = this.bodyColor
    snake.appendChild(bodyNode)
  }

  snake.appendChild(head)

  document.querySelector('#' + mapId).appendChild(snake)
}
