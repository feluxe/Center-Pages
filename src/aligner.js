
var html = document.getElementsByTagName('html')[0];


var curPaddingNum = parseInt(localStorage.getItem('centerPagesPadding') || 0);

if (curPaddingNum > 0) {
  adjustPadding(curPaddingNum, 0)
}

function adjustPadding(curPaddingNum, diff) {

  var contentCont = document.documentElement;
  var newPaddingNum = parseInt(curPaddingNum + diff)

  if (newPaddingNum < 0) {
    newPaddingNum = 0
  }

  var newPadding = newPaddingNum + 'px';

  contentCont.style.borderLeft = newPadding + ' solid transparent';
  contentCont.style.borderRight = newPadding + ' solid transparent';

  localStorage.setItem('centerPagesPadding', newPaddingNum);


}

function increasePadding() {
  /**/
  var curPaddingNum = parseInt(localStorage.getItem('centerPagesPadding') || 0);
  adjustPadding(curPaddingNum, 25)
  // This is needed because of a bug with Chrome not re-rendering css immediately.
  document.getElementsByTagName('body')[0].focus();

  return curPaddingNum + 25
}


function decreasePadding() {
  /**/
  var curPaddingNum = parseInt(localStorage.getItem('centerPagesPadding') || 0);

  adjustPadding(curPaddingNum, -25)
  // This is needed because of a bug with Chrome not re-rendering css immediately.
  document.getElementsByTagName('body')[0].focus();
}


chrome.runtime.onMessage.addListener(
  /*
    Listen to extension menu actions.
    */
  function (request) {
    if (request.changePadding === "increase") {
      return increasePadding();
    } else if (request.changePadding === "decrease") {
      decreasePadding();
    }
  });


