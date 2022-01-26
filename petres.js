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

	// create instance of Player
	player1 = new Player(p1PosX);
	player2 = new Player(p2PosX);
	// create instance of Ball
	ball = new Ball();

	multiBtn = new Button('Multiplayer', btnW, btnH);
	singleBtn = new Button('Singleplayer', btnW, btnH);
	playBtn = new Button('Play', btnW, btnH);

	alignButtons();

	if (!twoPlayer) player1.maxSpd = 8 * RS_X;
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

	alignButtons();
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

	btnH = 50 * RS_Y;
	btnW = 150 * RS_X;
}

function draw() {
	//reset background every frame
	background(0);

	if (mode == 0) {
		/* Display Start Menu */
		let imgSize = 100 * RS_X;

		push();
		translate(w / 2, h / 4);
		rotate(radians(frameCount / 1.5));
		image(petresBall, 0 - imgSize / 2, 0 - imgSize / 2, imgSize, imgSize);
		pop();

		fill(256);
		textAlign(CENTER, CENTER);
		textSize(100 * RS_X);
		text('Petres Pong', w / 2, h / 2 - 25 * RS_Y);
		textSize(20 * RS_X);

		if (playBtn.selected) mode = 1;

		playBtn.show();
		multiBtn.show();
		singleBtn.show();
	}

	if (mode == 1) {
		/* Display Game */

		// Draw net and score board
		drawField();

		// Draw player 1 paddle
		player1.update();
		player1.show();

		// Draw player 2 paddle
		player2.update();
		player2.show();

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

	if (mode === 2) {
		// determine winner, and display winner

		if (player1.score != 0 || player2.score != 0) {
			if (twoPlayer) {
				winner = player1.score === ROUNDS ? 'Player 1 Wins!' : 'Player 2 Wins!';
			} else {
				winner = player1.score === ROUNDS ? 'You Lose!' : 'You Win!';
			}
		}

		background(0);
		textAlign(CENTER, CENTER);
		textSize(60 * RS_X);
		text(winner, w / 2, h / 2);

		// display scores
		textSize(20 * RS_X);
		text('Press enter to play again', w / 2, h / 2 + 100 * RS_X);

		// reset players
		player1.score = 0;
		player2.score = 0;
		player1.pos = createVector(p1PosX, pPosY);
		player2.pos = createVector(p2PosX, pPosY);
		ball.speed = createVector(BALL_SPEED, BALL_SPEED);
	}
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
	stroke(255);
	strokeWeight(1 * RS_X);
	for (let i = 0; i < h; i += 30 * RS_Y) line(w / 2, i, w / 2, i + 10 * RS_Y);

	fill(256);
	textSize(24 * RS_X);
	textAlign(CENTER);
	text(player1.score, w / 2 - 50 * RS_X, 50 * RS_X);
	text(player2.score, w / 2 + 50 * RS_X, 50 * RS_X);
}

function alignButtons() {
	singleBtn.x = w / 2 - singleBtn.w / 2 - 100 * RS_X;
	multiBtn.x = w / 2 - multiBtn.w / 2 + 100 * RS_X;
	playBtn.x = w / 2 - playBtn.w / 2;

	singleBtn.y = h - 250 * RS_Y;
	multiBtn.y = h - 250 * RS_Y;
	playBtn.y = h - 150 * RS_Y;
}

/* Logic per keypress */
function keyPressed() {
	if (twoPlayer && (key == 'w' || key == 'W')) player1.goUp();
	if (twoPlayer && (key == 's' || key == 'S')) player1.down();
	if (keyCode == ENTER) mode = 1;
	if (keyCode == UP_ARROW) player2.goUp();
	if (keyCode == DOWN_ARROW) player2.down();
}

/* Logic per key release */
function keyReleased() {
	if (twoPlayer && (key.toLowerCase() == 'w' || key.toLowerCase() == 's'))
		player1.stop();
	if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) player2.stop();
}

function mousePressed() {
	this.playBtn.clicked();
	this.multiBtn.clicked();
	this.singleBtn.clicked();
}
