var fs = require("fs");

var Configuration = require("./Configuration.js");
var Level = require("./Level.js");

var levels = {};
var levelNames = [];
var liveLevels = {};
var lvlSpawn;

function loadLevels() {
	var lvlFolder = (Configuration.getConfig("levelfolder","./level"));
	var fileList = fs.readdirSync(lvlFolder);
	
	for (var i=0;i<fileList.length;i++) {
		if (getFileExt(fileList[i])==="zda") loadLevel(lvlFolder+"/"+fileList[i]);
		}
	for (var i=0;i<levelNames.length;i++) {
		liveLevels[levelNames[i]] = new Level(levels[levelNames[i]]);
		clog("started level??: "+levelNames[i]);
		}
	lvlSpawn = generateSpawn();
	setInterval(lstick,200);
	
	function lstick() {
		lvlSpawn.tick();
		}
	}

function loadLevel(fn) {
	var lvldata = fs.readFileSync(fn,{encoding: "utf8"});
	var ld_obj = JSON.parse(lvldata);

	levels[ld_obj.lvlname] = ld_obj;
	levelNames.push(ld_obj.lvlname);
	clog("loaded level??: "+ld_obj.lvlname);
	}

function tick() {
	for (var i = 0;i<levelNames.length;i++) {
		liveLevels[levelNames[i]].tick();
		}
	}

function teleportPlayer(player,lvlname) {
	player.level.despawnPlayer(player);
	if (liveLevels[lvlname]!=undefined) {
		liveLevels[lvlname].addPlayer(player);
		} else {
		liveLevels[Configuration.getConfig("firstlvl","test")].addPlayer(player);
		}
	}

function getSpawnLevel(player) {
	return lvlSpawn;
	}

function generateSpawn() {
	var l = {};

	l.spawn = {};
	l.spawn.x = 10;
	l.spawn.y = 10;
	l.objects = [];
	l.lvlname = "spawn";
	if (levelNames.length != 0) {
		l.objects[0] = {};
		l.objects[0].type = 2;
		l.objects[0].x = 200;
		l.objects[0].y = 200;
		l.objects[0].width = 20;
		l.objects[0].height = 20;
		l.objects[0].isBad = true;
		l.objects[0].dst = Configuration.getConfig("firstlvl","test");
		l.objects[0].color = {};
		l.objects[0].color.r = 0;
		l.objects[0].color.g = 0;
		l.objects[0].color.b = 0;
		l.objects[0].color.a = 0;
		clog("created exit");
		}
	return new Level(l);
	}

function getFileExt(fn) {
	var sa = fn.split(".");

	return sa[sa.length-1];
	}

module.exports.getSpawnLevel = getSpawnLevel;
module.exports.loadLevels = loadLevels;
module.exports.tick = tick;
module.exports.teleportPlayer = teleportPlayer;

function clog(m) {
	console.log(m);
	}
