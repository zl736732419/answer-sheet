<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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