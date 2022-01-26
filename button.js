class Button {
	constructor(l, bW, bH) {
		this.l = l;
		this.w = bW * RS_X;
		this.h = bH * RS_Y;
		this.selected = false;
	}

	select = () => (this.selected = true);
	unSelect = () => (this.selected = false);

	intersect = () =>
		mouseX >= this.x &&
		mouseX <= this.x + this.w &&
		mouseY >= this.y &&
		mouseY <= this.y + this.h;

	clicked() {
		if (this.intersect()) this.selected = !this.selected;
	}

	show() {
		let textColor, btnColor;
		if (this.intersect()) {
			btnColor = 255;
			textColor = 0;
		} else {
			btnColor = 0;
			textColor = 255;
		}

		if (this.selected) {
			btnColor = '#044a16';
			textColor = 255;
		}

		fill(btnColor);
		stroke(255);
		rect(this.x, this.y, this.w, this.h, 10 * RS_X);
		noStroke();
		fill(textColor);
		text(this.l, this.x + this.w / 2, this.y + this.h / 2);
	}
}
