class Ball {
	constructor(img) {
		this.pos = createVector(width / 2, height / 2);
		this.r = w * 0.05;
		this.speed = createVector(5, 5);
		this.maxSpeed = createVector(10, 10);
		this.acc = this.randomAngle();
		this.img = img;
	}
	/* display petres ball */
	show() {
		imageMode(CENTER);
		image(this.img, this.pos.x, this.pos.y, this.r, this.r);
	}

	/* move ball based on speed and acceleration angle */
	move() {
		this.pos.x += this.speed.x * this.acc.x;
		this.pos.y += this.speed.y * this.acc.y;
	}

	/* generate an angle between a restricted area */
	randomAngle() {
		let angle = random([0, 1]) ? random(-45, 45) : random(135, 225);
		return p5.Vector.fromAngle(radians(angle));
	}

	/* ceiling and floor collisions */
	edges() {
		// 
		if (this.pos.y <= this.r / 2 || this.pos.y >= height - this.r / 2)
			this.acc.y = -this.acc.y;
		if (this.pos.x <= 0 || this.pos.x >= width) {
			let currPos = this.pos.x;
			this.acc = this.randomAngle();
			this.pos = createVector(width / 2, height / 2);
			this.speed = createVector(this.speed.x + 1, this.speed.y + 1);
			return currPos <= 0 ? 0 : 1;
		}
	}

	paddleCollision(p, d) {
		let sideCheck = d
			? this.pos.x >= p.pos.x - this.r / 2 - p.w
			: this.pos.x <= p.pos.x + this.r / 2 + p.w;

		if (sideCheck / 2 && this.pos.y >= p.pos.y && this.pos.y <= p.pos.y + p.h) {
			this.acc.x = -this.acc.x;
			if (this.speed.x <= this.maxSpeed.x && this.speed.y <= this.maxSpeed.y)
				this.speed = createVector(this.speed.x + 0.5, this.speed.y + 0.5);
		}
	}
}
//show = () => circle(this.pos.x, this.pos.y, this.r);
