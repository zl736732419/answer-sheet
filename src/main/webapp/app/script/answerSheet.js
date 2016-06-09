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
            svg : null, //通过ui实例化的svg对象,为了预览方便，后续预览操作直接将svg作为参数传递过来
            defaultSetting: null,
            elements : [], //已经添加的内容列表
            constant : {//配置一些常量域
                SVN_NS : 'http://www.w3.org/2000/svg',
                LINK_NS : 'http://www.w3.org/1999/xlink'
            }
        },
        /**
         * 初始化加载答题卡，入口函数
         */
        loadAnswerSheet : function(defaultSetting, svg) {
            this.initParams(defaultSetting, svg);
            this.renderAnswerSheet();
            this.initEvent();
        },
        /**
         * 初始化参数信息
         * @param defaultSetting
         * @param svg
         * @param title
         */
        initParams : function(defaultSetting, svg, title) {
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
                this.settings.svg = $(this.settings.ui)[0];
            }

            this.settings.svg.obj = this;
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
            this.initIcheckStyle();
            this.initPopoverTip();
            this.handleClickSvgEvent();
        },
        /**
         * 初始化popover提示框
         */
        initPopoverTip : function() {
            $('a[data-toggle=popover]').off('mouseenter').on('mouseenter', function(e) {
                $(this).popover('show');
            });

            $('a[data-toggle=popover]').off('mouseleave').on('mouseleave', function(e) {
                $(this).popover('hide');
            });
        },
        /**
         * 将checkbox radiobox转化为icheck 样式
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
        }
    };
})(jQuery);

