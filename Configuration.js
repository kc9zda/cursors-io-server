var config = [];

module.exports.setConfig = function(c) {
	config = c;
	clog(config);
	}

module.exports.getConfig = function(k,d) {
	return config[k]||d;
	}

function clog(m) {
	console.log(m);
	}
