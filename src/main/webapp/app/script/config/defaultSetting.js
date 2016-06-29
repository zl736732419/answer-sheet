/**
 * 最终采用的纸张配置参数
 * 标准的分辨率计算出来的毫米与像素的关系也约等于一个常数： 
 * 基本上 1mm = 3.78px
 * @param $
 */
(function($) {
    $.defaultSetting = {
        page : { // 答题卡页面信息
        	width: 794, // 答题卡纸张宽度 
            height: 1123,  // 答题卡纸张高度
            pageNum: 1 // 答题卡共几页(一张两面算两页)
        },
//        content : {
//            width : 1287 //内容宽度
//        },
        grid : { //填涂方格大小
            width: 12,
            height: 5
        },
        title : { //答题卡标题控件
        	content: ''
        },
        footer: {
        	content: $.settings.footer.content,
        },
        anchorPoint: {
        	hPadding: 20, //水平偏移
        	vPadding: 30, //垂直偏移
        	width: 19, 
        	height: 19
        }
    };

})(jQuery);