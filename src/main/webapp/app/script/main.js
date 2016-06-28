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

    //var title = '2016年南山区9年级下学期期末语文答题卡';
    //初始化一张新的题卡,需要根据用户设置的参数进行创建
//    $.examPapers.createNewAnswerSheet();
    $.headerEvent.loadHeaderToolbar();

})(jQuery);