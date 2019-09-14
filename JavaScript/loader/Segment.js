class SegmentLoader
{
	constructor (options) {
		this.options = {
			"parent": $_("body"),
			"path": "index.html",
			"callback": function () {}
		}

		for (var option in options) {
			this.options[option] = options[option];

			if (option == "path") {
				this.options[option] = path.resolve(options[option]);
			}
		}

	}

	load () {

		var self = this;

		fs.readFile(this.options.path, {"encoding": "utf-8"}, function (err, data) {
			if (err) {
				self.options.callback(err);
			}
			else {
				self.options.parent.innerHTML = data;
				self.options.callback(undefined);
			}
		});
	}
}