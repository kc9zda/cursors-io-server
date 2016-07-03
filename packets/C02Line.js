function C02Line(reader) {
	this.pid = 3;
	this.x1 = reader.readU16();
	this.y1 = reader.readU16();
	this.x2 = reader.readU16();
	this.y2 = reader.readU16();
	}

module.exports = C02Line;
