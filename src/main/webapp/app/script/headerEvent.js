/**
 * Created by zhenglian
 * Date: 2016/5/10 0010
 * Time: 上午 9:29
 */
(function($) {
    $.headerEvent = {
        settings : {
            ui : '.headerList',
            btns : {
                headerItem : '.headerItem',
                preview : '.previewBtn'
            }
        },
        /**
         * 加载顶部工具栏
         */
        loadHeaderToolbar : function() {
            this.initEvent();
        },
        /**
         * 初始化事件
         */
        initEvent : function() {
            this.handleHeaderItemClick();
            this.handlePreviewEvent();
        },
        /**
         * 初始化创建题目事件
         */
        handleHeaderItemClick : function() {
            var tb = this;
            var dialogName = null;
            var dialog = null;
            $(this.settings.ui).find(this.settings.btns.headerItem).on('click', function() {
                dialogName = $(this).attr('dialog');
                dialog = eval('(' + '$.' + dialogName + ')');
                dialog && dialog.loadDialog();
            });
        },
        /**
         * 初始化预览事件
         */
        handlePreviewEvent : function() {
            //TODO deal with preview func
        }
    }
})(jQuery);

