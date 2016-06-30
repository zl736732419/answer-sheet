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
            subjectGCls: '.subjectRect',
            g : null,
            fontSize: 12
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
            this.settings.editTarget = containerG;
            //绘制科目文字Label
            var text = $.uiBuilder.drawText(position.x, position.y, '科目', this.settings.fontSize);
            containerG.appendChild(text);
            $.uiBuilder.bottomText(text);
            this.drawRectangles(text, containerG);
            this.drawRectPanel(text,containerG);
        },
        drawRectangles: function(text, parentG) {
        	var padding = this.settings.padding;
        	var grid = $.defaultSetting.grid;
        	var constant = $.utils.settings.constant;
        	var box = text.getBBox();
        	var extra = this.settings.extra;
        	var binary = this.getCurSubjectBinary();
        	var position = null;
        	var fill = false;
        	var fillColor = '#000';
        	var subjectG = null;
        	var rect = null;
        	for(var i = 0; i < extra.num; i++) {
        		position = {
            		x: padding.hPadding + (box.width + grid.padding) * (i+1),
            		y: padding.vPadding,
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
                	.attr('position', position);
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
         * 绘制一个矩形框，包含科目信息整体
         */
        drawRectPanel: function(text, parentG) {
        	var box = text.getBBox();
        	var extra = this.settings.extra;
        	var constant = $.utils.settings.constant;
        	var padding = this.settings.padding;
        	var grid = $.defaultSetting.grid;
        	var hPadding = 5;//矩形框内水平间距5
        	var vPadding = 5;//矩形框内垂直间距10
        	var width = box.width + (grid.padding+grid.width)*extra.num + hPadding*2; 
        	var height = grid.height + vPadding*2; 
        	var position = {
        		x: padding.hPadding - hPadding,
        		y: padding.vPadding - vPadding
        	};
        	var rect = $.uiBuilder.drawRect(position.x, position.y,width, height, false);
        	
        	var panelG = document.createElementNS(constant.SVG_NS, 'g');
            $(panelG).addClass("subjectPanel");
            parentG.appendChild(panelG);
        	
        	panelG.appendChild(rect);
        }
    };
})(jQuery);