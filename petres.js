let ball;
let player1;
let player2;

function centerCanvas() {
	let winWidth = windowHeight - 100;
	let winHeight = windowHeight * 0.5;

	if (windowWidth < windowHeight - 100) {
		winWidth = windowWidth - 100;
		winHeight = windowWidth * 0.5;
	}
	canvas = createCanvas(winWidth, winHeight);
	canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

	let w = width;
	let h = height;
	ball = new Ball();
	player1 = new Player(w - w * 0.98, h / 2 - (h * 0.15) / 2);
	player2 = new Player(w - w * 0.02 - w * 0.005, h / 2 - (h * 0.15) / 2);

	background(0);
}

function preload() {
	petres = loadImage('./petres.jpg');
}

function setup() {
	centerCanvas();
}

function draw() {
	background(0);
	let w = width;
	let h = height;

	/* Draw net */
	stroke(255);
	for (let i = 0; i < h; i += 30) line(w / 2, i, w / 2, i + 10);

	ball.show();
	player1.show();
	player2.show();
	ball.move();
}

function windowResized() {
	centerCanvas();
}

function keyPressed() {
	if ( keyCode == UP_ARROW) {
		console.log('up')
		player1.up();
	}
}

class Player {
	constructor(x, y) {
		this.w = width * 0.005;
		this.h = height * 0.15;
		this.x = x;
		this.y = y;
		this.acc = createVector(0,0);
		this.spd = 10;
	}

	show() {
		rect(this.x, this.y, this.w, this.h);
	}

	up() {
		this.acc -= this.spd;
	}
}

class Ball {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.r = 50;
		this.maxSpeed = createVector(20, 15);
		this.acc = p5.Vector.random2D();
	}

	show() {
		circle(this.pos.x, this.pos.y, this.r);
	}

	move() {
		this.pos.x += 5 * this.acc.x;
	}
}

/**
 * 	 Draw Paddles
	let paddleWidth = w * 0.005;
	let paddleHeight = h * 0.15;
	let paddleLX = w - w * 0.98;
	let paddleRX = w - w * 0.02 - paddleWidth;
	let paddleLY = h / 2 - paddleHeight / 2;
	let paddleRY = h / 2 - paddleHeight / 2;
 */
