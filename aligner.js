var html = document.getElementsByTagName('html')[0];


function activate_page_align() {
  /**/
  var contentCont = document.createElement('div');

  html.style.background = 'transparent';
  contentCont.id = 'pageAlignerContentCont';
  contentCont.style.background = 'transparent';

  while (html.hasChildNodes()) {
    contentCont.appendChild(html.firstChild);
  }

  html.appendChild(contentCont);
}


function deactivate_page_align() {
  /**/
  var contentCont = document.getElementById('pageAlignerContentCont');

  html.style.background = '';

  while (contentCont.hasChildNodes()) {
    html.appendChild(contentCont.firstChild);
  }

  html.removeChild(contentCont);
}


function increase_padding() {
  /**/
  var contentCont = document.getElementById('pageAlignerContentCont');
  if (!contentCont) {
    activate_page_align();
    increase_padding()
  } else {
    var cur_padding_val = getComputedStyle(contentCont, null).getPropertyValue('padding-left');
    var cur_padding_val_num = parseInt(cur_padding_val);
    var new_padding_val = cur_padding_val_num + 50 + 'px';

    contentCont.style.paddingLeft = new_padding_val;
    contentCont.style.paddingRight = new_padding_val;
    // This is needed because of a bug with Chrome not re-rendering css immediately.
    document.getElementsByTagName('body')[0].focus();
  }
}


function decrease_padding() {
  /**/
  var contentCont = document.getElementById('pageAlignerContentCont');

  if (!contentCont)
    return;

  var cur_padding_val = getComputedStyle(contentCont, null).getPropertyValue('padding-left');
  var cur_padding_val_num = parseInt(cur_padding_val);

  if (cur_padding_val_num >= 50) {
    var new_padding_val = cur_padding_val_num - 50 + 'px';
    contentCont.style.paddingLeft = new_padding_val;
    contentCont.style.paddingRight = new_padding_val;
    // This is needed because of a bug with Chrome not re-rendering css immediately.
    document.getElementsByTagName('body')[0].focus();
  } else {
    deactivate_page_align();
  }
}

chrome.runtime.onMessage.addListener(
  /*
   Listen to extension menu actions.
   */
  function (request) {
    if (request.changePadding === "increase") {
      increase_padding();
    }
    else if (request.changePadding === "decrease") {
      decrease_padding();
    }
  });


