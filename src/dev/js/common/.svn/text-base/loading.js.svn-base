(function ($) {

    function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
            offset   = ($(window).height() - $dialog.height()) / 2

        $dialog.css("margin-top", offset - 15);
    }

    $.showLoading = function(action) {
        var $loadingModal = $('#loading-modal'),
            html

        if (!$loadingModal.length) {
            html =
                [
                    '<div class="modal fade" data-backdrop="static" data-keyboard="false" id="loading-modal" tabindex="-1">',
                    '<div class="modal-dialog">',
                    '<div class="modal-body">',
                    '<div class="front-loading">',
                    '<div class="front-loading-block"></div>',
                    '<div class="front-loading-block"></div>',
                    '<div class="front-loading-block"></div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>'
                ].join("");

            $('body').append(html)

            $loadingModal = $('#loading-modal').on('show.bs.modal', centerModal);
        }

        if (action === "show") {
            $loadingModal.modal('show')
        }

        if (action === "reset") {
            $loadingModal.modal('hide')
        }
    }
})(jQuery);
