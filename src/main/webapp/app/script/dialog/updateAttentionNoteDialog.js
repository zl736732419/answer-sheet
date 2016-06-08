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
            attentionCount : '.attentionCount',
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
            this.updateAttentionCount();
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
            this.handleCountWordNumberEvent();
            this.handleOkEvent();
        },
        /**
         * 处理统计字数
         */
        handleCountWordNumberEvent : function() {
            var dialog = this;
            $(this.settings.attentionNote).off('keyup').on('keyup', function() {
                dialog.updateAttentionCount();
            });
        },
        /**
         * 更新文本框字数提示信息
         */
        updateAttentionCount : function() {
            var dialog = this;
            var count = $(dialog.settings.attentionNote).val().length;
            $(dialog.settings.attentionCount).text(count);
        },
        /**
         * 处理表单验证
         * @returns {*}
         */
        handleValidate : function() {
            var dialog = this;
            return $(dialog.settings.ui).find(dialog.settings.form).validate({
                errorPlacement: function(error, element) {
                    $(element).parents('.form-group').find('span.errSpan').text($(error)[0].innerHTML);
                    $(element).parents('.form-group').addClass('has-error');
                },
                success : function(labels) {
                    $(labels[0].control).parents('.form-group').removeClass('has-error');
                }
            }).form();
        },
        /**
         * 处理确定按钮事件
         */
        handleOkEvent : function() {
            var dialog = this;
            $(this.settings.ui).find(this.settings.btns.ok).off('click').on('click', function() {
                var valid = dialog.handleValidate();
                if(valid) {
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
            var preDialog = this.settings.preDialog;
            if(preDialog) {
                preDialog.show();
            }
        }
    }
})(jQuery);