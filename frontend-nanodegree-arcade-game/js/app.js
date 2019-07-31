let lives = 3
let score = 0
let gameOver = false
document.getElementById('score').innerHTML = score
document.getElementById('lives').innerHTML = lives
document.getElementById('gameOver').innerHTML = gameOver

var Enemy = function Enemy(x, y, s) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x
    this.y = y
    this.speed = s
};


Enemy.prototype.update = function(dt) {
    this.x += 1
    this.x += this.speed * dt
    if (this.x > 500) {
      this.x = -100
      let randomSpeed = Math.floor(Math.random() * 4 + 1)
      this.speed = 50 * randomSpeed
    }
    const enemyLeftMax = this.x - 70
    const enemyRightMax = this.x + 70
    const enemyTopMax = this.y - 60
    const enemyBottomMax = this.y + 60
    if (player.x > enemyLeftMax && player.x < enemyRightMax && player.y > enemyTopMax && player.y < enemyBottomMax) {
      player.resetPlayer()
      lives--
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function Player() {
  this.sprite = 'images/char-cat-girl.png'
  this.x = 202
  this.y = 410
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.update = function(dt) {
  if(this.y < 10) {
    player.resetPlayer()
    score += 10
  }
  else if(this.y > 410) {
    this.y = 410
  }
  if(this.x < 0) {
    this.x = 2
  }
  else if(this.x > 400) {
    this.x = 400
  }
}

Player.prototype.resetPlayer = function() {
  this.x = 202
  this.y = 410
}

Player.prototype.handleInput = function(dt) {
    switch(dt) {
      case 'up':
        this.y -= 90
        break
      case 'down':
        this.y += 90
        break
      case 'left':
        this.x -= 100
        break
      case 'right':
        this.x += 100
        break
    }
}

let allEnemies = [new Enemy(-200, 65, 1), new Enemy(-150, 145, 1), new Enemy(-100, 230, 1)]
let player = new Player()

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
