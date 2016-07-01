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
            width: null, //当前组件所占宽度为studentInfo的4/7
            height: null, //通过填涂要求label计算
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
            
            //初始化padding信息
            $.settingDialog.initWrongFillingParams();
            
            this.settings.padding = $.defaultSetting.wrongFilling;
            this.settings.width = content.width / 3 * (4/7) - this.settings.padding.wordPadding;
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
            this.positionWrongFilling();
            this.drawRectPanel(g);
        },
        /**
         * 绘制填涂要求标题
         */
        drawWrongLabel: function(parentG) {
        	var constant = $.utils.settings.constant;
        	var padding = this.settings.padding;
        	var width = this.settings.width;
        	
        	var labelG = document.createElementNS(constant.SVG_NS, 'g');
        	parentG.appendChild(labelG);
        	
        	var str = "填涂要求";
        	var text = $.uiBuilder.drawMultiLineText(0, 0, str, 2, 
        			18, 1, labelG);
        	
        	var textBox = text.getBBox();
        	$(text).remove();
        	
        	var height = textBox.height + padding.wordPadding*2;
        	this.settings.height = height;
        	
        	var labelWidth = width * 1/4
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
        	var grid = this.settings.grid;
        	var fillG = document.createElementNS(constant.SVG_NS, 'g');  
        	parentG.appendChild(fillG);
        	
        	var width = this.settings.width;
        	var fillWidth = width * 3/4;
        	var fillX = width * 1/4;
        	var rect = $.uiBuilder.drawRect(fillX, 0, fillWidth, height, false);
        	fillG.appendChild(rect);
        	var fontSize = 15;
        	this.drawRightFilling(fillX, fillWidth, fontSize, fillG);
        	this.drawErrorFilling(fillX, fillWidth, fontSize, fillG);
        	
        },
        /**
         * 绘制正确填涂方式
         * @param fillX
         * @param fillWidth
         * @param fillG
         */
        drawRightFilling: function(fillX, fillWidth, fontSize, fillG) {
        	var padding = this.settings.padding;
        	var grid = this.settings.grid;
        	
        	var str = "正确填涂方式";
        	var textBox = $.uiBuilder.getTextBBox(str, fontSize, fillG);
        	
        	var rightFillLabel = $.uiBuilder.drawText(fillX, padding.wordPadding, str, fontSize);
        	fillG.appendChild(rightFillLabel);
        	$.uiBuilder.bottomText(rightFillLabel, fillX, fillWidth);
        	var rectX = fillX + (fillWidth - grid.width) / 2;
        	var rectY = padding.wordPadding*3 + textBox.height;
        	var rightFillRect = $.uiBuilder.drawRect(rectX, rectY, grid.width, grid.height, true, '#000');
        	fillG.appendChild(rightFillRect);
        },
        /**
         * 绘制错误填涂方式
         * @param fillX
         * @param fillWidth
         * @param fillG
         */
        drawErrorFilling: function(fillX, fillWidth, fontSize, fillG) {
        	var padding = this.settings.padding;
        	var grid = this.settings.grid;
        	
        	var str = "错误填涂方式";
        	var textBox = $.uiBuilder.getTextBBox(str, fontSize, fillG);
        	
        	var errorX = padding.wordPadding*6 + textBox.height;
        	var errorFillLabel = $.uiBuilder.drawText(fillX, errorX, str, fontSize);
        	fillG.appendChild(errorFillLabel);
        	$.uiBuilder.bottomText(errorFillLabel, fillX, fillWidth);
        	var errorBox = errorFillLabel.getBBox();
        	
        	var interval = (errorBox.width - grid.width*4) / 3;
        	if(interval < 0) {
        		interval = padding.wordPadding;
        	}
        	
        	var startX = errorBox.x;
        	var startY = errorBox.y + errorBox.height + padding.wordPadding*2;
        	var fontSize = 8;
        	this.drawTickFilling(startX, startY, fontSize, fillG);
        	startX = errorBox.x + (interval + grid.width);
        	this.drawForkFilling(startX, startY, fontSize, fillG);
        	startX = errorBox.x + (interval + grid.width)*2;
        	this.drawEllipseFilling(startX, startY, fontSize, fillG);
        	startX = errorBox.x + (interval + grid.width)*3;
        	this.drawIrregularFilling(startX, startY, fontSize, fillG);
        },
      //勾
        drawTickFilling: function(x, y, fontSize, parentG) {
        	var padding = this.settings.padding;
        	var grid = this.settings.grid;
        	
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, 'A', fontSize, parentG);

            //绘制勾路径
            var d = 'M' + x + ' ' + y + ' L' + (x+grid.width / 2) + ' ' + (y + grid.height)
                + ' L' + (x + grid.width) + ' ' + (y-3);
            var path = $.uiBuilder.drawPath(d, '#000', 2);
            parentG.appendChild(path);
        },
        //叉
        drawForkFilling: function(x, y, fontSize, parentG) {
            var grid = this.settings.grid;
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, 'B', fontSize, parentG);

            //绘制勾路径
            var d = 'M' + (x + 3) + ' ' + (y-3) + ' L' + (x + grid.width - 3) + ' ' + (y + grid.height + 3)
            var path = $.uiBuilder.drawPath(d, '#000', 2);
            parentG.appendChild(path);
            var d2 = 'M' + (x + grid.width - 3) + ' ' + (y-3) + ' L' + (x + 3) + ' ' + (y + grid.height + 3);
            var path2 = $.uiBuilder.drawPath(d2, '#000', 2);
            parentG.appendChild(path2);
        },
        //椭圆
        drawEllipseFilling: function(x, y, fontSize, parentG) {
            var grid = this.settings.grid;
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, 'C', fontSize, parentG);

            //绘制勾路径
            var cx = x + grid.width / 2;
            var cy = y + grid.height / 2;
            var rx = grid.width / 2;
            var ry = grid.height / 2;
            var ellipse = $.uiBuilder.drawEllipse(cx, cy, rx, ry, 2);
            parentG.appendChild(ellipse);
        },
        //其他图形
        drawIrregularFilling: function(x, y, fontSize, parentG) {
            var grid = this.settings.grid;
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, 'D', fontSize, parentG);

            //绘制其他图形
            var d = 'M' + (x + 2) + ' ' + (y + grid.height / 2) + ' L'
                + (x + grid.width - 2) + ' ' + (y + grid.height / 2) + 'z';
            var shape = $.uiBuilder.drawPath(d, '#000', 2);
            parentG.appendChild(shape);
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
        drawRectPanel:function(parentG) {
        	var rect = $.uiBuilder.drawRect(0, 0, this.settings.width, this.settings.height, true, 'transparent');
        	parentG.appendChild(rect);
        	this.settings.editTarget = rect;
        },
        positionWrongFilling: function() {
        	var padding = this.settings.padding;
            var x = padding.hPadding;
            var y = padding.vPadding;
            var position = {
        		x: x,
        		y: y
        	};
        	$.elementDrag.updateGTranslateByPosition(this.settings.g, position);
        	
        },
        initEvent: function() {
        	//TODO
        },
        /**
         * 设置让控件可以被选中、拖动、改变大小
         */
        editable : function() {
            //选中
            if(this.settings.components.select == null) {
                this.settings.components.select = $.elementSelect.newInstance();
            }
            this.settings.components.select.enable(this);

            //不允许拖动
            if(this.settings.components.drag == null) {
                this.settings.components.drag = $.elementDrag.newInstance();
            }
            this.settings.components.drag.enable(this);

            if(this.settings.components.resize == null) {
                this.settings.components.resize = $.elementResize.newInstance();
            }
            this.settings.components.resize.enable(this);

            //右键菜单
            if(this.settings.components.contextMenu == null) {
                this.settings.components.contextMenu = $.elementContextMenu.newInstance();
            }
            this.settings.components.contextMenu.enable(this);
        }

    };
})(jQuery);