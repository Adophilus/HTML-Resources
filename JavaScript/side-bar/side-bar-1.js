class SideBar1
{
	constructor (options) {
		this.options = options;
		this.visibility = 0;

		this.create();
		this.style();
		this.bind();

		for (var button_settings of options) {
			var button = this.addButton(button_settings.button);

			this.styleButton(button);

			this.bindButton(button, button_settings.callback);
		}

		this.add();
	}

	create () {
		this.sideBar = $$.createElement("div");
		this.sideBarHeader = $$.createElement("header");
		this.sideBarClose = $$.createElement("span");
		this.sideBarContent = $$.createElement("div");
		this.sideBarCover = $$.createElement("div");

		this.sideBarClose.innerHTML = "&times";
	}

	style () {
		this.sideBar.style.display = "none";
		this.sideBar.style.height = "100%";
		this.sideBar.style.width = "40%";
		this.sideBar.style.top = "0px";
		this.sideBar.style.left = "0px";
		this.sideBar.style.position = "fixed";
		this.sideBar.style.backgroundColor = "white";
		this.sideBar.style.boxShadow = "0px 10px 30px #000";
		this.sideBar.style.userSelect = "none";
		this.sideBar.style.overflow = "hidden";
		this.sideBar.style.overflowY = "scroll";

		this.sideBarCover.style.display = "none";
		this.sideBarCover.style.width = "100%";
		this.sideBarCover.style.height = "100%";
		this.sideBarCover.style.position = "fixed";
		this.sideBarCover.style.top = "0";
		this.sideBarCover.style.left = "0";
		this.sideBarCover.style.backgroundColor = "rgba(0, 0, 0, 0.65)";

		this.sideBarContent.marginTop = "20px";

		this.sideBarHeader.style.padding = "10px 10px";
		this.sideBarHeader.style.textAlign = "right";

		this.sideBarClose.style.fontWeight = "bolder";
		this.sideBarClose.style.fontSize = "40px";
		this.sideBarClose.style.padding = "20px";
		this.sideBarClose.style.cursor = "pointer";
		this.sideBarClose.style.transitionDuration = "0.4s";
		// this.sideBarClose.style.webkitTextStroke = "2px black";
	}

	bind () {
		var self = this;

		this.sideBarCover.onclick = function () {
			self.hide()
		}

		this.sideBarClose.onclick = function () {
			self.hide()
		}

		this.sideBarClose.onmouseover = function () {
			this.style.color = "red"
		}

		this.sideBarClose.onmouseleave = function () {
			this.style.color = "black"
		}
	}

	add () {
		this.sideBar.appendChild(this.sideBarHeader);
		this.sideBar.appendChild(this.sideBarContent);

		this.sideBarHeader.appendChild(this.sideBarClose);

		$_("body").appendChild(this.sideBarCover);
		$_("body").appendChild(this.sideBar);
	}

	toggle () {
		if (this.visibility == 0) {
			this.show()
		}
		else {
			this.hide()
		}
	}

	addButton (text) {
		var button = $$.createElement("button");
		button.innerHTML = text;

		this.sideBarContent.appendChild(button);

		return button;
	}

	styleButton (button) {
		button.style.width = "100%";
		button.style.padding = "20px";
		button.style.cursor = "pointer";
		button.style.backgroundColor = "white";
		button.style.border = "0px";
		button.style.textAlign = "left";
		button.style.fontWeight = "bolder";
		button.style.fontFamily = "lucida";
		button.style.fontSize = "30px";
		button.style.transitionDuration = "0.4s";
		button.style.overflow = "hidden";
	}

	bindButton (button, callback) {
		var self = this;

		button.onclick = function (e) {
			self.hide();
			callback(self, e, this);
		}

		button.onmouseover = function () {
			this.style.color = "red";
		}

		button.onmouseleave = function () {
			this.style.color = "black";
		}
	}

	hide () {
		this.sideBar.style.display = "none";
		this.sideBarCover.style.display = "none";
		this.visibility = 0;
	}

	show () {
		this.sideBar.style.display = "block";
		this.sideBarCover.style.display = "block";
		this.visibility = 1;
	}
}