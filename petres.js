function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
	background(0);
}

function setup() {
	cnv = createCanvas(windowHeight-100, windowHeight*0.5);
	centerCanvas();
	background(0);
}

function draw() {
	background(0);
}

function windowResized() {
	centerCanvas();
	background(0);
}
