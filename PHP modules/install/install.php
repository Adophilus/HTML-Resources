<?php

require_once '../Utility/utility-1.php';

function display_modules () {
	$modules_file = json_load("../modules-map.json");

	foreach ($modules_file as $module) {
		$module_name = $module["name"];

		echo "<option value='$module_name'>$module_name</option>";
	}
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Howcoe | PHP Modules (install)</title>
	<link rel="stylesheet" type="text/css" href="/CSS/design-1.css">
	<!-- <link rel="stylesheet" type="text/css" href="/CSS/bodies-2.css"> -->
	<link rel="stylesheet" type="text/css" href="/CSS/forms-2.css">
</head>
<body>
	<div body-style="1 grey">
		<div main-body>
			<form form-holder="center fixed" id="install-form">
				<header form-title>
					Module Installer
				</header>
				<div form-group>
					<span form-label>
						Path
					</span>
					<input type="text" form-entry required name="path" value="/">
				</div>
				<div form-group>
					<span form-label>
						Module
					</span>
					<select form-select style="width: 100%" name="module">
						<option></option>
						<?php display_modules(); ?>
					</select>
				</div>
				<input type="submit" form-submit value="Install">
		</div>
	</div>
	<script type="text/javascript" src="../../JavaScript/script-1.js"></script>
	<script type="text/javascript" src="../../JavaScript/jquery.js"></script>
	<script type="text/javascript" src="../../JavaScript/modal-box/modal-box.js"></script>
	<script type="text/javascript">
		var successModal = new ModalBox({
			title: "SUCCESS", 
			body: "hooray!"
		});

		var errorModal = new ModalBox({
			title: "ERROR", 
			body: "Sorry an error occurred"
		});

		var warningModal = new ModalBox({
			title: "WARNING", 
			body: "Sorry an error occurred"
		});

		$("#install-form").on("submit", function (e) {
			e.preventDefault();

			$.ajax({
				url: "./module_installer.php",
				method: "POST",
				data: $(this).serialize(),
				success: function (data) {
					console.log(data);
					data = JSON.parse(data);

					if (data.status) {
						successModal.modalBody.innerHTML = data.data;
						successModal.show();
					}
					else {
						warningModal.modalBody.innerHTML = data.data;
						warningModal.show();
					}
				},
				error: function (err) {
					errorModal.show();
				}
			});
		});
	</script>
</body>
</html>