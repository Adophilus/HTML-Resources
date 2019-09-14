<?php

class TokenGenerator
{
	function TokenGenerator () {
		$this->list = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
	}

	function getRandomEntry ($arr, $number) {
		return array_rand($arr, $number);
	}

	function generate ($level = 1, $separate = true, $tag = false) {
		return $this->token($level, $separate, $tag);
	}

	function token ($level = 1, $separate = "-", $tag = false) {
		$loop = 0;
		$token = "";

		if ($tag) {
			$token .= "#";
		}

		while ($loop < ($level - 1)) {
			$random = $this->getRandomEntry($this->list, 4);
			$token .= $this->list[$random[0]];
			$token .= $this->list[$random[1]];
			$token .= $this->list[$random[2]];
			$token .= $this->list[$random[3]];

			if ($separate) {
				$token .= $separate;
			}

			$loop += 1;
		}

		$random = $this->getRandomEntry($this->list, 4);
		$token .= $this->list[$random[0]];
		$token .= $this->list[$random[1]];
		$token .= $this->list[$random[2]];
		$token .= $this->list[$random[3]];

		return $token;
	}
}