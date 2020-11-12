function Food(width, height, color) {
  this.width = width
  this.height = height
  this.color = color
}
//  x, y对应地图上的坐标
Food.prototype.create = function(mapId, x, y) {
  const div = document.createElement('div')
  div.style.width = this.width + 'px'
  div.style.height = this.height + 'px'
  div.style.background = this.color
  div.classList.add('food')
  div.style.left = x + 'px'
  div.style.bottom = y + 'px'
  document.querySelector('#' + mapId).appendChild(div)
}

/**
 * width: 地图宽 number
 * height: 地图宽 number
 */
Food.prototype.autoCreate = function(width, height) {
  const a = width / 10 // 以10px为一步, 总共可分为多少步
  const b = height / 10
  const w = Math.floor(Math.random() * Number(a) || 51) * 10// 取0 - a的随机整数
  const h = Math.floor(Math.random() * Number(b) || 51) * 10// 取0 - a的随机整数
  console.log('w:', w)
  console.log('h:', h)
  const foodElement = document.querySelector('.content>.map>.food')
  foodElement.style.display = 'none'
  foodElement.style.left = w + 'px'
  foodElement.style.bottom = h + 'px'
  foodElement.style.display = 'block'
}

Food.prototype.killed = function() {

}