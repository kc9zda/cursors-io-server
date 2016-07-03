var Player = require("./Player.js");

var players = [];

function findID() {
	var i=0;

	for (i=0;i<players.length;i++) {
		if (players[i]==undefined) return i;
		}
	return i;
	}

function allocPlayer() {
	var player = new Player();

	player.id = findID();
	players[player.id] = player;
	return player;
	}

function despawnPlayer(player) {
	player.level.despawnPlayer(player);
	players[player.id] = undefined;
	}

module.exports.allocPlayer = allocPlayer;
module.exports.despawnPlayer = despawnPlayer;
