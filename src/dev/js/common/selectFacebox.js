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

        createModal(params.size, params.title, params.href);
    };

    // 选择浮层
    // when [data-toggle="front-modal"] show then we can catch the shown.fr.modal event
    // to do some bind operation
    $('[data-toggle="front-modal-select"]')
        .on('click', createModal)
        .on('shown.fr.modal', selectModalInit)

    function selectModalInit() {
        var $this = $(this),
            $selectedArea = $('#front-selected-item')

        // search btn
        $('#front-search-btn').click(function() {
            $this.trigger('search.fr.modal.select')
        })

        // search input enter
        $('#front-search-input').keyup(function () {
            if (window.event.keyCode == 13) {
                $('#front-search-btn').click()
            }
        })

        // add up operation
        $('#front-tab-content').on('click', '.front-select-item>span', function (e) {
            var $span = $(e.target),
                $selectedItem = $selectedArea.children('.front-select-item'),
                i = 0,
                exist = false;

            for (;!exist && i < $selectedItem.length; ++i) {
                if ($selectedItem.eq(i).children('span').text() === $span.text()) {
                    exist = true;
                }
            }

            if (!exist) {
                $selectedArea.append([
                    '<div class="front-select-item">',
                    '<span>', $span.text(), '</span>',
                    '<a href="#" data-toggle="delete" class="pull-right">删除</a>',
                    '</div>'
                ].join(""))

                calSelectedNumber()
            }
        })

        // delete event on
        $selectedArea.on('click', 'a[data-toggle="delete"]', function(e) {
            var $this = $(this)
            e.preventDefault()
            $this.parent().remove()

            calSelectedNumber()
        })

        // clear selected item
        $('#fr-clear-item').click(function() {
            $selectedArea.html('')
            calSelectedNumber()

            return false
        })

        // update selected number
        function calSelectedNumber() {
            $('#front-item-num>span').text($selectedArea.children('.front-select-item').length)
        }
    }
})();
