import Taro from '@tarojs/taro'
import { code128 } from './barcode'
import { drawQRCodeToCanvas } from './qrcode'

function convertLength(length) {
	return Math.round(Taro.getSystemInfoSync().windowWidth * length / 750);
}

function barc({ ctx, text, width, height }) {
	code128(ctx, text, convertLength(width), convertLength(height))
}

function qrc(text, options) {
	drawQRCodeToCanvas(text, options)
}

export default {
	barcode: barc,
	qrcode: qrc
}
