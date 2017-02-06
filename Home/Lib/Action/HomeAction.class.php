<?php
class HomeAction extends Action {
	
	public function _initialize(){
		define('__PUBLIC__',__ROOT__.'/Public');
		define('__UPLOAD__',FILE_DIR.'/Public');
		
		$set = D('Set')->select();
		$return = format_set($set);
		$this->assign('g_set',$return);
	}
	
	public function _ajax_success($info='成功',$data=null){
		$this->ajaxReturn($data,$info,1);
	}
	public function _ajax_error($info='失败',$data=null){
		
		$this->ajaxReturn($data,$info,0);
	}
	
	public function upload_bg_file(){
		import('ORG.Net.UploadFile');
		$upload = new UploadFile();										// 实例化上传类
		$upload->maxSize  = 30720000;									// 设置附件上传大小30M
		$upload->allowExts  = array('gif','jpg','jpeg','bmp','png');		// 设置附件上传类型
		$upload->savePath = '.'.__PUBLIC__.'/bg_images/';					// 设置附件上传目录
		$upload->saveRule = 'unique_pre';									// 文件名加前缀
		
		$upload->thumb = true;											// 开启缩略图
		$upload->thumbMaxHeight = 200;
		$upload->thumbMaxWidth = 200;
		$upload->thumbPath = '.'.__PUBLIC__.'/bg_images/';
		$upload->thumbType = 1;
		if(!$upload->upload()) {
			return false;  
		}else{
			// 上传成功
			$info =  $upload->getUploadFileInfo();
			$pic = $upload->savePath;
			$pic .= $info[0]['savename'];
			return $pic;
		}
	}
}