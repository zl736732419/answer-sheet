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
            var constant = $.answerSheet.settings.constant;
            var rect = document.createElementNS(constant.SVN_NS, "rect");
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
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
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
            var constant = $.answerSheet.settings.constant;
            var path = document.createElementNS(constant.SVN_NS, 'path');
            $(path).attr('d', pathStr)
                .attr('stroke', color)
                .attr('stroke-width', size)
                .attr('fill', 'none');

            return path;
        },
        //画椭圆
        drawEllipse : function(cx, cy, rx, ry, size) {
            var constant = $.answerSheet.settings.constant;
            var ellipse = document.createElementNS(constant.SVN_NS, 'ellipse');
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
         * 绘制文本消息
         * @param x
         * @param y
         * @param text
         */
        drawText : function(x, y, label, fontSize) {
            if(fontSize == undefined || isNaN(fontSize)) {
                fontSize = 15;
            }
            var constant = $.answerSheet.settings.constant;
            //绘制准考证号文字标题
            var text = document.createElementNS(constant.SVN_NS, "text");
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
           var constant = $.answerSheet.settings.constant;
           var line = document.createElementNS(constant.SVN_NS, "line");
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
         */
        drawMultiLineText : function(x, y, text, padding, fontSize, num) {
            if(!padding) {
                padding = 15;
            }
            if(!num) {
                num = 17;
            }
            if(!fontSize) {
                fontSize = 15;
            }
            var constant = $.answerSheet.settings.constant;
            var textUI = document.createElementNS(constant.SVN_NS, "text");
            $(textUI).attr('x', x)
                .attr('y', y)
                .attr('font-size', fontSize)
                .attr('fill', '#000');
            textUI.onselectstart = function() { //定义文本不可选中
                return false;
            };
            var label = '';
            var tspan = null;
            var index = 0;
            for(var i = 0; i < text.length; i++) {
                label += text[i];
                if(i % num == 0 && i != 0) {
                    tspan = document.createElementNS(constant.SVN_NS, "tspan");
                    $(tspan).attr('x', x)
                        .attr('y', y + ((fontSize + padding) * index++));
                    tspan.textContent = label;
                    textUI.appendChild(tspan);
                    label = '';
                }
            }

            if(label != '') {
                tspan = document.createElementNS(constant.SVN_NS, "tspan");
                $(tspan).attr('x', x)
                    .attr('y', y + ((fontSize + padding) * index++));
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