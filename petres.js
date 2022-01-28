let w, h;
let sounds;
let winner;
let petresBall;
let RS_X; // Relative Scale X
let RS_Y; // Relative Scale Y
let paddleH, paddleW;
let p1PosX, p2PosX, pPosY;
let ball, player1, player2;

let playBtn, singleBtn, multiBtn;

let mode = 0;
let twoPlayer = false;
let fillColor = 255;

let btnW = 150;
let btnH = 50;

const ROUNDS = 1;
const BALL_SPEED = 5;

let sound = false;

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

	p1PosX = 25 * RS_Y;
	p2PosX = w - 25 * RS_Y;
	pPosY = h / 2 - paddleH / 2;

	// create Ball
	ball = new Ball();

	// create Players
	player1 = new Player(p1PosX);
	player2 = new Player(p2PosX);

	// create Buttons
	playBtn = new Button('Play');
	multiBtn = new Button('Multiplayer');
	singleBtn = new Button('Singleplayer');
	mainMenuBtn = new Button('Main Menu');
	playAgainBtn = new Button('Play Again');

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

	// paddle width and heights
	paddleH = h / 6;
	paddleW = 5 * RS_X;
}

/* recreate canvas when page resized*/
function windowResized() {
	centerCanvas();
	// reset paddle position on window resize and adjust dimentions
	player1.w = paddleW;
	player1.h = paddleH;
	player2.w = paddleW;
	player2.h = paddleH;
	player1.pos = createVector(25 * RS_Y, h / 2 - paddleH / 2);
	player2.pos = createVector(w - 25 * RS_Y, h / 2 - paddleH / 2);

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

	if (twoPlayer) {
		singleBtn.unSelect();
		multiBtn.select();
	} else {
		singleBtn.select();
		multiBtn.unSelect();
	}

	if (playBtn.selected) mode = 1;

	playBtn.show();
	multiBtn.show();
	singleBtn.show();
}

/* Display Game */
function drawGameScreen() {
	mainMenuBtn.unSelect();
	playAgainBtn.unSelect();
	// Draw net and score board
	drawField();

	// Draw player 1 paddle
	player1.show();
	player2.show();

	// Draw player 2 paddle
	player1.update();
	player2.update();

	// If two player is disabled enable AI
	!twoPlayer && AI();

	// Draw ball
	ball.show();
	ball.move();

	ball.paddleCollision(player1, 0);
	ball.paddleCollision(player2, 1);

	// Increment player scores
	let score = ball.edges();
	if (score !== undefined) score ? player1.incScore() : player2.incScore();

	// if a player reaches the goal display end menu
	if (player1.score >= ROUNDS || player2.score >= ROUNDS) mode = 2;
}

/* Display End Menu */
function drawEndScreen() {
	playBtn.unSelect();

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

	// reset players
	player1.score = 0;
	player2.score = 0;
	player1.pos = createVector(p1PosX, pPosY);
	player2.pos = createVector(p2PosX, pPosY);
	ball.speed = createVector(BALL_SPEED, BALL_SPEED);

	mainMenuBtn.show();
	playAgainBtn.show();

	if (playAgainBtn.selected) mode = 1;
	if (mainMenuBtn.selected) mode = 0;
}

function AI() {
	let ballY = ball.pos.y;
	let paddleY = player1.pos.y;

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
	let newBtnH = btnH * RS_Y;
	let newBtnW = btnW * RS_X;
	let BtnY = h - 250 * RS_Y;

	playBtnPos = createVector(w / 2 - newBtnW / 2, h - 150 * RS_Y);
	multiBtnPos = createVector(w / 2 - newBtnW / 2 + 100 * RS_X, BtnY);
	singleBtnPos = createVector(w / 2 - newBtnW / 2 - 100 * RS_X, BtnY);
	mainMenuBtnPos = createVector(w / 2 - newBtnW / 2 - 100 * RS_X, BtnY);
	playAgainBtnPos = createVector(w / 2 - newBtnW / 2 + 100 * RS_X, BtnY);

	playBtn.update(newBtnW, newBtnH, playBtnPos);
	multiBtn.update(newBtnW, newBtnH, multiBtnPos);
	singleBtn.update(newBtnW, newBtnH, singleBtnPos);
	mainMenuBtn.update(newBtnW, newBtnH, mainMenuBtnPos);
	playAgainBtn.update(newBtnW, newBtnH, playAgainBtnPos);
}

/* Logic per keypress */
function keyPressed() {
	if (twoPlayer && (key == 'w' || key == 'W')) player1.goUp();
	if (twoPlayer && (key == 's' || key == 'S')) player1.down();
	if (keyCode == UP_ARROW) player2.goUp();
	if (keyCode == DOWN_ARROW) player2.down();
}

/* Logic per key release */
function keyReleased() {
	let releasedKey = key.toLowerCase();
	if (twoPlayer && (releasedKey == 'w' || releasedKey == 's')) player1.stop();
	if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) player2.stop();
}

/* Logic for when mouse pressed */
function mousePressed() {
	playBtn.clicked();
	multiBtn.clicked();
	singleBtn.clicked();
	mainMenuBtn.clicked();
	playAgainBtn.clicked();
}
