var BufferReader = require("./BufferReader.js");
var C00CursorPosition = require("./packets/C00CursorPosition.js");
var C01Click = require("./packets/C01Click.js");
var C02Line = require("./packets/C02Line.js");

function parse(pkt) {
	var reader = new BufferReader(pkt);
	var pktId = reader.readU8();

	switch(pktId) {
		case 1:
			return new C00CursorPosition(reader);
			break;
		case 2:
			return new C01Click(reader);
			break;
		case 3:
			return new C02Line(reader);
			break;
		default:
			return undefined;
			break;
		}
	}

module.exports.parse = parse;
