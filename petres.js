let mode;
let w, h;
let winner;
let twoPlayer;
let playAgain;
let petresBall;
let ball, player1, player2;
let paddleSound, wallSound, goalSound;
let p1PosX, p2PosX, pPosY;
let RELATIVE_SCALE_X;
let RELATIVE_SCALE_Y;
let paddleH, paddleW;

const ROUNDS = 10;
const BALL_SPEED = 5;

/* setup image */
function preload() {
	petresBall = loadImage('assets/petres-ball.png');
	paddleSound = loadSound('assets/paddleSound.mp3');
	wallSound = loadSound('assets/wallSound.mp3');
	goalSound = loadSound('assets/goalSound.mp3');
}

/* setup canvas */
function setup() {
	// initialize variables
	mode = 0;
	twoPlayer = true;
	playAgain = false;

	// create canvas and initialize players
	centerCanvas();

	p1PosX = 25 * RELATIVE_SCALE_Y;
	p2PosX = w - 25 * RELATIVE_SCALE_Y;
	pPosY = h / 2 - paddleH / 2;

	// create instance of Player
	player1 = new Player(p1PosX);
	player2 = new Player(p2PosX);
	// create instance of Ball
	ball = new Ball();
}

/* recreate canvas when page resized*/
function windowResized() {
	centerCanvas();

	// reset paddle position on window resize and adjust dimentions
	player1.w = paddleW;
	player1.h = paddleH;
	player2.w = paddleW;
	player2.h = paddleH;
	player1.pos = createVector(25 * RELATIVE_SCALE_Y, h / 2 - paddleH / 2);
	player2.pos = createVector(w - 25 * RELATIVE_SCALE_Y, h / 2 - paddleH / 2);
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
	RELATIVE_SCALE_X = w / 1211;
	RELATIVE_SCALE_Y = h / 655.5;

	// paddle width and heights
	paddleH = h / 6;
	paddleW = 5 * RELATIVE_SCALE_X;
}

function draw() {
	//reset background every frame
	background(0);

	if (mode == 0) {
		/* Display Start Menu */
		fill(256);
		textAlign(CENTER, CENTER);
		textSize(60 * RELATIVE_SCALE_X);
		text('Petres Pong', w / 2, h / 2);
		textSize(20 * RELATIVE_SCALE_X);
		text('Press enter to start', w / 2, h / 2 + 100 * RELATIVE_SCALE_Y);
	}

	if (mode == 1) {
		/* Display Game */
		// Draw net
		stroke(255);
		strokeWeight(1 * RELATIVE_SCALE_X);

		for (let i = 0; i < h; i += 30 * RELATIVE_SCALE_Y)
			line(w / 2, i, w / 2, i + 10 * RELATIVE_SCALE_Y);

		// draw player 1 paddle
		player1.update();
		player1.show();

		// draw player 2 paddle
		player2.update();
		player2.show();

		// draw ball
		ball.show();
		ball.move();
		ball.paddleCollision(player1, 0);
		ball.paddleCollision(player2, 1);

		let score = ball.edges();
		if (score !== undefined) score ? player1.incScore() : player2.incScore();

		// draw score board
		drawScores();

		// if a player reaches the goal display end menu
		if (player1.score >= ROUNDS || player2.score >= ROUNDS) mode = 2;
	}

	if (mode === 2) {
		// determine winner, and display winner

		if (player1.score != 0 || player2.score != 0)
			winner = player1.score === ROUNDS ? 'Player 1' : 'Player 2';

		background(0);
		textAlign(CENTER, CENTER);
		textSize(60 * RELATIVE_SCALE_X);
		text(winner + ' Wins!', w / 2, h / 2);

		// display scores
		textSize(20 * RELATIVE_SCALE_X);
		text('Press enter to play again', w / 2, h / 2 + 100 * RELATIVE_SCALE_X);

		// reset players
		player1.score = 0;
		player2.score = 0;
		player1.pos = createVector(p1PosX, pPosY);
		player2.pos = createVector(p2PosX, pPosY);
		ball.speed = createVector(BALL_SPEED, BALL_SPEED);
	}
}

/* Logic per keypress */
function keyPressed() {
	if (key == 'w' || key == 'W') player1.goUp();
	if (key == 's' || key == 'S') player1.down();
	if (keyCode == ENTER) mode = 1;
	if (twoPlayer && keyCode == UP_ARROW) player2.goUp();
	if (twoPlayer && keyCode == DOWN_ARROW) player2.down();
}

/* Logic per key release */
function keyReleased() {
	if (key == 'w' || key == 'W' || key == 's' || key == 'S') player1.stop();
	if (twoPlayer && (keyCode == UP_ARROW || keyCode == DOWN_ARROW))
		player2.stop();
}

/* Display player scores */
function drawScores() {
	fill(256);
	textSize(24 * RELATIVE_SCALE_X);
	textAlign(CENTER);
	text(player1.score, w / 2 - 50 * RELATIVE_SCALE_X, 50 * RELATIVE_SCALE_X);
	text(player2.score, w / 2 + 50 * RELATIVE_SCALE_X, 50 * RELATIVE_SCALE_X);
}
