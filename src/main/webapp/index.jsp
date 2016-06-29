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
<%@ include file="loadCss.jsp" %>
<title>题卡设计界面</title>
</head>
<body>
	<%@include file="headerBar.jsp" %>
	
	<!--答题卡内容面板-->
	<div class="answerSheetPanel as-nicescroll">
		<!--定义试卷内容-->
		<!--
		<svg class="answerSheetSvg" xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink" width="500" height="300">
		</svg>
		-->
	</div>
	<!--答题卡内容面板 end-->

	<!-- 配置dialog -->
	<%@ include file="dialogs.jsp" %>
</body>

<%@ include file="loadJs.jsp" %>
</html>