/**
 * 正误填涂组件
 */
(function($) {
    "use strict";
    $.wrongFillingElement = {
        settings: {
        	uuid: null,
            svg: null,
            type: $.elementType.wrongFilling,
            element: null,
            editTarget: null,
            g : null,
            grid : { //方格大小
                width : 0,
                height : 0
            },
            padding: {
            	wordPadding: 0,
            	hPadding: 0,
            	vPadding: 0
            },
            width: null, //当前组件所占宽度为studentInfo的1/2
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
            components : {
                select : null, //选中控件
                drag : null, //拖动控件
                resize: null, //resize控件
                contextMenu: null //右键菜单
            }
        },
        newInstance: function() {
            return $.extend(true, {}, this);
        },
        loadElement: function() {
            this.initParams();
            this.createElement();
            this.initEvent();
            this.editable();
        },
        initParams: function() {
        	var $answerSheet = $.examPapers.settings.curSheet;
            this.settings.svg = $answerSheet.settings.svg;
            $.extend(this.settings.grid,$.defaultSetting.grid);
            var content = $.defaultSetting.content;
            this.settings.width = content.width / 6;
            this.settings.padding = $.defaultSetting.wrongFilling;
        },
        createElement: function(){
        	this.settings.element = this;
        	var constant = $.utils.settings.constant;
        	var svg = this.settings.svg;
            var g = document.createElementNS(constant.SVG_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            $(g).addClass('element');
            var uuid = $.utils.randomUUID();
            this.settings.uuid = uuid;
            $(g).attr('id', uuid);
            g.obj = this;
            this.settings.g = g;
            svg.appendChild(g);
        	
            var labelRect = this.drawWrongLabel(g);
            var labelBox = labelRect.getBBox();
            this.drawWrongFilling(g, labelBox.height);
            
            
            this.initSize();
            this.drawRectPanel();
            this.positionWrongFilling();
        },
        /**
         * 绘制填涂要求标题
         */
        drawWrongLabel: function(parentG) {
        	var constant = $.utils.settings.constant;
        	var padding = this.settings.padding;
        	var width = this.settings.width * 3 / 4;
        	
        	var labelG = document.createElementNS(constant.SVG_NS, 'g');
        	parentG.appendChild(labelG);
        	
        	var str = "填涂要求";
        	var text = $.uiBuilder.drawMultiLineText(0, 0, str, 2, 
        			18, 1, labelG);
        	
        	var textBox = text.getBBox();
        	$(text).remove();
        	
        	var height = textBox.height + padding.wordPadding*2;
        	
        	var labelWidth = width * 1/3;
        	var rect = $.uiBuilder.drawRect(0, 0, labelWidth, height, false);
        	labelG.appendChild(rect);
        	var rectBox = rect.getBBox();
        	
        	var labelX = (rectBox.width - textBox.width) / 2;
        	var labelY = (rectBox.height - textBox.height) / 2;
        	var text = $.uiBuilder.drawMultiLineText(labelX, labelY, str, 2, 
        			18, 1, labelG);
        	$.uiBuilder.bottomText(text);
        	
        	return rect;
        },
        /**
         * 绘制填涂方式
         */
        drawWrongFilling: function(parentG, height) {
        	var constant = $.utils.settings.constant;
        	var padding = this.settings.padding;
        	
        	var fillG = document.createElementNS(constant.SVG_NS, 'g');  
        	parentG.appendChild(fillG);
        	
        	var width = this.settings.width * 3 / 4;
        	var fillWidth = width * 2/3;
        	var fillX = width * 1/3;
        	var rect = $.uiBuilder.drawRect(fillX, 0, fillWidth, height, false);
        	
        	fillG.appendChild(rect);
        	
        	var rectBox = rect.getBBox();
        	
        	
        },
        /**
         * 初始化resize控件需要的参数信息
         */
        initSize: function() {
        	var g = this.settings.g;
            //记录元素最初的宽高
            var box = g.getBBox();
            this.settings.resize.size = {
                width: box.width,
                height: box.height
            };

            this.settings.resize.curSize = $.extend(true, {}, this.settings.resize.size);
        },
        drawRectPanel:function() {
        	//TODO
        },
        positionWrongFilling: function() {
        	//TODO
        },
        initEvent: function() {
        	//TODO
        },
        editable: function() {
        	//TODO
        }

    };
})(jQuery);