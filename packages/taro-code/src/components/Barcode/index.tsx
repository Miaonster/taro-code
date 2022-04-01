import React, {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react'
import { Image, ImageProps } from '@tarojs/components'
import barcode from '../../common/barcode'

const Barcode = forwardRef<
  { image: string },
  {
    className?: string
    text: string
    scale?: number
    width?: number
    height?: number
    style?: CSSProperties
    foregroundColor?: string
    backgroundColor?: string
  } & Omit<ImageProps, 'style' | 'src'>
>(
  (
    {
      className,
      text = '',
      scale = 4,
      width = 300,
      height = 60,
      style = {},
      foregroundColor = '#000000',
      backgroundColor = '#FFFFFF',
    },
    ref,
  ) => {
    const image = useMemo(
      () =>
        barcode({
          text,
          scale,
          whiteColor: backgroundColor,
          blackColor: foregroundColor,
        }),
      [text, scale, backgroundColor, foregroundColor],
    )
    useImperativeHandle(
      ref,
      () => {
        return { image }
      },
      [image],
    )
    const widthString = width != null ? `${width}px` : ''
    const heightString = height != null ? `${height}px` : ''
    const finalStyle = { width: widthString, height: heightString, ...style }
    return <Image className={className} style={finalStyle} src={image ?? ''} />
  },
)

export default Barcode
