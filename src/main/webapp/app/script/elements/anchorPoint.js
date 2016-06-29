/**
 * 定位点(这里直接生成四个角的定位点)
 * 根据defaultSetting.js中的anchorPoint设置生成
 * @param $
 */
(function($) {
	"use strict";
	$.anchorPoint = {
		settings: {
			svg : null,
			pointGs: [] //记录
		},
		newInstance: function() {
			return $.extend(true, {}, this);
		},
		loadPoints: function(sheet) {
			this.initParams(sheet);
			this.renderAnchorPoints(sheet.settings.index);
		},
		initParams: function(sheet) {
			this.settings.svg = sheet.settings.svg;
		},
		/**
		 * 生成四个角落的定位点
		 */
		renderAnchorPoints: function(index) {
			var page = $.defaultSetting.page;
			var setting = $.defaultSetting.anchorPoint;
			var positions = []; //四个定位点位置坐标
			
			var leftUp = {
				x: setting.hPadding,
				y: setting.vTopPadding
			};
			positions.push(leftUp);

			//右上角
			var rightUp = {
				x: page.width - setting.hPadding - setting.width,
				y: setting.vTopPadding
			};
			positions.push(rightUp);

			//左下角
			var leftBottom = {
				x: setting.hPadding,
				y: page.height - setting.vBottomPadding - setting.height
			};
			positions.push(leftBottom);

			//右下角
			var rightBottom = {
				x: page.width - setting.hPadding - setting.width,
				y: page.height - setting.vBottomPadding - setting.height
			};
			positions.push(rightBottom);

			for(var i = 0; i < positions.length; i++) {
				this.createAnchorPoint(positions[i]);
			}
		},
		/**
		 * 根据坐标生成对应的定位点
		 * @param position
         */
		createAnchorPoint: function(position) {
			var constant = $.utils.settings.constant;
			var svg = this.settings.svg;
			var setting = $.defaultSetting.anchorPoint;

			var rect = $.uiBuilder.drawRect(position.x, position.y, setting.width, setting.height, true, '#000');
			var g = document.createElementNS(constant.SVG_NS, 'g');
			$(g).addClass('anchorPoint');
			$(g).data('position', position);
			g.appendChild(rect);
			svg.appendChild(g);
		}
	};
})(jQuery);