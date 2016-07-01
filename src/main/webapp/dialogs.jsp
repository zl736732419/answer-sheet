<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!--dialog页面-->
<!-- 题卡纸张选择框 -->
<div class="modal fade" id="settingDialog" tabindex="-1" role="dialog" data-backdrop="static"
     aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">基础设置</h4>
            </div>
            <div class="modal-body">
                <form id="settingForm" class="form-horizontal" action="">
                    <div class="form-group">
                        <label for="sheetType" class="col-sm-2 control-label">题卡类型</label>
                        <div class="col-sm-6">
                            <select id="sheetType" name="sheetType" class="selectpicker form-control">
                            	<option value="1">A3</option>
                            	<option value="2" selected="selected">A4</option>
                            </select>
                        </div>
                        <div class="a3Columns">
                        	<label>
                        		<input type="radio" name="a3Column" class="a3Column" value="3" checked>三栏
                        	</label>
                        	<label>
                        		<input type="radio" name="a3Column" class="a3Column" value="2">两栏
                        	</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="pageNum" class="col-sm-2 control-label">题卡页数</label>
                        <div class="col-sm-6">
                            <input type="text" id="pageNum" name="pageNum" class="form-control required" value="1" placeholder="请输入字号">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary okBtn">确定</button>
            </div>
        </div>
    </div>
</div>

<!--标题配置框-->
<div class="modal fade" id="titleDialog" tabindex="-1" role="dialog" data-backdrop="static"
     aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">标题配置</h4>
            </div>
            <div class="modal-body">
                <form id="titleForm" class="form-horizontal" action="">
                    <div class="form-group">
                        <label for="title" class="col-sm-2 control-label">标题内容</label>
                        <div class="col-sm-6">
                            <input id="title" name="title" type="text" class="form-control required" minlength="1"
                                   placeholder="请输入标题内容">
                        </div>
                        <span class="col-sm-4 errSpan">
                        </span>
                    </div>
                    <div class="form-group">
                        <label for="textSize" class="col-sm-2 control-label">字体大小</label>
                        <div class="col-sm-6">
                            <input type="number" id="textSize" name="textSize" class="form-control required" min="20"
                                   max="100" value="30" readonly="readonly" placeholder="请输入字号">
                        </div>
                        <span class="col-sm-4 errSpan">
                        </span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary okBtn">确定</button>
            </div>
        </div>
    </div>
</div>

<!--基本信息弹出框-->
<div class="modal fade" id="baseInfoDialog" tabindex="-1" role="dialog" data-backdrop="static"
     aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">考生信息配置</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-8">
                        	<div class="panel panel-default studentInfoArea">
							  <div class="panel-heading">基本信息</div>
							  <div class="panel-body">
							  	<div class="checkbox">
							  		<label>
	                                    <input type="checkbox" name="userName" value="userName"> 姓名
	                                </label>
	                                <label>
	                                    <input type="checkbox" name="school" value="school"> 学校
	                                </label>
	                                <label>
	                                    <input type="checkbox" name="clazzName" class='uncheck' value="clazzName"> 班级
	                                </label>
							  	</div>
							  </div>
							</div>
                        </div>
                        <div class="col-sm-4">
                        	<div class="panel panel-default fillingArea">
							  <div class="panel-heading">正误填涂</div>
							  <div class="panel-body">
							  	<div class="checkbox">
							  		<div class="checkbox">
		                                <label>
		                                    <input type="checkbox" name="wrongFilling" value="wrongFilling" readonly="readonly"> 正误填涂
		                                </label>
		                            </div>
							  	</div>
							  </div>
							</div>
                        </div>
                        <div class="col-sm-6">
                        	<div class="panel panel-default absentBreachArea">
							  <div class="panel-heading">缺考与违纪</div>
							  <div class="panel-body">
							  	<div class="checkbox">
							  		<div class="checkbox">
		                                <label>
		                                    <input type="checkbox" name="absentAndBreach" value="absentAndBreach" readonly="readonly"> 缺考与违纪
		                                </label>
		                            </div>
							  	</div>
							  </div>
							</div>
                        </div>
                        <div class="col-sm-3">
                        	<div class="panel panel-default subjectArea">
							  <div class="panel-heading">科目</div>
							  <div class="panel-body">
							  	<div class="checkbox">
							  		<div class="checkbox">
		                                <label>
		                                    <input type="checkbox" name="subject" value="subject"> 科目
		                                </label>
		                            </div>
							  	</div>
							  </div>
							</div>
                        </div>
                        <div class="col-sm-3">
                        	<div class="panel panel-default pageNumArea">
							  <div class="panel-heading">页码</div>
							  <div class="panel-body">
							  	<div class="checkbox">
							  		<div class="checkbox">
		                                <label>
		                                    <input type="checkbox" name="pageNum" value="pageNum"> 页码
		                                </label>
		                            </div>
							  	</div>
							  </div>
							</div>
                        </div>
                        <div class="col-sm-8">
                        	<div class="panel panel-default studentCodeArea">
							  <div class="panel-heading">考生标识</div>
							  <div class="panel-body">
							  	<div class="checkbox">
	                                <label>
	                                    <input type="radio" name="studentCode" class='uncheck' value="barCode"> 条形码区
	                                </label>
	                                <label>
	                                    <input type="radio" name="studentCode" class='uncheck' value="qr"> 二维码区
	                                </label>
	                                <div class="zkzhPanel">
	                               		<label>
		                                    <input type="radio" name="studentCode" value="zkzh"> 准考证号
		                                </label>
		                                <div class="zkzhCountPanel" style="display:inline-block;">
			                                <input type="text" class="form-control" style="width:40px;height:25px;display:inline-block;" name="zkzhCount" value="9">
			                                <span>位</span>
		                                </div>
	                                </div>
							  	</div>
							  </div>
							</div>
                        </div>
                        <div class="col-sm-4">
                        	<div class="panel panel-default attentionArea">
							  <div class="panel-heading">注意事项</div>
							  <div class="panel-body">
							  	<div class="checkbox">
							  		<div class="checkbox">
		                                <label>
		                                    <input type="checkbox" name="attentionNote" value="attentionNote">
		                                        <a class="attentionNoteBtn" href="javascript:void(0)"
		                                            data-toggle="tooltip" data-container="body"
		                                            data-placement="top" title="修改">注意事项</a>
		                                </label>
		                            </div>
							  	</div>
							  </div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary okBtn">确定</button>
            </div>
        </div>
    </div>
</div>

<!--修改注意事项-->
<div class="modal fade" id="updateAttentionNoteDialog" tabindex="-1" role="dialog" data-backdrop="static"
     aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" style="display:inline-block;">修改注意事项</h4>&emsp;<h6 style="display:inline-block;">(使用"|"表示换行符)</h6>
            </div>
            <div class="modal-body">
                <form id="attentionNoteForm" class="form-horizontal">
                    <div class="form-group" style="margin-bottom:0;">
                        <div class="col-sm-12">
                            <label for="attentionNote" class="control-label"></label>
                            <textarea id="attentionNote" name="attentionNote" class="attentionNote form-control" style="width:100%"
                                      rows="8"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary okBtn">确定</button>
            </div>
        </div>
    </div>
</div>