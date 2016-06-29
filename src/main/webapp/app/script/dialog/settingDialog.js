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
				
				$.examPapers.activeSheet($.examPapers.settings.sheets[0]);
				
				dialog.hide();
			});
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