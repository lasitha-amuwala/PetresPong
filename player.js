class Player {
	constructor(x, y) {
		this.w = width * 0.005;
		this.h = height * 0.2;
		this.pos = createVector(x, y);
		this.acc = createVector(0, 0);
		this.spd = 10 * RELATIVE_SCALE;
		this.maxSpd = 10 * RELATIVE_SCALE;
		this.score = 0;
	}

	show = () => rect(this.pos.x, this.pos.y, this.w, this.h);
	// move paddle up
	goUp = () => (this.acc.y -= this.spd);
	// move paddle down
	down = () => (this.acc.y += this.spd);
	// stop moving paddle
	stop = () => (this.acc.y = 0);
	// incremenet player score
	incScore = () => (this.score += 1);

	// update paddle position
	update() {
		this.acc.y = constrain(this.acc.y, -this.maxSpd, this.maxSpd);
		this.pos.add(this.acc);
		this.pos.y = constrain(this.pos.y, 0, height - this.h);
	}
}
