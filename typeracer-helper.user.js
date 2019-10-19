// ==UserScript==
// @name TypeRacer Helper
// @namespace https://github.com/narze/userscripts
// @author narze
// @version 0.0.5
// @description Shortcut keys to Typeracer, no cheats here!
// @match https://play.typeracer.com/
// @icon https://play.typeracer.com/favicon.ico
// @downloadURL  https://github.com/narze/userscripts/raw/master/typeracer-helper.user.js
// @grant none
// ==/UserScript==

const ENTER = 13;

document.onkeypress = function (e) {
  let key = e.keyCode;

  if (key == ENTER) {
    document.querySelector('.raceAgainLink').click();
  }
}

var body = document.querySelector('body')
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      // console.log('body changed', mutations[0].addedNodes);
     if(mutations[0].addedNodes.length) {
       if (mutations[0].addedNodes[0].className && mutations[0].addedNodes[0].className.split(' ').indexOf("countdownPopup") != -1) {
         console.log('Countdown found')

//         var target = document.querySelector("table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input.txtInput")
         var target = document.querySelector("table > tbody > tr:nth-child(2) > td > table.inputPanel")
          // create an observer instance
//          window.xx = target;
  //        console.log(target)
          target.onkeydown = function(e) {
//            console.log('typed')
          //var observer = new MutationObserver(function(mutations) {

            var textBody = document.querySelector("table > tbody > tr:nth-child(2) > td > table.inputPanel > tbody > tr:nth-child(1) > td > table > tbody")
            textBody.parentNode.style.position = 'relative'

            var textBodyClone = textBody.cloneNode(true)
            textBodyClone.className += " TRHelperTextMask"
            textBodyClone.style.position = 'absolute'
            textBodyClone.style.top = '0'

            var mask = "rgba(0,0,0,1)"

            textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(2)').style.backgroundColor = 'red'
            textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(2)').style.color = 'red'

            var t = textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:last-child')

            var textContent = t.textContent;
            var wordIndex = textContent.indexOf(' ', 1);
            var nextWordIndex = textContent.indexOf(' ', wordIndex + 1);
            var lookAheadChars = nextWordIndex + 1;
            console.log(lookAheadChars)
            var textToHide = textContent.slice(0, lookAheadChars)
            var textRemaining = textContent.slice(lookAheadChars)

            var span = document.createElement("span");
            var spanHide = document.createElement("span")
            var spanRemaining = document.createElement("span");

            spanHide.style.backgroundColor = mask
            spanHide.style.color = mask
            spanHide.appendChild(document.createTextNode(textToHide))
            spanRemaining.appendChild(document.createTextNode(textRemaining))
            span.appendChild(spanHide)
            span.appendChild(spanRemaining)
            t.parentNode.replaceChild(span, t)

            var existingTextMask = document.querySelector("table > tbody > tr:nth-child(2) > td > table.inputPanel > tbody > tr:nth-child(1) > td > table > tbody.TRHelperTextMask")
            if (existingTextMask) {
              textBody.parentNode.replaceChild(textBodyClone, existingTextMask)
            } else {
              textBody.parentNode.appendChild(textBodyClone)
            }
          }
          // configuration of the observer:
          //var config = { attributes: true, childList: true, characterData: true };
          // pass in the target node, as well as the observer options
          //observer.observe(target, config);
       }
     }
    });
    // configuration of the observer:
    var config = { childList: true };
    // pass in the target node, as well as the observer options
    observer.observe(body, config);
