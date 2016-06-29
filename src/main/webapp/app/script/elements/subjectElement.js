/**
 * 科目元素信息
 * 默认设置在左上角
 */
(function($) {
    $.subjectElement = {
        settings: {
            uuid: null,
            svg: null,
            element: null,
            grid : { //方格大小
                width : 0,
                height : 0
            },
            extra: {
            	curSubject: null,
            	num: 4
            }, //其他属性设置，可从setting.js中获取
            padding: {
            	hPadding: 0,
            	vPadding: 0
            }, //科目水平垂直方向偏移量
            resize: {//记录元素创建时的初始宽高，用于缩放组件进行缩放计算
                size: { //记录最初大小
                    width:0,
                    height:0
                },
                curSize: { //记录当前大小
                    width:0,
                    height:0
                }
            },
            editTarget: null, //用于编辑的元素
            g : null,
            components : {
                select : null, //选中控件
                drag : null, //拖动控件
                resize: null, //resize控件
                contextMenu: null //右键菜单
            }
        },
        /**
         * 加载元素控件
         */
        newInstance: function() {
           this.initParams();
           return $.extend(true, {}, this);
        },
        initParams : function() {
        	var $answerSheet = $.examPapers.settings.curSheet;
            this.settings.svg = $answerSheet.settings.svg;
            this.settings.padding = $.defaultSetting.subject;
            $.extend(this.settings.grid,$.defaultSetting.grid);
            $.extend(this.settings.extra,$.settings.subject);
            
        },
        loadElement: function() {
        },
    };
})(jQuery);