class ModalBox1
{
	constructor (options) {
		this.visibility = false;
		this.closed = false;
		this.answer = undefined;
		this.modalOptions = new Object();
		this.modalOptions.title = "This is the title";
		this.modalOptions.body = "This is the body";
		this.modalOptions.type = "display";
		this.modalOptions.font = new Object();
		this.modalOptions.font.title = $_("body").style.fontFamily + " lucida, arial";
		this.modalOptions.font.body = $_("body").style.fontFamily + " lucida, arial";
		this.modalOptions.callback = function () {};

		if (options) {
			for (var key in options) {
				this.modalOptions[key] = options[key];
			}
		}

		this.create();
		this.handleFooter();
		this.handleStyles();
		this.handleCommands();
		this.add();
	}

	callback () {}

	create () {
		this.modalDiv = $$.createElement("div");

		this.modalHeader = $$.createElement("header");
		this.modalTitle = $$.createElement("span");
		this.modalClose = $$.createElement("span");

		this.modalBody = $$.createElement("div");
		this.modalContent = $$.createElement("p");

		this.modalFooter = $$.createElement("header");
		this.modalCover = $$.createElement("div");

		this.modalTitle.innerHTML = this.modalOptions.title;
		this.modalClose.innerHTML = "&times";
		this.modalBody.innerHTML = this.modalOptions.body;
		// this.modalContent.innerHTML = this.modalOptions.body;
	}

	add () {
		this.modalHeader.appendChild(this.modalTitle);
		this.modalHeader.appendChild(this.modalClose);

		this.modalDiv.appendChild(this.modalHeader);
		this.modalDiv.appendChild(this.modalBody);
		this.modalDiv.appendChild(this.modalFooter);

		// this.modalBody.appendChild(this.modalContent);

		$_("body").appendChild(this.modalCover);
		$_("body").appendChild(this.modalDiv);
	}

	handleStyles () {
		this.modalDiv.style.display = "none";
		// this.modalDiv.style.border = "3px solid rgba(0, 0, 0, 0.3)";
		this.modalDiv.style.border = "3px solid black";
		this.modalDiv.style.borderRadius = "10px";
		this.modalDiv.style.width = "50%";
		this.modalDiv.style.position = "fixed";
		this.modalDiv.style.userSelect = "none";
		this.modalDiv.style.top = "30%";
		this.modalDiv.style.left = "50%";
		this.modalDiv.style.transform = "translate(-50%, -50%)";
		// this.modalDiv.style.boxShadow = "5px 5px 4px 1px #0d0d0d, -5px 5px 4px 1px #0d0d0d";
		this.modalDiv.style.boxShadow = "0px 8px 16px 8px #0d0d0d";
		this.modalDiv.style.backgroundColor = "white";

		// this.modalHeader.style.position = "absolute";
		this.modalHeader.style.fontSize = "30px";
		this.modalHeader.style.fontWeight = "bolder";
		// this.modalHeader.style.top = "0";
		// this.modalHeader.style.left = "0";
		this.modalHeader.style.padding = "10px";
		this.modalHeader.style.backgroundColor = "black";
		this.modalHeader.style.color = "white";
		this.modalHeader.style.borderBottom = "3px solid rgba(0, 0, 0, 0.3)";

		this.modalTitle.style.fontFamily = this.modalOptions.font.title;

		this.modalBody.style.padding = "10px";
		this.modalBody.style.fontSize = "25px";
		this.modalBody.style.backgroundColor = "white";
		// this.modalBody.style.borderRadius = "0px 0px 8px 8px";
		this.modalBody.style.fontFamily = this.modalOptions.font.body;

		this.modalContent.style.backgroundColor = "white";
		this.modalContent.style.width = "100%";
		this.modalContent.style.height = "100%";
		this.modalContent.style.top = "0";
		this.modalContent.style.left = "0";

		this.modalFooter.style.backgroundColor = "white";
		this.modalFooter.style.borderRadius = "0px 0px 8px 8px";
		this.modalFooter.style.padding = "10px";

		this.modalClose.style.float = "right";
		this.modalClose.style.cursor = "pointer";

		this.modalCover.style.top = "0";
		this.modalCover.style.left = "0";
		this.modalCover.style.position = "fixed";
		this.modalCover.style.display = "none";
		this.modalCover.style.width = "100%";
		this.modalCover.style.height = "100%";
		// this.modalCover.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		this.modalCover.style.backgroundColor = "#333";
		this.modalCover.style.opacity = "0.65";
	}

	handleFooter () {
		if (this.modalOptions.type == "display") {
			this.modalBody.style.borderRadius = "0px 0px 8px 8px";
			this.modalFooter.style.padding = "0px";
		}
		else if (this.modalOptions.type == "ask" || this.modalOptions.type == "question") {
			this.answer = undefined;
		}
		else if (this.modalOptions.type == "alert") {
			this.closeButton = $$.createElement("button");
			this.closeButton.innerHTML = "Ok";

			this.closeButton.style.fontSize = "30px";
			this.closeButton.style.fontWeight = "bold";
			this.closeButton.style.border = "2px solid black";
			this.closeButton.style.borderRadius = "10px";
			this.closeButton.style.cursor = "pointer";
			this.closeButton.style.backgroundColor = "white";
			this.closeButton.style.padding = "10px";
			this.closeButton.style.width = "100%";
			this.closeButton.style.textShadow = "1px 2px 1.5px #0d0d0d";

			this.modalFooter.appendChild(this.closeButton);
		}
	}

	handleCommands () {
		var that = this;

		this.modalClose.onclick = function () {
			that.close(that);

			if (that.modalOptions.callback) {

				that.modalOptions.callback();

			}
		}

		this.modalClose.onmouseover = function () {
			this.style.color = "red";
		}

		this.modalClose.onmouseleave = function () {
			this.style.color = "white";
		}

		this.modalCover.onclick = function () {
			that.close(that);

			if (that.modalOptions.callback) {

				that.modalOptions.callback();
				
			}
		}

		if (this.closeButton) {

			this.closeButton.onclick = function () {

				that.close(that);

				if (that.modalOptions.callback) {

					that.modalOptions.callback();
				
				}
			}
		}

		if (this.noButton) {

			this.noButton.onclick = function () {

				that.close(that);

				that.answer = false;

				if (that.modalOptions.callback) {

					that.modalOptions.callback();
				
				}
			}
		}

		if (this.yesButton) {

			this.yesButton.onclick = function () {

				that.close(that);

				that.answer = true;

				if (that.modalOptions.callback) {

					that.modalOptions.callback();
				
				}
			}
		}
	}

	toggle () {
		if (this.visibility) {
			this.hide();
		}
		else {
			this.show();
		}
	}

	show () {
		this.modalDiv.style.display = "block";
		this.modalCover.style.display = "block";
		this.visibility = true;
		this.closed = false;
	}

	hide () {
		this.modalDiv.style.display = "none";
		this.modalCover.style.display = "none";
		this.visibility = false;
	}

	close (self) {
		self.hide();
		self.closed = true;
	}
}