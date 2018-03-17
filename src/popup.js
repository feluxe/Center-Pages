//
//
document.addEventListener('DOMContentLoaded', function () {


  var increaseButton = document.getElementById('centerPagesIncrease');
  var decreaseButton = document.getElementById('centerPagesDecrease');

  increaseButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { changePadding: "increase" }, function (response) {
        console.log(response);
      });
    });
  }, false);

  decreaseButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { changePadding: "decrease" }, function (response) {
        // console.log(response.increase_completed);
      });
    });
  }, false);

}, false);
