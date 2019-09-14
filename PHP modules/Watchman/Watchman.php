<?php

class Watchman
{
	function Watchman () {
		$this->visitors_file = "./visitors.json";
		$this->general_visitors_file = $_SERVER["DOCUMENT_ROOT"] . "/visitors.json";
	}

	function record_visitor () {
		
	}
}