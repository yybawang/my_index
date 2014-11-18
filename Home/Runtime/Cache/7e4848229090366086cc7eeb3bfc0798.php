<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><?php $aTitle = C('TITLE');echo $aTitle[strtolower(ACTION_NAME)]; ?></title>
<meta charset="utf-8" />
<script type="text/javascript" src="__PUBLIC__/public/jquery/jquery-1.11.0.js"></script>
<script type="text/javascript" src="__PUBLIC__/public/jquery/ajaxfileupload.js"></script>
<script type="text/javascript" src="__PUBLIC__/public/jquery/lhgdialog.js"></script>
<script type="text/javascript" src="__PUBLIC__/public/jquery/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="__PUBLIC__/public/jquery/idrag.js"></script>
<script type="text/javascript" src="<?php echo (__ROOT__); echo (substr(THEME_PATH,1)); ?>public/js/index.js"></script>
<link rel="stylesheet" type="text/css" href="<?php echo (__ROOT__); echo (substr(THEME_PATH,1)); ?>public/css/index.css" />

</head>
<body style="background-image:url(<?php echo ($g_set["content_bg"]); ?>)">
<div class="body">
	<div class="abs_top">
		<!-- 上方的百度，左上角、右上角的划过 -->
		<ul>
		<li class="left"><!-- 左 --></li>
		<li class="center">
			<div class="search">
			<form target="_blank" action="http://www.baidu.com/baidu">
				<input type="text" name="word" value="" autocomplete="off" baiduSug="1" />
				<input type="submit" value="百度一下">
				<input name="tn" type="hidden" value="baidu" />
			</form>
			</div>
		</li>
		<li class="edit_page right"><span>背景编辑</span></li>
		</ul>
	</div>
	<div class="abs_left" style="background-image:url(<?php echo ($g_set["content_bg_left"]); ?>)">
		<ul><li class="hold"></li></ul>
	</div>
	<div class="abs_right" style="background-image:url(<?php echo ($g_set["content_bg_right"]); ?>)">
		<ul><li class="hold"></li></ul>
	</div>

	
	
	
	
	
	
	
	
	
	
	
	
<script>
__GROUP = "__GROUP__";
__PUBLIC = "__PUBLIC__/public";
</script>

<div class="center">
<!-- 最大的中间 -->
<div class="content">
	<!-- 弹出菜单,用于增加分类等... -->
	<div class="menu_left" title="添加分类">
		<div class="click"><!-- 点击图标 --><span></span></div>
	</div>
	<div class="menu_right" title="排序模式">
		<div class="order_mode"><span>排序模式</span></div>
		<div class="save_order"><span>保存退出</span></div>
	</div>
	<?php if(is_array($nav)): $i = 0; $__LIST__ = $nav;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$D): $mod = ($i % 2 );++$i;?><div class="contents">
		<div class="left" cate_id="<?php echo ($D["cate_id"]); ?>" title="添加导航"><b><?php echo ($D["cate_name"]); ?></b></div>
		<div class="right">
			<ul>
				<?php if(is_array($D["navs"])): $i = 0; $__LIST__ = $D["navs"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$D2): $mod = ($i % 2 );++$i;?><li nav_id="<?php echo ($D2["id"]); ?>"><a style="background-image:url(<?php echo ($D2["href"]); ?>favicon.ico)" class="navs" target="_blank" title="<?php echo ($D2["name"]); ?>" href="<?php echo ($D2["href"]); ?>"><?php echo ($D2["name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
			</ul>
		</div>
	</div><?php endforeach; endif; else: echo "" ;endif; ?>
<!-- 待做........
1、导航左浮动样式有问题
2、导航上按住鼠标先弹出编辑，删除链接名或链接就删除。 -->
</div>
</div>
</div>		<!-- .body 结束 -->
<script>

</script>

<div class="edit_art none">
	<div class="art_content">
		<div class="bg_tab"><ul><li class="active">页面背景</li><li>左侧背景</li><li>右侧背景</li><a class="close" href="javascript:;">收起</a></ul></div>
		<div class="bg_tab_content">
			<div class="bg body_bg_image"><ul><li class="now_bg"><img src='<?php if(empty($g_set["content_bg_thumb"])): ?>__PUBLIC__/public/images/no_bg.jpg<?php else: echo ($g_set["content_bg_thumb"]); endif; ?>' /><p>
				<input id="fileUpload" name="body_bg_image" prefix="content_bg" class="upload_bg" type="file" onchange="ajaxFileUpload(this);" style="width:130px;" />
			</p></li><!-- <li><p>历史---先不做</p></li> --></ul></div>
			<div class="bg left_bg_image none"><ul><li class="now_bg"><img src='<?php if(empty($g_set["content_bg_left_thumb"])): ?>__PUBLIC__/public/images/no_bg.jpg<?php else: echo ($g_set["content_bg_left_thumb"]); endif; ?>' /><p>
				<input id="fileUpload" name="left_bg_image" prefix="content_bg_left" class="upload_bg" type="file" onchange="ajaxFileUpload(this);" style="width:130px;" />
			</p></li></ul></div>
			<div class="bg right_bg_image none"><ul><li class="now_bg"><img src='<?php if(empty($g_set["content_bg_right_thumb"])): ?>__PUBLIC__/public/images/no_bg.jpg<?php else: echo ($g_set["content_bg_right_thumb"]); endif; ?>' /><p>
				<input id="fileUpload" name="right_bg_image" prefix="content_bg_right" class="upload_bg" type="file" onchange="ajaxFileUpload(this);" style="width:130px;" />
			</p></li></ul></div>
		</div>
	</div>
</div>
<script>

</script>
<script charset="gbk" src="http://www.baidu.com/js/opensug.js"></script>
</body>
</html>