var LevelManager = require("./LevelManager.js");
var S00ClientID = require("./packets/S00SetClientID.js");
var S04Level = require("./packets/S04Level.js");
var S05Teleport = require("./packets/S05Teleport.js");

function Player() {
	this.id = 0;
	this.level = {};
	this.pos = {
		x: 0,
		y: 0};

	this.outboundPacketHandler = function(pkt) {};
	this.inboundPacketHandler = function(pkt) {
		if (!this.hasBegun) return;
		switch(pkt.pid)  {
			case 1:
				this.pos.x = pkt.x;
				this.pos.y = pkt.y;
				clog("player id "+this.id+" updated position");
				break;
			case 2:
				this.level.click(pkt.x,pkt.y);
				break;
			case 3:
				this.level.draw(pkt.x1,pkt.y1,pkt.x2,pkt.y2);
				break;
			}
		};
	this.sendID = function() {
		this.outboundPacketHandler(new S00ClientID(this.id));
		};
	this.begin = function() {
		this.sendID();
		this.level = LevelManager.getSpawnLevel();
		this.level.addPlayer(this);
		this.hasBegun = true;
		};
	this.sendMap = function(map) {
		this.outboundPacketHandler(new S04Level(map));
		};
	this.setLocation = function(pos,g) {
		this.pos = pos;
		this.outboundPacketHandler(new S05Teleport(pos.x,pos.y,g));
		};
	}

module.exports = Player;

function clog(m) {
	console.log(m);
	}
