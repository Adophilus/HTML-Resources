<?php

class PrivateKeyGenerator
{
	function PrivateKeyGenerator () {
		$list = "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0";
		$this->list = explode(" ", $list);
	}

	function getRandomEntry ($arr, $number) {
		return array_rand($arr, $number);
	}

	function generate ($level = 1) {
		$loop = 0;
		$key = "";

		while ($loop < ($level - 1)) {
			$random = $this->getRandomEntry($this->list, 4);

			// print_r($random);
			$key .= $this->list[$random[0]];
			$key .= $this->list[$random[1]];
			$key .= $this->list[$random[2]];
			$key .= $this->list[$random[3]];

			$loop += 1;
		}

		$random = $this->getRandomEntry($this->list, 4);
		$key .= $this->list[$random[0]];
		$key .= $this->list[$random[1]];
		$key .= $this->list[$random[2]];
		$key .= $this->list[$random[3]];

		return $key;
	}
}

// $gen = new PrivateKeyGenerator();
// $key = $gen->generate($level = 8);

// echo($key);