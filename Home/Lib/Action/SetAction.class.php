<?php
/**
*	网站设置
*/
class SetAction extends HomeAction {
	
	// 上传背景
	public function upload_bg(){
		$key = trim(I('request.prefix'));
		$filename = $this->upload_bg_file();
		if(empty($filename)){
			echo '{"info":"失败","data":"","status":0}';
		}else{
			D('Set')->where(array('key'=>$key))->save(array('value'=>$filename));
			echo '{"info":"失败","data":"'.$filename.'","status":1}';
		}
	}
	
	
}