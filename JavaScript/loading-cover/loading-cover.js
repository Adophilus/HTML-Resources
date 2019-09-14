class LoadingCover
{
	constructor (options) {
		this.showing = false;
		this.options = {
			background: "rgba(0, 0, 0, 0.7)",
			timeout: false,
			stay: true,
			image: "/Media/loading.gif",
			callback: function () {}
		}

		for (var option in options) {
			this.options[option] = options[option];
		}

		this.create();
		this.style();
		this.bind(this);
		this.append();
	}

	create () {
		this.loadingCover = $$.createElement("div");
		this.loadingImage = $$.createElement("img");
		this.loadingImage.setAttribute("src", this.options.image);
	}

	style () {
		this.loadingCover.style.display = "none";
		this.loadingCover.style.position = "fixed";
		this.loadingCover.style.backgroundColor = this.options.background;
		this.loadingCover.style.top = "0";
		this.loadingCover.style.left = "0";
		this.loadingCover.style.width = "100%";
		this.loadingCover.style.height = "100%";

		this.loadingImage.style.display = "none";
		this.loadingImage.style.position = "fixed";
		this.loadingImage.style.width = "100px";
		this.loadingImage.style.height = "100px";
		// this.loadingImage.style.alignSelf = "center";
		this.loadingImage.style.top = "50%";
		this.loadingImage.style.left = "50%";
		this.loadingImage.style.transform = "translate(-50%, -50%)";
		this.loadingImage.style.userSelect = "none";
	}

	bind (self) {
		this.loadingCover.onclick = function (e) {
			if (!self.options.stay) {
				self.hide();
			}
		}
	}

	append () {
		$_("body").appendChild(this.loadingCover);
		$_("body").appendChild(this.loadingImage);
	}

	show () {
		if (!this.showing) {
			console.log("Showing...");

			this.showing = true;
			this.loadingCover.style.display = "block";
			this.loadingImage.style.display = "block";

			this.options.callback("shown", true);

			if (!this.options.stay && this.options.timeout) {
				setTimeout(this.hide, (this.options.timeout * 1000));
			}
		}
	}

	hide () {
		if (this.showing) {
			console.log("Hiding...");

			this.showing = false;
			this.loadingCover.style.display = "none";
			this.loadingImage.style.display = "none";

			this.options.callback("hidden", false);
		}
	}
}