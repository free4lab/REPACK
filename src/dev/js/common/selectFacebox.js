;(function () {
    // bootstrap modal 封装
    function createModal(size, title, href) {
    	var template;
    	var $this = $(this);
        size = (size != undefined ? size : '');
        template = [
                        '<div class="modal fade" id="front-modal" tabindex="-1" role="dialog" aria-labelledby="front-modal-label">',
                        '<div class="modal-dialog ', size ,'" role="document">',
                        '<div class="modal-content">',
                        '</div>',
                        '</div>',
                        '</div>'
                    ].join("");
        var titleFlag = (title != undefined && title.trim() != ''),
            $modal = $(template),
            $modalContent = $modal.find('.modal-content')

        if (titleFlag) {
            $modalContent.html(
                ['<div class="modal-header">',
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '<h4 class="modal-title" aria-label="front-modal-label">', title, '</h4>', // modal title
                '</div>'].join('')
            )
        }

        $.get(href, function(data) { // get modal content from server

            if (titleFlag) {
                $(data).insertAfter($modal.find('.modal-header'))
            } else {
                $modalContent.html(data)
            }

            // show modal
            $modal.modal()

            // Actually I mean to on show.bs.modal event
            // but it doesn't trigger
            $modal.on('shown.bs.modal', function () {
                $this.trigger('shown.fr.modal', $modal) // btn trigger shown.fr.modal event
            })
        })

        $modal.on('hidden.bs.modal', function () { // when the modal close remove it
            $modal.remove()
        })

        return $modal;
    }
   
    // modal api
    $('body').on('click', 'a[data-toggle="front-modal"]', function (e) {
        e.preventDefault();
        createModal.call(this, $(this).data('size'), $(this).data('title'), $(this).data('href'));
    });

    // jquery common
    $.frontModal = function (option) {
        var preSetParams = {
            size: '',
            title: '',
            href: ''
        };

        var params = $.extend(preSetParams, option);

        return createModal(params.size, params.title, params.href);
    };
})();
