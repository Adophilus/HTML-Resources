<?php

class XMLParser
{
	function XMLParser ($data = array("quick-append" => true, "encoding" => "utf-8", "version" => "1.0")) {
		
		$this->auto_save = false;
		$this->overwrite_duplicate = true;
		$this->quick_append = true;

		if (array_key_exists("auto-save", $data)) {
			$this->auto_save = $data["auto-save"];
		}

		if (array_key_exists("auto-save", $data)) {
			$this->quick_append = $data["quick-append"];
		}

		$this->dom = new DOMDocument($data["version"], $data["encoding"]);

		if (array_key_exists("file", $data)) {

			$this->save_name = $data["file"];

			if (array_key_exists("create", $data)) {

				if (is_file($data["file"])) {

					if (!array_key_exists("overwrite", $data)) $this->ret_false(array("error" => "XML document already exists"));
				
					if ($data["overwrite"]) {

						$this->overwrite_duplicate = true;
					}
				}
			}

			if (array_key_exists("open", $data)) {
				if ($data["open"]) {
					$this->dom->loadXml($data["file"]);
				}
			}
		}
	}

	function appendChild ($elem) {
		$this->dom->appendChild($elem);
	}

	function innerHTML ($elem, $value) {
		$elem->appendChild($this->dom->createTextNode($value));
	}

	function createElement ($elem, $attrs = array(), $parentNode = null) {
		$elem = $this->dom->createElement($elem);

		foreach ($attrs as $attr_key => $attr_val) {
			if ($attr_key !== "innerHTML") {
				$elem->setAttributeNode(new DOMAttr($attr_key, $attr_val));
			}
		}

		if (isset($attrs["innerHTML"])) {
			$this->innerHTML($elem, $attrs["innerHTML"]);
		}

		if ($parentNode) {
			$parentNode->appendChild($elem);
		}

		return $elem;
	}

	function rootElement ($elem, $attrs = array()) {
		$elem = $this->createElement($elem, $attrs);
		$this->innerHTML($elem, null);

		$this->appendChild($elem);
		$this->root = $elem;
		
		return $elem;
	}

	function removeElement ($elem) {
		$parentNode = $elem->parentNode;

		$parentNode->removeChild($elem);

		return $parentNode;
	}

	function removeChild ($elem, $child) {
		$parentNode = $elem->elem;

		$parentNode->removeChild($child);

		return $parentNode;
	}

	function deleteElement ($elem) {
		return $this->removeElement($elem);
	}

	function deleteChild ($elem, $child) {
		return $this->removeChild($elem, $child);
	}

	function save () {
		$this->dom->save($this->save_name);
	}

	function ret_false ($retval = array()) {
		if (!array_key_exists("error", $retval)) {
			$retval["error"] = "Sorry, an error occurred!";
		}

		return $retval;
	}

	function ret_true ($retval = array()) {
		if (!array_key_exists("data", $retval)) {
			$retval["data"] = "The operation completed successfully!";
		}

		return $retval;
	}
}