<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends HomeAction {
    public function index(){
		$aCate = M('Cate')->order('sort asc')->select();
		$pNav = M('Nav');
		$return = array();
		foreach($aCate as $key => $val){
			$return[$key]['navs'] = $pNav->where(array('cate_id'=>$val['id']))->order('sort asc')->select();
			$return[$key]['cate_name'] = $val['name'];
			$return[$key]['cate_id'] = $val['id'];
		}
		$this->assign('nav',$return);
		$this->display();
    }
	
	//	添加分类
	public function add_cate(){
		$cate_name = I('post.name');
		if(empty($cate_name)){
			$this->_ajax_error('类名不能为空');
		}
		$id = M('Cate')->add(array('name'=>$cate_name));
		$this->_ajax_success('',$id);
	}
	
	//	编辑分类
	public function edit_cate(){
		$id = I('post.id');
		$del = I('post.del');
		$cate_name = I('post.name');
		if(!empty($del)){
			M('Cate')->where(array('id'=>$id))->delete();
		}else{
			M('Cate')->where(array('id'=>$id))->save(array('name'=>$cate_name));
		}
		$this->_ajax_success();
	}
	
	// 添加链接
	public function add_nav(){
		$data['name'] = I('post.name');
		$data['href'] = I('post.href');
		$data['cate_id'] = I('post.cate_id');
		
		if(empty($data['name']) || empty($data['href'])){
			$this->_ajax_error('连接名和链接必填');
		}
		if(strpos($data['href'],'http:') === false){
			$data['href'] = 'http://'.$data['href'];
		}
		if(substr($data['href'],-1,1,'UTF-8') != '/'){
			$data['href'] .= '/';
		}
		M('Nav')->add($data);
		$this->_ajax_success();
	}
	
	// 编辑链接
	public function edit_nav(){
		$id = I('post.id');
		$del = I('post.del');
		$data['name'] = I('post.name');
		$data['href'] = I('post.href');
		
		if(!empty($del)){
			M('Nav')->where(array('id'=>$id))->delete();
		}else{
			M('Nav')->where(array('id'=>$id))->save($data);
		}
		$this->_ajax_success();
	}
	
	// 处理排序，接收导航的二维数组
	public function order(){
		$new = array_filter($_POST['order_new']);
		$pCate = M('Cate');
		$pNav = M('Nav');
		$i = 0;
		foreach($new as $key => $val){
			$i++;$j = 0;
			$pCate->where(array('id'=>$key))->save(array('sort'=>$i));
			foreach($val as $key2 => $val2){
				$j++;
				$pNav->where(array('id'=>$val2))->save(array('sort'=>$j));
			}
		}
		$this->_ajax_success();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}