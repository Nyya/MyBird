import Sprite    from '../base/sprite'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/pipe.png'
const ENEMY_WIDTH   = 85
const ENEMY_HEIGHT  = 360

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Sprite {
  constructor(xx, yy, img, isTop) {
    super(img, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.x = xx;
    this.y = yy;
    this.isTop = isTop;

  }

  // 每一帧更新子弹位置
  update() {
    this.x -= 2.3
    if(this.x < -ENEMY_WIDTH) {
      this.x = 90 + window.innerWidth
      if (this.isTop) {
        this.y = Math.random() * 90 - 80;
      } else {
        this.y = window.innerHeight - 200 -35 + Math.random() * 70;
      }
      
    }
  }
}
