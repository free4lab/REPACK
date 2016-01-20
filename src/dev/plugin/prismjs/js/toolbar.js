(function(){
  if (!self.Prism) {
    return;
  }

  // Grab the location of the ZeroClipboard flash file
  var script = document.getElementsByTagName('script');
  script = script[script.length - 1];
  if (script) {
    var moviePath = script.getAttribute('src');
    moviePath = moviePath.replace(moviePath.substring(moviePath.lastIndexOf('/')+1), 'ZeroClipboard.swf');
  }

  // Attach our hook, only for those parts that we highlighted
  Prism.hooks.add('after-highlight', function(env) {

    // Check if inline or actual code block (credit to line-numbers plugin)
    var pre = env.element.parentNode;
    if (!pre || !/pre/i.test(pre.nodeName) || pre.className.indexOf('code-toolbar') === -1) {
      return;
    }

    // Setup the toolbar
    var toolbar = document.createElement('div');
    toolbar.setAttribute('class', 'toolbar');

    // View source button
    var linkSource = document.createElement('a');
    linkSource.innerHTML = 'View source';
    attachClickHandler(linkSource, function( ) {
      var newWindow = window.open('', 'Source Code', 'chrome,resizable,scrollbars,centerscreen,width=800,height=600');
      var strCode = this.code;
      newWindow.document.open();
      if (this.language == 'html') {
        strCode = htmlEncode(this.code);
      }
      newWindow.document.write('<!doctype html><html><head><title>Source Code</title></head><body><pre><code>' + strCode + '</code></pre></body></html>');
      newWindow.document.close();
      return false;
    }, env);
    toolbar.appendChild(linkSource);

    // Copy to clipboard button, requires ZeroClipboard
    if(window.ZeroClipboard && moviePath)
    {
      var linkCopy = document.createElement('a');
      linkCopy.innerHTML = 'Copy to clipboard';

      var clip = new ZeroClipboard(linkCopy, {
        'moviePath': moviePath
      });

      clip.on('copy', function (e) {
        // Workaround for their singleton pattern (see issue zeroclipboard/ZeroClipboard#90)
        if(e.target.parentNode.parentNode.getElementsByTagName('code')[0])
          clip.setText(e.target.parentNode.parentNode.getElementsByTagName('code')[0].innerText);
      });
      clip.on('aftercopy', function(e) {
        // Workaround for their singleton pattern (see issue zeroclipboard/ZeroClipboard#90)
        var message = e.target.parentNode.parentNode.getAttribute('data-copy-success');
        if(message) {
          alert(e.target.parentNode.parentNode.getAttribute('data-copy-success'));
        } else if(message == null) {
          alert('Code copied succesfully');
        }
      });
      toolbar.appendChild(linkCopy);
    }

    // Add our toolbar to the <pre> tag
    pre.appendChild(toolbar);
  });

  // Cross-browser click handler
  function attachClickHandler(element, callback, that)
  {
    if(element.addEventListener) {
      element.addEventListener('click', function() { callback.apply(that) });
    } else if(element.attachEvent) {
      element.attachEvent('onclick',  function() { callback.apply(that) });
    }
  }

  // Html Encode
  function htmlEncode(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();