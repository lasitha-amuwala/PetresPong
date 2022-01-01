let ball;
let player1;
let player2;

let petresBall;
let twoPlayer;
let MODE;

function preload() {
	petresBall = loadImage('./petres-ball.png');
}

function setup() {
	MODE = 0;
	twoPlayer = true;
	centerCanvas();
}

function draw() {
	let w = width;
	let h = height;

	background(0);

	if (MODE == 0) {
		fill(256);
		textAlign(CENTER, CENTER);
		textSize(60);
		text('Petres Pong', w / 2, h / 2);
		textSize(20);
		text('Press Enter to Start', w / 2, h / 2 + 100);
	} else if (MODE == 1) {
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
		ball.edges();
		ball.move();
		ball.paddleCollision(player1, 0);
		ball.paddleCollision(player2, 1);

		drawScores();
	}
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

	ball = new Ball(petresBall);
	player1 = new Player(w - w * 0.98, h / 2 - (h * 0.15) / 2);
	player2 = new Player(w - w * 0.02 - w * 0.005, h / 2 - (h * 0.15) / 2);

	background(0);
}

function keyPressed() {
	if (key == 'w' || key == 'W') player1.goUp();
	if (key == 's' || key == 'S') player1.down();
	if (keyCode == ENTER) MODE = 1;
	if (twoPlayer && keyCode == UP_ARROW) player2.goUp();
	if (twoPlayer && keyCode == DOWN_ARROW) player2.down();
}

function keyReleased() {
	if (key == 'w' || key == 'W' || key == 's' || key == 'S') player1.stop();
	if (twoPlayer && (keyCode == UP_ARROW || keyCode == DOWN_ARROW))
		player2.stop();
}

function drawScores() {
	fill(256);
	textSize(24);
	textAlign(CENTER)
	text(player1.score, width / 2 - 50, 50);
	text(player2.score, width / 2 + 50, 50);
}
