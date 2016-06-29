/**
 * 答题卡标题组件
 * Created by zhenglian
 * Date: 2016/5/9 0009
 * Time: 上午 11:13
 */
(function($) {
    $.titleDialog = {
        settings : {
            ui : '#titleDialog',
            title : '#title',
            form : '#titleForm',
            element : null,
            textSize : '#textSize',
            btns : {
                ok : '.okBtn'
            }
        },
        /**
         * 加载题目配置框设置窗口
         * @param params == titleElement.settings.data
         */
        loadDialog : function(element) {
           if(element) {
               this.settings.element = element;
               this.initParams(element.settings.data);
           }
           this.initEvent();
           this.show();
        },
        /**
         * 初始化窗口中要填入的值
         * @param params
         */
        initParams : function(params) {
            if(params) {
                $(this.settings.ui).find(this.settings.title).val(params.title);
                $(this.settings.ui).find(this.settings.textSize).val(params.textSize);
            }else {
                $(this.settings.ui).find(this.settings.form)[0].reset();
            }
        },
        /**
         * 初始化弹出窗口事件
         */
        initEvent : function() {
            this.handleOkEvent();
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
        handleOkEvent: function() {
            var dialog = this;
            $(this.settings.ui).find(this.settings.btns.ok).off('click').on('click', function() {
                var valid = dialog.handleValidate();
                if(valid) {
                    dialog.createOrUpdate();
                }
            });
        },
        /**
         * 更新答题卡题目信息
         */
        createOrUpdate : function() {
        	var $answerSheet = $.examPapers.settings.curSheet;
            var element = this.settings.element;
            var title = $(this.settings.ui).find(this.settings.title).val();
            var textSize = $(this.settings.ui).find(this.settings.textSize).val();

            var params = {
                title : title,
                textSize : textSize
            };
            
            //如果是编辑就先删除再创建
            $answerSheet.removeElement(this.settings.element);
            
            var titleElement = $.titleElement.newInstance();
            titleElement.loadElement(params);
            var $answerSheet = $.examPapers.settings.curSheet;
            $answerSheet.settings.elements.push(titleElement);

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

    }
})(jQuery);