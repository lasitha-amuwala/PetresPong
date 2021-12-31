let ball;
let player1;
let player2;
let twoPlayer = true;

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

	/* draw player 1 paddle */
	player1.update();
	player1.show();

	//* draw player 2 paddle */
	player2.update();
	player2.show();

	/* draw ball */
	ball.show();
	ball.move();
}

function windowResized() {
	centerCanvas();
}

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

function keyPressed() {
	if (key == 'w' || key == 'W') player1.up();
	if (key == 's' || key == 'S') player1.down();
	if (twoPlayer && keyCode == UP_ARROW) player2.up();
	if (twoPlayer && keyCode == DOWN_ARROW) player2.down();
}

function keyReleased() {
	if (key == 'w' || key == 'W' || key == 's' || key == 'S') player1.stop();
	if (twoPlayer && (keyCode == UP_ARROW || keyCode == DOWN_ARROW))
		player2.stop();
}

class Player {
	constructor(x, y) {
		this.w = width * 0.005;
		this.h = height * 0.15;
		this.pos = createVector(x, y);
		this.acc = createVector(0, 0);
		this.spd = 10;
		this.maxSpd = 10;
	}

	show = () => rect(this.pos.x, this.pos.y, this.w, this.h);
	up = () => (this.acc.y -= this.spd);
	down = () => (this.acc.y += this.spd);
	stop = () => (this.acc.y = 0);

	update() {
		this.acc.y = constrain(this.acc.y, -this.maxSpd, this.maxSpd);
		this.pos.add(this.acc);
		this.pos.y = constrain(this.pos.y, 0, height - this.h);
	}
}

class Ball {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.r = 50;
		this.maxSpeed = createVector(7, 7);
		this.acc = p5.Vector.random2D();
	}

	show = () => circle(this.pos.x, this.pos.y, this.r);

	move() {
		this.pos.x += this.maxSpeed.x * this.acc.x;
		this.pos.y += this.maxSpeed.y * this.acc.y;


	}
}
