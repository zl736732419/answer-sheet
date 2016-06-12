/**
 * Created by dell on 2016/6/12.
 */
/**
 * 元素resize控件
 * 这里制造八个拖动点，用于拖动元素修改大小
 */
(function($) {
    $.elementResize = {
        settings: {
            pointG: null
        },
        newInstance: function() {
            return $.extend(true, {}, this);
        },
        enable: function(element) {
            if(!element) {
                throw new Error('错误，当前要选中的目标元素为空!');
            }

            this.resize(element);
        },
        /**
         * resize控件入口函数
         * @param element
         */
        resize: function(element) {
            this.drawEightPoints(element);
            this.initEvent(element);
        },
        /**
         * 为resize控件添加事件响应
         * @param element
         */
        initEvent : function(element) {
            this.initPointDragEvent(element);
        },
        /**
         * 8个助拖点拖动事件
         * @param element
         */
        initPointDragEvent: function(element) {
            var parentG = $(element).parent()[0];
            var pointG = this.settings.pointG;
            var point = null;
            var pointCls = null;
            $(pointG).find('.point').on('mousedown', function(e) {
                e.preventDefault();
                point = $(this);
                pointCls = $(this).attr('class').split(' ')[0];
                alert(pointCls);
            });


        },
        /**
         * 绘制八个助拖点，帮助用户拖动
         */
        drawEightPoints : function(element) {
            var parentG = $(element).parent()[0];
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            $(g).addClass('pointerG');
            this.settings.pointG = g;

            parentG.appendChild(g);

            var box = element.getBBox();
            var r = 5;
            var cx = 0;
            var cy = 0;
            var innerColor = '#fff';
            var outerColor = '#04c';
            //左上角
            var leftUp = $.uiBuilder.drawCircleRadialGradient(cx, cy, r, innerColor, outerColor);
            $(leftUp).addClass('point leftUp');
            g.appendChild(leftUp);
            //上中点
            cx = box.width / 2;
            var up = $.uiBuilder.drawCircleRadialGradient(cx, cy, r, innerColor, outerColor);
            $(up).addClass('point up');
            g.appendChild(up);
            //右上角
            cx = box.width;
            var rightUp = $.uiBuilder.drawCircleRadialGradient(cx, cy, r, innerColor, outerColor);
            $(rightUp).addClass('point rightUp');
            g.appendChild(rightUp);

            //左中点
            cx = 0;
            cy = box.height / 2;
            var left = $.uiBuilder.drawCircleRadialGradient(cx, cy, r, innerColor, outerColor);
            $(left).addClass('point left');
            g.appendChild(left);

            //右中点
            cx = box.width;
            cy = box.height / 2;
            var right = $.uiBuilder.drawCircleRadialGradient(cx, cy, r, innerColor, outerColor);
            $(right).addClass('point right');
            g.appendChild(right);

            //左下角
            cx = 0;
            cy = box.height;
            var leftDown = $.uiBuilder.drawCircleRadialGradient(cx, cy, r, innerColor, outerColor);
            $(leftDown).addClass('point leftDown');
            g.appendChild(leftDown);

            //下中点
            cx = box.width / 2;
            cy = box.height;
            var down = $.uiBuilder.drawCircleRadialGradient(cx, cy, r, innerColor, outerColor);
            $(down).addClass('point down');
            g.appendChild(down);

            //右下角
            cx = box.width ;
            cy = box.height;
            var rightDown = $.uiBuilder.drawCircleRadialGradient(cx, cy, r, innerColor, outerColor);
            $(rightDown).addClass('point rightDown');
            g.appendChild(rightDown);

            //默认是不显示的
            $(g).find('.point').css({
                display: 'none'
            });

        }
    };
})(jQuery);
