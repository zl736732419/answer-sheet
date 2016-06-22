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
			var defaultSetting = $.defaultSettingA4;
			var $answerSheet = $.answerSheet.newInstance();
			$answerSheet.loadAnswerSheet(defaultSetting, null);

			$.examPapers.settings.sheets.push($answerSheet);
			$.examPapers.settings.curSheet = $answerSheet;
			this.activeCurSheet();
		},
		/**
		 * 选中当前答题卡
		 */
		activeCurSheet: function() {
			var curSheet = this.settings.curSheet;
			var $sheetDiv = curSheet.settings.sheetDiv;
			if($sheetDiv.hasClass('selected')) {
				return;
			}
			
			$(this.settings.answerSheetPanel).find('.selected').removeClass('selected');
			$sheetDiv.addClass('selected');
		}
	};
})(jQuery);