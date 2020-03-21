import Taro, { useMemo } from '@tarojs/taro'
import { Image } from '@tarojs/components'
import barcode from '../../utils/barcode'

type Props = {
  text: string
  scale?: number
  width?: number
  height?: number
}
export default function BarCode({
  text = '',
  scale = 4,
  width = 300,
  height = 60,
}: Props) {
  const image: string = useMemo(() => barcode({ text, scale }), [text, scale])
  const widthString = width ? width + 'px' : ''
  const heightString = height ? height + 'px' : ''
  const style = { width: widthString, height: heightString }
  return <Image style={style} src={image} />
}
