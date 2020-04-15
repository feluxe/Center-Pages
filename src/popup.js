//
//
document.addEventListener('DOMContentLoaded', function () {
  var increaseButton = document.getElementById('centerPagesIncrease');
  var decreaseButton = document.getElementById('centerPagesDecrease');

  increaseButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { changePadding: "increase" }, function () {
        if (chrome.runtime.lastError) {   // This check will suppress the "Unchecked lastError value ..." msg.
          return
        }
      });
    });
  }, false);

  decreaseButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { changePadding: "decrease" }, function () {
        if (chrome.runtime.lastError) {   // This check will suppress the "Unchecked lastError value ..." msg.
          return
        }
      });
    });
  }, false);

  // check radio box
  var radioBoxes = document.querySelectorAll("input[name='centerPagesAlign']");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length === 0) {
      return;
    }
    chrome.tabs.sendMessage(tabs[0].id, { query: true }, function (response) {
      if (chrome.runtime.lastError) {   // This check will suppress the "Unchecked lastError value ..." msg.
        return
      }
      for (var i = 0; i < radioBoxes.length; ++i) {
        if (radioBoxes[i].value === response.align) {
          radioBoxes[i].checked = true;
          break;
        }
      }
    });
  });

  // radio box click event
  for (var i = 0; i < radioBoxes.length; ++i) {
    radioBoxes[i].addEventListener('change', function (event) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { changeAlign: event.target.value }, function () {
          if (chrome.runtime.lastError) {   // This check will suppress the "Unchecked lastError value ..." msg.
            return
          }
        });
      });
    }, false);
  }

}, false);
