<?php
function unique_pre(){
	$str = uniqid();
	return $_REQUEST['prefix'].'_'.$str;
}

function format_set($aSet){
	$return = array();
	foreach($aSet as $key => $val){
		$return[$val['key']] = $val['value'];
	}
	$return['content_bg_thumb'] = get_thumb($return['content_bg']);
	$return['content_bg_left_thumb'] = get_thumb($return['content_bg_left']);
	$return['content_bg_right_thumb'] = get_thumb($return['content_bg_right']);
	return $return;
}

function get_thumb($path_name){
	$temp = $path_name;
	$aTemp = explode('/',$temp);
	$filename = array_pop($aTemp);
	$filepath = implode('/',$aTemp);
	$filename = $filepath.'/thumb_'.$filename;
	return $filename;
}