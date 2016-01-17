$.fn.frFileUpload = function (option) {
    var $this = $(this);

    var $trigger = $this.find('[data-trigger]');
    var $inputFile = $this.find('input[type="file"]');
    var $uploadTable = $this.find('table[data-file-info]')

    $this['default'] = {
        dismissTime: 3000,
        maxFileSize: 30 * 1024,
        uploadCallback: function(data) {
            return true;
        }
    }

    $this['config'] = $.extend($this['default'], option)

    $inputFile.width($trigger.outerWidth());
    $inputFile.height($trigger.outerHeight());

    $this.fileUploadUIReady({
        autoUpload: false,
        maxChunkSize: 20 * 1024 * 1024,
        namespace: 'fr_file_' + (new Date()).getTime(), // namespace 在同一页面是否必须唯一？
        fileInputFilter: $inputFile,
        dropZone: $trigger,
        uploadTable: $uploadTable,
        downloadTable: $uploadTable,
        acceptFileTypes: $this['config']['acceptFileTypes'],

        buildUploadRow: function (files, index) {
            $uploadTable.html('')

            return $("<table><tr>" + "<td><font color=\"red\">" + files[index].name + "</font></td>" +
                "<td class=\"file_upload_progress\"><div></div></td></table>");
        },

        beforeSend: function (event, files, index, xhr, handler, callBack) {
            //test the type of file
            var regexp = $this.config.acceptFileTypes;
            var area = handler.uploadRow.find('.file_upload_progress').html('');

            if (regexp != undefined && !regexp.test(files[index].name)) {
                area.html($this['config']['fileTypeHint']);

                setTimeout(function () {
                    handler.removeNode(handler.uploadRow);
                }, $this['config']['dismissTime']);

                return;
            }

            //test the size of file
            if (files[index].size > $this.config.maxFileSize) {

                area.html('文件必须小于' + ($this.config.maxFileSize >> 10) + 'KB!');

                setTimeout(function () {
                    handler.removeNode(handler.uploadRow);
                }, $this['config']['dismissTime']);

                return;
            }

            callBack();
        },

        buildDownloadRow: function (data) {
            var status = $this['config'].uploadCallback(data);

            if (status == false) {
                return $('<tr><td style="color: red;">文件上传失败，请重传！</td></tr>');
            }
        }
    })

    return $this;
}
