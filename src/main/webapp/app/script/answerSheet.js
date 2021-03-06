/**
 * Created by zhenglian
 * Date: 2016/5/3 0003
 * Time: 下午 4:31
 *
 * 答题卡处理对象
 */
(function($) {
    $.answerSheet = {
        settings : {
            subject: $.subject.basic, //默认是语文
            ui : '.answerSheetSvg',
            sheetDiv: null,
            pageNum: 1, //默认题卡为第一页
            index: 0,//当前题卡所在索引
            svg : null, //通过ui实例化的svg对象,为了预览方便，后续预览操作直接将svg作为参数传递过来
            defaultSetting: null,
            anchorPoint: null,//记录一张题卡上的定位点对象
            answerSheetPanel: '.answerSheetPanel',
            elements : [] //已经添加的内容列表
        },
        /**
         * 创建一张新的题卡
         */
        newInstance : function() {
            return $.extend(true, {}, this);
        },

        /**
         * 初始化加载答题卡，入口函数
         */
        loadAnswerSheet : function(defaultSetting, svg) {
            this.initParams(defaultSetting, svg);
            this.initEvent();
        },
        /**
         * 初始化参数信息
         * @param defaultSetting
         * @param svg
         * @param title
         */
        initParams : function(defaultSetting, svg) {
            if(!defaultSetting) {
                this.settings.defaultSetting = $.defaultSettingA4;
                if(!this.settings.defaultSetting) {
                    throw new Error('A4默认参数设置为空!');
                }
            }else {
                this.settings.defaultSetting = defaultSetting;
            }

            if(svg) {
                this.settings.svg = svg;
            }else {
                this.settings.svg = this.createNewSVG();
            }

            this.settings.svg.obj = this;
            this.renderAnswerSheet();
            this.initAnchorPoint();
        },
        /**
         * 初始化定位点对象
         */
        initAnchorPoint: function() {
            if(this.settings.anchorPoint == null) {
                var anchorPoint = $.anchorPoint.newInstance();
                anchorPoint.loadPoints(this);
                this.settings.anchorPoint = anchorPoint;
            }
        },
        /**
         * 创建新的svg画布
         */
        createNewSVG: function() {
            var constant = $.utils.settings.constant;
            var svgCls = this.settings.ui;
            var svg = document.createElementNS(constant.SVG_NS, 'svg');
            $(svg).addClass(svgCls.substring(1))
                .attr('xmlns', constant.SVG_NS)
                .attr('xmlns:xlink', constant.LINK_NS);

            var $answerSheetDiv = $('<div>', {'class': 'answerSheetDiv'});
            $answerSheetDiv.append(svg);
            var $bottom = $('<div>', {'class': 'bottom'});
            

            var $containerDiv = $('<div>', {'class': 'containerDiv'});
            $containerDiv.append($answerSheetDiv);
            $containerDiv.append($bottom);
            
            $(this.settings.answerSheetPanel).append($containerDiv);
            this.settings.sheetDiv = $answerSheetDiv;
            this.settings.svg = svg;
            return svg;
        },
        /**
         * 渲染答题卡内容
         */
        renderAnswerSheet : function() {
            var config = this.settings.defaultSetting;
            var svg = this.settings.svg;

            $(svg).attr('width', config.page.width);
            $(svg).attr('height', config.page.height);

            $(svg).css({
                backgroundColor: 'white'
            });
        },
        /**
         * 加载svg画布事件
         */
        initEvent : function() {
//            this.initIcheckStyle();
            this.initToolTip();
            this.handleClickSvgEvent();
            this.handleRightClickSvgEvent();
            this.handleCtrlShiftA();
        },
        /**
         * 选中所有元素
         */
        handleCtrlShiftA: function() {
        	var sheet = this;
        	var elements = sheet.settings.elements;
        	$(document).on('keydown', function(e) {
        		if(e.ctrlKey && e.keyCode == 65) { //ctrl+a 全选元素控件
        			$.elementSelect.selectAllElements();
        		}
        	})
        },
        
        /**
         * 初始化popover提示框
         */
        initToolTip : function() {
            $('a[data-toggle=tooltip]').off('mouseenter').on('mouseenter', function(e) {
                $(this).tooltip('show');
            });

            $('a[data-toggle=tooltip]').off('mouseleave').on('mouseleave', function(e) {
                $(this).tooltip('hide');
            });
        },
        /**
         * 将checkbox radiobox转化为icheck 样式
         * @Deprecated
         */
        initIcheckStyle : function() {
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%' // optional
            });
        },
        /**
         * 处理点击svg画布事件
         */
        handleClickSvgEvent : function() {
            var sheet = this;
            $('svg').on('click', function() {
                sheet.clearElementSelectStatus();
            });
        },
        /**
         * 单击svg空白区域取消对元素的选中状态
         */
        clearElementSelectStatus : function(e) {
            var selectCls =  $.elementSelect.settings.cls;
            var borderCls =  $.elementSelect.settings.borderCls;
            var selectedGs = $(this.settings.svg).find('g' + selectCls);
            $(selectedGs).removeClass(selectCls.substring(1));
            $(selectedGs).find('path' + borderCls).remove();
            $(selectedGs).find('.point').css({
            	display: 'none'
            });
        },
        /**
         * 浏览器右键事件，自定义右键菜单
         */
        handleRightClickSvgEvent : function() {
        	var sheet = this;
            $(document).on('contextmenu', function(e) {
                return false;
            });

            $('svg').on('mousedown', function(e) {
               if(e.which == 3) {
                   sheet.buildCustomMenu();
               }
            });

        },
        //添加右键菜单
        buildCustomMenu : function() {
        	var sheet = this;
            //如果存在选中的元素，则选项为编辑、删除，否则只有清空选项
        	var data = [
                [{
                    text: "清空",
                    func: function() {
                    	sheet.clearAllElement();
                    }
                }]
            ];

            $('svg').smartMenu(data, {name: 'menu', textLimit: 10});
        },
        /**
         * 判断当前画布中是否存在已经选中的元素
         */
        containsSelectedElement: function() {
            return $('svg').find('.selected').length > 0;
        },
        /**
         * 清空所有元素
         */
        clearAllElement : function() {
        	var sheet = this;
        	var elements = sheet.settings.elements;
            elements.length = 0;
            $('svg').find('.element').remove();
        },
        /**
         * 删除指定的元素
         * @param element
         */
        removeElement : function(element) {
        	var sheet = this;
        	var elements = sheet.settings.elements;
        	var index = _.indexOf(elements, element);
        	elements.splice(index, 1);
        	var uis = $('svg').find('.element');
        	for(var i = 0; i < uis.length; i++) {
        		if(uis[i] == element.settings.g) {
        			uis[i].remove();
        			break;
        		}
        	}
        }
    };
})(jQuery);

