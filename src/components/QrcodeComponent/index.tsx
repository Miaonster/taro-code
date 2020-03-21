import Taro, { useMemo } from '@tarojs/taro'
import { Image } from '@tarojs/components'
import { createQrCodeImg } from '../../utils/qrcode'

type Props = {
  text: string
  size?: number
  scale?: number
  typeNumber?: number
  errorCorrectLevel?: string
}
export default function QRCode({
  text = '',
  size = 100,
  scale = 4,
  typeNumber = 2,
  errorCorrectLevel = 'M',
}: Props) {
  const image = useMemo(() => {
    const options = { errorCorrectLevel, typeNumber, size: size * scale }
    return createQrCodeImg(text, options)
  }, [text, scale, size, errorCorrectLevel, typeNumber])
  const style = { width: size + 'px', height: size + 'px' }
  return <Image style={style} src={image} />
}
