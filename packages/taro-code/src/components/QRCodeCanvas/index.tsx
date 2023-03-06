import React, { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Canvas } from '@tarojs/components'
import Taro, { CanvasContext } from '@tarojs/taro'
import { drawCanvasQRCode } from '../../common/canvas/qrcode'
import { waitForElement } from '../../common/canvas/element'

type TypeNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40

export interface QRCodeCanvasProps {
  className?: string
  text: string
  size?: number
  scale?: number
  style?: CSSProperties
  errorCorrectLevel?: 'L' | 'M' | 'Q' | 'H'
  typeNumber?: TypeNumber
  foregroundColor?: string
  backgroundColor?: string
  padding?: number
}

function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = state
  })

  return ref.current
}

const QRCodeCanvas = forwardRef<{ canvas?: Taro.Canvas }, QRCodeCanvasProps>((props, ref) => {
  const {
    className,
    text = '',
    size = 100,
    typeNumber = 2,
    errorCorrectLevel = 'M',
    style = {},
    foregroundColor = '#000000',
    backgroundColor = '#FFF0FF',
    padding = 0,
  } = props
  const id = 'taro-code-canvas-qrcode'
  const widthString = size != null ? `${size}px` : ''
  const heightString = size != null ? `${size}px` : ''
  const finalStyle = { width: widthString, height: heightString, ...style }
  const previousSize = usePrevious(size)
  const [canvasOutput, setCanvasOutput] = useState<Taro.Canvas>()

  const drawOnce = async (): Promise<void> => {
    const canvas = await waitForElement(id)
    setCanvasOutput(canvas)
    if (canvas != null) {
      const ctx = canvas.getContext('2d') as unknown as CanvasContext
      ctx.clearRect(0, 0, previousSize ?? size, previousSize ?? size)
      drawCanvasQRCode(text, {
        errorCorrectLevel,
        typeNumber,
        size,
        foregroundColor,
        backgroundColor,
        padding,
        canvas,
      })
    }
  }

  useEffect(() => {
    void drawOnce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useImperativeHandle(
    ref,
    () => {
      return { canvas: canvasOutput }
    },
    [canvasOutput],
  )

  return <Canvas id={id} canvasId={id} type='2d' className={className} style={finalStyle} />
})

export default QRCodeCanvas
