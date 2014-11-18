// 头部事件
$(function(){
var delay = 60;		//划过延时时间
var timeout = 0;
	$("[name=word]").focus();
	// 全局input框，划过就定位焦点(不用点击)
	$("input[type=text]").mouseover(function(){
		$(this).focus();
	});
	
	// 全局初始化菜单可拖动
	$(".content .right ul").sortable({
		opacity: 0.6,
		revert: true,
		cursor: 'move',
		update:function(){
			// 排完序
			saveOrder();
		}
	});
	
	$(".abs_left").bind({
		'mousedown':function(){
			var t = $(this);
			t.stop(true,false).animate({'width':'30%','opacity':'0.8'},200);
		},
		'mouseenter':function(){
			$(this).stop(true,false).animate({'opacity':'0.3'},100);
		},
		'mouseleave':function(){
			$(this).stop(true,false).animate({'width':'5%','opacity':'0.1'},200);
		}
	});
	
	$(".abs_right").bind({
		'mousedown':function(){
			var t = $(this);
			t.stop(true,false).animate({'width':'30%','opacity':'0.8'},200);
		},
		'mouseenter':function(){
			$(this).stop(true,false).animate({'opacity':'0.3'},100);
		},
		'mouseleave':function(){
			$(this).stop(true,false).animate({'width':'5%','opacity':'0.1'},200);
		}
	});
	
	// 页面背景编辑
	$('.edit_page').click(function(){
		$('.edit_art').slideDown(200);
	});
	$('.edit_art .bg_tab .close').click(function(){
		$('.edit_art').slideUp(50);
	});
	
	// 选项卡切换事件
	$('.edit_art .bg_tab li').click(function(){
		var index = $(this).index();
		$(this).addClass('active').siblings('li').removeClass('active');
		$('.edit_art .bg_tab_content > div').css('display','none').eq(index).fadeIn(200);
	});
	
	
	// 添加分类
	$(".body > .center .content .menu_left > .click").click(function(){
		$.dialog.prompt('添加类别名称:&emsp;&emsp;<b class="error_tips"></b>',function(val){
			var name = val;
			var t = this;
			if(!name){
				$('.error_tips').html('你还没填~~死傲娇！');
				return false;
			}
			$.post(__GROUP+'/index/add_cate',{name:name},function(msg){
				if(msg.status == 1){
					// 动态追加dom到主页
					$('.body > .center .content').append('<div class="contents"><div class="left" title="添加导航" cate_id="'+msg.data+'"><b>'+name+'</b></div><div class="right"><ul></ul></div></div>');
					t.close();
				}else{
					$('.error_tips').html(msg.info);
				}
			});
			return false;
		}).title('添加');
	});
	
	// 添加导航
	$('.content').on('click','.left',function(){
		var $t = $(this);
		if($t.hasClass('disabled')) return false;
		my_alert('链接名：<input type="text" name="name" size="40" value="" /><br /><br />超链接：<input type="text" size="40" name="href" value="" /><br /><b class="error_tips"></b>','添加',function(){
			var cate_id = $t.attr('cate_id');
			var name = $("[name=name]").val();
			var href = $("[name=href]").val();
			name ? '' : $('.error_tips').html('不能为空啊！说多少次了！！');
			var t = this;
			$.post(__GROUP+'/index/add_nav',{cate_id:cate_id,name:name,href:href},function(msg){
				if(msg.status == 1){
					if(href.indexOf('http:') !== 0){
						href = 'http://'+href;
					}
					$t.closest('.contents').find('.right > ul').append('<li><a target="_blank" title="'+name+'" href="'+href+'">'+name+'</a></li>');
					t.close();
				}else{
					$('.error_tips').html(msg.info);
				}
			});
			return false;
		},null,function(){$("[name=name]").focus();});
		return false;
	});
	
	//修改导航
	$(".body > .center .content .menu_right .order_mode").click(function(){
		var order_old = [];
		$(".content .left").each(function(index,t){
			var cate_id = $(this).attr('cate_id');
			order_old[cate_id] = [];		// 类别id数组
			var $t = $(this);
			$t.siblings('.right').find('li').each(function(index2,t2){
				var $tli = $(this);
				
				$tli.addClass('placeholder');
				var temp = $tli.find('a').prop('href');
				$tli.find('a').attr({'temp_href':temp}).removeAttr('target href').css('cursor','default');
				
				order_old[cate_id].push($tli.attr('nav_id'));
			});
		});
		var $list = $(".content .right ul");
		$list.sortable({
			opacity: 0.6,
			revert: true,
			cursor: 'move',
			update:function(){
				// 排完序
				saveOrder();
			}
		});
		$(this).css('display','none').siblings('.save_order').css('display','block');
	});
	// 保存排序
	$(".body > .center .content .menu_right .save_order").click(function(){
		var order_new = [];
		$('.content .left').each(function(i){
			var cate_id = $(this).attr('cate_id');
			var $t = $(this);
			var arr = [];
			$t.siblings('.right').find('li').each(function(j){
				var $tli = $(this);
				order_new[cate_id] = [];
				$tli.removeClass('placeholder');
				var temp = $tli.find('a').attr('temp_href');
				$tli.find('a').attr({'href':temp,'target':'_blank'}).removeAttr('temp_href').css('cursor','pointer');;
				arr.push($tli.attr('nav_id'));
				
			});
			order_new[cate_id] = arr;
		});
		$.post(__GROUP+'/index/order',{order_new:order_new},function(msg){
			
		});
		$(this).css('display','none').siblings('.order_mode').css('display','block');
	});
	
	
	// 鼠标按住及时修改
var is_ok = false;
	$(".content .right li").bind({
		'mousedown':function(){
			var $t = $(this);
			is_ok = false;
			timeout = setTimeout(function(){
				var width = $t.width();
				var height = $t.height();
				$t.removeClass('disabled');
				
				// 保存修改的方法
				var edit_nav = function(){
					if($t.hasClass('disabled')) return false;
					var name = $t.children('a').prop('title');
					var href = $t.children('a').prop('href');
					var id = $t.attr('nav_id');
					var cate_id = $t.closest('.contents').find('.left').attr('cate_id');
					my_alert('<b>如果其中一项为空，则表示删除</b><br /><br />链接名：<input type="text" name="name" size="40" value="'+name+'" /><br /><br />超链接：<input type="text" name="href" size="40" value="'+href+'" /><br /><b class="error_tips"></b>','编辑',function(){
						var t = this;
						var name = $("[name=name]").val();
						var href = $("[name=href]").val();
						//如果任意一个为空，就表示删掉
						if(!name || !href){
							var del = 1;
						}
						$.post(__GROUP+'/index/edit_nav',{id:id,cate_id:cate_id,name:name,href:href,del:del},function(msg){
							t.close();
							if(msg.status == 1){
								if(del == 1){
									$t.remove();
								}else{
									$t.children('a').prop({title:name,href:href}).text(name);
									$t.children('s').remove();
								}
							}else{
								tips(msg.info);
							}
						});
						return false;
					},function(){$t.children('s').remove();},function(){$("[name=name]").focus();});
				};
				$t.css({'position':'relative','overflow':'hidden'}).append('<s style="position:absolute;display:block;height:'+height+'px;width:'+width+'px;top:0;left:-'+width+'px;background-color:#3385FF;opacity:0.4;"></s>').children('s').stop(true,false).animate({left:0},600,function(){is_ok = true;edit_nav();});
			},200);
		},
		'mouseup':function(){
			is_ok = false;
			var $t = $(this);
			var width = $t.width();
			$t.children('s').stop(true,false).animate({'left':'-'+width+'px'},100,function(){$(this).remove();});
			clearTimeout(timeout);
		},
		'mouseover':function(){
			is_ok = false;
			var $t = $(this);
			$t.children('s').remove();
		},
		'mousemove':function(){
			is_ok = false;
			var $t = $(this);
			$t.addClass('disabled').children('s').remove();
			clearTimeout(timeout);
		}
	});
	
// 修改类名
	$(".content .left").bind({
		'mousedown':function(){
			var $t = $(this);
			is_ok = false;
			timeout = setTimeout(function(){
				var width = $t.width();
				var height = $t.height();
				
				// 保存修改的方法
				var edit_nav = function(){
					var name = $t.addClass('disabled').children('b').text();
					var id = $t.attr('cate_id');
					var cate_id = $t.closest('.contents').find('.left').attr('cate_id');
					$.dialog.prompt('如果其中一项为空，则表示删除',function(val){
						var t = this;
						//如果任意一个为空，就表示删掉
						if(!val){
							var del = 1;
						}
						$.post(__GROUP+'/index/edit_cate',{id:id,name:val,del:del},function(msg){
							t.close();
							$t.removeClass('disabled');
							if(msg.status == 1){
								if(del == 1){
									$t.closest('.contents').find('.right').remove();
									$t.remove();
								}else{
									$t.children('b').text(val);
									$t.children('s').remove();
								}
							}else{
								tips(msg.info);
							}
						});
						return false;
					},name,null,function(){$t.removeClass('disabled').children('s').remove();}).title('编辑');
				};
				$t.css({'position':'relative','overflow':'hidden'}).append('<s style="position:absolute;display:block;height:'+height+'px;width:'+width+'px;top:0;left:-'+width+'px;background-color:#3385FF;opacity:0.4;"></s>').children('s').stop(true,false).animate({left:0},600,function(){is_ok = true;edit_nav();});
			},200);
		},
		'mouseup':function(){
			is_ok = false;
			var $t = $(this);
			var width = $t.width();
			$t.children('s').stop(true,false).animate({'left':'-'+width+'px'},100,function(){$(this).remove();});
			clearTimeout(timeout);
			return false;
		},
		'mouseover':function(){
			is_ok = false;
			var $t = $(this);
			$t.children('s').remove();
		},
		'mousemove':function(){
			clearTimeout(timeout);
		}
	});
});


// 排序保存回调方法
function saveOrder(){
	var order_new = [];
	$('.content .left').each(function(i){
		var cate_id = $(this).attr('cate_id');
		var $t = $(this);
		var arr = [];
		$t.siblings('.right').find('li').each(function(j){
			var $tli = $(this);
			order_new[cate_id] = [];
			arr.push($tli.attr('nav_id'));
			
		});
		order_new[cate_id] = arr;
	});
	$.post(__GROUP+'/index/order',{order_new:order_new},function(msg){
		if(msg.status != 1){
			tips(msg.info);
		}
	});
}

// ajax 上传背景
function ajaxFileUpload(selector){
	$t = $(selector);
	var name = $t.prop('name');
	var prefix = $t.attr('prefix');
	$.ajaxFileUpload
	(
		{
			url:__GROUP+'/set/upload_bg',
			secureuri:false,
			fileElementId:'[name='+name+']',
			dataType: 'json',
			data:{prefix:prefix},
			type:'post',
			success: function (msg, status)
			{
				if(msg.status == 1){
					switch(prefix){
						case 'content_bg': $('body').css('background-image','url('+msg.data+')');break;
						case 'content_bg_left': $('.body .abs_left').css('background-image','url('+msg.data+')');break;
						case 'content_bg_right': $('.body .abs_right').css('background-image','url('+msg.data+')');break;
					}
					$('[name='+name+']').closest('.now_bg').find('img').prop('src',msg.data);
				}else{
					tips(msg.info);
				}
			},
			error: function (data, status, e)
			{
				tips(msg.info);
			}
		}
	)
	
	return false;

}


//自定义弹窗
var my_alert = function(content,title,ok_function,cancal_function,init_function){
	if(ok_function){
		var ok = eval(ok_function);
	}
	if(cancal_function){
		var cancal = eval(cancal_function);
	}
	if(init_function){
		var init = eval(init_function);
	}
	$.dialog({
		title:title ? title : '提示',
		skin:'blue',
		content: content,
		padding:'20px',
		min:false,
		max:false,
		lock:true,
		fixed:true,
		esc:true,
		cancelVal: '关闭',
		cancel:cancal,
		ok:ok,
		init:init
	});
	return false;
}

// 提示小窗
var tips = function(val){
	$.dialog.tips(val);
}