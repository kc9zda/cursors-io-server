var ws = require("ws");

var Configuration = require("./Configuration.js");
var PacketParser = require("./PacketParser.js");
var PlayerManager = require("./PlayerManager.js");

var wss;

function onconnect(sock) {
	var player = PlayerManager.allocPlayer();

	sock.on('message',function(data) {
		player.inboundPacketHandler(PacketParser.parse(data));
		});
	sock.on('close',function() {
		clog("ws close");
		PlayerManager.despawnPlayer(player);
		});
	player.outboundPacketHandler = outboundPacketHandler;
	player.begin();

	function outboundPacketHandler(packet) {
		var b = packet.encode();
		if (b.length == 0) return;
		if (sock.readyState != ws.OPEN) return;
		if (getPlayerCount()==0) return;
		clog(b);
		sock.send(b);
		}
	}

function init() {
	wss = new ws.Server({port: parseInt(Configuration.getConfig("port","443"))});
	wss.on('connection',onconnect);
	}

function getPlayerCount() {
	return wss.clients.length;
	}

module.exports.init = init;
module.exports.getPlayerCount = getPlayerCount;

function clog(m) {
	console.log(m);
	}
