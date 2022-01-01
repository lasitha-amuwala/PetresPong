class Ball {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.r = 25;
		this.maxSpeed = createVector(10, 10);
		this.acc = p5.Vector.random2D();
	}

	show = () => circle(this.pos.x, this.pos.y, this.r);

	edges() {
		if (this.pos.y <= this.r / 2 || this.pos.y >= height - this.r / 2) {
			this.acc.y = -this.acc.y;
		}
		if (this.pos.x <= 0 || this.pos.x >= width) {
			this.acc = p5.Vector.random2D();
			this.pos = createVector(width / 2, height / 2);
		}
	}

	paddleCollision(p, d) {
		let sideCheck = d
			? this.pos.x >= p.pos.x - this.r / 2 - p.w
			: this.pos.x <= p.pos.x + this.r / 2 + p.w;

		if (sideCheck / 2 && this.pos.y >= p.pos.y && this.pos.y <= p.pos.y + p.h) {
			console.log('yes');
			this.acc.x = -this.acc.x;
		}
	}

	move() {
		this.pos.x += this.maxSpeed.x * this.acc.x;
		this.pos.y += this.maxSpeed.y * this.acc.y;
	}
}
