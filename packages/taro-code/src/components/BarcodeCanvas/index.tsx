import React, { CSSProperties, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { waitForElement } from '../../common/canvas/element'
import { drawCanvasBarcode } from '../../common/canvas/barcode'

export interface BarcodeProps {
  className?: string
  text: string
  scale?: number
  width?: number
  height?: number
  style?: CSSProperties
  foregroundColor?: string
  backgroundColor?: string
  rootSelector?: string
}

const BarcodeCanvas = forwardRef<{ canvas?: Taro.Canvas }, BarcodeProps>((props, ref) => {
  const {
    className,
    text = '',
    width = 300,
    height = 60,
    style = {},
    foregroundColor = '#000000',
    backgroundColor = '#FFFFFF',
    rootSelector,
  } = props
  const id = 'taro-code-canvas-barcode'
  const widthString = width != null ? `${width}px` : ''
  const heightString = height != null ? `${height}px` : ''
  const finalStyle = { width: widthString, height: heightString, ...style }
  const [canvasOutput, setCanvasOutput] = useState<Taro.Canvas>()

  const drawOnce = async (): Promise<void> => {
    const canvas = await waitForElement(id, rootSelector)
    setCanvasOutput(canvas)
    if (canvas != null) {
      drawCanvasBarcode(text, {
        backgroundColor,
        canvas,
        foregroundColor,
        padding: 0,
        height,
        width,
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

export default BarcodeCanvas
