class Player {
	constructor(pos, p = p5.instance) {
		this.pos = createVector(pos, pPosY);
		this.score = 0;
		this.w = paddleW;
		this.h = paddleH;
		this.acc = createVector(0, 0);
		this.spd = 12 * RELATIVE_SCALE_X;
		this.maxSpd = 12 * RELATIVE_SCALE_X;
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
	update = () => {
		this.acc.y = constrain(this.acc.y, -this.maxSpd, this.maxSpd);
		this.pos.add(this.acc);
		this.pos.y = constrain(this.pos.y, 0, height - this.h);
	};
}
