function centerCanvas() {
	let winWidth = windowHeight - 100;
	let winHeight = windowHeight * 0.5;

	if (windowWidth < windowHeight - 100) {
		winWidth = windowWidth - 100;
		winHeight = windowWidth * 0.5;
	}
	canvas = createCanvas(winWidth, winHeight);
	canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
	background(0);
}

function preload() {
	petres = loadImage('./petres.jpg');
}

function setup() {
	centerCanvas();
}

let 

function draw() {
	let w = width;
	let h = height;

	/* Draw net */
	stroke(255);
	for (let i = 0; i < h; i += 30) line(w / 2, i, w / 2, i + 10);

	/* Draw Paddles*/
	let paddleWidth = w * 0.005;
	let paddleHeight = h * 0.15;
	let paddleLX = w - w * 0.98;
	let paddleRX = w - w * 0.02 - paddleWidth;
	let paddleLY = h / 2 - paddleHeight / 2;
	let paddleRY = h / 2 - paddleHeight / 2;

	rect(paddleLX, paddleLY, paddleWidth, paddleHeight);
	rect(paddleRX, paddleRY, paddleWidth, paddleHeight);
	
	

	//image(petres, w / 2 - 25, h / 2 - 25, w / 25, w / 25);

}

function windowResized() {
	centerCanvas();
}

class Plasyer {
	constructor() {
		this.height = width * 0.005;
		this.width = height * 0.15;
	}
}
