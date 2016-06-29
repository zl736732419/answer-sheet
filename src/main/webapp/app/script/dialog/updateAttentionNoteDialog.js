/**
 * Created by zhenglian
 * Date: 2016/5/10 0010
 * Time: 上午 11:59
 */
(function($) {
    $.updateAttentionNoteDialog = {
        settings : {
            ui : '#updateAttentionNoteDialog',
            form : '#attentionNoteForm',
            attentionNote : '.attentionNote',
            btns : {
                ok : '.okBtn'
            },
            preDialog : null, //通过dialog内容事件触发弹出的该窗口
        },
        loadDialog : function(preDialog) {
            if(preDialog) {
                this.settings.preDialog = preDialog;
            }
            this.renderContent();
            this.initEvent();
            this.show();
        },
        /**
         * 渲染窗口中的内容
         */
        renderContent : function() {
            this.renderAttentionNote();
        },
        /**
         * 加载默认注意事项内容，settings.js
         */
        renderAttentionNote : function() {
            var attentionNote = $.settings.baseInfo.attentionNote;
            $(this.settings.attentionNote).val(attentionNote);
        },
        /**
         * 初始化窗口事件
         */
        initEvent : function() {
        	this.initValidation();
        	this.initClosenEvent();
            this.handleOkEvent();
        },
        /**
         * 初始化关闭事件，打开之前dialog
         */
        initClosenEvent: function() {
        	var dialog = this;
        	$(this.settings.ui).on('hidden.bs.modal', function() {
        		var preDialog = dialog.settings.preDialog;
                if(preDialog) {
                    preDialog.show();
                }
        	});
        },
        /**
         * 初始化验证
         */
        initValidation: function() {
        	$.uiwrapper.formValidator.validate(this.settings.form, {
        		'attentionNote': {
        			validators: {
        				notEmpty: {
        					message: '注意事项不能为空!'
        				}
        			}
        		}
        	});
        },
        
        /**
         * 处理确定按钮事件
         */
        handleOkEvent : function() {
            var dialog = this;
            $(this.settings.ui).find(this.settings.btns.ok).off('click').on('click', function() {
            	if($.uiwrapper.formValidator.isFormValid(dialog.settings.form)) {
            		dialog.updateAttentionNote();
            	}
            });
        },
        /**
         * 修改注意事项内容
         */
        updateAttentionNote : function() {
            var attentionNote = $(this.settings.attentionNote).val();
            $.settings.baseInfo.attentionNote = attentionNote;
            this.hide();
        },
        /**
         * 显示窗口
         */
        show : function() {
            var preDialog = this.settings.preDialog;
            if(preDialog) {
                preDialog.hide();
            }
            $(this.settings.ui).modal('show');
        },
        /**
         * 隐藏窗口
         */
        hide : function() {
            $(this.settings.ui).modal('hide');
        }
    }
})(jQuery);