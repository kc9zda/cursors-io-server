var BufferWriter = require("../BufferWriter.js");

function PacketS00SetClientID(id) {
	this.id = id;
	this.encode = function() {
		var writer = new BufferWriter();
		writer.writeU8(0);
		writer.writeU32(this.id);
		return writer.encode();
		};
	this.getName = function() {
		return "S00 - Set Client ID";
		};
	this.isUpdate = function() {
		return false;
		};
	}

module.exports = PacketS00SetClientID;
