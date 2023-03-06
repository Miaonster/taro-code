import Taro, { Canvas, CanvasContext } from '@tarojs/taro'

import { qrcode } from '../qrcode'

export function drawCanvasQRCode(
  text: string,
  options: {
    size?: number
    typeNumber?: number
    errorCorrectLevel?: 'L' | 'M' | 'Q' | 'H'
    foregroundColor: string
    backgroundColor: string
    canvas: Canvas
    padding: number
  },
): void {
  const typeNumber = options.typeNumber ?? 4
  const errorCorrectLevel = options.errorCorrectLevel ?? 'M'
  const size = options.size ?? 500

  const qr = qrcode(typeNumber, errorCorrectLevel ?? 'M')
  qr.addData(text)
  qr.make()

  const canvas = options.canvas
  const dpr = Taro.getSystemInfoSync().pixelRatio
  canvas.width = size * dpr
  canvas.height = size * dpr
  const width = canvas.width

  const ctx = canvas.getContext('2d') as CanvasContext

  ctx.fillStyle = options.backgroundColor
  ctx.fillRect(0, 0, width + options.padding * 2, width + options.padding * 2)

  const tileW = (width - options.padding * 2) / qr.getModuleCount()
  const tileH = (width - options.padding * 2) / qr.getModuleCount()

  for (let row = 0; row < qr.getModuleCount(); row++) {
    for (let col = 0; col < qr.getModuleCount(); col++) {
      ctx.fillStyle = qr.isDark(row, col) ? options.foregroundColor : options.backgroundColor
      const w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW)
      const h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW)
      ctx.fillRect(Math.round(col * tileW) + options.padding, Math.round(row * tileH) + options.padding, w, h)
    }
  }
}
