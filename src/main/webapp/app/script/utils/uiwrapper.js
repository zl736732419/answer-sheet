/**
 * ui工具类
 * @param $
 */
(function($) {
	"use strict";
	
	$.uiwrapper = {
		/**
		 * 表单验证器
		 * @param selector
		 */
		formValidator: {
			isFormValid : function(selector) {
				var validator = $(selector).formValidation('validate')
					.data('formValidation');
				return validator.isValid();
			},
			validate: function(selector, opts) {
				var setting={
					err: {
			            container: 'tooltip'
			        },
			        icon: {
			            valid: 'glyphicon glyphicon-ok',
			            invalid: 'glyphicon glyphicon-remove',
			            validating: 'glyphicon glyphicon-refresh'
			        }	
				};
				
				setting.fields=opts;
				$(selector).formValidation(setting);
				$(selector).on('submit',function(e){
					 e.preventDefault();
					return false;
				});
			}
		},
		nicescroll : function() {
			$('.as-nicescroll').niceScroll({
				'cursorwidth':'10px'
			});
		}
	};
})(jQuery);