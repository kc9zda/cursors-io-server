var BufferWriter = require("../BufferWriter.js");

function S05Teleport(x,y,g) {
	this.x = x;
	this.y = y;
	this.g = g;
	this.getName = function() {
		return "S05 - Teleport";
		};
	this.encode = function () {
		var w = new BufferWriter();

		w.writeU8(5);
		w.writeU16(this.x);
		w.writeU16(this.y);
		w.writeU32(this.g);
		return w.encode();
		};
	this.isUpdate = function() {
		return false;
		};
	}

module.exports = S05Teleport;
