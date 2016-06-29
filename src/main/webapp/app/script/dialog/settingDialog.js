(function($) {
	"use strict";
	$.settingDialog = {
		settings : {
			constants: {
				TYPE_A3: 1,
				TYPE_A4: 2
			},
			ui : '#settingDialog',
			form: '#settingForm',
			pageNum: '#pageNum',
			sheetType: '#sheetType',
			a3Column: 'input[name=a3Column]',
			a3Columns: '.a3Columns',
			btns : {
                ok : '.okBtn'
            }
		},
		loadDialog: function() {
			this.initEvent();
	        this.show();
		},
		initEvent : function() {
			this.initValidation();
			this.handleUpdateSheetTypeEvent();
			this.handleOkEvent();
		},
		/**
		 * 表单验证
		 */
		initValidation: function() {
			$.uiwrapper.formValidator.validate(this.settings.form,{
				"sheetType" : {
					validators : {
						notEmpty: {
							message: '题卡纸张类型必选!'
						}
					}
				},
				'pageNum': { //最大5张
					validators : {
						notEmpty: {
							message: '题卡页数不能为空!'
						},
						greaterThan : {
							value: 0,
							inclusive: false,
							message: '题卡页数必须大于1张'
						},
						lessThan: {
							value: 11,
							inclusive: false,
							message: '题卡页数必须小于11张'
						}
						
					}
				}
			});
		},
		/**
		 * 处理更新题卡类型事件
		 */
		handleUpdateSheetTypeEvent: function() {
			var dialog = this;
			$(this.settings.sheetType).on('change', function() {
				var val = Number($(this).val());
				if(val == dialog.settings.constants.TYPE_A3) { //a3纸张类型
					$(dialog.settings.a3Columns).css({
						display: 'block'
					});
				}else { //A4纸张类型
					$(dialog.settings.a3Columns).css({
						display: 'none'
					});
				}
			});
		},
		handleOkEvent: function() {
			var dialog = this;
			$(this.settings.ui).find(this.settings.btns.ok).on('click', function() {
				if(!$.uiwrapper.formValidator.isFormValid(dialog.settings.form)) {
					return ;
				}
				dialog.createAnswerSheet();
			});
		},
		createAnswerSheet: function() {
			var dialog = this;
			var sheetType = Number($(dialog.settings.sheetType).val());
			if(sheetType == dialog.settings.constants.TYPE_A3) {
				$.extend(true, $.defaultSetting, $.defaultSettingA3);
				$.defaultSetting.column = Number($(dialog.settings.a3Column).val());
			}else {
				$.extend(true, $.defaultSetting, $.defaultSettingA4);
			}

			var pageNum = Number($(dialog.settings.form).find(dialog.settings.pageNum).val());
			$.defaultSetting.page.pageNum = pageNum;
			for(var i = 0; i < $.defaultSetting.page.pageNum; i++) {
				$.examPapers.createNewAnswerSheet();
			}
			
			dialog.initSettingParams();
			$.examPapers.activeSheet($.examPapers.settings.sheets[0]);
			dialog.hide();
		},
		/**
		 * 初始化setting中的一些参数信息
		 */
		initSettingParams: function() {
			this.initContentParams();
			this.initSubjectParams();
		},
		/**
		 * 初始化内容宽度和高度
		 */
		initContentParams: function() {
			var defaultSetting = $.defaultSetting;
			var page = defaultSetting.page;
			var content = defaultSetting.content;
			var anchorPoint = defaultSetting.anchorPoint;
			content.width = page.width - anchorPoint.hPadding*2 - anchorPoint.width;
			content.height = page.height - anchorPoint.vPadding*2 - anchorPoint.height;
			content.hPadding = anchorPoint.hPadding + anchorPoint.width / 2;
			content.vPadding = anchorPoint.vPadding + anchorPoint.height*2;
		},
		/**
		 * 初始化科目元素配置参数
		 * 主要是计算垂直偏移量
		 */
		initSubjectParams: function() {
			var anchorPoint = $.defaultSetting.anchorPoint;
			var subject = $.defaultSetting.subject;
			subject.vPadding += (anchorPoint.vTopPadding + anchorPoint.height);
		},
		/**
         * 显示窗口
         */
        show : function() {
            $(this.settings.ui).modal('show');
        },
        /**
         * 隐藏窗口
         */
        hide : function() {
            $(this.settings.ui).modal('hide');
        }
			
	};
})(jQuery);