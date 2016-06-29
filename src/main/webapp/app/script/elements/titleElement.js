/**
 * 答题卡顶部名称组件
 * 调用方式： $.titleElement.newInstance().loadElement();
 * 
 * Created by zhenglian
 * Date: 2016/5/5 0005
 * Time: 下午 4:41
 */
(function($) {
    $.titleElement = {
        settings : {
            uuid: null, //唯一标识，采用时间毫秒值
            svg : null, //答题卡内容面板，从answerSheet.settings.ui获取
            element: null,
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
            nums: 18, //一行包含文字数
            padding: 10, //行间距
            text : null, //当前题目文本对象，需要在loadElement中创建
            editTarget: null, //用于编辑的元素
            g : null,
            data : {
                x: 0,
                y: 0,
                title : null, //题目文本内容,从answerSheet.settings中获取
                textColor: '#000',
                textSize: 30
            },
            components : {
                select : null, //选中控件
                drag : null, //拖动控件
                resize: null, //resize控件
                contextMenu: null //右键菜单
            }
        },
        /**
         * 实例化该组件
         */
        newInstance : function() {
            this.initParams();
            return $.extend(true, {}, this);
        },
        /**
         * 初始化该组件需要用到的参数
         */
        initParams : function() {
        	var $answerSheet = $.examPapers.settings.curSheet;
            this.settings.svg = $answerSheet.settings.svg;
            //获取题目的初始配置信息
            this.settings.data.y = $.defaultSetting.title.padding;
        },
        /**
         * 加载该控件
         */
        loadElement: function(params) {
           this.createElement(params);
           this.initEvent();
           this.editable();
        },
        createElement: function(params) {
        	var data = this.settings.data;
            if(params) {
                var title = params.title;
                var textSize = params.textSize;
                data.title = title;
                data.textSize = Number(textSize);
            }
            
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
        	var text = $.uiBuilder.drawMultiLineText(0, 0, data.title, 
        			this.settings.padding, data.textSize, this.settings.nums, g);
        	text.onselectstart = function() { //定义文本不可选中
                return false;
            };
            this.settings.text = text;
            this.settings.editTarget = this.settings.text;
            this.renderTitleContent();
        },
        //拖动元素时需要更新元素位置坐标
        updatePosition : function(dx, dy){
            var data = this.settings.data;
            data.x += dx;
            data.y += dy;

            $(this.settings.text).attr('x', data.x)
                .attr('y', data.y);
        },
        /**
         * 更新答题卡题目信息
         *
         * @param params 传递的最新题目信息，如果为空直接使用settings.data
         */
        renderTitleContent : function() {
        	var data = this.settings.data;
            var text = this.settings.text;
            $(text).attr('x', 0)
            	.attr('y', 0)
            	.attr('dy', 0);
            var g = this.settings.g;
            $(g).attr('transform', 'translate(0, 0)');
            $(text).css({
                color: data.textColor,
                fontSize: data.textSize + 'px',
                fontWeight: 'bold'
            });
            this.makeTitleCenter();

            var select = this.settings.components.select;
            if(select) {
                select.reSelectElement(this.settings.g);
            }
            
            this.initSize();
        },
        /**
         * 初始化宽高
         * 该方法主要记录最初的元素宽高，用于缩放控制，
         * 每一个元素都应该实现该方法
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
         * 控制title居中
         */
        makeTitleCenter : function() {
            var text = this.settings.text;
            var box = text.getBBox();
            var y = $(text).attr('y');
            //居中文本信息
            var dy = y - box.y;
            var $tspan = $(text).find('tspan');
            $tspan.attr('dy', dy);

            var g = this.settings.g;
            var data = this.settings.data;
            var parentWidth = $.defaultSetting.page.width;
            var newX = parseInt(parentWidth - box.width) / 2;
            this.settings.data.x = newX;
            var translateStr = 'translate(' + newX + ',' + (data.y) + ')';
            $(g).attr('transform', translateStr);
            
            if($tspan.length > 1) { //只有超过1行文本才会有居中问题
            	var textWidth = text.getBBox().width;
            	var tspanWidth = null;
            	var dx = 0;
            	for(var i = 0; i < $tspan.length; i++) {
            		tspanWidth = $tspan[i].textLength.baseVal.value;
            		dx = (textWidth - tspanWidth) / 2;
            		$($tspan[i]).attr('dx', dx);
            	}
            }
            
        },
        /**
         * 初始化题目信息事件
         */
        initEvent : function() {
            this.handleDoubleClickEvent();
        },
        /**
         * 处理双击题目修改题目大小
         */
        handleDoubleClickEvent: function() {
            var title = this;
            $(this.settings.text).on('dblclick', function() {
                title.editElement();
            });
        },
        /**
         * 编辑标题元素
         */
        editElement : function() {
            $.titleDialog.loadDialog(this);
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
            /*if(this.settings.components.drag == null) {
                this.settings.components.drag = $.elementDrag.newInstance();
            }
            this.settings.components.drag.enable(this);*/

            /*if(this.settings.components.resize == null) {
                this.settings.components.resize = $.elementResize.newInstance();
            }
            this.settings.components.resize.enable(this);*/

            //右键菜单
            if(this.settings.components.contextMenu == null) {
                this.settings.components.contextMenu = $.elementContextMenu.newInstance();
            }
            this.settings.components.contextMenu.enable(this);
        }
    };
})(jQuery);