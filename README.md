# Taro Code

> QRCode & Barcode component for [Taro](https://taro.js.org) 3.x,  inspired by [wx-base64-qrcode](https://github.com/PsChina/wx-base64-qrcode) and [wxbarcode](https://github.com/alsey/wxbarcode). Components will generate base64 qrcode/barcode image.

[Taro 2.x documentation](https://github.com/Miaonster/taro-code/tree/taro-2.x)

## Getting Started

### Install

```
yarn add taro-code
# or
npm install taro-code
```

### Usage

```tsx
import Taro from '@tarojs/taro'
import { Barcode, QRCode } from 'taro-code'

class Code extends Taro.Component {
  render() {
    return (
      <View>
        <Barcode text='hello' width={300} height={60} scale={4} />
        <QRCode
          text='world'
          size={300}
          scale={4}
          errorCorrectLevel='M'
          typeNumber={2}
        />
      </View>
    )
  }
}
```

## Components

### Barcode


| Prop              | Type     | Default   |
| ----------------- | -------- | --------- |
| `text`            | `string` | `''`      |
| `width`           | `number` | `300`     |
| `height`          | `number` | `80`      |
| `scale`           | `number` | `4`       |
| `style`           | `object` | `{}`      |
| `className`       | `string` |           |
| `foregroundColor` | `string` | `#000000` |
| `backgroundColor` | `string` | `#FFFFFF` |

### QRCode

| Prop                | Type                       | Default   |
| ------------------- | -------------------------- | --------- |
| `text`              | `string`                   | `''`      |
| `size`              | `number`                   | `300`     |
| `scale`             | `number`                   | `4`       |
| `typeNumber`        | `number`                   | `2`       |
| `errorCorrectLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'`     |
| `style`             | `object`                   | `{}`      |
| `className`         | `string`                   |           |
| `foregroundColor`   | `string`                   | `#000000` |
| `backgroundColor`   | `string`                   | `#FFFFFF` |

### ImageProps

除了上述的属性外，还支持 [ImageProps](https://taro-docs.jd.com/taro/docs/components/media/image/#imageprops) 的所有属性， 例如 `showMenuByLongpress` 等。

## Screenshot

![screenshot](./assets/screenshot.png)
