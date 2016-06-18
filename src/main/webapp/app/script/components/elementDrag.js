/**
 * Created by zhenglian
 * Date: 2016/5/9 0009
 * Time: 下午 3:55
 */
/**
 * 拖动控件，用于对元素位置进行改变
 */
(function($) {
    $.elementDrag = {
        settings : {
        },
        /**
         * 创建该组件实例
         */
        newInstance : function() {
            return $.extend(true, {}, this);
        },
        enable : function(elementObj) {
            if(!elementObj) {
                throw new Error('错误，当前要选中的目标元素为空!');
            }
            this.drag(elementObj.settings.editTarget);
        },
        drag : function(element) {
            var g = $(element).parent()[0];
            var select = g.obj.settings.components.select; //g.obj
            var drag = this;
            $(element).on('mousedown', function(e) {
                drag.preventBuddle(e);
                select.unSelectElement(element);
                var startXY = drag.getXY(e);
                drag.changeMouseToDragStyle(element);

                $(document).on('mousemove', function(e) { //拖动时移动
                    drag.preventBuddle(e);
                    var targetXY = drag.getXY(e);
                    var distanceXY = drag.getDistanceXY(targetXY, startXY);
                    var translateStr = drag.updateGTranslate(g, distanceXY);
                    $(g).attr('transform', translateStr);
                    startXY = $.extend(true, {}, targetXY);
                });

                $(document).on('mouseup',function(e) {
                    drag.preventBuddle(e);
                    drag.changeMouseToDefaultStyle(element);
                    $(document).off('mousemove');
                    $(document).off('mouseup');

                    select.selectElement(element);
                });

            });
        },
        /**
         * 停止移动后将g上的transform计算到元素的坐标中，translate值重新设置为0,0
         * @Deprecated
         */
        updateElementPosition : function(element) {
            var drag = this;
            var g = $(element).parent()[0];
            var elementObj = g.obj;
            var xy = this.getTranslateXY(g);

            elementObj.updatePosition(xy.x, xy.y);
            var transform = $(g).attr('transform');
            if(transform == undefined || $.trim(transform) == '') {
                transform = 'translate(0,0)';
            }else {
                var distanceXY = {dx: 0, dy:0};
                transform = drag.updateGTranslate(g, distanceXY);
            }

            $(g).attr('transform', transform);
        },
        /**
         * 获取g标签上translate的值
         * @param str translate值字符串
         * @returns {{x: number, y: number}}
         */
        getTranslateXY : function(str) {
            var translateStr = str.substring(str.indexOf('(') + 1, str.length - 1);
            var xy = translateStr.split(',');

            return {
                x : Number(xy[0]),
                y : Number(xy[1])
            };
        },
        /**
         * 获取拖动点更新的transform属性值
         */
        updateGTranslate : function(g, distanceXY) {
            var str = this.getTranslateStr(g);
            var xy = this.getTranslateXY(str);
            x = xy.x + distanceXY.dx;
            y = xy.y + distanceXY.dy;
            var translateStr = 'translate(' + x + ',' + y + ')';
            var transformStr = $(g).attr('transform');
            if(transformStr.indexOf('translate') == -1) {
                transformStr += (' ' + translateStr);
            }else {
                var reg = /translate\(([0-9,. -]+)\)/g;
                transformStr = _.replace(transformStr, reg, translateStr);
            }

            return _.trim(transformStr);
        },
        //获取translate字符串
        getTranslateStr : function(g) {
            var str = $(g).attr('transform');
            var arr = str.split(')');
            for(var i = 0; i < arr.length; i++) {
                if(arr[i].indexOf('translate') != -1) {
                    return arr[i] + ')';
                }
            }
        },
        /**
         * 获取拖动的xy偏移量
         * @param targetXY
         * @param startXY
         */
        getDistanceXY : function(targetXY, startXY) {
            return {
                dx : (targetXY.x - startXY.x),
                dy : (targetXY.y - startXY.y)
            };
        },
        getXY : function(e) { //获取鼠标的pageX,pageY
            return {
                x : e.pageX,
                y : e.pageY
            };
        },
        preventBuddle : function(e) { //阻止事件冒泡
            if(e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        },
        changeMouseToDragStyle : function(element) { //元素拖动时改变鼠标样式为拖动样式
            $(element).css({
                cursor : 'move'
            });
        },
        changeMouseToDefaultStyle : function(element) { //元素停止拖动后改变鼠标样式为默认样式
            $(element).css({
                cursor : 'default'
            });
        }
    };
})(jQuery);