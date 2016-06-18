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
        enable: function(elementObj) {
            if(!elementObj) {
                throw new Error('错误，当前要选中的目标元素为空!');
            }

            this.resize(elementObj);
        },
        /**
         * resize控件入口函数
         * @param elementObj
         */
        resize: function(elementObj) {
            //TODO 需要修改elementObj

            this.drawEightPoints(elementObj.settings.editTarget);
            this.initEvent(elementObj);
        },
        /**
         * 为resize控件添加事件响应
         * @param element
         */
        initEvent : function(elementObj) {
            this.initPointDragEvent(elementObj);
        },
        /**
         * 8个助拖点拖动事件
         * @param element
         */
        initPointDragEvent: function(elementObj) {
            var resize = this;
            var parentG = elementObj.settings.g;
            var pointG = this.settings.pointG;
            var point = null;

            var startXY = null; //开始鼠标位置坐标
            var curXY = null; //当前鼠标位置坐标
            var distanceXY = null; //鼠标移动的差值坐标
            var transformStr = null; //更新后的transformStr
            $(pointG).find('.point').on('mousedown', function(e) {
                e.preventDefault();
                point = $(this);
                var pointCls = $(point).attr('class').split(' ')[1];
                startXY = resize.getXY(e);
                //处理鼠标按住拖动事件
                $(document).on('mousemove', function(e) {
                    e.preventDefault();
                    curXY = resize.getXY(e);
                    distanceXY = resize.getDistanceXY(startXY, curXY);

                    switch(pointCls) {
                        case 'leftUp': //左上角
                            transformStr = resize.getLeftUpTransformer(elementObj, distanceXY);
                            break;
                        case 'up': //上中点
                            transformStr = resize.getUpTransformer(elementObj, distanceXY);
                            break;
                        case 'rightUp': //右上角
                            transformStr = resize.getRightUpTransformer(elementObj, distanceXY);
                            break;
                        case 'left': //左中点
                            transformStr = resize.getLeftTransformer(elementObj, distanceXY);
                            break;
                        case 'right': //右中点
                            transformStr = resize.getRightTransformer(elementObj, distanceXY);
                            break;
                        case 'leftDown': //左下角
                            transformStr = resize.getLeftDownTransformer(elementObj, distanceXY);
                            break;
                        case 'down':
                            transformStr = resize.getDownTransformer(elementObj, distanceXY);
                            break;
                        case 'rightDown': //右下角
                            transformStr = resize.getRightDownTransformer(elementObj, distanceXY);
                            break;
                    }

                    $(parentG).attr('transform', transformStr);

                    startXY = $.extend(true, {}, curXY);
                });

                $(document).on('mouseup', function(e) {
                    //清理现场
                    e.preventDefault();
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                });
            });
        },
        /**
         * 获取左上角改变后的transform属性
         * translate (x-,y-), scale (x-,y+)
         * @param elementObj
         * @param distanceXY
         */
        getLeftUpTransformer: function(elementObj, distanceXY) {
            var resize = this;
            var curSize = elementObj.settings.resize.curSize;
            curSize.width -= distanceXY.dx;
            curSize.height -= distanceXY.dy;

            return resize.updateGTransform(elementObj, curSize, distanceXY);
        },
        /**
         * 获取上中点改变后的transform属性
         * @param elementObj
         * @param distanceXY
         */
        getUpTransformer: function(elementObj, distanceXY) {
            var resize = this;
            var curSize = elementObj.settings.resize.curSize;
            curSize.height -= distanceXY.dy;
            distanceXY.dx = 0; //进行垂直方向缩放时禁止水平拖动

            return resize.updateGTransform(elementObj, curSize, distanceXY);
        },
        /**
         * 获取右上角改变后的transform属性
         * @param elementObj
         * @param distanceXY
         * @returns {*|string}
         */
        getRightUpTransformer: function(elementObj, distanceXY) {
            var resize = this;
            var curSize = elementObj.settings.resize.curSize;
            curSize.width += distanceXY.dx;
            curSize.height -= distanceXY.dy;
            distanceXY.dx = 0;

            return resize.updateGTransform(elementObj, curSize, distanceXY);
        },
        /**
         * 获取左中点改变后的transform属性
         * @param elementObj
         * @param distanceXY
         */
        getLeftTransformer: function(elementObj, distanceXY){
            var resize = this;
            var curSize = elementObj.settings.resize.curSize;
            curSize.width -= distanceXY.dx;
            distanceXY.dy = 0;

            return resize.updateGTransform(elementObj, curSize, distanceXY);
        },
        /**
         * 获取右中点改变后的transform属性
         * @param elementObj
         * @param distanceXY
         */
        getRightTransformer: function(elementObj, distanceXY) {
            var resize = this;
            var curSize = elementObj.settings.resize.curSize;
            curSize.width += distanceXY.dx;
            distanceXY.dx = 0;
            distanceXY.dy = 0;

            return resize.updateGTransform(elementObj, curSize, distanceXY);
        },
        /**
         * 获取左下角改变后的transform属性
         * @param elementObj
         * @param distanceXY
         */
        getLeftDownTransformer: function(elementObj, distanceXY) {
            var resize = this;
            var curSize = elementObj.settings.resize.curSize;
            curSize.width -= distanceXY.dx;
            curSize.height += distanceXY.dy;

            distanceXY.dy = 0;

            return resize.updateGTransform(elementObj, curSize, distanceXY);
        },
        /**
         * 获取改变下中点后的transform属性
         * @param elementObj
         * @param distanceXY
         */
        getDownTransformer: function(elementObj, distanceXY) {
            var resize = this;
            var curSize = elementObj.settings.resize.curSize;
            curSize.height += distanceXY.dy;
            distanceXY.dx = 0;
            distanceXY.dy = 0;

            return resize.updateGTransform(elementObj, curSize, distanceXY);
        },
        /**
         * 获取改变右下角后的transform属性值
         * @param elementObj
         * @param distanceXY
         */
        getRightDownTransformer: function(elementObj, distanceXY) {
            var resize = this;
            var curSize = elementObj.settings.resize.curSize;
            curSize.width += distanceXY.dx;
            curSize.height += distanceXY.dy;
            distanceXY.dx = 0;
            distanceXY.dy = 0;

            return resize.updateGTransform(elementObj, curSize, distanceXY);
        },
        /**
         * 统一获取改变后的transform属性值
         * @param elementObj
         * @param curSize
         * @param distanceXY
         * @returns string
         */
        updateGTransform: function(elementObj, curSize, distanceXY) {
            var resize = this;
            var g = elementObj.settings.g;

            var transformStr = resize.updateGTranslate(g, distanceXY);
            $(g).attr('transform', transformStr);

            var scaleXY = resize.getScaleXY(elementObj, curSize, distanceXY);
            transformStr = resize.updateGScale(g, scaleXY);

            return transformStr;
        },
        /**
         * 根据translate获取scaleXY
         * @param elementObj
         * @param curSize
         * @param distanceXY
         * @return {x:scaleX, y:scaleY}
         */
        getScaleXY: function(elementObj, curSize, distanceXY) {
            var size = elementObj.settings.resize.size;
            return {
                x: (curSize.width / size.width),
                y: (curSize.height / size.height)
            };
        },
        /**
         * 获取鼠标当前位置信息
         * @param e
         * @returns {x: *, y: *}
         */
        getXY: function(e) {
            return {
                x: e.pageX,
                y: e.pageY
            };
        },
        /**
         * 根据开始位置和当前位置获取坐标差值
         * @param startXY
         * @param curXY
         */
        getDistanceXY: function(startXY, curXY) {
            return {
                dx: curXY.x - startXY.x,
                dy: curXY.y - startXY.y
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
        /**
         * 根据给定的g和更新的scaleXY改变scale值
         * @param g
         * @param scaleXY
         */
        updateGScale: function(g, scaleXY) {
            var scaleStr = 'scale(' + scaleXY.x + ',' + scaleXY.y + ')';
            var transformStr = $(g).attr('transform');
            if(transformStr.indexOf('scale') == -1) {
                transformStr += (' ' + scaleStr);
            }else {
                var reg = /scale\(([0-9,. ]+)\)/g;
                transformStr = _.replace(transformStr, reg, scaleStr);
            }

            return _.trim(transformStr);
        },
        /**
         * 获取g标签上translate的值
         * @param translateStr translate值字符串
         * @returns {{x: number, y: number}}
         */
        getTranslateXY : function(translateStr) {
            var str = translateStr.substring(translateStr.indexOf('(') + 1, translateStr.length - 1);
            var xy = str.split(',');

            return {
                x : Number(xy[0]),
                y : Number(xy[1])
            };
        },
        /**
         * 获取translate字符串
         * @param g
         * @returns {*}
         */
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
