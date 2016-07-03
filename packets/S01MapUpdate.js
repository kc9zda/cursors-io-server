var BufferWriter = require("../BufferWriter.js");

function PacketS01MapUpdate() {
	this.encode = function() {
		var writer = new BufferWriter();
		var i =0;

		writer.writeU8(1);
		writer.writeU16(this.playerUpdates.length);
		for (i=0;i<this.playerUpdates.length;i++) {
			writer.writeU32(this.playerUpdates[i].id);
			writer.writeU16(this.playerUpdates[i].pos.x);
			writer.writeU16(this.playerUpdates[i].pos.y);
			}
		writer.writeU16(this.clicks.length);
		for (i=0;i<this.clicks.length;i++) {
			writer.writeU16(this.clicks[i].x);
			writer.writeU16(this.clicks[i].y);
			}
		writer.writeU16(this.wallsRemoved.length);
		for (i=0;i<this.wallsRemoved.length;i++) {
			writer.writeU32(this.wallsRemoved[i]);
			}
		writer.writeU16(this.mapUpdates.length);
		for (i=0;i<this.mapUpdates.length;i++) {
			writer.writeU32(this.mapUpdates[i].id);
			writer.writeU32(this.mapUpdates[i].objtype);
			writer.writeBuffer(this.mapUpdates[i].data);
			}
		writer.writeU16(this.drawings.length);
		for (i=0;i<this.drawings.length;i++) {
			writer.writeU16(this.drawings[i].x1);
			writer.writeU16(this.drawings[i].y1);
			writer.writeU16(this.drawings[i].x2);
			writer.writeU16(this.drawings[i].y2);
			}
		writer.writeU32(this.playerCount);
		return writer.encode();
		};
	this.setPlayerUpdates = function(pu) {
		this.playerUpdates = pu;
		};
	this.setClicks = function(c) {
		this.clicks = c;
		};
	this.setWallsRemoved = function(wr) {
		this.wallsRemoved = wr;
		};
	this.setMapUpdates = function(mu) {
		this.mapUpdates = mu;
		};
	this.setLines = function(l) {
		this.drawings = l;
		};
	this.setPlayerCount = function(pc) {
		this.playerCount = pc;
		};
	this.getName = function() {
		return "S01 - Map Update";
		};
	this.isUpdate = function() {
		return true;
		};
	}

module.exports = PacketS01MapUpdate;
