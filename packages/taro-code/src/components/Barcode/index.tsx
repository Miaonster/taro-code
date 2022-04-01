import React, {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react'
import { Image } from '@tarojs/components'
import { CommonImageProps } from '../../common/types/image'
import barcode from '../../common/barcode'

export interface BarcodeProps extends CommonImageProps {
  className?: string
  text: string
  scale?: number
  width?: number
  height?: number
  style?: CSSProperties
  foregroundColor?: string
  backgroundColor?: string
}

const Barcode = forwardRef<{ image: string }, BarcodeProps>(
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
