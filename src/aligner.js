
function update(padding, align) {
  var newPadding = padding + parseInt(localStorage.getItem('centerPagesPadding') || 0);
  if (newPadding < 0) {
    newPadding = 0;
  }
  var newAlign = align || localStorage.getItem('centerPagesAlign') || 'center';

  var left = 0;
  var right = 0;
  if (newAlign === 'left') {
    right = newPadding * 2;
  } else if (newAlign === 'right') {
    left = newPadding * 2;
  } else {
    left = newPadding;
    right = newPadding;
  }
  var contentCont = document.documentElement;
  contentCont.style.borderLeft = left.toFixed() + 'px solid transparent';
  contentCont.style.borderRight = right.toFixed() + 'px solid transparent';

  // This is needed because of a bug with Chrome not re-rendering css immediately.
  document.getElementsByTagName('body')[0].focus();

  localStorage.setItem('centerPagesPadding', newPadding);
  localStorage.setItem('centerPagesAlign', newAlign);
}

function query() {
  return {
    padding: localStorage.getItem('centerPagesPadding'),
    align: localStorage.getItem('centerPagesAlign'),
  }
}

if (localStorage.getItem('centerPagesPadding')) {
  update(0, '');
}

chrome.runtime.onMessage.addListener(
  /*
    Listen to extension menu actions.
   */
  function (request, sender, sendResponse) {
    console.log('s', sender);
    if (request.query) {
      sendResponse(query());
    } else if (request.changePadding === "increase") {
      update(+25, '');
    } else if (request.changePadding === "decrease") {
      update(-25, '');
    } else if (request.changeAlign) {
      update(0, request.changeAlign);
    }
  });
