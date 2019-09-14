<?php

require_once '../Utility/utility-1.php';

if (isset($_POST["path"]) && isset($_POST["module"])) {
	if ($_POST["module"] == "") {
		send_false (
			array(
				"data" => "No module selected!"
			)
		);
	}

	if (!is_dir($_POST["path"])) {
		send_false (
			array(
				"data" => "The 'path' provided is invalid!"
			)
		);
	}

	$module = json_load("../modules-map.json");

	foreach ($module as $mod) {
		if ($mod["name"] == $_POST["module"]) {
			install_module ($mod, $_POST["path"]);
		}
	}

	send_false(
		array(
			"data" => "The requested module is in existent!"
		)
	);

}

function install_module ($module, $path) {
	chdir("../");

	$module_map = json_load($module["map"]);

	foreach ($module_map["scripts"] as $script) {
		try {
			copy($script["path"], $path);
		} catch (Exception $e) {
			send_false (
				array(
					"data" => "Sorry an error occurred!"
				)
			);
		}
	}
}