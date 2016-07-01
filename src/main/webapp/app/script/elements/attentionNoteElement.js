/**
 * 注意事项组件
 * @param $
 */
(function($) {
	$.attentionNoteElement = {
		settings: {
			uuid: null,
            svg: null,
            type: $.elementType.attentionNote,
            element: null,
            editTarget: null,
            g: null,
            fontSize: 10,
            padding: {
            	innerPadding: 10,
            	hPadding: 0,
            	vPadding: 0,
            	textPadding: 10 //每行文本的间距
            },
            width: null, //当前组件所占宽度content / 3 - padding.innerPadding*2
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
		initParams:function() {
			var $answerSheet = $.examPapers.settings.curSheet;
            this.settings.svg = $answerSheet.settings.svg;
            $.extend(this.settings.grid,$.defaultSetting.grid);
            this.settings.padding = $.defaultSetting.attentionNote;
            var content = $.defaultSetting.content;
            this.settings.width = content.width / 3 
            	- this.settings.padding.innerPadding*2;
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
            
            this.drawAttentionNoteText(g);
            this.positionAttentionNote();
            this.drawRectPanel(g);
            this.initSize();
		},
		drawAttentionNoteText: function(parentG) {
			var padding = this.settings.padding;
			var constant = $.utils.settings.constant;
			var g = document.createElementNS(constant.SVG_NS, 'g');
			parentG.appendChild(g);
			var titleText = '注意事项';//绘制标题
			var title = $.uiBuilder.drawText(0, 0, titleText, 20);
			var titleBox = title.getBBox();
			g.appendChild(title);
			$.uiBuilder.bottomText(title, 0, this.settings.width);
			
			var str = $.settings.baseInfo.attentionNote;
			
			var label = $.uiBuilder.drawText(0, 0, titleText, this.settings.fontSize);
			g.appendChild(label);
			var labelBox = label.getBBox();
			$(label).remove();
			var words = parseInt(this.settings.width / labelBox.width * 4);
			
			var textY = padding.innerPadding*5 + titleBox.height;
			var text = $.uiBuilder.drawMultiLineText(0, textY, str, 
					padding.textPadding, this.settings.fontSize, words, g);
			
			this.settings.height = parentG.getBBox().height;
		},
		positionAttentionNote: function() {
			var padding = this.settings.padding;
            var x = padding.hPadding;
            var y = padding.vPadding;
            var position = {
        		x: x,
        		y: y
        	};
        	$.elementDrag.updateGTranslateByPosition(this.settings.g, position);
		},
		drawRectPanel: function(parentG) {
			var padding = this.settings.padding;
			var width = this.settings.width;
			var height = this.settings.height;
			var rect = $.uiBuilder.drawRect(0, 0, width, height, true, 'transparent', false);
        	parentG.appendChild(rect);
        	this.settings.editTarget = rect;
		},
		initEvent: function() {
			
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
	}
})(jQuery);