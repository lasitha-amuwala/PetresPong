class Button {
	constructor(l) {
		this.l = l;
		this.selected = false;
	}

	select = () => (this.selected = true);
	unSelect = () => (this.selected = false);
	clicked = () => this.intersect() && (this.selected = !this.selected);

	intersect = () =>
		mouseX >= this.x &&
		mouseX <= this.x + this.w &&
		mouseY >= this.y &&
		mouseY <= this.y + this.h;

	update(w, h, p) {
		this.x = p.x;
		this.y = p.y;
		this.w = w;
		this.h = h;
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

		push();
		stroke(255);
		fill(btnColor);
		textSize(20 * RS_X);
		textAlign(CENTER, CENTER);
		rect(this.x, this.y, this.w, this.h, 10 * RS_X);

		noStroke();
		fill(textColor);
		text(this.l, this.x + this.w / 2, this.y + this.h / 2);
		pop();
	}
}
