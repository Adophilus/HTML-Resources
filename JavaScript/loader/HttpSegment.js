class HttpSegmentLoader
{
	constructor (options)
	{
		//{
		//	parent: $_("body"),
		//	path: "./file.ext",
		//	callback: function () {},
		//	name: "Http Segment"
		//}
		
		this.options = {
			parent: $_("body"),
			path: "http://127.0.0.1/index.html",
			callback: function () {},
			name: "Http Segment"
		}

		for (var key in options) {
			this.options[key] = options[key];
		}
	}

	loadSegment ()
	{
		var self = this;

		$.ajax({
			data: "",
			url: self.path,
			method: "GET",
			success: function (data) {
				alert (data);
			},
			error: function (e) {
				console.warn (`Failed to load ${self.name}!`);
			}
		});
	}

	load (options)
	{
		return this.loadSegment(options);
	}

	retrieve (options)
	{
		return this.loadSegment(options);
	}
}