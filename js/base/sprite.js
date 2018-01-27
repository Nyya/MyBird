/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    this.img     = new Image()
    this.img.src = imgSrc

    this.width  = width
    this.height = height

    this.colWidth = 0
    this.colHeight = 0
    this.colX = 0
    this.colY = 0

    this.x = x
    this.y = y

    this.visible = true
  }

  setCollision(colW, colH, colX, colY) {
    this.colWidth = colW
    this.colHeight = colH
    this.colX = colX
    this.colY = colY
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if ( !this.visible )
      return

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )

    //显示碰撞区域
    ctx.strokeStyle = '#F00'
    ctx.strokeRect(this.x + this.colX, this.y + this.colY, this.colWidth, this.colHeight)
  }

rotate(ctx, r) {
  ctx.save();
  ctx.rotate(r * Math.PI / 180);
  ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.width,
    this.height
  )
}

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let aRectStartX = Math.max(this.x + this.colX, sp.x + sp.colX)
    let aRectStartY = Math.max(this.y + this.colY, sp.y + sp.colY)
    let iRectEndX = Math.min(this.x + this.colX + this.colWidth, sp.x + sp.colX + sp.colWidth)
    let iRectEndY = Math.min(this.y + this.colY + this.colHeight, sp.y + sp.colY + sp.colHeight)
    if (aRectStartX <= iRectEndX && aRectStartY <= iRectEndY) {
      return true;
    } else {
      return false;
    }
  }
}
