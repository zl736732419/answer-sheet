/**
 * 当前整个答题卡对象
 * 包含多张answerSheet
 */
(function ($) {
	"use strict";
	$.examPapers = {
		settings : {
			sheets: [], //答题卡数组，存放当前定义的answerSheet对象
			curSheet: null, //当前活动的题卡对象
			answerSheetPanel: '.answerSheetPanel',
			svgCls: '.answerSheetSvg',
		},
		/**
		 * 创建一张新答题卡
		 */
		createNewAnswerSheet : function() {
			var defaultSetting = $.defaultSetting;
			var $answerSheet = $.answerSheet.newInstance();
			$.examPapers.settings.sheets.push($answerSheet);
			$answerSheet.settings.index = this.getSheetIndex($answerSheet);
			$answerSheet.loadAnswerSheet(defaultSetting, null);

			$.examPapers.settings.curSheet = $answerSheet;
			this.activeCurSheet();
		},
		/**
		 * 选中当前答题卡
		 */
		activeCurSheet: function() {
			var curSheet = this.settings.curSheet;
			this.activeSheet(curSheet);
		},
		/**
		 * 选中指定的一张题卡
		 * @param sheet
		 */
		activeSheet : function(sheet){
			var $sheetDiv = sheet.settings.sheetDiv;
			if($sheetDiv.hasClass('selected')) {
				return;
			}
			
			this.settings.curSheet = sheet;
			$(this.settings.answerSheetPanel).find('.selected').removeClass('selected');
			$sheetDiv.addClass('selected');
		},
		/**
		 * 获取指定题卡的索引位置
		 * @param sheet
		 */
		getSheetIndex: function(sheet) {
			return this.settings.sheets.indexOf(sheet);
		}
	};
})(jQuery);