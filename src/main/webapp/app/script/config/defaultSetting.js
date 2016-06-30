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
        content : {
            width : null, //内容宽度 在
            height: null,  //内容高度
            hPadding: null, //水平内间距
            vPadding: null, //垂直内间距
        },
        grid : { //填涂方格大小
            width: 12,
            height: 5,
            padding: 7 // 3.2 + x = 5.08(mm)
        },
        title : { //答题卡标题控件
        	content: '',
        	padding: 20
        },
        footer: {
        	content: $.settings.footer.content,
        },
        anchorPoint: { //边界点
        	hPadding: 20, //水平偏移
        	vTopPadding: 120, //垂直顶部偏移
        	vBottomPadding: 40, //垂直底部偏移
        	width: 19, 
        	height: 19
        },
        syncHeader: { //纵向同步头
        	width: 19,
        	height: 6,
        	padding: 13
        },
        subject: { //科目元素
        	wordPadding: 5, //文本与矩形框的偏移量 
            hPadding: 20, //横向偏移
            vPadding: 10, //纵向偏移 这里只是相对于定位点而言，需要再根据定位点位置计算，settingDialog.js中计算
        },
        studentInfo: {
        	hPadding: 20, //横向偏移
            vPadding: 10 //纵向偏移 这里只是相对于定位点而言，需要再根据定位点位置计算，settingDialog.js中计算
        },
        wrongFilling: {
        	wordPadding: 5,
        	hPadding: 20,
        	vPadding: 10
        }
    };

})(jQuery);