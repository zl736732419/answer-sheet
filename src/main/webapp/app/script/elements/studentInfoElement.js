/**
 * 学生基本信息元素，比如学生姓名、学校、班级等
 */
(function($) {
    "use strict";
	$.studentInfoElement = {
        settings: {
            uuid: null,
            svg: null,
            row : { //左侧注意事项行设置
                index: 0, //记录当前绘制的字段索引，用于计算高度
                leftPadding: 10, //左侧文本内间距
                width : 0, //占1/3
                height : 40
            },
            padding: {
            	hPadding: 0,
            	vPadding: 0,
            	paddingTop: 0
            },
            items: [], //要绘制的项
            element: null,
            dialog: '#baseInfoDialog',
            elements : [
            	'userName', 'school', 'clazzName'
            ],
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
            g: null,
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
        loadElement: function(items) {
            this.initParams(items);
            this.createElement();
            this.initEvent();
            this.editable();
        },
        initParams: function(items) {
        	var $answerSheet = $.examPapers.settings.curSheet;
            this.settings.svg = $answerSheet.settings.svg;
            this.settings.items = items;
            this.settings.padding = $.defaultSetting.studentInfo;
            var row = this.settings.row;
            var content = $.defaultSetting.content;
            row.width = content.width / 3;
        },
        createElement: function() {
        	this.settings.element = this;
        	var constant = $.utils.settings.constant;
            var svg = this.settings.svg;
            var g = document.createElementNS(constant.SVG_NS, 'g');
            $(g).addClass('element');
            var uuid = $.utils.randomUUID();
            this.settings.uuid = uuid;
            $(g).attr('id', uuid);
            g.obj = this;
            this.settings.g = g;
            svg.appendChild(g);
        	
            var items = this.settings.items;
            
            var item = null;
            var methodName = null;
            var method = null;
            for(var i = 0; i < items.length; i++) {
            	item = items[i];
            	methodName = 'this.draw' + _.capitalize(item.substring(0, 1)) + item.substring(1);
            	method = eval('(' + methodName + ')');
            	if(method != undefined) {
            		method.apply(this, [g]);
            	}
            }
        },
        initEvent: function() {
        	
        },
        editable: function() {
        	
        },
        drawUserName: function(parentG) {
        	this.drawTextField('姓名：', parentG);
        },
        drawSchool: function(parentG) {
        	this.drawTextField('学校：', parentG);
        },
        drawClazzName: function(parentG) {
        	this.drawTextField('班级：', parentG);
        },
        drawTextField : function(text, parentG) { //矩形框+文本
        	var content = $.defaultSetting.content;
        	var constant = $.utils.settings.constant;
        	var padding = this.settings.padding;
            var g = document.createElementNS(constant.SVG_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);
            
            var row = this.settings.row; //左侧基本信息行宽高
            var rectY = padding.vPadding+row.height*row.index;
            var rect = $.uiBuilder.drawRect(padding.hPadding, rectY, 
            		row.width, row.height);
            
            g.appendChild(rect); //绘制分隔线

            //绘制文本
            var textX = padding.hPadding + row.leftPadding;
            var text = $.uiBuilder.drawText(textX, 0, text);
            g.appendChild(text);
            var box = text.getBBox();
            var textY = rectY + (row.height - box.height) / 2;
            $(text).attr('y', textY);
            $.uiBuilder.bottomText(text);
            row.index++;
        }
    };

})(jQuery);