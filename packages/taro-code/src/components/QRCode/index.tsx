import { Image } from '@tarojs/components'
import React, { CSSProperties, forwardRef, useImperativeHandle, useMemo } from 'react'
import { createQrCodeImg } from '../../common/qrcode'
import { CommonImageProps } from '../../common/types/image'

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

export interface QRCodeProps extends CommonImageProps {
  className?: string
  text: string
  size?: number
  scale?: number
  style?: CSSProperties
  errorCorrectLevel?: 'L' | 'M' | 'Q' | 'H'
  typeNumber?: TypeNumber
  padding?: number
  foregroundColor?: string
  backgroundColor?: string
}

const QRCode = forwardRef<{ image: string }, QRCodeProps>(
  (
    {
      className,
      text = '',
      size = 100,
      scale = 4,
      typeNumber = 2,
      errorCorrectLevel = 'M',
      style = {},
      padding,
      foregroundColor = '#000000',
      backgroundColor = '#FFFFFF',
      ...imageProps
    },
    ref,
  ) => {
    const image = useMemo(() => {
      const options = {
        errorCorrectLevel,
        typeNumber,
        size: size * scale,
        padding: padding ? padding * scale : undefined,
        black: foregroundColor,
        white: backgroundColor,
      }
      return createQrCodeImg(text, options)
    }, [errorCorrectLevel, typeNumber, size, scale, padding, foregroundColor, backgroundColor, text])
    const widthString = size != null ? `${size}px` : ''
    const heightString = size != null ? `${size}px` : ''
    const finalStyle = { width: widthString, height: heightString, ...style }
    useImperativeHandle(
      ref,
      () => {
        return { image }
      },
      [image],
    )
    return <Image {...imageProps} className={className} style={finalStyle} src={image} />
  },
)

export default QRCode
