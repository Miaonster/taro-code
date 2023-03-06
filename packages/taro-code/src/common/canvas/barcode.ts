import Taro, { Canvas, CanvasContext } from '@tarojs/taro'
import code128 from '../barcode/code128'

export function drawCanvasBarcode(
  text: string,
  options: {
    canvas: Canvas
    foregroundColor: string
    backgroundColor: string
    padding: number
    width: number
    height: number
  },
): void {
  const pieces = code128(text)
  const canvas = options.canvas
  const dpr = Taro.getSystemInfoSync().pixelRatio
  canvas.width = options.width * dpr
  canvas.height = options.height * dpr
  const width = canvas.width
  const height = canvas.height

  const ctx = canvas.getContext('2d') as CanvasContext
  ctx.fillStyle = options.backgroundColor
  ctx.fillRect(0, 0, width + options.padding * 2, width + options.padding * 2)

  const tileW = (width - options.padding * 2) / pieces.length
  const tileH = height - options.padding * 2

  for (let col = 0; col < pieces.length; col++) {
    ctx.fillStyle = pieces[col] === 1 ? options.foregroundColor : options.backgroundColor
    const w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW)
    const h = tileH
    ctx.fillRect(Math.round(col * tileW) + options.padding, options.padding, w, h)
  }
}
