/**
 * 考生基本信息控件
 * 默认位置在svg顶部（为了便于创建该控件），通过拖动组件调整位置
 * Created by zhenglian
 * Date: 2016/5/11 0011
 * Time: 上午 11:33
 */
(function($) {
    $.baseInfoElement = {
        settings : {
            uuid: null,
            svg : null,
            element : null,
            editTarget: null, ///用于编辑的元素
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
            g : null,
            grid : { //方格大小
                width : 0,
                height : 0
            },
            totalHeight : 0, //记录注意事项占的高度
            content : { //内容宽度
                x : 0, //位置坐标x
                y : 0,//位置坐标y  默认绘制到svg顶部，通过transform调整位置
                width : 0,
                height : 0 //内容高度 计算产生
            },
            row : { //左侧注意事项行设置
                index: 1, //记录当前绘制的字段索引，用于计算高度
                leftPadding: 10, //左侧文本内间距
                bottomPadding: 10, //文本距离水平分割线的距离
                width : 0, //通过content.width计算占1/3
                height : 40
            },
            zkzhPanel : { //准考证号面板距右侧内容面板的外间距
                marginLeft : 15,
                marginTop : 35,
                titleHeight : 30, //准考证号面板标题高度,
                inputHeight : 35 //考生填入数据的方格高度
            },
            subjectPanel : { //科目面板
                marginLeft: 25,
                marginTop: 20,
                lineHeight: 15,
                titleHeight: 40,
                padding: 20 //左边距

            },
            components : {
                select : null, //选中控件
                drag : null, //拖动控件
                resize : null, //resize控件
                contextMenu: null //右键菜单
            }
        },
        /**
         * 实例化该组件
         */
        newInstance : function() {
            return $.extend(true, {}, this);
        },
        /**
         * 根据设置参数加载控件元素
         *
         * @param params 用户选择显示的注意事项
         */
        loadElement : function(params) {
            this.initParams();
            this.createElement(params);
            this.initEvent();
            this.editable();
        },
        /**
         * 初始化该组件需要用到的参数
         */
        initParams : function() {
            this.settings.svg = $.answerSheet.settings.svg;
            $.extend(this.settings.grid,$.defaultSettingA4.grid);
            $.extend(this.settings.content,$.defaultSettingA4.content);
            var contentWidth = this.settings.content.width;
            this.settings.row.width = contentWidth / 4;

            //计算整个考生信息控件的高度，需要根据右侧准考证号面板计算
            var items = [
                this.settings.zkzhPanel.marginTop * 2,
                this.settings.zkzhPanel.titleHeight,
                this.settings.zkzhPanel.inputHeight,
                this.settings.grid.height * 23
            ];
            this.settings.content.height = _.sum(items);
        },
        /**
         * 创建考生基本信息控件ui
         */
        createElement : function(params) {
            this.settings.element = this;
            if(params.length == 0) {
                throw new Error('创建失败,缺少基本信息元素!');
            }

            var constant = $.answerSheet.settings.constant;
            var svg = this.settings.svg;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            $(g).addClass("element");
            g.obj = this;
            this.settings.g = g;
            svg.appendChild(g);
            var uuid = $.utils.randomUUID();
            this.settings.uuid = uuid;
            $(g).attr('id', uuid);

            this.appendContainerRect();
            this.appendSeperatorLine();
            this.appendLeftAttentionNote(params);
            this.drawZkzhPanel(params);
            if(_.indexOf(params, 'subject') != -1) {
            	this.drawSubjectPanel();
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
         * 绘制左侧注意事项和考生基本信息
         */
        appendLeftAttentionNote : function(params) {
            var element = this;
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            this.settings.g.appendChild(g);

            var drawFn = null;
            var fnName = null;
            for(var i = 0; i < params.length; i++) {
                fnName = 'element.draw' + _.capitalize(params[i].substring(0, 1)) + params[i].substring(1);
                drawFn = eval('(' + fnName + ')');
                if(drawFn != undefined) {
                	drawFn.apply(element, [g]);
                }
            }
        },
        /**
         * 绘制考生信息容器面板
         */
        appendContainerRect : function() {
            var content = this.settings.content;
            var containerRect = $.uiBuilder.drawRect(content.x, content.y, content.width, content.height, true, '#fff');
            this.settings.editTarget = containerRect;
            this.settings.g.appendChild(containerRect);
        },
        /**
         * 绘制左右面板分割线
         */
        appendSeperatorLine : function() {
            //绘制左右面板分割线
            var x1 = this.settings.row.width;
            var y1 = this.settings.content.y;
            var y2 = y1 + this.settings.content.height;
            var seperatorLine = $.uiBuilder.drawLine(x1, y1, x1, y2);
            this.settings.g.appendChild(seperatorLine);
        },
        //绘制科目面板
        drawSubjectPanel : function() {
            var parentG = this.settings.g;
            var constant = $.answerSheet.settings.constant;
            var subjectPanel = this.settings.subjectPanel;
            //右侧内容面板宽度
            var content = this.settings.content;
            var zkzhPanel = this.settings.zkzhPanel;

            var width = content.width - this.settings.row.width;

            var zkzhPanelWidth = (width - zkzhPanel.marginLeft*2) * 3 / 4;

            var panelWidth = width - zkzhPanel.marginLeft - zkzhPanelWidth
                - subjectPanel.marginLeft * 2;
            var panelHeight = content.height - subjectPanel.marginTop * 2;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);
            var x = this.settings.row.width;
            var y = 0;
            //绘制科目标题面板
            $.uiBuilder.drawRectAndCenterText(x, y, panelWidth, subjectPanel.titleHeight,'科目',g);
            //绘制科目内容面板
            var contentPanelG = document.createElementNS(constant.SVN_NS, 'g');
            $(contentPanelG).attr('transform', 'translate(0, 0)');
            g.appendChild(contentPanelG);

            var panel = $.uiBuilder.drawRect(x, (y+subjectPanel.titleHeight),
                panelWidth,(panelHeight-subjectPanel.titleHeight));
            contentPanelG.appendChild(panel);


            this.renderSubjects(panelWidth, panelHeight-subjectPanel.titleHeight, contentPanelG);

            var translateStr = 'translate(' + (zkzhPanel.marginLeft+zkzhPanelWidth+subjectPanel.marginLeft) + ','
                + subjectPanel.marginTop + ')';
            $(g).attr('transform', translateStr);

        },
        //根据$.subject渲染科目内容,居中显示
        renderSubjects : function(panelWidth, panelHeight, parentG) {
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);

            var subjectPanel = this.settings.subjectPanel;
            var row = this.settings.row;
            var curSubject = $.answerSheet.settings.subject.value;
            var grid = this.settings.grid;
            var subjects = $.subject;

            var index = 0;
            var name = null;
            var value = -1;
            var x = row.width;
            var y = 0;
            var text = null;
            var rect = null;
            var rectX = 0;
            var fill = false;
            var fillColor = '#000';
            var maxTextWidth = 0;
            for(key in subjects) {
                if(key && subjects.hasOwnProperty(key)) {
                    name = subjects[key].name;
                    value = subjects[key].value;

                    y = subjectPanel.titleHeight + (15 + subjectPanel.lineHeight) * index; //15为行高

                    text = $.uiBuilder.drawText(x, y, name);
                    g.appendChild(text);
                    rectX = x + text.getBBox().width + subjectPanel.padding;
                    if(text.getBBox().width > maxTextWidth) {
                        maxTextWidth = text.getBBox().width;
                    }
                    if(curSubject == value) {
                        fill = true;
                        fillColor = '#000';
                    }else {
                        fill = false;
                    }
                    rect = $.uiBuilder.drawRect(rectX, (y-15), grid.width, grid.height, fill, fillColor);
                    g.appendChild(rect);

                    index++;
                }
            }

            //将输出的内容居中到面板中央
            var contentWidth = maxTextWidth + subjectPanel.padding + grid.width;
            var transX = (panelWidth - contentWidth) / 2;
            var transY = (panelHeight - (15 + subjectPanel.lineHeight) * index) / 2;
            var translateStr = 'translate(' + transX + ','
                + transY + ')';
            $(g).attr('transform', translateStr);
        },
        //绘制右侧准考证号面板
        drawZkzhPanel : function(params) {
            var parentG = this.settings.g;
            var constant = $.answerSheet.settings.constant;
            //右侧内容面板宽度
            var content = this.settings.content;
            var zkzhPanel = this.settings.zkzhPanel;
            //右侧占3/4控件宽度的准考证号内容面板
            var width = content.width - this.settings.row.width;
            
            var panelWidth = (width - zkzhPanel.marginLeft*2); //科目面板占剩下的1/4
            if(_.indexOf(params, 'subject') != -1) { //如果存在科目面板
            	panelWidth *= (3/4);
            }
            //右侧准考证号面板左上角坐标
            var x = this.settings.row.width;
            var y = 0;
            //通过g translate来调整最终位置
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);
            //绘制准考证号面板头部信息==============准考证号=============
            this.appendZkzhHeaderPanel(x, y, panelWidth, g);

            //绘制准考证号填涂面板
            this.appendZkzhFillingPanel(x, y, panelWidth, g);

            //右侧准考证号居中面板
            var translateStr = 'translate(' + zkzhPanel.marginLeft + ',' + zkzhPanel.marginTop + ')';
            $(g).attr('transform', translateStr);
        },
        /**
         * 绘制准考证号面板标题
         */
        appendZkzhHeaderPanel : function(x, y, width, parentG) {
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);

            var rect = $.uiBuilder.drawRect(x, y, width, this.settings.zkzhPanel.titleHeight);
            g.appendChild(rect);
            var label = $.uiBuilder.drawText(x, (y + this.settings.zkzhPanel.titleHeight / 2), '准考证号', 20);
            g.appendChild(label);
            $.uiBuilder.centerText(label, x, width);
        },
        /**
         *  绘制准考证号填涂面板
         *
         */
        appendZkzhFillingPanel : function(x, y, width, parentG) {
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);

            var itemWidth = Number(width / 12);

            //一共有12位准考证号
            var itemG = null;
            for(var i = 0; i < 12; i++) {
                this.createItemG(x, y, i, itemWidth, parentG);
            }
        },
        //针对每一位准考证号创建对应的填涂区域
        createItemG : function(x, y, index, itemWidth, parentG) {
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);

            x = x + index * itemWidth;
            y = y + this.settings.zkzhPanel.titleHeight;
            var inputHeight = this.settings.zkzhPanel.inputHeight;
            //首先绘制输入框
            var rect = $.uiBuilder.drawRect(x, y, itemWidth, inputHeight);
            g.appendChild(rect);

            var containerY = y + inputHeight;
            //绘制填涂的九个小方格的容器
            var grid = this.settings.grid;
            var containerHeight = 23 * grid.height;
            var containerRect = $.uiBuilder.drawRect(x, containerY, itemWidth, containerHeight);
            g.appendChild(containerRect);
            //绘制填涂的九个小方格
            var gridX = _.parseInt(x + (itemWidth - grid.width) / 2);
            var gridY = 0;
            var origY = containerY + grid.height * 2;
            var gridRect = null;
            var gridNumText = null;
            for(var i = 0; i < 10; i++) {
                gridY = origY + (i * 2) * grid.height;
                $.uiBuilder.drawRectAndCenterText(gridX, gridY, grid.width, grid.height, i, parentG);
            }
        },
        /**
         * 初始化元素点击事件
         */
        initEvent : function(parentG) {
        	this.handleDoubleClickEvent();
        },
        /**
         * 双击编辑事件
         */
        handleDoubleClickEvent: function() {
        	var element = this;
            $(this.settings.editTarget).on('dblclick', function() {
                element.editElement();
            });
        },
        /**
         * 编辑元素
         */
        editElement : function() {
            $.baseInfoDialog.loadDialog(this);
        },
        /**
         * 绘制用户名
         */
        drawUserName : function(parentG) {
            this.drawTextField('姓名：', parentG);
        },
        //绘制班级
        drawClassName : function(parentG) {
            this.drawTextField('班级：', parentG);
        },
        //正误填涂
        drawFilling : function(parentG) {
            var row = this.settings.row;
            var splitWidth = row.width / 3; //正误填涂分割线距离
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);

            this.drawCorrectFilling(splitWidth, g);
            this.drawErrorFilling(splitWidth, g);
        },
        //绘制正确填涂
        drawCorrectFilling : function(splitWidth, g) {
            var row = this.settings.row; //左侧基本信息行宽高
            var rowHeight = row.height * row.index;
            var grid = this.settings.grid;
            //绘制文本信息
            var textLabel = $.uiBuilder.drawText(row.leftPadding, rowHeight-row.bottomPadding, '正确填涂：');
            g.appendChild(textLabel);

            //绘制分割线
            var line = $.uiBuilder.drawLine(splitWidth, row.height * (row.index - 1),
                splitWidth, row.height * row.index);
            g.appendChild(line);
            //绘制正确填涂黑色矩形框
            // var rectHeight = row.height * (row.index - 1) + (row.height - grid.height) / 2; //绘制在当前属性栏中央
            var correctRect = $.uiBuilder.drawRect(splitWidth + row.leftPadding, rowHeight - row.bottomPadding - 15,
                grid.width, grid.height, true); //15为字体大小
            g.appendChild(correctRect);

            row.index++;
        },
        //绘制错误填涂
        drawErrorFilling : function(splitWidth, g) {
            var row = this.settings.row; //左侧基本信息行宽高
            var rowHeight = row.height * row.index;
            //绘制文本信息
            var textLabel = $.uiBuilder.drawText(row.leftPadding, rowHeight-row.bottomPadding, '错误填涂：');
            g.appendChild(textLabel);

            //绘制分割线
            var vLine = $.uiBuilder.drawLine(splitWidth, row.height * (row.index - 1),
                splitWidth, row.height * row.index);
            g.appendChild(vLine);

            //绘制底部分割线
            var hLine = $.uiBuilder.drawLine(0, rowHeight, row.width, rowHeight);
            g.appendChild(hLine);
            //绘制错误填涂几种情形的示例矩形框
            this.drawTickFilling(splitWidth, g);
            this.drawForkFilling(splitWidth, g);
            this.drawEllipseFilling(splitWidth, g);
            this.drawIrregularFilling(splitWidth, g);

            row.index++;
        },
        //勾
        drawTickFilling: function(splitWidth, parentG) {
            var row = this.settings.row; //左侧基本信息行宽高
            var grid = this.settings.grid;
            var rowHeight = row.height * row.index;
            var x = splitWidth + row.leftPadding;
            var y = rowHeight - row.bottomPadding - 15;
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, 'A', parentG);

            //绘制勾路径
            var d = 'M' + x + ' ' + (y + 5) + ' L' + (x+grid.width / 3) + ' ' + (y + grid.height)
                + ' L' + (x + grid.width) + ' ' + y;
            var path = $.uiBuilder.drawPath(d, '#000', 2);
            parentG.appendChild(path);
        },
        //叉
        drawForkFilling: function(splitWidth, parentG) {
            var row = this.settings.row; //左侧基本信息行宽高
            var grid = this.settings.grid;
            var rowHeight = row.height * row.index;
            var x = splitWidth + row.leftPadding + grid.width + row.leftPadding;
            var y = rowHeight - row.bottomPadding - 15;
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, 'B', parentG);

            //绘制勾路径
            var d = 'M' + (x + 3) + ' ' + (y-3) + ' L' + (x + grid.width - 3) + ' ' + (y + grid.height + 3)
            var path = $.uiBuilder.drawPath(d, '#000', 2);
            parentG.appendChild(path);
            var d2 = 'M' + (x + grid.width - 3) + ' ' + (y-3) + ' L' + (x + 3) + ' ' + (y + grid.height + 3);
            var path2 = $.uiBuilder.drawPath(d2, '#000', 2);
            parentG.appendChild(path2);
        },
        //椭圆
        drawEllipseFilling: function(splitWidth, parentG) {
            var row = this.settings.row; //左侧基本信息行宽高
            var grid = this.settings.grid;
            var rowHeight = row.height * row.index;
            var x = splitWidth + row.leftPadding + (grid.width + row.leftPadding) * 2;
            var y = rowHeight - row.bottomPadding - 15;
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, 'C', parentG);

            //绘制勾路径
            var cx = x + grid.width / 2;
            var cy = y + grid.height / 2;
            var rx = grid.width / 2;
            var ry = grid.height / 2;
            var ellipse = $.uiBuilder.drawEllipse(cx, cy, rx, ry, 2);
            parentG.appendChild(ellipse);
        },
        //其他图形
        drawIrregularFilling: function(splitWidth, parentG) {
            var row = this.settings.row; //左侧基本信息行宽高
            var grid = this.settings.grid;
            var rowHeight = row.height * row.index;
            var x = splitWidth + row.leftPadding + (grid.width + row.leftPadding) * 3;
            var y = rowHeight - row.bottomPadding - 15;
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, 'D', parentG);

            //绘制其他图形
            var d = 'M' + (x + 2) + ' ' + (y + grid.height / 2) + ' L'
                + (x + grid.width - 2) + ' ' + (y + grid.height / 2) + 'z';
            var shape = $.uiBuilder.drawPath(d, '#000', 2);
            parentG.appendChild(shape);
        },
        //只绘制矩形和文本，不绘制其中的路径
        drawRectTextFilling: function(x, y, text, parentG) {
            var grid = this.settings.grid;
            $.uiBuilder.drawRectAndCenterText(x, y, grid.width, grid.height, text, parentG);
        },
        //缺考标记
        drawAbsent : function(parentG) {
            var constant = $.answerSheet.settings.constant;
            var grid = this.settings.grid;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);

            var row = this.settings.row; //左侧基本信息行宽高
            var splitWidth = row.width / 3;
            var rowHeight = row.height * row.index;
            //绘制文本信息
            var textLabel = $.uiBuilder.drawText(row.leftPadding, rowHeight-row.bottomPadding, '缺考标记：');
            g.appendChild(textLabel);

            //绘制分割线
            var vLine = $.uiBuilder.drawLine(splitWidth, row.height * (row.index - 1),
                splitWidth, row.height * row.index);
            g.appendChild(vLine);

            //绘制底部分割线
            var hLine = $.uiBuilder.drawLine(0, rowHeight, row.width, rowHeight);
            g.appendChild(hLine);

            var x = splitWidth + row.leftPadding;
            var y = rowHeight - row.bottomPadding - 15;
            var rect = $.uiBuilder.drawRect(x, y, grid.width, grid.height);
            g.appendChild(rect);
            row.index++;
        },

        //注意事项
        drawAttentionNote : function(parentG) {
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);

            var row = this.settings.row; //左侧基本信息行宽高
            var rowHeight = row.height * row.index;
            var textLabel = $.uiBuilder.drawText(row.leftPadding, rowHeight - row.bottomPadding, '注意事项：');
            g.appendChild(textLabel);
            row.index++;

            rowHeight = row.height * row.index;
            var y = rowHeight - row.bottomPadding - 15;
            var text = $.settings.baseInfo.attentionNote;
            var textContent = $.uiBuilder.drawMultiLineText(row.leftPadding, y, text);

            g.appendChild(textContent);

        },
        drawTextField : function(text, parentG) {
            var constant = $.answerSheet.settings.constant;
            var g = document.createElementNS(constant.SVN_NS, 'g');
            $(g).attr('transform', 'translate(0, 0)');
            parentG.appendChild(g);

            var row = this.settings.row; //左侧基本信息行宽高
            var rowHeight = row.height * row.index;
            var line = $.uiBuilder.drawLine(0, rowHeight, row.width, rowHeight);
            g.appendChild(line); //绘制分隔线

            //绘制文本
            var textLabel = $.uiBuilder.drawText(row.leftPadding, rowHeight - row.bottomPadding, text);
            g.appendChild(textLabel);
            row.index++;
        },
        editable : function() {
            //选中
            if(this.settings.components.select == null) {
                this.settings.components.select = $.elementSelect.newInstance();
            }
            this.settings.components.select.enable(this);

            //拖动
            if(this.settings.components.drag == null) {
                this.settings.components.drag = $.elementDrag.newInstance();
            }
            this.settings.components.drag.enable(this);

            //resize
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