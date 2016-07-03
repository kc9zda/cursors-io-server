function C00CursorPosition(reader) {
	this.pid = 1;
	this.x = reader.readU16();
	this.y = reader.readU16();
	this.g = reader.readU32();

	clog("X: "+this.x);
	clog("Y: "+this.y);
	clog("G: "+this.g);
	}

module.exports = C00CursorPosition;

function clog(m) {
	console.log(m);
	}
