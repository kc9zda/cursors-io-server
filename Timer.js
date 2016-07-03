var Configuration = require("./Configuration.js");
var LevelManager = require("./LevelManager.js");

function init() {
	setInterval(ontick,parseInt(Configuration.getConfig("tickinterval","100")));
	}

function ontick() {
	LevelManager.tick();
	}

module.exports.init = init;
