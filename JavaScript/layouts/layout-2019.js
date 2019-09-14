
class layout2019
{
	constructor (options) {
		//{
		//	defaultAction: true,
		// 	shadow: false,
		// 	fontFamily: "raleway",
		// 	mainBackground: {
		// 		backgroundColor: "grey",
		// 		backgroundImage: null,
		// 		linerGradient: null,
		// 		...
		// 	},
		// 	mainBody: {
		// 		backgroundColor: white,
		// 		linearGradient: null,
		// 		...
		// 	},
		// 	heading: {
		// 		"main-header-1": {
			// 		fontFamily: "raleway",
			// 		fontWeight: "bold",
			// 		fontSize: "200%",
			// 		...
		// 		},
		// 		"main-header-2": {
		// 			fontFamily: "raleway",
		// 			fontWeight: "bold",
			// 		fontSize: "175%",
			// 		...
		// 		},
		// 		"main-header-3": {
		// 			fontFamily: "raleway",
		// 			fontWeight: "bold",
			// 		fontSize: "150%",
			// 		...
		// 		}
		// 	}
		//}

		this.options = {
			defaultAction: true,
			shadow: false,
			fontFamily: "raleway",
			mainBackground: {
				backgroundColor: "grey",
				backgroundImage: null,
				linerGradient: null
			},
			mainBody: {
				backgroundColor: "white",
				borderRight: "1px solid grey",
				linearGradient: null
			},
			heading: {
				"main-header-1": {
					fontFamily: "raleway",
					fontSize: "200%",
					fontWeight: "bold",
					textAlign: "center",
					display: "block",
					textDecoration: "underline",
					textDecorationColor: "blue",
					paddingTop: "20px",
					paddingBottom: "20px"
				},
				"main-header-2": {
					fontFamily: "raleway",
					fontSize: "175%",
					fontWeight: "bold",
					textAlign: "center",
					display: "block",
					textDecoration: "underline",
					textDecorationColor: "blue",
					paddingTop: "20px",
					paddingBottom: "20px"
				},
				"main-header-3": {
					fontFamily: "raleway",
					fontSize: "150%",
					fontWeight: "bold",
					textAlign: "center",
					display: "block",
					textDecoration: "underline",
					textDecorationColor: "blue",
					paddingTop: "20px",
					paddingBottom: "20px"
				}
			}
		}

		for (var key in options) {
			/*if (options[key] === Object) {
				for (var option in options[key]) {
					this.options[key][option] = options[key][option];
				}
			}
			else {
				this.options[key] = options[key];
			}*/

			this.options[key] = options[key];
		}
	}

	layout () {
		if (this.options.defaultAction) {
			this.defaultAction ();
		}

		$_(".main-background").style.display = "block";
		
		this.handleOptions ();
		this.handleHeaders ();
	}

	handleHeaders () {
		var headings = {
			"main-header-1": $__(".main-header-1"),
			"main-header-2": $__(".main-header-2"),
			"main-header-3": $__(".main-header-3")
		}

		for (var heading in headings) {
			for (var individualHeading of headings[heading]) {
				for (var headingOptions in this.options.heading[heading]) {
					individualHeading.style[headingOptions] = this.options.heading[heading][headingOptions];
				}
			}
		}
	}

	handleOptions () {
		if (this.options.shadow) {
			$_(".main-background .main-body").style.boxShadow = "0px 8px 16px 0px #0d0d0d";
			$_(".main-background .sidebar").style.boxShadow = "0px 8px 8px 0px #0d0d0d";
		}

		$_(".main-background").style.fontFamily = this.options.fontFamily;

		if (this.options.mainBackground.backgroundImage) {

		}
		else if (this.options.mainBackground.backgroundColor) {
			$_(".main-background").style.backgroundColor = this.options.mainBackground.backgroundColor;
		}
		else if (this.options.mainBackground.linerGradient) {

			var gradients = this.options.mainBackground.linerGradient;

			$_(".main-background").style.backgroundImage = `linear-gradient(${gradients[0]}, ${gradients[1]})`;
		}

		if (this.options.mainBody.backgroundColor) {

			if (this.options.mainBackground.backgroundColor == "white") {

				$_(".main-background .main-body").style.borderRight = this.options.mainBody.borderRight;
				$_(".main-background .main-body").style.height = "100%";
				$_(".main-background .main-body").style.paddingRight = "3%";
			}

			$_(".main-background .main-body").style.backgroundColor = this.options.mainBody.backgroundColor;
			$_(".main-background .sidebar").style.backgroundColor = this.options.mainBody.backgroundColor;
		}
		else if (this.options.mainBody.linerGradient) {
			var gradients = this.options.mainBackground.linerGradient;

			$_(".main-background .main-body").style.linerGradient = `linear-gradient(${gradients[0]}, ${gradients[1]})`;
			$_(".main-background .sidebar").style.linerGradient = `linear-gradient(${gradients[0]}, ${gradients[1]})`;
		}

		if (this.options.shadow) {
			$_(".main-background .main-body").style.boxShadow = "0px 8px 16px 0px #0d0d0d";
			$_(".main-background .sidebar").style.boxShadow = "0px 8px 8px 0px #0d0d0d";
		}
	}

	defaultAction () {
		if (window.screen.width > 900) {
			this.bigScreenDualLayout ();
		}
		else {
			this.smallScreenSingleLayout ();
		}

		this.loadCssStyles ();
	}

	smallScreenSingleLayout () {}

	bigScreenSingleLayout () {
		$_(".main-background").style.position = "fixed";
		$_(".main-background").style.width = "100%";
		$_(".main-background").style.height = "100%";
		$_(".main-background").style.top = "0";
		$_(".main-background").style.left = "0";
		$_(".main-background").style.fontSize = "110%";
		$_(".main-background").style.fontFamily = "lucida";
		$_(".main-background").style.overflowY = "scroll";

		// $_(".main-background .main-body").style.border = "3px solid black";
		$_(".main-background .main-body").style.float = "left";
		$_(".main-background .main-body").style.width = "80%";
		$_(".main-background .main-body").style.padding = "10px";
		$_(".main-background .main-body").style.marginTop = "5%";
		$_(".main-background .main-body").style.marginLeft = "10%";
		$_(".main-background .main-body").style.marginRight = "10%";
		$_(".main-background .main-body").style.marginBottom = "5%";
		
		$_(".main-background .sidebar").style.display = "none";
	}

	bigScreenDualLayout () {
		$_(".main-background").style.position = "fixed";
		$_(".main-background").style.width = "100%";
		$_(".main-background").style.height = "100%";
		$_(".main-background").style.top = "0";
		$_(".main-background").style.left = "0";
		$_(".main-background").style.fontSize = "110%";
		$_(".main-background").style.fontFamily = "lucida";
		$_(".main-background").style.overflowY = "scroll";

		$_(".main-background .main-body").style.float = "left";
		$_(".main-background .main-body").style.width = "50%";
		$_(".main-background .main-body").style.padding = "2%";
		$_(".main-background .main-body").style.marginTop = "5%";
		$_(".main-background .main-body").style.marginLeft = "8%";
		$_(".main-background .main-body").style.marginBottom = "5%";

		$_(".main-background .sidebar").style.float = "left";
		$_(".main-background .sidebar").style.width = "26%";
		$_(".main-background .sidebar").style.paddingTop = "10px";
		$_(".main-background .sidebar").style.paddingBottom = "10px";
		$_(".main-background .sidebar").style.marginTop = "5%";
		$_(".main-background .sidebar").style.marginLeft = "2%";
	}

	loadCssStyles () {
		var styleElement = $$.createElement ("style");

		styleElement.innerHTML = `
		.main-background *::selection {
			background-color: blue;
			color: black;
		}
		`;

		$_("body").appendChild (styleElement);
	}
}