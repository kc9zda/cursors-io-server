var BufferWriter = require("../BufferWriter.js");

function S04Level(map) {
	this.map = map;
	this.getName = function() {
		return "S04 - Level";
		};
	this.encode = function() {
		var w = new BufferWriter();

		w.writeU8(4); //packet id
		w.writeU16(this.map.spawn.x);
		w.writeU16(this.map.spawn.y);
		w.writeU16(this.map.objects.length);
		for (var i=0;i<(this.map.objects.length);i++) {
			this.writeObject(w,this.map.objects[i],i);
			}
		w.writeU32(0); //G
		return w.encode();
		};
	this.writeObject = function (w,obj,id) {
		w.writeU32(id);
		w.writeU8(obj.type);
		clog("writing object type "+obj.type);
		switch(obj.type) {
			case 0:
				w.writeU16(obj.x);
				w.writeU16(obj.y);
				w.writeU8(obj.textHeight);
				w.writeU8(obj.isCentered?1:0);
				writeString(w,obj.text);
				w.writeU8(0);
				break;
			case 1:
				w.writeU16(obj.x);
				w.writeU16(obj.y);
				w.writeU16(obj.width);
				w.writeU16(obj.height);
				writeColor(w,obj.color);
				break;
			case 2:
				w.writeU16(obj.x);
				w.writeU16(obj.y);
				w.writeU16(obj.width);
				w.writeU16(obj.height);
				w.writeU8(0);
				break;
			case 3:
				w.writeU16(obj.x);
				w.writeU16(obj.y);
				w.writeU16(obj.width);
				w.writeU16(obj.height);
				w.writeU16(obj.count);
				writeColor(w,obj.color);
				break;
			case 4:
				w.writeU16(obj.x);
				w.writeU16(obj.y);
				w.writeU16(obj.width);
				w.writeU16(obj.height);
				w.writeU16(obj.count);
				writeColor(w,obj.color);
				break;
			}
		};
	this.isUpdate = function() {
		return false;
		};
	}

function writeColor(w,c) {
	w.writeU8(c.b);
	w.writeU8(c.g);
	w.writeU8(c.r);
	w.writeU8(c.a);
	}

function writeString(w,s) {
	var b = new Buffer(s);

	w.writeBuffer(b);
	}

module.exports = S04Level;

function clog(m) {
	console.log(m);
	}
