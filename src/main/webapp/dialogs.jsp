<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!--dialog页面-->
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
                                   max="100" value="30" placeholder="请输入字号">
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
                        <div class="col-sm-12">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="userName" value="userName"> 姓名
                                </label>
                                <label>
                                    <input type="checkbox" name="className" class='uncheck' value="className"> 班级
                                </label>
                                <label>
                                    <input type="checkbox" name="filling" value="filling"> 正误填涂
                                </label>
                                <label>
                                    <input type="checkbox" name="absent" value="absent"> 缺考标记
                                </label>
                                <label>
                                    <input type="checkbox" name="sheetType" class='uncheck' value="sheetType"> 试卷类型
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="subject" class='uncheck' value="subject"> 科目
                                </label>
                                <label>
                                    <input type="checkbox" name="barCode" class='uncheck' value="barCode"> 条形码区
                                </label>
                                <label>
                                    <input type="checkbox" name="seatNo" class='uncheck' value="seatNo"> 座位号
                                </label>
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
                <h4 class="modal-title">修改注意事项</h4>
            </div>
            <div class="modal-body">
                <form id="attentionNoteForm" class="form-horizontal">
                    <div class="form-group" style="margin-bottom:0;">
                        <div class="col-sm-12">
                            <label for="attentionNote" class="control-label"></label>
                            <textarea id="attentionNote" class="attentionNote form-control required" maxlength="100" style="width:100%"
                                      rows="8"></textarea>
                        </div>
                        <div class="col-sm-12" style="margin-top:5px;">
                            <span class="pull-right">当前<span class="label label-info attentionCount">0</span>/
                                <span class="label label-success">100</span>字</span>
                            <span class="col-sm-4 errSpan pull-left">
                            </span>
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