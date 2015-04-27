define(function(require, exports, module) {

	//var Zepto = require("zepto");

	// (function($){
	// 	$.extend($.fn, {
	// 		foo: function(str){
	// 			alert(str);
	// 		}
	// 	})
	// })(Zepto)


	var all = {};


	(function($){
		$.extend($.fn, {
			hiTab: function(dom){
				var tab_head = $(dom).children('.tab-heading'),
					tab_body = $(dom).children('.tab-body');

				tab_head.on('click', 'li', function() {
					tab_body.find('.'+$(this).attr('class')).addClass('block').siblings('li').removeClass('block');
					$(this).addClass('tablight').siblings('li').removeClass('tablight');
				});
			},
			iframe:function(i){
				var winW = window.document.body.offsetWidth,
					winH = window.document.body.offsetHeight;
				$('body').append('<div class="close-father ab" style="width:'+winW+'px;opacity:0.4;height:'+winH+'px;background:#000;"></div><div class="ab" style="background:#fff;box-shadow: 1px 1px 1px #ccc;width:'+winW/2.5+'px;height:'+winH/4+'px;z-index:99;left:50%;top:50%;margin:'+winH/6*(-1)+'px 0 0 '+winW/8*(-1)+'px;">'+i+'<p><a class="btn close-iframe btn-danger">关闭</a></p></div>')
			}
		})
	})(Zepto)
	// hiTab | $.fn.hiTab('#id')
	//elm | div#id > nav.tab-heading > ul > li.tab-inner
	//elm | div#id > nav.tab-body > ul > li.tab-inner


	$('body').on('click', '.close', function(event) {
		event.preventDefault();
		$(this).closest('div').remove();
		$('.close-father').remove();
	});




	all.textTips = {
		'mima0':'密码由字母,数字,下划线组成,长度为6-20',
		'mima1':'密码ok~',
		'youxiang0':'邮箱的格式，如：admin@idacker.com ',
		'youxiang1':'该邮箱可以抢注~ ',
		'dianhua0':'电话号格式：手机/座机/+86/010-',
		'dianhua1':'电话格式正确',
		'yonghuming0':'请以字母开头,可包含字符为:<br>数字 _ . <br>长度为:5-20',
		'yonghuming1':'该用户名可以抢注！',
		'0':'错误！请检查填写的信息',
		'1':'格式正确~',
	}

	all.authority = {
		0 : '已被注销',
		1 : '管理员',
		2 : '普通用户',
		3 : '订阅者',
		4 : '游客（禁言禁文）',
		5 : '被禁评论的用户',
		6 : '被禁发表文章的用户',
	}

	all.sex={
		0 : '女',
		1 : '男',
		2 : '未知',
	}
//有点傻的方法
	all.option = {
		1:'<select><option value="1">超级管理员</option><option value="2">普通用户</option><option value="7">邀请码</option></select>',
		2:'<select><option value="2">普通用户</option><option value="1">超级管理员</option><option value="7">邀请码</option></select>',
		7:'<select><option value="7">邀请码</option><option value="1">超级管理员</option><option value="2">普通用户</option></select>',
	}

	all.random = function(n){
		var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    	 var res = "";
	     for(var i = 0; i < n ; i ++) {
	         var id = Math.ceil(Math.random()*35);
	         res += chars[id];
	     }
	     return res;
	}

	all.alertFun = function(dom,text,pic){
		var resultHTML = text;
		all.inputBg(dom, pic);
		all.alertHtml('.form', 'info', resultHTML, '');
	}

	all.alertHtml = function(dom, info, title, message){

		$('.alert').remove();
		$(dom).append('<div class="alert '+info+'"><button type="button" class="close" data-dismiss="alert">×</button><strong>'+title+'</strong>'+message+'</div>');

		}

	all.inputBg = function(dom, pic){
		dom.css({
			backgroundImage: 'url(/images/'+pic+')',
			backgroundPosition: 'right',
			backgroundRepeat:'no-repeat'
		});
	}

	all.lookCom = function(d, str, callback){
		for (var i = 0; i < d.length; i++) {
		var name = d[i].name,//名称
			content = d[i].content,//介绍
			operate = d[i].operate,//运营情况
			financing = d[i].financing,//融资
			future = d[i].future,//未来发展
			general = d[i].general,//一般
			disinterest = d[i].disinterest,//没兴趣
			interest = d[i].interest,
			logo = d[i].logo,
			id = d[i]._id;//感兴趣
		str += '<li class="span4" id="'+id+'"><div data-id="com_'+i+'" class="thumbnail"><ul><li>公司名称：'+name+'</li><li >logo：<a href="'+logo+'" target="_blank"><img src="'+logo+'" height="90" /></a></li><li>介绍：'+content+'</li><li>运营情况：'+operate+'</li><li>融资情况：'+financing+'</li><li>未来发展：'+future+'</li><li>感兴趣的人（邀请码）：'+interest+'</li><li>没兴趣的人（邀请码）：'+disinterest+'</li><li>一般兴趣的人（邀请码）：'+general+'</li><li><a class="com_delete">删除</a> | <a class="com_update">修改</a></li></ul></div></li>';
		}

		callback(str)

	}

	all.lookUser =  function(d, str, callback){

		for (var i = 0; i < d.length; i++) {

			var yonghuming = d[i].name,
				mima = d[i].password,
				youxiang = d[i].email,
				dengji = d[i].type,
				id = d[i]._id;
				str += '<tr><td data-id="'+id+'">'+i+'</td><td><input value="'+yonghuming+'" /></td><td><input value="'+mima+'" /></td><td><input value="'+youxiang+'" /></td><td>'+all.option[dengji]+'</td><td><a class="btn btn-danger userdelete">删除</a> &nbsp; <a class="btn btn-info userupdate">修改了保存</a></td></tr>';
		}

		callback(str)

	}

	all.ajax = function(url, data, dom, callback, type){

		$.ajax({
			url: url,
			type: typeof(type)=='undefined'?'GET':'POST',
			dataType: 'jsonp',
			data: data,
			timeout: 3000,
	        jsonp : "callback",
	        jsonpCallback : "dataList",
			success : function (dataList){

				if (dataList.code==2000) {
					//all.alertHtml(dom, 'success', '', dataList.message);

					callback(dataList);
				}else if(dataList.code==3001){
					all.alertHtml('.form', 'danger', '该账号已经被注册了', '');
					all.inputBg(dom, 'close.gif');
				}else{
					all.alertHtml(dom, 'warning', dataList.code, dataList.message);
				}
			},
			error : function(){
					all.alertHtml(dom, 'danger', dataList.code, dataList.message);
			}
		})
	}




	module.exports = all;
})
