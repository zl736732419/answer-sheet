/**
 * Created by dell on 2016/6/12.
 */
(function($) {
    $.elementResize = {
        settings: {

        },
        newInstance: function() {
            return $.extend(true, {}, this);
        },
        enable: function(element) {
            if(!element) {
                throw new Error('错误，当前要选中的目标元素为空!');
            }
        }
    };
})(jQuery);
