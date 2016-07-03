var LevelManager = require("./LevelManager.js");
var PacketS01MapUpdate = require("./packets/S01MapUpdate.js");
var Server = require("./Server.js");
var Utils = require("./Utils.js");

function Level(lvl) {
	this.level = lvl;
	this.updates = {
		clicks: [],
		wall: [],
		map: [],
		lines: []
		};
	this.players = [];
	this.drawings = [];

	this.broadcastPacket = function(pkt) {
		for (var i=0;i<this.players.length;i++) {
			if (this.players[i]!=undefined) this.players[i].outboundPacketHandler(pkt);
			}
		};
	this.clearUpdates = function() {
		this.updates.clicks = [];
		this.updates.walls = [];
		this.updates.map = [];
		this.updates.lines = [];
		};
	this.broadcastUpdate = function() {
		var bpkt = new PacketS01MapUpdate();

		bpkt.setPlayerUpdates(this.encodePlayerUpdate());
		bpkt.setClicks(this.updates.clicks);
		bpkt.setWallsRemoved(this.updates.walls);
		bpkt.setMapUpdates(this.updates.map);
		bpkt.setLines(this.updates.lines);
		bpkt.setPlayerCount(Server.getPlayerCount());
		this.broadcastPacket(bpkt);
		this.clearUpdates();
		};
	this.checkExitsForPlayer = function(j) {
		var a,p,r;

		if (this.players[j]==undefined) return false;
		for (var i=0;i<this.level.objects.length;i++) {
			if (this.level.objects[i].type==2) {
				a = this.level.objects[i];
				p = this.players[j];
				r = Utils.checkBB(a.x,a.y,a.x+a.width,a.y+a.height,p.pos.x,p.pos.y);
				if (r) {
					return r;
					}
				}
			}
		return false;
		};
	this.getExitAt = function(pos) { 
		var a;

		for (var i=0;i<this.level.objects.length;i++) {
			if (this.level.objects[i].type==2) {
				a = this.level.objects[i];
				if (Utils.checkBB(a.x,a.y,a.x+a.width,a.y+a.height,pos.x,pos.y)) {
					return a;
					}
				}
			}
		return undefined;
		};
	this.checkExits = function() {
		for(var i=0;i<this.players.length;i++) {
			if (this.checkExitsForPlayer(i)) {
				LevelManager.teleportPlayer(this.players[i],this.getExitAt(this.players[i].pos).dst);
				}
			}
		};
	this.tick = function() {
		this.broadcastUpdate();
		this.checkExits();
		};
	this.addPlayer = function(player) {
		this.players.push(player);
		player.sendMap(this.level);
		player.level = this;
		player.setLocation({x: this.level.spawn.x, y: this.level.spawn.y},0);
		};
	this.despawnPlayer = function (player) {
		for (var i=0;i<this.players.length;i++) {
			if (this.players[i]!=undefined) if (this.players[i].id == player.id) {
				this.players[i] = undefined;
				return;
				}
			}
		};
	this.click = function (x,y) {
		this.updates.clicks.push({x: x, y: y});
		};
	this.encodePlayerUpdate = function() {
		var a = [];

		for (var i=0;i<this.players.length;i++) {
			if (this.players[i]!=undefined) {
				a.push(this.players[i]);
				}
			}
		return a;
		};
	this.draw = function(x1,y1,x2,y2) {
		this.updates.lines.push({x1: x1, y1: y1, x2: x2, y2: y2});
		};
	}

module.exports = Level;
