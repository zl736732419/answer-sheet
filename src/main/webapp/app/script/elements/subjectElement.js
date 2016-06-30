/**
 * 科目元素信息
 * 默认设置在左上角
 */
(function($) {
    $.subjectElement = {
        settings: {
            uuid: null,
            svg: null,
            type: $.elementType.subject,
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
            	wordPadding: 0,
            	hPadding: 0,
            	vPadding: 0,
            	vTopPadding: 0,
            }, //科目水平垂直方向偏移量
            editTarget: null, //用于编辑的元素
            subjectGCls: '.subjectRect',
            g : null,
            fontSize: 12,
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
        /**
         * 加载元素控件
         */
        newInstance: function() {
           return $.extend(true, {}, this);
        },
        loadElement: function() {
        	this.initParams();
        	this.createElement();
        	this.editable();
        },
        initParams : function() {
        	var $answerSheet = $.examPapers.settings.curSheet;
            this.settings.svg = $answerSheet.settings.svg;
            this.settings.padding = $.defaultSetting.subject;
            $.extend(this.settings.grid,$.defaultSetting.grid);
            $.extend(this.settings.extra,$.settings.subject);
        },
        createElement : function() {
        	this.settings.element = this;
        	var padding = this.settings.padding;
        	var constant = $.utils.settings.constant;
            var svg = this.settings.svg;
            var g = document.createElementNS(constant.SVG_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            $(g).addClass("element");
            g.obj = this;
            this.settings.g = g;
            svg.appendChild(g);
            var uuid = $.utils.randomUUID();
            this.settings.uuid = uuid;
            $(g).attr('id', uuid);
            
            var position = {
        		x: padding.hPadding, 
        		y:padding.vPadding
            };
            
            var containerG = document.createElementNS(constant.SVG_NS, 'g');
            $(containerG).addClass("container");
            g.appendChild(containerG);
            
            
              //绘制科目文字Label
//            var text = $.uiBuilder.drawText(position.x + padding.wordPadding, position.y, '科目', this.settings.fontSize);
            var text = $.uiBuilder.drawText(0, 0, '科目', this.settings.fontSize);
            g.appendChild(text);
            var textBox = text.getBBox();
            $(text).remove();
            //绘制包装科目的外围矩形框
            var rect = this.drawRectPanel(textBox, g);
            //绘制科目文本标签
            var rectBox = rect.getBBox(); 
            this.drawSubjectLabel(textBox, rectBox, containerG);
            //绘制科目矩形框
            this.drawRectangles(textBox, rectBox, containerG);
            
            //将科目信息平移到指定的位置
            this.positionSubject();
            
            this.initSize();
        },
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
        /**
         * 科目信息平移到指定的位置
         */
        positionSubject: function() {
        	var padding = this.settings.padding;
        	var x = padding.hPadding;
        	var y = padding.vPadding;
        	var position = {
        		x: x,
        		y: y
        	};
        	$.elementDrag.updateGTranslateByPosition(this.settings.g, position);
        },
        /**
         * 绘制科目文本标签
         */
        drawSubjectLabel: function(textBox, rectBox, containerG) {
        	var padding = this.settings.padding;
        	//绘制科目文字
            var textX = padding.wordPadding;
            var textY = (rectBox.height - textBox.height) / 2;
            var text = $.uiBuilder.drawText(textX, textY, '科目', this.settings.fontSize);
            containerG.appendChild(text);
            $.uiBuilder.bottomText(text);
        },
        /**
         * 绘制一个矩形框，包含科目信息整体
         */
        drawRectPanel: function(box, g) {
        	var extra = this.settings.extra;
        	var constant = $.utils.settings.constant;
        	var padding = this.settings.padding;
        	var grid = $.defaultSetting.grid;
        	var width = box.width + (grid.padding+grid.width)*extra.num + padding.wordPadding; 
        	var height = grid.height + padding.wordPadding*2; 
        	var position = {
        		x: padding.hPadding,
        		y: padding.vPadding - padding.wordPadding
        	};
        	var rect = $.uiBuilder.drawRect(0, 0, width, height, true, 'transparent');
        	g.appendChild(rect);
        	this.settings.editTarget = rect;
        	
        	return rect;
        },
        drawRectangles: function(textBox, rectBox, parentG) {
        	var padding = this.settings.padding;
        	var grid = $.defaultSetting.grid;
        	var constant = $.utils.settings.constant;
        	var extra = this.settings.extra;
        	var binary = this.getCurSubjectBinary();
        	var position = null;
        	var fill = false;
        	var fillColor = '#000';
        	var subjectG = null;
        	var rect = null;
        	for(var i = 0; i < extra.num; i++) {
        		position = {
            		x: textBox.width + padding.wordPadding*2 + (textBox.width + grid.padding) * i,
            		y: (rectBox.height - grid.height) / 2,
            		width: grid.width,
            		height: grid.height
            	};
        		
        		if(binary.charAt(i) == '1') {
        			fill = true;
        		}else {
        			fill = false;
        		}
        		if(!fill) { //如果不填充就不绘制科目矩形
        			continue;
        		}
        		rect = $.uiBuilder.drawRect(position.x, position.y, position.width, 
        				position.height, fill, fillColor);
        		subjectG = document.createElementNS(constant.SVG_NS, 'g');
                $(subjectG).addClass(this.settings.subjectGCls.substring(1))
                	.data('position', position);
        		subjectG.appendChild(rect);
        		parentG.appendChild(subjectG);
        	}
        },
        /**
         * 获取当前科目对应的二进制字符串
         */
        getCurSubjectBinary: function() {
        	var extra = this.settings.extra;
        	var value = extra.curSubject.value;
        	var str = Number(value).toString(2); //转化成二进制数
        	var num = extra.num - str.length;
        	var zeros = _.repeat('0', num);
        	
        	return zeros + str;
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