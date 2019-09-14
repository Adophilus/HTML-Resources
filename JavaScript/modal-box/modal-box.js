class ModalBox {
	constructor (options = {}) {
		this.closed = true;
		this.hidden = false;

		var default_options = {
			title: "TITLE",
			body: "BODY",
			callback: () => {},
			font: {
				title: $_("body").style.fontFamily + " lucida, bookman old style, georgia",
				body: $_("body").style.fontFamily + " lucida, bookman old style, georgia"
			},
			color: {
				title: "black-white",
				body: "white-black",
				border: "black"
			}
		}

		for (var option in options) {
			default_options[option] = options[option];
		}

		this.options = default_options;

		this.create();
		this.style();
		this.bind(this);
		this.append();
	}

	create () {
		this.modalCover = $$.createElement("div");
		this.modalBox = $$.createElement("div");
		this.modalHeader = $$.createElement("header");
		this.modalTitle = $$.createElement("span");
		this.modalTitle.innerHTML = this.options.title;
		this.modalClose = $$.createElement("button");
		this.modalClose.innerHTML = "&times;";
		this.modalBody = $$.createElement("div");
		this.modalBody.innerHTML = this.options.body;
	}

	style () {
		this.modalCover.style.display = "none";
		this.modalCover.style.position = "fixed";
		this.modalCover.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
		this.modalCover.style.top = "0";
		this.modalCover.style.left = "0";
		this.modalCover.style.width = "100%";
		this.modalCover.style.height = "100%";

		this.modalBox.style.display = "none";
		this.modalBox.style.width = "50%";
		this.modalBox.style.borderRadius = "10px";
		this.modalBox.style.position = "fixed";
		this.modalBox.style.top = "30%";
		this.modalBox.style.left = "50%";
		this.modalBox.style.transform = "translate(-50%, -50%)";
		this.modalBox.style.border = "3px solid " + this.options.color.border;
		this.modalBox.style.boxShadow = "0px 8px 16px #0d0d0d";
		this.modalBox.style.userSelect = "none";

		this.modalHeader.style.backgroundColor = this.options.color.title.replace(/(.+)-(.+)/, "$1");
		this.modalHeader.style.color = this.options.color.title.replace(/(.+)-(.+)/, "$2");
		this.modalHeader.style.fontWeight = "bolder";
		this.modalHeader.style.fontSize = "30px";
		this.modalHeader.style.paddingLeft = "20px";
		this.modalHeader.style.paddingRight = "20px";
		this.modalHeader.style.paddingTop = "10px";
		this.modalHeader.style.paddingBottom = "10px";
		this.modalHeader.style.position = "relative";

		this.modalBody.style.backgroundColor = "white";
		this.modalBody.style.padding = "20px";
		this.modalBody.style.fontSize = "20px";
		this.modalBody.style.borderRadius = "0px 0px 10px 10px";

		this.modalClose.style.float = "right";
		// this.modalClose.style.position = "relative";
		// this.modalClose.style.top = "0px";
		// this.modalClose.style.top = "-20px";
		// this.modalClose.style.right = "-20px";
		// this.modalClose.style.border = "3px solid white";
		// this.modalClose.style.borderRadius = "50px";
		// this.modalClose.style.color = "black";
		// this.modalClose.style.backgroundColor = "white";
		this.modalClose.style.backgroundColor = "inherit";
		this.modalClose.style.color = "white";
		this.modalClose.style.border = "0px";
		this.modalClose.style.fontSize = "30px";
		this.modalClose.style.fontWeight = "bolder";
		this.modalClose.style.cursor = "pointer";
		this.modalClose.style.transitionDuration = "0.5s";
	}

	bind (self) {
		this.modalCover.onclick = function (e) {
			self.hide();
		}

		this.modalClose.onclick = function (e) {
			self.close();
		}

		this.modalClose.onmouseover = function (e) {
			this.style.color = "red";
		}

		this.modalClose.onmouseleave = function (e) {
			// this.style.color = "black";
			this.style.color = "inherit";
		}
	}

	append () {
		this.modalHeader.appendChild(this.modalTitle);
		this.modalHeader.appendChild(this.modalClose);

		this.modalBox.appendChild(this.modalHeader);
		this.modalBox.appendChild(this.modalBody);

		$_("body").appendChild(this.modalCover);
		$_("body").appendChild(this.modalBox);
	}

	show () {
		this.closed = false;
		this.hidden = false;
		this.modalBox.style.display = "block";
		this.modalCover.style.display = "block";
		this.options.callback ("shown");
	}

	close () {
		this.closed = true;
		this.hidden = false;
		this.modalBox.style.display = "none";
		this.modalCover.style.display = "none";
		this.options.callback ("closed");
	}

	hide () {
		this.hidden = true;
		this.modalBox.style.display = "none";
		this.modalCover.style.display = "none";
		this.options.callback ("hidden");
	}

	/*toggle () {
		if (this.closed) {
			this.show();
		}
		else {
			this.close();
		}
	}*/
}