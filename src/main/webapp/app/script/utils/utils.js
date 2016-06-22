/**
 * Created by dell on 2016/6/12.
 */
(function($) {
    $.utils = {
    	settings: {
    		constant : {//配置一些常量域
                SVG_NS : 'http://www.w3.org/2000/svg',
                LINK_NS : 'http://www.w3.org/1999/xlink'
            }
    	},
        randomUUID : function() {
            return new Date().getTime();
        }
    }
})(jQuery);