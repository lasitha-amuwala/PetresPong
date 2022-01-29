let w;
let h;
let sounds;
let winner;
let petresBall;

let RS_X; // Relative Scale X
let RS_Y; // Relative Scale Y

let ball;
let player1;
let player2;
let playBtn;
let singleBtn;
let multiBtn;
let buttons;

let mode = 0;
let sound = true;
let twoPlayer = false;

const ROUNDS = 3;

/* setup image */
function preload() {
	petresBall = loadImage('assets/petres-ball.png');
	sounds = {
		paddleSound: loadSound('assets/paddleSound.mp3'),
		wallSound: loadSound('assets/wallSound.mp3'),
		goalSound: loadSound('assets/goalSound.mp3'),
	};
}

/* setup canvas */
function setup() {
	// create canvas and initialize players
	centerCanvas();
	// create Ball
	ball = new Ball();

	// create Players
	player1 = new Player('Player 1');
	player2 = new Player('Player 2');

	// create Buttons
	playBtn = new Button('Play');
	multiBtn = new Button('Multiplayer');
	singleBtn = new Button('Singleplayer');
	mainMenuBtn = new Button('Main Menu');
	playAgainBtn = new Button('Play Again');

	buttons = [playBtn, multiBtn, singleBtn, mainMenuBtn, playAgainBtn];

	singleBtn.select();
	singleBtn.disable();

	updateObjects();

	if (!twoPlayer) player1.maxSpd = 8 * RS_X;
}

/* Create game canvas in center of page */
function centerCanvas() {
	// calculate canvas size to be in the center
	let winWidth = windowHeight - 100;
	let winHeight = windowHeight * 0.5;

	if (windowWidth < windowHeight - 100) {
		winWidth = windowWidth - 100;
		winHeight = windowWidth * 0.5;
	}

	canvas = createCanvas(winWidth, winHeight);
	canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

	w = width;
	h = height;

	// relative scale based on resolution of screem
	RS_X = w / 1211;
	RS_Y = h / 655.5;
}

/* recreate canvas when page resized*/
function windowResized() {
	centerCanvas();
	updateObjects();
}

function draw() {
	background(0); //reset background every frame

	if (mode == 0) drawStartScreen();
	else if (mode == 1) drawGameScreen();
	else drawEndScreen();
}

/* Display Start Menu */
function drawStartScreen() {
	let imgSize = 100 * RS_X;

	push();
	translate(w / 2, h / 4);
	rotate(radians(frameCount / 1.5));
	imageMode(CORNER);
	image(petresBall, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
	pop();

	push();
	fill(255);
	textAlign(CENTER, CENTER);
	textSize(100 * RS_X);
	text('Petres Pong', w / 2, h / 2 - 25 * RS_Y);
	pop();

	if (singleBtn.disabled && multiBtn.selected) {
		multiBtn.disable();
		singleBtn.enable();
		singleBtn.deselect();
		twoPlayer = true;
	}

	if (multiBtn.disabled && singleBtn.selected) {
		singleBtn.disable();
		multiBtn.enable();
		multiBtn.deselect();
		twoPlayer = false;
	}

	if (playBtn.selected) mode = 1;

	playBtn.show();
	multiBtn.show();
	singleBtn.show();
}

/* Display Game */
function drawGameScreen() {
	mainMenuBtn.deselect();
	playAgainBtn.deselect();

	// Draw net and score board
	drawField();

	// Draw player 1 paddle
	player1.show();
	player2.show();

	// Draw player 2 paddle
	player1.move();
	player2.move();

	// Draw ball
	ball.show();
	ball.move();

	ball.paddleCollision(player1, 0);
	ball.paddleCollision(player2, 1);

	// If two player is disabled enable AI
	!twoPlayer && AI();

	// Increment player scores
	let score = ball.edges();
	if (score !== undefined) score ? player1.incScore() : player2.incScore();

	// if a player reaches the goal display end menu
	if (player1.score >= ROUNDS || player2.score >= ROUNDS) mode = 2;
}

/* Display End Menu */
function drawEndScreen() {
	playBtn.deselect();

	// determine winner, and display winner
	if (player1.score != 0 || player2.score != 0) {
		if (twoPlayer) {
			winner = player1.score === ROUNDS ? 'Player 1 Wins!' : 'Player 2 Wins!';
		} else {
			winner = player1.score === ROUNDS ? 'You Lose!' : 'You Win!';
		}
	}

	push();
	fill(255);
	textAlign(CENTER, CENTER);
	textSize(60 * RS_X);
	text(winner, w / 2, h / 2);
	pop();

	// reset
	ball.reset();
	player1.reset();
	player2.reset();
	
	// reset position of paddles
	updateObjects();

	mainMenuBtn.show();
	playAgainBtn.show();

	if (playAgainBtn.selected) mode = 1;
	if (mainMenuBtn.selected) mode = 0;
}

function AI() {
	let ballY = ball.pos.y;
	let paddleY = player1.pos.y;
	let paddleH = player1.h;

	if (ball.pos.x < w / 2 && ball.acc.x < 0) {
		ballY < paddleY + paddleH / 2 ? player1.goUp() : player1.down();
	} else {
		if (paddleY > h / 2 - paddleH / 2 + 10 * RS_X) {
			player1.goUp();
		} else if (paddleY < h / 2 - paddleH / 2 - 10 * RS_Y) {
			player1.down();
		} else {
			player1.stop();
		}
	}
}

/* Display field */
function drawField() {
	push();
	stroke(255);
	strokeWeight(1 * RS_X);

	for (let i = 0; i < h; i += 30 * RS_Y) line(w / 2, i, w / 2, i + 10 * RS_Y);

	fill(255);
	textSize(24 * RS_X);
	textAlign(CENTER);
	text(player1.score, w / 2 - 50 * RS_X, 50 * RS_X);
	text(player2.score, w / 2 + 50 * RS_X, 50 * RS_X);
	pop();
}

/* update objects position and size */
function updateObjects() {
	// calculate button position and dimensions
	let btnW = 150 * RS_X;
	let btnH = 50 * RS_Y;
	let btnY = h - 250 * RS_Y;
	let btnCenter = w / 2 - btnW / 2;

	// calculate paddle position and dimensions
	let paddleH = 120 * RS_Y;
	let paddleW = 5 * RS_X;
	let paddleCenter = h / 2 - paddleH / 2;

	// update buttons
	playBtn.update(btnW, btnH, btnCenter, h - 150 * RS_Y);
	multiBtn.update(btnW, btnH, btnCenter + 100 * RS_X, btnY);
	singleBtn.update(btnW, btnH, btnCenter - 100 * RS_X, btnY);
	mainMenuBtn.update(btnW, btnH, btnCenter - 100 * RS_X, btnY);
	playAgainBtn.update(btnW, btnH, btnCenter + 100 * RS_X, btnY);

	// update players
	player1.update(paddleW, paddleH, createVector(25 * RS_Y, paddleCenter));
	player2.update(paddleW, paddleH, createVector(w - 25 * RS_Y, paddleCenter));
}

/* Logic per keypress */
function keyPressed() {
	if (keyCode == UP_ARROW) player2.goUp();
	if (keyCode == DOWN_ARROW) player2.down();
	if (twoPlayer && (key == 'w' || key == 'W')) player1.goUp();
	if (twoPlayer && (key == 's' || key == 'S')) player1.down();
}

/* Logic per key release */
function keyReleased() {
	let releasedKey = key.toLowerCase();
	if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) player2.stop();
	if (twoPlayer && (releasedKey == 'w' || releasedKey == 's')) player1.stop();
}

/* Logic for when mouse pressed */
function mousePressed() {
	buttons.forEach((button) => button.clicked());
}
/*
function handleCursor() {
	buttons.forEach((button) => button.intersect()? cursor(HAND) : cursor(ARROW));
}
*/
