class Ball {
	constructor(img) {
		this.pos = createVector(width / 2, height / 2);
		this.r = 75;
		this.maxSpeed = createVector(7, 7);
		this.acc = p5.Vector.random2D();
		this.img = img;
	}

	//show = () => circle(this.pos.x, this.pos.y, this.r);
	show = () => {
		imageMode(CENTER);
		image(this.img, this.pos.x, this.pos.y, this.r, this.r);
	};

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
			this.acc.x = -this.acc.x;
		}
	}

	move() {
		this.pos.x += this.maxSpeed.x * this.acc.x;
		this.pos.y += this.maxSpeed.y * this.acc.y;
	}
}
