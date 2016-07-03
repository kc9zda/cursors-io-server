var fs = require("fs");

var Configuration = require("./Configuration.js");
var LevelManager = require("./LevelManager.js");
var Server = require("./Server.js");
var Timer = require("./Timer.js");

var config = {};

//load configuration from cursors.conf
function loadConf() {
	var s = fs.readFileSync("cursors.conf");
	var i = 0;
	var la = [];
	var pa = [];

	la = (s.toString()).split("\n");
	for (i=0;i<la.length;i++) {
		pa[i] = {};
		pa[i].k = la[i].split("=")[0];
		pa[i].v = la[i].split("=")[1];
		}
	for (i=0;i<pa.length;i++) {
		config[pa[i].k]=pa[i].v;
		}
	Configuration.setConfig(config);
	}

// load levels from a folder
function loadLevels() {
	LevelManager.loadLevels();
	}

// start Websockets server
function startServer() {
	Server.init();
	}

// start timer
function timerInit() {
	Timer.init();
	}

loadConf();
loadLevels();
timerInit();
startServer();
