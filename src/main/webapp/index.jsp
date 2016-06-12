<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- css link-->

<meta charset="UTF-8">
<title>语文答题卡制作页面</title>
<!--bootstrap-->
<link rel="stylesheet" type="text/css"
	href="app/bower_components/bootstrap/dist/css/bootstrap.css">
<!--iCheck blue skin-->
<link rel="stylesheet" type="text/css"
	href="app/bower_components/iCheck/skins/square/blue.css">
<!--toastr-->
<link rel="stylesheet" type="text/css"
	href="app/bower_components/toastr/toastr.css">
<!--jquery smartmenu-->
<link rel="stylesheet" type="text/css"
	href="app/lib/jquery.smartMenu/css/smartMenu.css">

<!--自定义样式-->
<link rel="stylesheet" type="text/css" href="app/css/common.css">
<link rel="stylesheet" type="text/css" href="app/css/header.css">
<link rel="stylesheet" type="text/css" href="app/css/answerSheet.css">
<link rel="stylesheet" type="text/css" href="app/css/elementSelect.css">
<link rel="stylesheet" type="text/css" href="app/css/elementResize.css">
<!-- css link end -->
<title>题卡设计界面</title>
</head>
<body>
	<!--顶部工具栏-->
	<div class="headerPanel">
		<div class="headerLogo pull-left">
			<a href="javascript:void(0)"> <img
				src="app/images/header-logo.png"> <span class="logoLabel">语文试卷答题卡制作</span>
			</a>
		</div>
		<ul class="headerList">
			<li class="headerItem" dialog="titleDialog"><a
				href="javascript:void(0)"> <img src="app/images/header_title.png" />
					<span class="answerLabel">题卡标题</span>
			</a></li>
			<li class="headerItem" dialog="baseInfoDialog"><a
				href="javascript:void(0)"> <img
					src="app/images/header_baseinfo.png" /> <span class="answerLabel">基本信息</span>
			</a></li>
			<li class="headerItem"><a href="javascript:void(0)"> <img
					src="app/images/header_choicequestion.png" /> <span
					class="answerLabel">选择题</span>
			</a></li>
			<li class="headerItem"><a href="javascript:void(0)"> <img
					src="app/images/header_sentencequestion.png" /> <span
					class="answerLabel">填空题</span>
			</a></li>
			<li class="headerItem"><a href="javascript:void(0)"> <img
					src="app/images/header_composition.png" /> <span
					class="answerLabel">作文</span>
			</a></li>
		</ul>
		<div class="operatorPanel pull-right">
			<button class="btn btn-success btn-lg previewBtn">预览</button>
		</div>
	</div>
	<!--顶部工具栏 end-->

	<!--答题卡内容面板-->
	<div class="answerSheetPanel">
		<!--定义试卷内容-->
		<svg class="answerSheetSvg" xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink" width="500" height="300">
		</svg>
	</div>
	<div class="bottom"
		style="height: 100px; background-color: transparent;"></div>
	<!--答题卡内容面板 end-->

	<!-- 配置dialog -->
	<%@include file="dialogs.jsp"%>
</body>

<!--jquery-->
<script type="text/javascript"
	src="app/bower_components/jquery/dist/jquery.js"></script>
<!--jquery validation-->
<script type="text/javascript"
	src="app/bower_components/jquery-validation/dist/jquery.validate.js"></script>
<script type="text/javascript"
	src="app/bower_components/jquery-validation/src/localization/messages_zh.js"></script>
<!--bootstrap-->
<script type="text/javascript"
	src="app/bower_components/bootstrap/dist/js/bootstrap.js"></script>
<!--iCheck-->
<script type="text/javascript"
	src="app/bower_components/iCheck/icheck.js"></script>
<!--lodash-->
<script type="text/javascript"
	src="app/bower_components/lodash/dist/lodash.js"></script>
<!--toastr-->
<script type="text/javascript"
	src="app/bower_components/toastr/toastr.js"></script>
<!--jquery smartMenu-->
<script type="text/javascript"
	src="app/lib/jquery.smartMenu/js/jquery-smartMenu.js"></script>


<!--加载配置参数-->
<!--A4纸张答题卡配置参数-->
<script type="text/javascript" src="app/script/config/settings.js"></script>
<script type="text/javascript"
	src="app/script/config/defaultSetting-a4.js"></script>

<!--自定义js库-->
<script type="text/javascript" src="app/script/utils/uiBuilder.js"></script>
<script type="text/javascript" src="app/script/utils/utils.js"></script>
<script type="text/javascript" src="app/script/answerSheet.js"></script>
<script type="text/javascript" src="app/script/headerEvent.js"></script>
<!--加载元素控件-->
<script type="text/javascript" src="app/script/elements/titleElement.js"></script>
<script type="text/javascript" src="app/script/elements/baseInfoElement.js"></script>

<!--加载元素编辑控件-->
<script type="text/javascript" src="app/script/components/elementSelect.js"></script>
<script type="text/javascript" src="app/script/components/elementDrag.js"></script>
<script type="text/javascript" src="app/script/components/elementResize.js"></script>
<script type="text/javascript" src="app/script/components/elementContextMenu.js"></script>

<!--加载元素控件创建弹出框-->
<script type="text/javascript" src="app/script/dialog/titleDialog.js"></script>
<script type="text/javascript" src="app/script/dialog/baseInfoDialog.js"></script>
<script type="text/javascript" src="app/script/dialog/updateAttentionNoteDialog.js"></script>

<script type="text/javascript">
	$(function() {
		//初始化toastr
		if (typeof toastr != "undefined") {
			toastr.options = {
				"closeButton" : true, //是否显示关闭按钮
				"positionClass" : "toast-top-center",//弹出窗的位置
				"timeOut" : "2000", //展现时间
			};
		}

		var defaultSetting = null;
		var svg = null;
		//var title = '2016年南山区9年级下学期期末语文答题卡';
		$.answerSheet.loadAnswerSheet(defaultSetting, svg);
		$.headerEvent.loadHeaderToolbar();
	});
</script>

</html>