class Ball {
	constructor(img) {
		this.pos = createVector(width / 2, height / 2);
		this.r = w * 0.05;
		this.maxSpeed = createVector(5, 5);
		this.acc = p5.Vector.random2D();
		this.img = img;
		this.firstBounce = false;
	}

	//show = () => circle(this.pos.x, this.pos.y, this.r);
	show() {
		imageMode(CENTER);
		image(this.img, this.pos.x, this.pos.y, this.r, this.r);
	}

	edges() {
		if (this.pos.y <= this.r / 2 || this.pos.y >= height - this.r / 2)
			this.acc.y = -this.acc.y;
		if (this.pos.x <= 0 || this.pos.x >= width) {
			let currPos = this.pos.x;
			this.acc = p5.Vector.random2D();
			this.pos = createVector(width / 2, height / 2);
			return currPos <= 0 ? 0 : 1;
		}
	}

	paddleCollision(p, d) {
		let sideCheck = d
			? this.pos.x >= p.pos.x - this.r / 2 - p.w
			: this.pos.x <= p.pos.x + this.r / 2 + p.w;

		if (sideCheck / 2 && this.pos.y >= p.pos.y && this.pos.y <= p.pos.y + p.h) {
			this.acc.x = -this.acc.x;
			if (!this.firstBounce) {
				this.firstBounce = true;
				this.maxSpeed = createVector(10, 10);
			}
		}
	}

	move() {
		this.pos.x += this.maxSpeed.x * this.acc.x;
		this.pos.y += this.maxSpeed.y * this.acc.y;
	}
}
