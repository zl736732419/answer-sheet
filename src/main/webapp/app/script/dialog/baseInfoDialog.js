/**
 * 答题卡考生信息组件
 *
 * Created by zhenglian
 * Date: 2016/5/10 0010
 * Time: 上午 10:58
 */
(function($) {
    $.baseInfoDialog = {
        settings : {
        	constants: {
				ZKZH: "zkzh",
				BAR_CODE: "barCode",
				QR: 'qr'
			},
            ui : '#baseInfoDialog',
            studentCode: 'input[name=studentCode]',
            attentionNote : 'input[name=attentionNote]',
            zkzhCountPanel: '.zkzhCountPanel',
            uncheck: '.uncheck', //默认不选中的样式
            element : null,
            btns : {
                attentionNoteBtn : '.attentionNoteBtn',
                ok : '.okBtn'
            }
        },
        /**
         * 加载窗口
         * @param element
         */
        loadDialog : function(element) {
            if(element) {
                this.settings.element = element;
            }
            this.renderContent();
            this.initEvent();
            this.show();
        },
        /**
         * 渲染页面初始状态
         */
        renderContent : function() {
            this.initCheckRadio();
        },
        /**
         * 处理准考证号、二维码、条形码切换事件
         */
        initStudentCodeEvent: function() {
        	var dialog = this;
            $(this.settings.ui).find(this.settings.studentCode).on('ifChecked', function() {
            	var val = $(this).val();
            	if(val == dialog.settings.constants.ZKZH) {
            		$(dialog.settings.zkzhCountPanel).css({
            			display: 'inline-block'
            		});
            	}else {
            		$(dialog.settings.zkzhCountPanel).css({
            			display: 'none'
            		});
            	}
            });
        },
        initCheckRadio : function() {
            $(this.settings.ui).find('input').not(this.settings.uncheck).iCheck('check');
        },
        initEvent : function() {
            this.initStudentCodeEvent();
            this.handleUpdateAttentionNote();
            this.handleOkEvent();
        },
        /**
         * 处理确定按钮事件
         */
        handleOkEvent : function() {
            var dialog = this;
            var $answerSheet = $.examPapers.settings.curSheet;
            $(this.settings.ui).find(this.settings.btns.ok).off('click').on('click', function() {
                var attentions = [];
                $(dialog.settings.ui).find('input[type=checkbox]:checked').each(function(index, item) {
                    attentions.push($(item).val());
                });
                if(attentions.length == 0) {
                    toastr.warning('创建考生信息必须选择事项!');
                    return;
                }
                dialog.renderBaseInfoElements(attentions);
                dialog.hide();
            });
        },
        /**
         * 加载基本信息中存在的元素组件
         */
        renderBaseInfoElements: function(attentions) {
        	var $answerSheet = $.examPapers.settings.curSheet;
        	var $elements = $answerSheet.settings.elements;
        	if(_.indexOf(attentions, 'subject') != -1) { //科目信息
        		var subjectElement = $.subjectElement.newInstance();
                subjectElement.loadElement();
                $elements.push(subjectElement);
        	}
        	
        	//绘制学生基本信息
        	var items = _.intersection(attentions, $.studentInfoElement.settings.elements);
        	if(items.length == 0) {
        		toastr.warning('学生基本信息栏必须选中一项！');
        	}else {
        		var studentInfoElement = $.studentInfoElement.newInstance();
        		studentInfoElement.loadElement(items);
        		$elements.push(studentInfoElement);
        	}
        	
            if(_.indexOf(attentions, 'wrongFilling') != -1) { //正误填涂组件
                var wrongFillingElement = $.wrongFillingElement.newInstance();
                wrongFillingElement.loadElement();
                $elements.push(wrongFillingElement);
            }
        	
            if(_.indexOf(attentions, 'absentAndBreach') != -1) { //缺考与违纪
                var absentBreachElement = $.absentBreachElement.newInstance();
                absentBreachElement.loadElement();
                $elements.push(absentBreachElement);
            }
            
            if(_.indexOf(attentions, 'attentionNote') != -1) { //注意事项
                var attentionNoteElement = $.attentionNoteElement.newInstance();
                attentionNoteElement.loadElement();
                $elements.push(attentionNoteElement);
            }
        	
        },
        /**
         * 更新注意事项
         */
        handleUpdateAttentionNote : function() {
            var dialog = this;
            $(this.settings.ui).find(this.settings.btns.attentionNoteBtn).off('click').on('click', function() {
                $.updateAttentionNoteDialog.loadDialog(dialog);
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