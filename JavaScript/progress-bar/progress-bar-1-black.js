class ProgressBar1Black {
	constructor (parent, callback) {
		this.callback = callback;
		this.parent = parent;
		this.step = 1.0;
		this.timeInterval = 625;
		this.animating = false;
		this.interval = false;

		if (callback === undefined) {
			this.callback = function () {}
		}
		if (parent === undefined) {
			this.parent = $_("body");
		}

		this.percentage = 0;

		this.create();
		this.style();
		this.add();
	}

	create () {
		this.progressBarParent = $$.createElement("div");
		this.progressBar = $$.createElement("div");
	}

	style () {
		this.progressBarParent.style.backgroundColor = "white";
		this.progressBarParent.style.height = "30px";
		this.progressBarParent.style.width = "100%";
		this.progressBarParent.style.border = "3px solid black";
		this.progressBarParent.style.borderRadius = "15px";

		this.progressBar.style.backgroundColor = "black";
		this.progressBar.style.height = "100%";
		this.progressBar.style.width = this.percentage;
		this.progressBar.style.borderRadius = "12px";
	}

	add () {
		this.progressBarParent.appendChild(this.progressBar);
		this.parent.appendChild(this.progressBarParent);
	}

	animate (percentage, rate) {
		this.finish();

		if (percentage > 100) {
			percentage = 100;
		}

		if (this.animating) {
			return false;
		}

		if (this.animating == false) {
			if (this.interval) {
				clearInterval(this.interval);
			}
		}

		this.interval = setInterval(this.animation, this.timeInterval, this, percentage);
	}

	animation (self, percentage) {
		self.finish(self);

		if (self.percentage <= percentage) {
			self.animating = true;
			self.progressBar.style.width = `${self.percentage}%`;
			self.percentage += self.step;
		}

		if (self.animating == false) {
			if (self.interval) {
				clearInterval(self.interval);
			}
		}
	}

	finish (self) {
		if (self === undefined) {
			self = this;
		}

		if (self.percentage >= 100) {
			self.animating = false;
			self.callback();
		}
	}

	reset (self) {
		if (self === undefined) {
			self = this;
		}

		self.percentage = 0;
		self.progressBar.width = self.percentage;
	}
}