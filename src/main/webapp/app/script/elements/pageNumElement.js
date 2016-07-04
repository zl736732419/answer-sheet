/**
 * 题卡页码组件
 * 标识当前答题卡是第几页
 * @param $
 */
(function($) {
	"use strict";
	$.pageNumElement = {
		settings: {
			
		},
		newInstance: function() {
			return $.extend(true, {}, this);
		},
		loadElement: function() {
			this.initParams();
			this.createElement();
			this.initEvent();
			this.editable();
		},
		initParams: function() {
			
		},
		createElement: function() {
			
		},
		initEvent: function() {
			
		},
		editable: function() {
			
		}
	};
})(jQuery);