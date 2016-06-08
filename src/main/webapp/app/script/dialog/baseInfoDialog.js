/**
 * 答题卡考生信息组件
 *
 * Created by zhenglian
 * Date: 2016/5/10 0010
 * Time: 上午 10:58
 */
(function($) {
    $.baseInfoDialog = {
        settings : {
            ui : '#baseInfoDialog',
            userName : 'input[name=userName]',
            className : 'input[name=className]',
            zkzh : 'input[name=zkzh]',
            filling : 'input[name=filling]',
            absent : 'input[name=absent]',
            attentionNote : 'input[name=attentionNote]',
            element : null,
            btns : {
                attentionNoteBtn : '.attentionNoteBtn',
                ok : '.okBtn'
            }
        },
        /**
         * 加载窗口
         * @param element
         */
        loadDialog : function(element) {
            if(element) {
                this.settings.element = element;
            }
            this.renderContent();
            this.initEvent();
            this.show();
        },
        /**
         * 渲染页面初始状态
         */
        renderContent : function() {
            this.initCheckRadio();
            //TODO add other ...
        },

        initCheckRadio : function() {
            $(this.settings.ui).find('input').not(this.settings.className).iCheck('check');
        },
        initEvent : function() {
            this.handleOkEvent();
            this.handleUpdateAttentionNote();
        },
        /**
         * 处理确定按钮事件
         */
        handleOkEvent : function() {
            var dialog = this;
            $(this.settings.ui).find(this.settings.btns.ok).off('click').on('click', function() {
                var attentions = [];
                $(dialog.settings.ui).find('input[type=checkbox]:checked').each(function(index, item) {
                    attentions.push($(item).val());
                });
                if(attentions.length == 0) {
                    toastr.warning('创建考生信息必须选择事项!');
                    return;
                }
                if(dialog.settings.element) {
                    //编辑操作
                    //TODO
                }else {
                    $.baseInfoElement.newInstance().loadElement(attentions);
                }
                dialog.hide();
            });
        },
        /**
         * 更新注意事项
         */
        handleUpdateAttentionNote : function() {
            var dialog = this;
            $(this.settings.ui).find(this.settings.btns.attentionNoteBtn).off('click').on('click', function() {
                $.updateAttentionNoteDialog.loadDialog(dialog);
            });
        },
        /**
         * 显示窗口
         */
        show : function() {
            $(this.settings.ui).modal('show');
        },
        /**
         * 隐藏窗口
         */
        hide : function() {
            $(this.settings.ui).modal('hide');
        }


    };
})(jQuery);