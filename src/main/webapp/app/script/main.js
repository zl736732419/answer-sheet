/**
 * 主js,页面入口
 */
(function($) {
    "use strict";
    
    //初始化toastr
    if (typeof toastr != "undefined") {
        toastr.options = {
            "closeButton" : true, //是否显示关闭按钮
            "positionClass" : "toast-top-center",//弹出窗的位置
            "timeOut" : "2000", //展现时间
        };
    }

    
    function render() {
    	initIcheckStyle();
    	initAnswerSheetPanelHeight();
    	initNiceScroll();
    	//var title = '2016年南山区9年级下学期期末语文答题卡';
    	//初始化一张新的题卡,需要根据用户设置的参数进行创建
    	$.examPapers.createNewAnswerSheet();
        $.headerEvent.loadHeaderToolbar();
        
    }
    
    //初始化滚动条
    function initNiceScroll() {
    	$.uiwrapper.nicescroll();
    }
    
    //初始化面板高度，超出部分显示滚动条
    function initAnswerSheetPanelHeight() {
    	var bodyHeight = $('body').height();
    	var $answerSheetPanel = $('.answerSheetPanel');
    	var $headerPanel = $('.headerPanel');
    	$answerSheetPanel.css({
    		height: (bodyHeight - $headerPanel.height()) + 'px'
    	});
    }
    
    /**
     * 将checkbox radiobox转化为icheck 样式
     */
    function initIcheckStyle() {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
    }
    
    function initEvent() {
    	
    }
    
    function load() {
    	render();
    	initEvent();
    	
    }
    
    load();

})(jQuery);