import Sprite    from '../base/sprite'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/pipe.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 250

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Sprite {
  constructor(xx, yy, img) {
    super(img, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.x = xx;
    this.y = yy;
  }

  // 每一帧更新子弹位置
  update() {
    
  }
}
