function BufferReader(buf) {
	this.ctr = 0;
	this.buf = buf;
	this.ab = toArrayBuffer(this.buf);
	this.dv = new DataView(this.ab);
	this.readU8 = function() {
		var r = this.dv.getUint8(this.ctr);

		this.ctr++;
		return r;
		};
	this.readU16 = function() {
		var r = this.dv.getUint16(this.ctr,true);

		this.ctr+=2;
		return r;
		};
	this.readU32 = function() {
		var r = this.dv.getUint32(this.ctr,true);

		this.ctr+=4;
		return r;
		};
	}

function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}


module.exports = BufferReader;
