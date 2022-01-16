class Ball {
	constructor(p = p5.instance) {
		this.acc = this.randomAngle();
		this.r = 60 * RELATIVE_SCALE_X;
		this.speed = createVector(5, 5);
		this.maxSpeed = createVector(10, 10);
		this.pos = createVector(width / 2, height / 2);
	}

	/* display petres ball */
	show() {
		imageMode(CENTER);
		image(petresBall, this.pos.x, this.pos.y, this.r, this.r);
	}

	/* move ball based on speed and acceleration angle */
	move() {
		this.r = 60 * RELATIVE_SCALE_X;
		this.pos.x += this.speed.x * this.acc.x * RELATIVE_SCALE_X;
		this.pos.y += this.speed.y * this.acc.y * RELATIVE_SCALE_Y;
	}

	/* generate an angle between a restricted area */
	randomAngle() {
		// angle between -45 to 45 degrees, or 135 to 225 degrees
		let angle = random([0, 1]) ? random(-65, 65) : random(155, 245);
		return p5.Vector.fromAngle(radians(angle));
	}

	/* ceiling and floor collisions */
	edges() {

		// invert vertical acceleration when ball collides with floor or ceiling
		if (this.pos.y <= this.r / 2 || this.pos.y >= height - this.r / 2) {
			this.acc.y = -this.acc.y;
			wallSound.play();
		}

		// when ball collides with left or right wall
		if (this.pos.x <= -10 || this.pos.x >= width + 10) {
			let currPos = this.pos.x;

			goalSound.play();
			// reset ball position and angle
			this.acc = this.randomAngle();
			this.pos = createVector(width / 2, height / 2);

			// increase ball speed when collides with left and right wall
			if (this.speed.x <= this.maxSpeed.x && this.speed.y <= this.maxSpeed.y)
				this.speed = createVector(this.speed.x + 0.5, this.speed.y + 0.5);

			// return which side ball collided with, 0 = left, 1 = right
			return currPos <= 0 ? 0 : 1;
		}
	}

	/* collisions with paddle */
	paddleCollision(p, d) {
		// check which paddle, left or right
		let checkPaddle = d
			? this.pos.x >= p.pos.x - this.r / 2 - p.w
			: this.pos.x <= p.pos.x + this.r / 2 + p.w;

		if (checkPaddle && this.pos.y >= p.pos.y && this.pos.y <= p.pos.y + p.h) {

			// only invert acceleration if the ball is coming toward the paddle
			// prevents invert accleration if paddle is hit from behind and prevents ball getting stuck on paddle

			if ((d && this.acc.x > 0) || (!d && this.acc.x < 0)) {

				// calculate angle of reflection based on intersection distance from center of paddle
				let intersectY = p.pos.y + p.h / 2 - this.pos.y;
				let normalizedIntersectY = intersectY / (p.h / 2);
				let bounceAngle = normalizedIntersectY * radians(75);

				this.acc.x = Math.cos(bounceAngle) * d ? -1 : 1;
				this.acc.y = Math.sin(bounceAngle);
			}

			// increase ball speed when ball hits paddle
			if (this.speed.x <= this.maxSpeed.x && this.speed.y <= this.maxSpeed.y)
				this.speed = createVector(this.speed.x + 0.5, this.speed.y + 0.5);

			// play sound when ball hits the paddle
			paddleSound.play();
		}
	}
}
