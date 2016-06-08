/**
 * Created by zhenglian
 * Date: 2016/5/5 0005
 * Time: 下午 4:41
 */
/**
 * 答题卡顶部名称组件
 * 调用方式： $.titleElement.newInstance().loadElement();
 */
(function($) {
    $.titleElement = {
        settings : {
            svg : null, //答题卡内容面板，从answerSheet.settings.ui获取
            element: null,
            text : null, //当前题目文本对象，需要在loadElement中创建
            editTarget: null, //用于编辑的元素
            g : null,
            data : {
                x: 0,
                y: 0,
                title : null, //题目文本内容,从answerSheet.settings中获取
                textColor: '#000',
                textSize: 40
            },
            components : {
                select : null, //选中控件
                drag : null //拖动控件
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
            this.settings.svg = $.answerSheet.settings.svg;
            //获取题目的初始配置信息
            this.settings.data.y = $.defaultSettingA4.title.y;
        },
        /**
         * 加载该控件
         */
        loadElement: function(params) {
           this.createElement(params);
           this.initEvent();
           this.editable();
        },
        /**
         * 创建文本对象
         */
        createElement : function(params) {
            this.settings.element = this;
            var constant = $.answerSheet.settings.constant;
            var svg = this.settings.svg;
            var data = this.settings.data;
            var text = document.createElementNS(constant.SVN_NS, 'text');
            $(text).addClass('element');
            $(text).attr('x', data.x);
            $(text).attr('y', data.y);
            text.onselectstart = function() { //定义文本不可选中
                return false;
            };
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            g.appendChild(text);
            g.obj = this;
            this.settings.g = g;
            svg.appendChild(g);
            svg.obj.settings.elements.push(this);
            this.settings.text = text;
            this.settings.editTarget = this.settings.text;
            this.renderTitleContent(params);
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
        renderTitleContent : function(params) {
            var data = this.settings.data;
            if(params) {
                var title = params.title;
                var textSize = params.textSize;
                data.title = title;
                data.textSize = textSize;
            }

            var text = this.settings.text;
            text.textContent = data.title;
            $(text).css({
                color: data.textColor,
                fontSize: data.textSize + 'px',
                fontWeight: 'bold'
            });
            this.makeTitleCenter();

            var select = this.settings.components.select;
            if(select) {
                select.reSelectElement(this.settings.text);
            }
        },
        /**
         * 控制title居中
         */
        makeTitleCenter : function() {
            var text = this.settings.text;
            var box = text.getBBox();
            var parentWidth = $.defaultSettingA4.page.width;
            var newX = parseInt(parentWidth - box.width) / 2;
            this.settings.data.x = newX;
            $(text).attr('x', newX);
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
                $.titleDialog.loadDialog(title);
            });
        },
        /**
         * 设置让控件可以被选中、拖动、改变大小
         */
        editable : function() {
            //选中
            if(this.settings.components.select == null) {
                this.settings.components.select = $.elementSelect.newInstance();
            }
            this.settings.components.select.enable(this.settings.editTarget);

            //拖动
            if(this.settings.components.drag == null) {
                this.settings.components.drag = $.elementDrag.newInstance();
            }
            this.settings.components.drag.enable(this.settings.editTarget);
        }
    };
})(jQuery);