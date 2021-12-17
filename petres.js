function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function setup() {
  
	cnv = createCanvas(windowWidth, windowWidth*0.56);
	centerCanvas();
}

function draw() {
	background(0);
}

function windowResized() {
	centerCanvas();
}
