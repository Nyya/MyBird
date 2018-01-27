import DataBus  from '../databus'
import Animation from '../base/animation'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/bird.png'
const PLAYER_WIDTH   = 50
const PLAYER_HEIGHT  = 50

let databus = new DataBus()

export default class Player extends Animation {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    this.gravity = 1;

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 5 - this.width / 2
    this.y = screenHeight / 5 - this.height / 2

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.initExplosionAnimation()
    
    // 初始化事件监听
    this.initEvent()
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

        this.touched = true
        this.over = 1

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false

    }).bind(this))

  }

  update() {
   
    this.y += this.gravity;

    this.gravity += 0.2;

    if(this.touched == true && this.over == 1) {
      this.gravity = -4.5
      this.over = 0
    }
  }
}
