;(function($) {
    bootbox.setLocale('zh_CN')

    jQuery.tipModal = function (type, iconType, content, callback) {
        var iconClass,
            modalContent

        if (iconType == 'warning') {
            iconClass = 'glyphicon-exclamation-sign front-tipmodal warning'
        } else if (iconType == 'danger') {
            iconClass = 'glyphicon-alert front-tipmodal danger'
        } else if (iconType == 'success') {
            iconClass = 'glyphicon-ok-sign front-tipmodal success'
        } else if (iconType == 'info') {
            iconClass = 'glyphicon-info-sign front-tipmodal info'
        }

        modalContent = '<span class="glyphicon ' + iconClass + '"></span>' + content

        if (type == 'alert') {
            bootbox.alert({
                size : 'small',
                message : modalContent,
                callback : callback
            })
        } else if (type == 'confirm') {
            bootbox.confirm({
                size : 'small',
                message : modalContent,
                callback : callback
            })
        }
    }
})(jQuery);
