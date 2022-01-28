class Player {
	constructor(n) {
		this.name = n;
		this.init(n);
	}
	// draw player on canvas
	show = () => rect(this.pos.x, this.pos.y, this.w, this.h);
	// move player up
	goUp = () => (this.acc.y -= this.speed);
	// move player down
	down = () => (this.acc.y += this.speed);
	// stop moving player
	stop = () => (this.acc.y = 0);
	// incremenet player score
	incScore = () => (this.score += 1);
	// reset player
	reset = () => this.init();
	// move player
	move() {
		this.acc.y = constrain(this.acc.y, -this.maxSpeed, this.maxSpeed);
		this.pos.add(this.acc);
		this.pos.y = constrain(this.pos.y, 0, height - this.h);
	}
	// update player position
	update(w, h, p) {
		this.w = w;
		this.h = h;
		this.pos = p;
	}
	// initialize
	init() {
		this.score = 0;
		this.acc = createVector(0, 0);
		this.speed = 12 * RS_X;
		this.maxSpeed = 12 * RS_X;
		this.w = 5 * RS_X;
		this.h = 120 * RS_Y;
	}
}
