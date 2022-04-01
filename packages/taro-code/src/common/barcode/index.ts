/* eslint-disable */
import code128 from './code128'

function getLittleEndianHex (value) {
  var result: string[] = []
  for (var bytes = 4; bytes > 0; bytes--) {
    result.push(String.fromCharCode(value & 255))
    value >>= 8
  }
  return result.join('')
}

function btoa (string) {
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  string = String(string)
  var bitmap
  var a
  var b
  var c
  var result = ''
  var i = 0
  var rest = string.length % 3 // To determine the final padding

  // eslint-disable-next-line space-in-parens
  for (; i < string.length; ) {
    if (
      (a = string.charCodeAt(i++)) > 255 ||
      (b = string.charCodeAt(i++)) > 255 ||
      (c = string.charCodeAt(i++)) > 255
    ) {
      throw new TypeError(
        "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
      )
    }

    bitmap = (a << 16) | (b << 8) | c
    result +=
      b64.charAt((bitmap >> 18) & 63) +
      b64.charAt((bitmap >> 12) & 63) +
      b64.charAt((bitmap >> 6) & 63) +
      b64.charAt(bitmap & 63)
  }

  // If there's need of padding, replace the last 'A's with equal signs
  return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result
}

function getBuffer ({ pieces, width, extraBytes, scale = 1, whiteColor = '', blackColor = '' }) {
  const black = blackColor.split('')
  const white = whiteColor.split('')
  const blackColors = [
    parseInt(`${black[5]}${black[6]}`, 16),
    parseInt(`${black[3]}${black[4]}`, 16),
    parseInt(`${black[1]}${black[2]}`, 16),
  ]
  const whiteColors = [
    parseInt(`${white[5]}${white[6]}`, 16),
    parseInt(`${white[3]}${white[4]}`, 16),
    parseInt(`${white[1]}${white[2]}`, 16),
  ]

  return pieces
    .map((piece) => Array(scale).fill(piece))
    .reduce((acc, x) => acc.concat(x), [])
    .map((piece, index) => {
      // const code =  ? 0 : 255
      const colors = parseInt(piece) ? blackColors : whiteColors
      if (!((index % width) - 1) && extraBytes) {
        return colors.concat(Array(extraBytes).fill(0))
      } else {
        return colors
      }
    })
    .reduce((acc, x) => acc.concat(x), [])
    .map((x) => String.fromCharCode(x))
    .join('')
}

export default function barcode ({ text = '', scale = 4, blackColor, whiteColor }) {
  const pieces = code128(text)
  const width = pieces.length * scale
  const height = 1
  const extraBytes = width % 4
  const colorSize = height * (3 * width + extraBytes)
  const offset = 54
  const fileSize = colorSize + offset
  const fileSizeBytes = getLittleEndianHex(fileSize)
  const numFileBytes = getLittleEndianHex(colorSize)
  const w = getLittleEndianHex(width)
  const h = getLittleEndianHex(height)
  const imgdata = getBuffer({ pieces, width, extraBytes, scale, blackColor, whiteColor })

  const header =
    'BM' + // Signature
    fileSizeBytes + // size of the file (bytes)
    '\x00\x00' + // reserved
    '\x00\x00' + // reserved
    '\x36\x00\x00\x00' + // offset of where BMP data lives (54 bytes)
    '\x28\x00\x00\x00' + // number of remaining bytes in header from here (40 bytes)
    w + // the width of the bitmap in pixels*
    h + // the height of the bitmap in pixels*
    '\x01\x00' + // the number of color planes (1)
    '\x18\x00' + // 24 bits / pixel
    '\x00\x00\x00\x00' + // No compression (0)
    numFileBytes + // size of the BMP data (bytes)*
    '\x13\x0B\x00\x00' + // 2835 pixels/meter - horizontal resolution
    '\x13\x0B\x00\x00' + // 2835 pixels/meter - the vertical resolution
    '\x00\x00\x00\x00' + // Number of colors in the palette (keep 0 for 32-bit)
    '\x00\x00\x00\x00' // 0 important colors (means all colors are important)
  return 'data:image/bmp;base64,' + btoa(header + imgdata)
}
