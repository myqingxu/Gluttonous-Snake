function Snake(data) {
  this.length = data.length
  this.speed = data.speed
  this.size = data.size
  this.bodyColor = data.bodyColor
  this.headColor = data.headColor
  this.snakeData = []
  this.moveStatus = 'right'
  this.prevStatus = 'top'
  this.t = null
}

Snake.prototype.create = function (mapId) {
  const snake = document.createElement('div')
  const data = this.snakeData
  const colorData = {
    body: this.bodyColor,
    head: this.headColor,
  }
  let str = ''
  snake.classList.add('snake')
  for (let i = 0; i < this.length; i++) {
    data.push({ x: i, y: 0, name: 'body' })
  }
  data.push({
    x: data[data.length - 1].x + 1,
    y: data[data.length - 1].y,
    name: 'head',
  })
  console.log(data)

  for (let i = 0; i < data.length; i++) {
    str += `<div class='${data[i].name}' style='width:${this.size}px;height:${
      this.size
    }px;background:${colorData[data[i].name]};left:${
      data[i].x * this.size
    }px;bottom:${data[i].y * this.size}px'></div>`
  }
  snake.innerHTML = str
  document.querySelector('#' + mapId).appendChild(snake)
}

// callback 吃掉食物后的回调
Snake.prototype.move = function (callback) {
  const data = this.snakeData
  Object.defineProperty(this, 'moveStatus', {
    set(newVal) {
      if (newVal === this.prevStatus) return
      if (newVal === 'left' && this.prevStatus === 'right') return
      if (newVal === 'right' && this.prevStatus === 'left') return
      if (newVal === 'up' && this.prevStatus === 'bottom') return
      if (newVal === 'bottom' && this.prevStatus === 'up') return
      this.autoMove(newVal, callback)
      clearInterval(this.t)
      this.t = setInterval(() => {
        this.autoMove(newVal, callback)
      }, this.speed)
    },
  })
}

Snake.prototype.render = function () {
  const data = this.snakeData
  const colorData = {
    body: this.bodyColor,
    head: this.headColor,
  }
  let str = ''
  for (let i = 0; i < data.length; i++) {
    str += `<div class='${data[i].name}' style='width:${this.size}px;height:${
      this.size
    }px;background:${colorData[data[i].name]};left:${
      data[i].x * this.size
    }px;bottom:${data[i].y * this.size}px'></div>`
  }

  document.getElementsByClassName('snake')[0].innerHTML = str
}

Snake.prototype.changeDirection = function (status) {
  this.moveStatus = status
  this.prevStatus = status
}

Snake.prototype.eatFood = function (className) {
  const foodXY = {
    x: Number(document.getElementsByClassName(className)[0].dataset.x),
    y: Number(document.getElementsByClassName(className)[0].dataset.y),
  }
  const headXY = {
    x: this.snakeData[this.snakeData.length - 1].x * 10,
    y: this.snakeData[this.snakeData.length - 1].y * 10,
  }
  return Boolean(foodXY.x === headXY.x && foodXY.y === headXY.y)
}

Snake.prototype.autoMove = function (newVal, callback) {
  let obj = null
  switch (newVal) {
    case 'up':
      obj = {
        x: this.snakeData[this.snakeData.length - 1].x,
        y: this.snakeData[this.snakeData.length - 1].y + 1,
        name: 'head',
      }
      break
    case 'right':
      obj = {
        x: this.snakeData[this.snakeData.length - 1].x + 1,
        y: this.snakeData[this.snakeData.length - 1].y,
        name: 'head',
      }
      break
    case 'left':
      obj = {
        x: this.snakeData[this.snakeData.length - 1].x - 1,
        y: this.snakeData[this.snakeData.length - 1].y,
        name: 'head',
      }
      break
    case 'bottom':
      obj = {
        x: this.snakeData[this.snakeData.length - 1].x,
        y: this.snakeData[this.snakeData.length - 1].y - 1,
        name: 'head',
      }
      break
  }
  this.snakeData.shift()
  this.snakeData[this.snakeData.length - 1].name = 'body'
  this.snakeData.push(obj)
  if (this.eatFood('food')) {
    callback()
    const filter = {
      up: {
        x: this.snakeData[0].x,
        y: this.snakeData[0].y - 1,
      },
      bottom: {
        x: this.snakeData[0].x,
        y: this.snakeData[0].y + 1,
      },
      right: {
        x: this.snakeData[0].x - 1,
        y: this.snakeData[0].y,
      },
      left: {
        x: this.snakeData[0].x + 1,
        y: this.snakeData[0].y,
      },
    }
    this.snakeData.unshift(filter[newVal])
  }
  if (this.isDead()) {
    console.log(123);
    alert('游戏结束 你已经死亡')
    window.location.reload()
    clearInterval(this.t)
    return false
  }
  this.render()
}

Snake.prototype.isDead = function() {
  const head = this.snakeData[this.snakeData.length - 1]
  const bodyItems = [].concat(this.snakeData)
  bodyItems.pop()
  console.log(bodyItems);
  if (head.x > 49 || head.x < 0 || head.y > 49 || head.y < 0) return true
  console.log(head);
  console.log(bodyItems);
  return bodyItems.some(item => {return item.x === head.x && item.y === head.y})
}
