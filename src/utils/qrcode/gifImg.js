const gifImage = function (size, foreground, background) {
    let _data = new Array(size * size);

    let _this = {};

    _this.setPixel = function (x, y, pixel) {
        _data[y * size + x] = pixel;
    };

    _this.write = function (out) {
        // GIF Signature
        out.writeString('GIF87a');

        // Screen Descriptor
        out.writeShort(size);
        out.writeShort(size);

        out.writeByte(0x80); // 2bit
        out.writeByte(0);
        out.writeByte(0);

        // Global Color Map

        // black
        out.writeByte('0x' + foreground[1] + foreground[2]);
        out.writeByte('0x' + foreground[3] + foreground[4]);
        out.writeByte('0x' + foreground[5] + foreground[6]);

        // white
        out.writeByte('0x' + background[1] + background[2]);
        out.writeByte('0x' + background[3] + background[4]);
        out.writeByte('0x' + background[5] + background[6]);

        // Image Descriptor
        out.writeString(',');
        out.writeShort(0);
        out.writeShort(0);
        out.writeShort(size);
        out.writeShort(size);
        out.writeByte(0);

        // Local Color Map

        // Raster Data
        let lzwMinCodeSize = 2;
        let raster = getLZWRaster(lzwMinCodeSize);

        out.writeByte(lzwMinCodeSize);

        let offset = 0;

        while (raster.length - offset > 255) {
            out.writeByte(255);
            out.writeBytes(raster, offset, 255);
            offset += 255;
        }

        out.writeByte(raster.length - offset);
        out.writeBytes(raster, offset, raster.length - offset);
        out.writeByte(0x00);

        // GIF Terminator
        out.writeString(';');
    };

    let bitOutputStream = function (out) {
        let _out = out;
        let _bitLength = 0;
        let _bitBuffer = 0;

        let _this = {};

        _this.write = function (data, length) {
            if ((data >>> length) != 0) {
                throw new Error('length over');
            }

            while (_bitLength + length >= 8) {
                _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer));
                length -= (8 - _bitLength);
                data >>>= (8 - _bitLength);
                _bitBuffer = 0;
                _bitLength = 0;
            }

            _bitBuffer = (data << _bitLength) | _bitBuffer;
            _bitLength = _bitLength + length;
        };

        _this.flush = function () {
            if (_bitLength > 0) {
                _out.writeByte(_bitBuffer);
            }
        };

        return _this;
    };

    let getLZWRaster = function (lzwMinCodeSize) {
        let clearCode = 1 << lzwMinCodeSize;
        let endCode = (1 << lzwMinCodeSize) + 1;
        let bitLength = lzwMinCodeSize + 1;

        // Setup LZWTable
        let table = lzwTable();

        for (let i = 0; i < clearCode; i++) {
            table.add(String.fromCharCode(i));
        }
        table.add(String.fromCharCode(clearCode));
        table.add(String.fromCharCode(endCode));

        let byteOut = byteArrayOutputStream();
        let bitOut = bitOutputStream(byteOut);

        // clear code
        bitOut.write(clearCode, bitLength);

        let dataIndex = 0;

        let s = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        while (dataIndex < _data.length) {
            let c = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;

            if (table.contains(s + c)) {
                s = s + c;
            } else {
                bitOut.write(table.indexOf(s), bitLength);

                if (table.size() < 0xfff) {
                    if (table.size() == (1 << bitLength)) {
                        bitLength += 1;
                    }

                    table.add(s + c);
                }

                s = c;
            }
        }

        bitOut.write(table.indexOf(s), bitLength);

        // end code
        bitOut.write(endCode, bitLength);

        bitOut.flush();

        return byteOut.toByteArray();
    };

    let lzwTable = function () {
        let _map = {};
        let _size = 0;

        let _this = {};

        _this.add = function (key) {
            if (_this.contains(key)) {
                throw new Error('dup key:' + key);
            }
            _map[key] = _size;
            _size += 1;
        };

        _this.size = function () {
            return _size;
        };

        _this.indexOf = function (key) {
            return _map[key];
        };

        _this.contains = function (key) {
            return typeof _map[key] != 'undefined';
        };

        return _this;
    };

    return _this;
};

const byteArrayOutputStream = function () {
    let _bytes = new Array();

    let _this = {};

    _this.writeByte = function (b) {
        _bytes.push(b & 0xff);
    };

    _this.writeShort = function (i) {
        _this.writeByte(i);
        _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function (b, off, len) {
        off = off || 0;
        len = len || b.length;

        for (let i = 0; i < len; i++) {
            _this.writeByte(b[i + off]);
        }
    };

    _this.writeString = function (s) {
        for (let i = 0; i < s.length; i++) {
            _this.writeByte(s.charCodeAt(i));
        }
    };

    _this.toByteArray = function () {
        return _bytes;
    };

    _this.toString = function () {
        let s = '';

        s += '[';
        for (let i = 0; i < _bytes.length; i++) {
            if (i > 0) {
                s += ',';
            }
            s += _bytes[i];
        }
        s += ']';

        return s;
    };

    return _this;
};

const base64EncodeOutputStream = function () {
    let _buffer = 0;
    let _buflen = 0;
    let _length = 0;
    let _base64 = '';

    let _this = {};

    let writeEncoded = function (b) {
        _base64 += String.fromCharCode(encode(b & 0x3f));
    };

    let encode = function (n) {
        if (n < 0) {
            // error.
        } else if (n < 26) {
            return 0x41 + n;
        } else if (n < 52) {
            return 0x61 + (n - 26);
        } else if (n < 62) {
            return 0x30 + (n - 52);
        } else if (n == 62) {
            return 0x2b;
        } else if (n == 63) {
            return 0x2f;
        }
        throw new Error('n:' + n);
    };

    _this.writeByte = function (n) {
        _buffer = (_buffer << 8) | (n & 0xff);
        _buflen += 8;
        _length += 1;

        while (_buflen >= 6) {
            writeEncoded(_buffer >>> (_buflen - 6));
            _buflen -= 6;
        }
    };

    _this.flush = function () {
        if (_buflen > 0) {
            writeEncoded(_buffer << (6 - _buflen));
            _buffer = 0;
            _buflen = 0;
        }

        if (_length % 3 != 0) {
            // padding
            let padlen = 3 - _length % 3;
            for (let i = 0; i < padlen; i++) {
                _base64 += '=';
            }
        }
    };

    _this.toString = function () {
        return _base64;
    };

    return _this;
};

const outputGifBase64 = function (size, foreground, background, getPixel) {
    let gif = gifImage(size, foreground, background);

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            gif.setPixel(x, y, getPixel(x, y));
        }
    }

    let b = byteArrayOutputStream();
    gif.write(b);

    let base64 = base64EncodeOutputStream();
    let bytes = b.toByteArray();
    for (let i = 0; i < bytes.length; i++) {
        base64.writeByte(bytes[i]);
    }
    base64.flush();

    let img = '';
    img += 'data:image/gif;base64,';
    img += base64;

    return img;
};

module.exports = outputGifBase64;
