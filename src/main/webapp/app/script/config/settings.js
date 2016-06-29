/**
 * Created by zhenglian
 * Date: 2016/5/10 0010
 * Time: 上午 11:23
 */
/**
 * 针对各个控件的通用设置
 */
(function($) {
	//各科配置
	$.subject = {
		basic : {name:'语文', value:1},    // 语文
		math : {name: '数学', value:2},    // 数学
		english: {name: '英语', value: 3},   // 英语
		politics: {name: '政治', value: 4},  // 政治
		history: {name: '历史', value: 5},   // 历史
		physical: {name: '物理', value: 6},  // 物理
		chemistry: {name: '化学', value: 7}  // 化学
	};
	
    $.settings = {
        baseInfo : {
            attentionNote : '填涂时用 2B 铅笔将选项涂满涂黑。修改时用橡皮擦干净。' +
                '请注意题号顺序。请保持答题卡整洁，不要折叠、乱作标记。'
        },
        footer : {
        	content: '请在每题规定的答题区域内作答，超出黑色矩形限定区域的答案无效'
        }
    };
})(jQuery);