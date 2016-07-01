/*
 * Created by zhenglian
 * Date: 2016/5/3 0003
 * Time: 下午 4:31
 *
 * 答题卡为A4纸时配置参数
 * 如果需要拓展，需要重写该配置文件中涉及的参数值
 * 所有答题卡所用到的初始值都从这里面获取
 * a4纸尺寸： 210*297mm
 * 200dpi
 * 1英寸=2.54cm=25.4mm = 200px
 * ==>
 * 1mm = 7.87px
 */
(function($) {
    $.defaultSettingA4 = {
        page : { // 答题卡页面信息
            width: 1652, // 答题卡纸张宽度
            height: 2337,  // 答题卡纸张高度
            pageNum: 2 // 答题卡共几页(一张两面算两页)
        },
        grid : { //填涂方格大小
            width: 25,
            height: 9
        },
        title : { //答题卡标题控件
            y: 150 //标题到顶部距离
        }
    };

})(jQuery);



