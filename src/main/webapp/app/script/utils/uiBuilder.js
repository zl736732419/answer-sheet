/**
 * 绘制图形的工具类，用于绘制答题卡上需要的各种图形界面
 * Created by zhenglian
 * Date: 2016/5/11 0011
 * Time: 下午 4:02
 */
(function($) {
    $.uiBuilder = {

        /**
         * 绘制矩形
         * @param x
         * @param y
         * @param width
         * @param height
         * @param fill
         */
        drawRect : function(x, y, width, height, fill, fillColor) {
        	var constant = $.utils.settings.constant;
            var rect = document.createElementNS(constant.SVG_NS, "rect");
            $(rect).attr('x', x)
                .attr('y', y)
                .attr('width', width)
                .attr('height', height)
                .attr('stroke-width', 1).attr('stroke', '#000');
                if(fill) {
                    $(rect).attr('fill', fillColor);
                }else {
                    $(rect).attr('fill', 'none');
                }

            return rect;
        },
        //绘制矩形框，其中包含居中的文本
        drawRectAndCenterText : function(x, y, width, height, text, parentG) {
        	var constant = $.utils.settings.constant;
            var g = document.createElementNS(constant.SVG_NS, 'g');
            parentG.appendChild(g);
            //绘制矩形
            var rect = this.drawRect(x, y, width, height);
            g.appendChild(rect);
            //绘制文本
            var textLabel = this.drawText(x, (y + height / 2), text);
            g.appendChild(textLabel);
            this.centerText(textLabel, x, width);
            return g;
        },
        //绘制路径
        drawPath : function(pathStr, color, size) {
        	var constant = $.utils.settings.constant;
            var path = document.createElementNS(constant.SVG_NS, 'path');
            $(path).attr('d', pathStr)
                .attr('stroke', color)
                .attr('stroke-width', size)
                .attr('fill', 'none');

            return path;
        },
        /**
         * 画椭圆
         * @param cx 圆心
         * @param cy
         * @param rx x半径
         * @param ry y半径
         * @param size stroke-width宽度
         * @returns {Element}
         */
        drawEllipse : function(cx, cy, rx, ry, size) {
        	var constant = $.utils.settings.constant;
            var ellipse = document.createElementNS(constant.SVG_NS, 'ellipse');
            $(ellipse).attr('cx', cx)
                .attr('cy', cy)
                .attr('rx', rx)
                .attr('ry', ry)
                .attr('stroke', '#000')
                .attr('stroke-width', size)
                .attr('fill', 'none');

            return ellipse;
        },
        /**
         * 画圆
         * @param cx
         * @param cy
         * @param r
         * @param fill
         */
        drawCircle : function(cx, cy, r, fill, fillColor) {
        	var constant = $.utils.settings.constant;
            var circle = document.createElementNS(constant.SVG_NS, 'circle');
            $(circle).attr('cx', cx)
                .attr('cy', cy)
                .attr('r', r)
                .attr('stroke-width', 1);
            if(fill) {
                if(fillColor == undefined) {
                    fillColor = '#000';
                }
                $(circle).attr('fill', fillColor);
            }
        },
        /**
         * 绘制渐变色的圆
         * 比如用于绘制resize八个助拖点
         * @param cx
         * @param cy
         * @param r
         * @param innerColor
         * @param outerColor
         */
        drawCircleRadialGradient : function(cx, cy, r, innerColor, outerColor) {
        	var constant = $.utils.settings.constant;
            var gradientId = this.drawRadialGradient(innerColor, outerColor);
            var fill = 'url(' + gradientId + ')';

            var circle = document.createElementNS(constant.SVG_NS, 'circle');
            $(circle).attr('cx', cx)
                .attr('cy', cy)
                .attr('r', r)
                .attr('fill', fill);

            return circle;
        },
        /**
         * 绘制放射渐变
         * @param innerColor
         * @param outerColor
         */
        drawRadialGradient : function(innerColor, outerColor) {
            var gradientId = $.utils.randomUUID();
            var constant = $.utils.settings.constant;
            var radiusGradient = document.createElementNS(constant.SVG_NS, 'radialGradient');
            var $answerSheet = $.examPapers.settings.curSheet;
            var svg = $answerSheet.settings.svg;
            var defs = $(svg).find('defs');
            if(defs.length == 0) {
                defs = document.createElementNS(constant.SVG_NS, 'defs');
                $(defs).addClass('elements');
                svg.appendChild(defs);
            }

            $(radiusGradient).attr('id', gradientId)
                .attr('fx', '70%')
                .attr('fy', '60%');
            var start = document.createElementNS(constant.SVG_NS, 'stop');
            $(start).attr('offset', '10%')
                .attr('stop-color', innerColor);
            radiusGradient.appendChild(start);
            var stop = document.createElementNS(constant.SVG_NS, 'stop');
            $(stop).attr('offset', '80%')
                .attr('stop-color', outerColor);
            radiusGradient.appendChild(stop);

            $(defs).append(radiusGradient);

            return '#' + gradientId;
        },


        /**
         * 绘制文本消息
         * @param x
         * @param y
         * @param text
         */
        drawText : function(x, y, label, fontSize) {
            if(fontSize == undefined || isNaN(fontSize)) {
                fontSize = 15;
            }
            var constant = $.utils.settings.constant;
            //绘制准考证号文字标题
            var text = document.createElementNS(constant.SVG_NS, "text");
            $(text).attr('x', x).attr('y', y);
            text.onselectstart = function() { //定义文本不可选中
                return false;
            };
            text.textContent = label;
            $(text).css({
                color: '#000',
                fontSize: fontSize + 'px'
            });

            return text;
        },
        drawLine : function(x1, y1, x2, y2) {
        	var constant = $.utils.settings.constant;
           var line = document.createElementNS(constant.SVG_NS, "line");
           $(line).attr('x1', x1)
               .attr('y1', y1)
               .attr('x2', x2)
               .attr('y2', y2)
               .attr('stroke-width', 1).attr('stroke', '#000');
           return line;
        },
        //绘制多行
        /**
         *
         * @param x
         * @param y
         * @param text 要绘制的文本字符串
         * @param padding 每行的间距
         * @param fontSize 字体大小
         * @param num 每行显示的文本数
         * @param g 容器g
         */
        drawMultiLineText : function(x, y, text, padding, fontSize, num, parentG) {
            if(!padding) {
                padding = 15;
            }
            if(!num) {
                num = 17;
            }
            if(!fontSize) {
                fontSize = 15;
            }
            var constant = $.utils.settings.constant;
            var textUI = document.createElementNS(constant.SVG_NS, "text");
            $(textUI).attr('x', x)
                .attr('y', y)
                .attr('font-size', fontSize)
                .attr('fill', '#000');
            textUI.onselectstart = function() { //定义文本不可选中
                return false;
            };
            parentG.appendChild(textUI);
            var label = '';
            var tspan = null;
            var index = 0;
            var tspanHeight = 0;
            for(var i = 0; i < text.length; i++) {
                label += text[i];
                if(i % num == 0 && i != 0) {
                    tspan = document.createElementNS(constant.SVG_NS, "tspan");
                    	
                    if(index != 0) {
                    	y = y + ((tspanHeight + padding) * index++);
                    }else {
                    	index++;
                    }
                    
                    $(tspan).attr('x', x)
                        .attr('y', y);
                    tspan.textContent = label;
                    textUI.appendChild(tspan);
                    if(tspanHeight == 0) {
                		tspanHeight = tspan.getBBox().height;
                	}
                    label = '';
                }
            }

            if(label != '') {
                tspan = document.createElementNS(constant.SVG_NS, "tspan");
                $(tspan).attr('x', x)
                    .attr('y', y + ((tspanHeight + padding) * index++));
                tspan.textContent = label;
                textUI.appendChild(tspan);
            }

            return textUI;
        },
        /**
         * 将准考证号标题水平垂直居中面板
         * @param text 要居中的文本
         * @param x 容器左上角x坐标
         * @param containerWidth 文本容器的宽度
         */
        centerText : function(text, x, containerWidth) {
            //水平居中
            var box = text.getBBox();
            var newX = (containerWidth - box.width) / 2;
            $(text).attr('x', x + newX);
            //垂直居中
            var by = box.y;
            var y = $(text).attr('y');
            var dy = y - (by + box.height / 2);
            $(text).attr('dy', dy);
        }
    }
})(jQuery);