function C01Click(reader) {
	this.pid = 2;
	this.x = reader.readU16();	
	this.y = reader.readU16();
	this.g = reader.readU32();
	}

module.exports = C01Click;
