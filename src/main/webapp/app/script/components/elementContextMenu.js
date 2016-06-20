/**
 * Created by zhenglian on 2016/6/12.
 */
/**
 * 元素自定义右键菜单
 */
(function($) {
    $.elementContextMenu = {
        settings : {
            menu : null //当前元素右键菜单对象
        },
        newInstance: function() {
            return $.extend(true, {} ,this);
        },
        enable: function(elementObj) {
            this.initEvent(elementObj.settings.editTarget);
        },
        /**
         * 初始化元素事件
         * @param element
         */
        initEvent : function(element) {
            var menu = this;
            $(element).on('mousedown', function(e) {
                if(e.which == 3) {
                    menu.buildElementMenu(element);
                }

                return false;
            });
        },
        /**
         * 创建元素右键菜单
         */
        buildElementMenu : function(element) {
            var obj = $(element).parent()[0].obj;
            var data = [
                [{
                    text: "编辑",
                    func: function() {
                        obj.editElement();
                    }
                },{
                    text: "删除",
                    func: function() {
                        var elements = $.answerSheet.settings.elements;
                        for(var i = 0; i < elements.length; i++) {
                            if(elements[i].settings.editTarget == element) {
                                elements.splice(i, 1);
                                break;
                            }
                        }

                        var uuid = '#' +  obj.settings.uuid;
                        $('svg').find(uuid).remove();
                    }
                }]
            ];

            $(element).parent().smartMenu(data, {name: 'menu' + obj.settings.uuid, textLimit: 10});
        }
    };
})(jQuery);