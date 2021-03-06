//js unicode和gb2312之间的转码
var GB2312UnicodeConverter = {
    ToUnicode: function (str) {
        return str != null ? escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u') : null;
    }
    , ToGB2312: function (str) {
        return str != null ? unescape(str.replace(/\\u/gi, '%u')) : null;
    }
};

//写cookies
function nSetCookie(name,value,time)
{
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getsec(str)
{
    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s"){
        return str1*1000;
    }else if (str2=="h"){
        return str1*60*60*1000;
    }else if (str2=="d"){
        return str1*24*60*60*1000;
    }
}

//读取cookies
function nGetCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name){
  //获取当前时间 
  var date=new Date(); 
  //将date设置为过去的时间 
  date.setTime(date.getTime() - 10000);
  var v = nGetCookie(name);
  //将userId这个cookie删除 
  if (v != null) {
    document.cookie = name + "=" + v + "; expires=" + date.toGMTString();
  }
}

// 新手指南
function primer() {
  // check cookie is it a fresh
  // assume cookie fresh key value is
  var freshFlag = nGetCookie('fresh')
  if (freshFlag == null || freshFlag == 'false') {
    nSetCookie('fresh', 'true', 'd120')
  } else {
    return;
  }

  // yes it is
  // full-screen mask
  var $body = $(document.body);
  var $mask = $([
    '<div class="modal-backdrop fade" style="bottom: 0; z-index: 1040;"></div>'
  ].join(''));
  $body.append($mask)
  $mask.addClass('in');

  // ok you need to write a 'next' function
  // with the help of data-intro element array
  // it can make it

  // so the first thing i need to do is check out what the type of $('[data-intro]') return

  // select data-intro
  var introElement = $('[data-intro]'); // actually object
  var rankIntroElement = new Array();

  var i = 0;
  for (; i < introElement.length; ++i) {
    rankIntroElement.push($(introElement[i]));
  }

  // rank these element with data-intro value
  // sort reference
  function sortOrder(a, b) {
    return a.data('intro') - b.data('intro');
  }

  rankIntroElement.sort(sortOrder);

  var templateBottom = [
    '<div class="popover bottom">',
    '<div class="arrow"></div>',
    '<h3 class="popover-title">', 'Title', '</h3>', // 3
    '<div class="popover-content">',
    '<p>', 'Content', '</p>', // 7
    '<div class="text-right">',
    '<button class="btn btn-primary" data-intro-get>', 'get it~', '</button>', // 11
    '</div>',
    '</div>',
    '</div>'
  ];

  var titleIndex = 3;
  var contentIndex = 7;
  var okIndex = 11;

  // generate html code & fill content
  var introPopup = new Array();
  for (i = 0; i < rankIntroElement.length; ++i) {
    var title = rankIntroElement[i].data('intro-title');
    var content = rankIntroElement[i].data('intro-content');

    var popup = templateBottom.slice();
    if (title != undefined && title.trim() != '') {
      popup[titleIndex] = title;
    }
    if (content != undefined && content.trim() != '') {
      popup[contentIndex] = content;
    }

    var $popup = $(popup.join(''));
    introPopup.push($popup);
    $body.append($popup);
    $popup.click(incNext);
  }

  var next = 0;
  function incNext(evt) {
    if ($(evt.target).is('[data-intro-get]')) {
      introPopup[next].removeAttr('style');
      ++next;
      showNext();
    }
  }

  showNext();

  // show the next one
  function showNext() {
    if (next < rankIntroElement.length) {
      // shift position to show
      var offsetLeft = rankIntroElement[next].offset().left - 2 + rankIntroElement[next].width() / 2;
      var centerOffset = offsetLeft - introPopup[next].width() / 2;

      if (centerOffset < 0) { // beyond screen
        centerOffset = offsetLeft - 13; // arrow width 22 border width 1 then 22 / 2 + 2
        if (centerOffset < 0) {
          centerOffset = 0;
        }
        introPopup[next].children('.arrow').css({'left': '0', 'margin-left': centerOffset}); // arrow offset
        centerOffset = 0; // popup offset
      }

      introPopup[next].css('display', 'block')
          .css('top', '54px')
          .css('left', centerOffset)
    } else {
      $mask.remove();
    }
  }
}