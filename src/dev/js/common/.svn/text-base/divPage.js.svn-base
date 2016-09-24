(function($){
    jQuery.getDivPageHtml=function(curPage, endPage, funcName){

        /*
         * creates pagination
         * @ author zxy
         * @ return pageHtml
         * curPage 当前页数
         * endPage 最终页数
         * funcName 异步加载的方法名 异步方法包括两个参数funcName(page)
         *
         */

        var pageHtml = "";
        var showPage = 6;

        pageHtml += '<div class="text-center"><ul class="pagination">';

        if (endPage == 1) {
            pageHtml += "<li class=\"disabled\"><a aria-label=\"Previous\">&laquo;</a></li>" +
                        "<li class=\"active\"><a>1</a></li>" +
                        "<li class=\"disabled\"><a aria-label=\"Next\">&raquo;</a></li></ul></div>";

            return pageHtml;
        }

        if (curPage == 1) {
            pageHtml += "<li class=\"disabled\"><a aria-label=\"Previous\">&laquo;</a></li>";
        } else {
            pageHtml += "<li><a href=\"javascript:" + funcName + "(" + (curPage - 1) + ");\" aria-label=\"Previous\">&laquo;</a></li>";
        }

        var tmpBegin = 1;
        var tmpEnd = 1;
        var tmpSum = (endPage - endPage % showPage) / showPage;

        /*for (var k = 0; k < tmpSum; k++) {
            tmpBegin = showPage * k + 1;
            tmpEnd = showPage * k + showPage;
            if (curPage >= tmpBegin && curPage < tmpEnd) {
                break;
            }
        }*/
        // 以下部分为计算分页显示多少中间页
        if (endPage <= showPage) {
            tmpBegin = 1;
            tmpEnd = endPage;
        } else {
            if (curPage < showPage) {
                tmpBegin = 1;
                tmpEnd = showPage
            } else if (curPage > endPage - showPage + 1) {
                tmpBegin = endPage - showPage + 1;
                tmpEnd = endPage;
            } else {
                tmpBegin = curPage - Math.ceil(showPage / 2) + 1;
                tmpEnd = parseInt(curPage) + parseInt(Math.floor(showPage / 2));
            }
        }

        // 首页 & 省略号
        if (tmpBegin > 2) {
            pageHtml += "<li><a href=\"javascript:" + funcName + "(1);\" aria-label=\"First\">1</a></li>";
            pageHtml += "<li><a aria-label=\"PreMore\">...</a></li>"
        } else if (tmpBegin == 2) {
            pageHtml += "<li><a href=\"javascript:" + funcName + "(1);\" aria-label=\"First\">1</a></li>";
        }

        for (var i = tmpBegin; i <= tmpEnd; i++) {
            if (i == curPage) {
                pageHtml += "<li class=\"active\"><a>" + i + "</a>";
                continue;
            }
            pageHtml += "<li><a href=\"javascript:"+ funcName + "(" + i + ");\">" + i + "</a>";
        }

        // 省略号 & 尾页
        if (tmpEnd < endPage - 1) {
            pageHtml += "<li><a aria-label=\"AfterMore\">...</a></li>"
            pageHtml += "<li><a href=\"javascript:" + funcName + "(" + endPage + ");\" aria-label=\"Last\">" + endPage + "</a></li>"
        } else if (tmpEnd == endPage - 1) {
            pageHtml += "<li><a href=\"javascript:" + funcName + "(" + endPage + ");\" aria-label=\"Last\">" + endPage + "</a></li>"
        }

        if (curPage != endPage) {
            pageHtml += "<li><a href=\"javascript:" + funcName + "(" + (curPage + 1) + ");\" aria-label=\"Next\">&raquo;</a></li></ul></div>";
        } else {
            pageHtml += "<li class=\"disabled\"><a aria-label=\"Next\">&raquo;</a></li></ul></div>";
        }

        return pageHtml;
    }
})(jQuery);