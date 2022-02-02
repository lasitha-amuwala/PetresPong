class Button {
	constructor(l) {
		this.l = l;
		this.selected = false;
		this.disabled = false;
	}

	/** set button selected */
	select = () => !this.disabled && (this.selected = true);
	/** set button deselected */
	deselect = () => !this.disabled && (this.selected = false);
	/** set button enabled */
	enable = () => this.disabled && (this.disabled = false);
	/** set button disabled */
	disable = () => !this.disabled && (this.disabled = true);
	/** toggle button selected if button is clicked */
	clicked() {
		!this.disabled && this.intersect() && (this.selected = !this.selected);
	}

	/** Check if mouse is within the button dimensions */
	intersect = () =>
		mouseX >= this.x &&
		mouseX <= this.x + this.w &&
		mouseY >= this.y &&
		mouseY <= this.y + this.h;

	/** update the position and size of the button */
	update(w, h, x, y) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	/** draw button on screen */
	show() {
		let textColor, btnColor;

		// if the mouse is intersecting the button change its color
		if (this.intersect()) {
			btnColor = 255;
			textColor = 0;
		} else {
			btnColor = 0;
			textColor = 255;
		}

		// if the button is selected change its color
		if (this.selected) {
			btnColor = '#044a16';
			textColor = 255;
		}

		// draw button on canvas
		push();
		stroke(255);
		fill(btnColor);
		textSize(20 * RS_X);
		rect(this.x, this.y, this.w, this.h, 10 * RS_X);

		// draw text on cancas
		noStroke();
		fill(textColor);
		textAlign(CENTER, CENTER);
		text(this.l, this.x + this.w / 2, this.y + this.h / 2);
		pop();
	}
}
