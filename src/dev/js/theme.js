function changeSkin() {
  var curSkin = nGetCookie('theme');
  if (curSkin == 'dark') {
    setSkin(curSkin, 'default');
  } else {
    setSkin(curSkin, 'dark');
  }
}

function setSkin(curSkin, newSkin) {
  var reg = RegExp(curSkin, 'g');
  $('#theme').attr('href', $('#theme').attr('href').replace(reg, newSkin));
  nSetCookie('theme', newSkin, 'd7');
}

