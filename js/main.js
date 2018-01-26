import Player     from './player/index'
import Enemy      from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg       = new BackGround(ctx)
    this.player   = new Player(ctx)
    this.pipes    = new Array()
    this.gameinfo = new GameInfo()
    this.music    = new Music()

    this.initPipes();

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }

  initPipes() {
    for (var i = 0; i < 4; i++) {
      if (i % 2 == 0) {
        this.pipes[i] = new Enemy(120 * i, Math.random() * 100 - 100, 'images/pipe2.png');
      } else {
        this.pipes[i] = new Enemy(120 * i, window.innerHeight-200, 'images/pipe.png');
      }
    }
  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this
   
    if (this.player.y > window.innerHeight-25 || this.player.y < -30) {
      databus.gameOver = true
    }
    
  }

  //游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    this.player.drawToCanvas(ctx)
    
    for (var i = 0; i < 4; i++) {
      this.pipes[i].drawToCanvas(ctx)
    }

    // this.player.rotate(ctx, this.player.gravity * 2)

    databus.animations.forEach((ani) => {
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)
  }

  // 游戏逻辑更新主函数
  update() {
    this.player.update()

    this.bg.update()

    this.collisionDetection()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      this.touchHandler = this.touchEventHandler.bind(this)
      canvas.addEventListener('touchstart', this.touchHandler)

      return
    }

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }
}
