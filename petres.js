let mode;
let ball, player1, player2;
let petresBall;
let twoPlayer;
let w, h;
let playAgain = false;
const ROUNDS = 10;

/* setup image */
function preload() {
	petresBall = loadImage('./petres-ball.png');
}

/* setup canvas */
function setup() {
	// initialize variables
	mode = 0;
	twoPlayer = true;

	// create canvas and initialize players
	centerCanvas();
	initPlayers();

	ball = new Ball(petresBall);
}

/* recreate canvas when page resized*/
function windowResized() {
	centerCanvas();
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

	background(0);
}

function initPlayers() {
	// calculates paddle positions based on window size percentages
	player1 = new Player(w - w * 0.98, h / 2 - (h * 0.15) / 2);
	player2 = new Player(w - w * 0.02 - w * 0.005, h / 2 - (h * 0.15) / 2);
}

/* Logic per keypress */
function keyPressed() {
	if (key == 'w' || key == 'W') player1.goUp();
	if (key == 's' || key == 'S') player1.down();
	if (keyCode == ENTER) mode = 1;
	if (twoPlayer && keyCode == UP_ARROW) player2.goUp();
	if (twoPlayer && keyCode == DOWN_ARROW) player2.down();
}

function draw() {
	//reset background every frame
	background(0);

	if (mode == 0) {
		/* Display Start Menu */
		fill(256);
		textAlign(CENTER, CENTER);
		textSize(60);
		text('Petres Pong', w / 2, h / 2);
		textSize(20);
		text('Press enter to start', w / 2, h / 2 + 100);
	}

	if (mode == 1) {
		/* Display Game */
		//Draw net
		stroke(255);
		for (let i = 0; i < h; i += 30) line(w / 2, i, w / 2, i + 10);

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
		let winner = player1.score === ROUNDS ? 'Player 1' : 'Player 2';
		background(0);
		textAlign(CENTER, CENTER);
		textSize(60);
		text(winner + ' Wins!', w / 2, h / 2);

		// display scores
		textSize(20);
		text('Press enter to play again', w / 2, h / 2 + 100);
		//reset players
		initPlayers();
	}
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
	textSize(24);
	textAlign(CENTER);
	text(player1.score, w / 2 - 50, 50);
	text(player2.score, w / 2 + 50, 50);
}
