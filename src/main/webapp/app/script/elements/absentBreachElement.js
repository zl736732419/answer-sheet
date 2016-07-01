/**
 * 缺考违纪组件
 * @param $
 */
(function($) {
	"use strict";
	$.absentBreachElement = {
		settings: {
			uuid: null,
			svg: null,
			type: $.elementType.absentBreach,
			element: null,
			editTarget : null,
			g: null,
			grid : { //方格大小
                width : 0,
                height : 0
            },
            padding: {
            	wordPadding: 5,
            	hPadding: 0,
            	vPadding: 0
            },
            fontSize: 18,
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
            this.initAbsentBreachParams();
            this.settings.padding = $.defaultSetting.absentBreach;
            var content = $.defaultSetting.content;
            this.settings.width = content.width / 3 * (3/7);
		},
		/**
		 * 初始化缺考违纪参数
		 */
		initAbsentBreachParams: function() {
			var defaultSetting = $.defaultSetting;
			var studentInfo = defaultSetting.studentInfo;
			var absentBreach = defaultSetting.absentBreach;
			var answerSheet = $.examPapers.settings.curSheet;

			var element = null;
			for(var i = 0; i < answerSheet.settings.elements.length; i++) {
				element = answerSheet.settings.elements[i];
				if(element.settings.type == $.elementType.studentInfo) {
					var height = element.settings.items.length 
						* element.settings.row.height;
					absentBreach.vPadding += (studentInfo.vPadding + height);
				}else if(element.settings.type == $.elementType.wrongFilling) { //如果是错误填涂
					this.settings.height = element.settings.height;
				}
			}
			var content = $.defaultSetting.content;
			absentBreach.hPadding += content.width / 3 * (4/7);
		},
		createElement: function() {
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
            
            this.drawLabelPanel(g);
            this.drawContentPanel(g);
            
            this.initSize();
            this.drawRectPanel(g);
            this.positionAbsentBreach();
		},
		drawLabelPanel: function(parentG) {
			var height = this.settings.height / 5;
			var str = '此处由监考老师填写';
			$.uiBuilder.drawRectAndCenterText(0, 0, this.settings.width, height, 
					str, this.settings.fontSize, parentG);
		},
		drawContentPanel: function(parentG){
			var padding = this.settings.padding;
			var height = this.settings.height / 5;
			var str = '违纪';
			var char = 'W';
			var labelX = 0;
			var labelY = height + padding.wordPadding*3;
			var labelBox = this.renderAbsentOrBreach(str, labelX, labelY, char, parentG);
			
			str = '缺考';
			char = 'Q';
			labelY = height + labelBox.height + padding.wordPadding*5;
			this.renderAbsentOrBreach(str, labelX, labelY, char, parentG);
		},
		renderAbsentOrBreach: function(str, labelX, labelY, char, parentG) {
			var constant = $.utils.settings.constant;
			var padding = this.settings.padding;
			var grid = this.settings.grid;
			var g = document.createElementNS(constant.SVG_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)')
            	.attr('class', 'absentAndBreach tag');
            parentG.appendChild(g);
			var label = $.uiBuilder.drawText(labelX, labelY, str, this.settings.fontSize, g);
			g.appendChild(label);
			$.uiBuilder.bottomText(label);
			var labelBox = label.getBBox();
			var rectX = labelBox.width + padding.wordPadding*3;
			var rectY = labelY;
			var rect = $.uiBuilder.drawRectAndCenterText(rectX, rectY, grid.width, grid.height, char, this.settings.fontSize, g);
			g.appendChild(rect);
			var dx = this.centerHAbsentOrBreach(g);
			
			var position = {
				x: (rectX + dx),
				y: rectY,
				width: grid.width,
				height: grid.height
			};
			
			$(g).data('position', position);
			
			return labelBox;
		},
		/**
		 * 居中违纪或者缺考标记
		 */
		centerHAbsentOrBreach: function(g) {
			var width = this.settings.width;
			var box = g.getBBox();
			var dx = (width - box.width) / 2;
			
			$(g).attr('transform', 'translate(' + dx + ',0' + ')');
			return dx;
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
		initEvent: function() {
			
		},
		drawRectPanel:function(parentG) {
        	var rect = $.uiBuilder.drawRect(0, 0, this.settings.width, this.settings.height, true, 'transparent');
        	parentG.appendChild(rect);
        	this.settings.editTarget = rect;
        },
        /**
         * 调整组件位置
         */
        positionAbsentBreach: function() {
        	var padding = this.settings.padding;
        	var content = $.defaultSetting.content;
        	var x = padding.hPadding;
            var y = padding.vPadding;
            
            var position = {
        		x: x,
        		y: y
        	};
        	$.elementDrag.updateGTranslateByPosition(this.settings.g, position);
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