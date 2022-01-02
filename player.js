class Player {
	constructor(x, y) {
		this.w = width * 0.005;
		this.h = height * 0.2;
		this.pos = createVector(x, y);
		this.acc = createVector(0, 0);
		this.spd = 10;
		this.maxSpd = 10;
		this.score = 0;
	}

	show = () => rect(this.pos.x, this.pos.y, this.w, this.h);
	goUp = () => (this.acc.y -= this.spd);
	down = () => (this.acc.y += this.spd);
	stop = () => (this.acc.y = 0);
	incScore = () => (this.score += 1);

	update() {
		this.acc.y = constrain(this.acc.y, -this.maxSpd, this.maxSpd);
		this.pos.add(this.acc);
		this.pos.y = constrain(this.pos.y, 0, height - this.h);
	}
}
