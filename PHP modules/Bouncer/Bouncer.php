<?php

class Bouncer
{
	function Bouncer ($user_options = array()) {
		$options = $this->get_file($_SERVER["DOCUMENT_ROOT"] . "/PHP modules/Bouncer/settings.json");

		foreach ($user_options as $option) {
			$options[$option] = $user_options[$option];
		}

		$options["bounce_file"] = "/PHP modules/Bouncer/bounce_file.php";
		$options["redirect_file"] = "/PHP modules/Bouncer/redirect_file.php";
		
		$this->options = $options;

		$this->address = $_SERVER["REMOTE_ADDR"];
		$this->blacklist = $this->get_file($this->options["blacklist_file"]);
	}

	function check_list () {
		if (array_search($this->address, $this->blacklist["address"]) === FALSE) {
			
		}
		else {
			return true;
		}
	}

	function save_file ($filepath, $data) {
		file_put_contents($filepath, json_encode($data));
	}

	function get_file ($filepath) {
		return json_decode(
			file_get_contents($filepath),
			true
		);
	}

	function bounce () {
		header("Location: " . $this->options["bounce_file"]);
	}

	function redirect () {
		header("Location: " . $this->options["redirect_file"]);
	}

	function add_to_blacklist () {
		$data = $this->get_file($this->options["blacklist_file"]);

		array_push($data["address"], $this->address);

		if (!$this->check_list()) {
			$this->save_file($this->options["blacklist_file"], $data);

			$this->send_mail();
		}
	}

	function send_mail () {

		foreach ($this->options["admin_email"] as $email) {
			mail($email,
				"Blocked user",
				"<h1>
					$this->address was blocked
				</h1>",
				"Content-Type: text/html"
			);
		}
	}
}