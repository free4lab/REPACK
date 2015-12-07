;(function($){
    jQuery.fillTipBox = function(option) {
        var defaults = {
                type: '',
                icon: '',
                content: '',
                delay: 1500 //自动关闭的时间设置
            },
            option = $.extend(defaults, option),
            $tipBox

        $('#front-tipbox').remove() // 先删除

        // 再添加TipBox
        $('body').append($tipBox =
                $([
                    '<div id="front-tipbox" class="front-tipbox ', option.type ,'">',
                    '<div class="title">',
                    '<span class="glyphicon glyphicon-remove front-tipbox-close"></span>',
                    '</div>',
                    '<div class="content"><span class="glyphicon ',
                    option.icon, '"></span>', option.content, '</div>',
                    '</div>'
                ].join(""))
        )

        $tipBox.fadeIn({queue:false, duration:'fast'}).animate({top:70}, 200).addClass('in')

        // 关闭事件
        $tipBox.find('.front-tipbox-close').on('click', function () {
            close($tipBox)
        })

        // 自动关闭
        window.setTimeout(close, option.delay, $tipBox);
    }

    function close(ele) {
        ele.fadeOut({queue:false, duration:'fast'}).animate({top:50}, 200).removeClass('in')
    }
})(jQuery);

