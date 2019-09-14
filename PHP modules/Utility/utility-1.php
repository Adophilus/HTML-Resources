<?php

function jsonize ($data) {
	$json_data = json_encode($data);
	return $json_data;
}

function unjsonize ($json_data) {
	$array = json_decode($json_data, true);
	return $array;
}

function json_load ($path) {
	$file_data = file_get_contents($path);
	$array = json_decode($file_data, true);
	return $array;
}

function json_save ($path, $data) {
	$json_data = json_encode($data);
	file_put_contents($path, $json_data);
}

function load_json ($path) {
	json_load($path);
}

function save_json ($path, $data) {
	json_save($path, $data);
}

function send_false ($data = array('status' => false)) {
	$data["status"] = false;
	if (isset($data["data"]) && !isset($data["error"])) {
		$data["error"] = $data["data"];
	}

	echo (json_encode($data));

	die();
}

function send_true ($data = array('status' => true)) {
	$data["status"] = true;

	echo (json_encode($data));

	die();
}