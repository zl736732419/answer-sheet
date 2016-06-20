/**
 * 通用的元素对象，在编写新元素时需要参考该对象
 * 可以参考其他如标题对象titleElement,
 * 基本信息对象baseInfoElement来实现新的元素控件
 * @param $
 */
(function($) {
	$.baseElement = {
		settings: {
			uuid: null, //唯一标识
			svg: null, //画布对象
			element: null, //当前元素对象
			editTarget: null, //编辑的目标对象this.settings.g下的第一个元素
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
            g : null, //当前元素最外层g
            components : { //用于编辑的控件
                select : null, //选中控件
                drag : null, //拖动控件
                resize : null, //resize控件
                contextMenu: null //右键菜单
            }
		},
		/**
		 * 创建元素对象
		 * @returns
		 */
		newInstance: function() {
			this.initParams();
            return $.extend(true, {}, this);
		},
		/**
		 * 初始化参数值
		 */
		initParams: function(){
			this.settings.svg = $.answerSheet.settings.svg;
			//TODO init other params
		},
		/**
		 * 加载元素控件，该方法由对应的元素dialog创建元素时调用
		 * 调用方式为：
		 * newInstance().loadElement();
		 */
		loadElement: function() {
			 this.createElement(params);
	         this.initEvent();
	         this.editable();
		},
		/**
		 * 创建该元素对应的实例组件
		 */
		createElement:function() {
			//TODO create element ui 
		},
		/**
		 * 加载该元素对象内部需要用到的事件
		 */
		initEvent: function() {
			this.handleDoubleClickEvent();
		},
		handleDoubleClickEvent: function() {
			var element = this;
            $(this.settings.editTarget).on('dblclick', function() {
            	element.editElement();
            });
		},
		/**
		 * 编辑元素
		 * 使用场景
		 * 1.在双击时需要调用
		 * 2.在右键菜单编辑时需要调用
		 */
		editElement: function() {
			//TODO open element's dialog to set 
		},
		/**
		 * 编辑元素时需要使用到的各个编辑组件
		 */
		editable: function() {
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