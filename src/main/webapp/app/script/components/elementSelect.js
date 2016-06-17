/**
 * Created by zhenglian
 * Date: 2016/5/5 0005
 * Time: 下午 5:15
 */
/**
 * 选中组件，用于选中指定的元素
 */
(function($) {
    $.elementSelect = {
        settings : {
            cls : '.selected', //选中元素后要添加的样式类
            borderCls : '.elBorder'
        },
        /**
         * 创建该组件实例
         */
        newInstance : function() {
            return $.extend(true, {}, this);
        },
        /**
         * 针对某一元素启用选中组件
         */
        enable : function(elementObj) {
            var element = elementObj.settings.editTarget;
            if(!element) {
                throw new Error('错误，当前要选中的目标元素为空!');
            }
            var select = this;
            $(element).on('click', function() {
                var selected = select.isSelected(element);
                if(!selected) {
                    select.selectElement(element);
                }
                return false; //阻止事件向上传递设置了svg画布点击事件
            });
        },
        /**
         * 获取元素的当前选中状态：选中、未选中
         * @param element
         */
        isSelected : function(element) {
            var cls = this.settings.cls.substring(1);
            var selected = false;
            if($(element).parent().hasClass(cls)) { //g
                selected = true;
            }

            return selected;
        },
        /**
         * 取消对元素的选中状态
         * @param element
         */
        unSelectElement : function(element) {
            var cls = this.settings.cls.substring(1);
            var g = $(element).parent()[0];
            $(g).removeClass(cls);
            $(g).find('.point').css({
                display: 'none'
            });
            this.removeBorder(element);
        },
        /**
         * 选中某一个元素
         * @param element
         */
        selectElement : function(element) {
            var cls = this.settings.cls.substring(1);
            var g = $(element).parent()[0];
            $(g).addClass(cls);
            //绘制边框线
            this.addBorder(element);
            $(g).find('.point').css({
                display: 'block'
            });
        },
        /**
         * 重新选中，更新之前选中状态
         * 当改变元素大小时需要调用该方法
         * @param element
         */
        reSelectElement : function(element) {
            if(this.isSelected(element)) { //只有在选中的时候才会更新之前选中状态
                this.unSelectElement(element);
                this.selectElement(element);
            }
        },
        /**
         * 选中元素后绘出边框
         * @param element
         */
        addBorder : function(element) {
            var g = $(element).parent()[0];
            var box = $(element)[0].getBBox();
            var d = "M " + box.x + " " + box.y + " h " + box.width + " v " + box.height
                + " h -" + box.width + " v -" +box.height + " z";
            var path = $.uiBuilder.drawPath(d, '#04c', 1);
            $(path).addClass(this.settings.borderCls.substring(1));
            g.appendChild(path);
        },
        /**
         * 取消选中后移除边框
         * @param element
         */
        removeBorder : function(element) {
            $(element).parent().find(this.settings.borderCls).remove();
        }
    };
})(jQuery);