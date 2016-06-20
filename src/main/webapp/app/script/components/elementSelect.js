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
            var g = elementObj.settings.g;
            if(!g) {
                throw new Error('错误，当前要选中的目标元素为空!');
            }
            var select = this;
            $(g).on('click', function(e) {
            	var selected = select.isSelected(g);
            	if(select.isCtrlKeyDown(e)) {//多选
            		if(selected) {
            			select.unSelectElement(g);
            		}else {
            			select.selectElement(g, false);
            		}
            	}else {
            		if(!selected) {
            			select.selectElement(g, true);
            		}
            	}
                return false; //阻止事件向上传递设置了svg画布点击事件
            });
        },
        /**
         * 选择元素时是否按下了ctrl键表示是否多选
         * 
         */
        isCtrlKeyDown: function(e) {
        	if(e == null || e == undefined) { //如果没有鼠标事件默认为单选
        		return false;
        	}
        	
        	if(e.ctrlKey) { //按下ctrl键
        		return true;
        	}
        	
        	return false;
        },
        /**
         * 获取元素的当前选中状态：选中、未选中
         * @param g
         */
        isSelected : function(g) {
            var cls = this.settings.cls.substring(1);
            var selected = false;
            if($(g).hasClass(cls)) { //g
                selected = true;
            }

            return selected;
        },
        /**
         * 取消对元素的选中状态
         * @param g
         */
        unSelectElement : function(g) {
            var cls = this.settings.cls.substring(1);
            $(g).removeClass(cls);
            $(g).find('.point').css({
                display: 'none'
            });
            this.removeBorder(g);
        },
        /**
         * 选中某一个元素
         * @param g
         * @param clear 是否清空之前选中状态
         */
        selectElement : function(g, clear) {
        	if(clear) {
        		var elements = $('.element.selected').removeClass('selected');
        		$(elements).find('.point').css({'display': 'none'});
        		$(elements).find(this.settings.borderCls).remove();
        	}
            var cls = this.settings.cls.substring(1);
            $(g).addClass(cls);
            //绘制边框线
            this.addBorder(g);
            $(g).find('.point').css({
                display: 'block'
            });
        },
        /**
         * 重新选中，更新之前选中状态
         * 当改变元素大小时需要调用该方法
         * @param g
         */
        reSelectElement : function(g) {
            if(this.isSelected(g)) { //只有在选中的时候才会更新之前选中状态
                this.unSelectElement(g);
                this.selectElement(g, true);
            }
        },
        /**
         * 选中元素后绘出边框
         * @param g
         */
        addBorder : function(g) {
            var box = $(g)[0].getBBox();
            var d = "M " + box.x + " " + box.y + " h " + box.width + " v " + box.height
                + " h -" + box.width + " v -" +box.height + " z";
            var path = $.uiBuilder.drawPath(d, '#04c', 1);
            $(path).addClass(this.settings.borderCls.substring(1));
            g.appendChild(path);
        },
        /**
         * 取消选中后移除边框
         * @param g
         */
        removeBorder : function(g) {
            $(g).find(this.settings.borderCls).remove();
        },
        /**
         * 选中所有元素
         */
        selectAllElements: function() {
        	var element = null;
        	$('.element').each(function(index, item) {
        		element = $(item)[0].obj; //g.obj
        		element.settings.components.select.selectElement($(item)[0]);
        	});
        },
    };
})(jQuery);