function checkBB(bx1,by1,bx2,by2,x,y) {
	var rect1 = {x: bx1, y: by1, width: bx2-bx1, height: by2-by1}
	var rect2 = {x: x, y: y, width: 1, height: 1}

	if (rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.height + rect1.y > rect2.y) {
		return true;
		}
	return false;
	}

module.exports.checkBB = checkBB;
