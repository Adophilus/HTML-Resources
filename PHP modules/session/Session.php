<?php

require_once($_SERVER["DOCUMENT_ROOT"] . "/PHP modules/PrivateKeyGenerator.php");

class Session
{
	function Session ($session_id = "") {
		if ($session_id == "") {
			$this->session_id = $session_id;
			$this->created = false;
		}
		else {
			$this->session_id = $session_id;

			if ($this->check()) {
				$this->created = true;
				$this->load();
			}
			else {
				$this->created = false;
			}
		}
	}

	function check () {
		if (file_exists($_SERVER["DOCUMENT_ROOT"] . "/session/session-data/$this->session_id.json")) {
			return true;
		}
		else {
			return false;
		}
	}

	function create () {
		if (!$this->check() && !$this->created) {
			$generator = new PrivateKeyGenerator();

			do {
				$session_id = $generator->generate(5);
				if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/session/session-data/$session_id.json")) {
					break;
				}
			} while (true);

			file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/session/session-data/$session_id.json", "{}");
			$this->created = true;
			$this->session_id = $session_id;
			$this->session = array();

			return $session_id;
		}
	}

	function delete () {
		if ($this->check() && $this->session) {
			unlink($_SERVER["DOCUMENT_ROOT"] . "/session/session-data/$this->session_id.json");
			$this->created = false;
		}
	}

	function load () {
		if ($this->check()) {
			$this->session = json_decode(
				file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/session/session-data/$this->session_id.json"), true
			);

			return $this->session;
		}
	}

	function commit () {
		if ($this->check() && $this->session) {
			file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/session/session-data/$this->session_id.json", json_encode($this->session));
		}
	}
}