/**
 * Created by zhenglian
 * Date: 2016/5/10 0010
 * Time: 上午 11:23
 */
/**
 * 针对各个控件的通用设置
 */
(function($) {
	"use strict";
	//各科配置
	$.subject = {
		basic : {name:'语文', value:1},    // 语文
		math : {name: '数学', value:2},    // 数学
		english: {name: '英语', value: 3},   // 英语
		politics: {name: '政治', value: 4},  // 政治
		history: {name: '历史', value: 5},   // 历史
		geography: {name: '地理', value: 6}, //地理
		physical: {name: '物理', value: 7},  // 物理
		chemistry: {name: '化学', value: 8},  // 化学
		biology: {name: '生物', value: 15},   //生物
	};
	
	//控件类型
	$.elementType = {
		anchorPoint : 1,
		subject: 2,
		studentInfo: 3,
		wrongFilling: 4,
		absentBreach: 5,
		attentionNote: 6
		//TODO
	};
	
    $.settings = {
		subject: {
			curSubject: $.subject.biology,
			num: 4 //四个矩形方格代表16科， 按照二进制顺序，从右到左为低到高
		},
        baseInfo : {
            attentionNote : '1.答题前，考生务必用黑色字迹签字笔填写字迹的准考证号、姓名、学校；再用2B铅笔吧对应准考证号码的标号涂黑，'
            	+'使用其他笔填涂无效。|2.考生不得填涂缺考、违纪项，违者责任自负。|3.选择题必须用2B铅笔填涂,使用其他笔填涂无效，修改时要用橡皮擦干净；每题只能填涂一个答案，多填不得分。|'
            	+'4.主观题必须用黑色字迹签字笔(0.5mm)在答题区域内作答，超出矩形框限定区域的答案无效。|5.保持答题卡的清洁和平整，不得折叠。'
        },
        footer : {
        	content: '请在每题规定的答题区域内作答，超出黑色矩形限定区域的答案无效'
        }
    };
})(jQuery);