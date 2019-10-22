// ==UserScript==
// @name TypeRacer Helper
// @namespace https://github.com/narze/userscripts
// @author narze
// @version 0.1.0
// @description Shortcut keys to Typeracer, no cheats here!
// @match https://play.typeracer.com/
// @icon https://play.typeracer.com/favicon.ico
// @downloadURL  https://github.com/narze/userscripts/raw/master/typeracer-helper.user.js
// @grant none
// ==/UserScript==

const DEBUG = false;
const LOOKAHEAD_TWOWORDS = false; // FIXME
const ENTER = 13;
const SPACEBAR = 32;

document.onkeypress = function (e) {
  let key = e.keyCode;

  if (key == ENTER) {
    document.querySelector('.raceAgainLink').click();
  }
}

var body = document.querySelector('body')
    var observer = new MutationObserver(function(mutations) {
     if(mutations[0].addedNodes.length) {
       if (mutations[0].addedNodes[0].className && mutations[0].addedNodes[0].className.split(' ').indexOf("countdownPopup") != -1) {
         var target = document.querySelector("table > tbody > tr:nth-child(2) > td > table.inputPanel")
          target.onkeydown = function(e) {
            if (e.keyCode == SPACEBAR) {
              setTimeout(function() {
                var textBody = document.querySelector("table > tbody > tr:nth-child(2) > td > table.inputPanel > tbody > tr:nth-child(1) > td > table > tbody")
                textBody.parentNode.style.position = 'relative'

                var textBodyClone = textBody.cloneNode(true)
                textBodyClone.className += "TRHelperTextMask"

                if (!DEBUG) {
                  textBodyClone.style.position = 'absolute'
                  textBodyClone.style.top = '0'
                }

                var mask = "#fafafa"

                if (textBodyClone.querySelectorAll('tr:nth-child(1) > td > div > div > span').length > 3) {
                  // Typed words
                  textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:first-child').className += ' typedWords'

                  // First charactor of current word
                  textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(3)').style.backgroundColor = mask
                  textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(3)').style.color = mask
                  textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(3)').className += ' fadeOut'
                  textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(3)').style.backgroundImage = 'url("")'
                }

                // Remaining charactors of current word
                textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(2)').style.backgroundColor = mask
                textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(2)').style.color = mask
                textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(2)').className += ' fadeOut'
                textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:nth-last-child(2)').style.backgroundImage = 'url("")'

                var t = textBodyClone.querySelector('tr:nth-child(1) > td > div > div > span:last-child')

                var textContent = t.textContent;
                var wordIndex = textContent.indexOf(' ', 1);
                var lookAheadChars = wordIndex + 1;

                if (LOOKAHEAD_TWOWORDS) {
                  lookAheadChars = textContent.indexOf(' ', lookAheadChars) + 1;
                }

                var textToHide = textContent.slice(0, lookAheadChars)
                var textRemaining = textContent.slice(lookAheadChars)

                var span = document.createElement("span");
                var spanHide = document.createElement("span")
                var spanRemaining = document.createElement("span");

                spanHide.className += " fadeOut"

                spanHide.appendChild(document.createTextNode(textToHide))
                spanRemaining.appendChild(document.createTextNode(textRemaining))
                spanRemaining.style.color = 'transparent'

                span.appendChild(spanHide)
                span.appendChild(spanRemaining)
                t.parentNode.replaceChild(span, t)

                textBody.parentNode.appendChild(textBodyClone)

                var existingTextMasks = document.querySelectorAll("table > tbody > tr:nth-child(2) > td > table.inputPanel > tbody > tr:nth-child(1) > td > table > tbody.TRHelperTextMask")

                for (let i = 0; i < existingTextMasks.length; i++) {
                  existingTextMasks[i].style.zIndex = 100 - i
                }

                var maxTextMasks = 2
                if (existingTextMasks && existingTextMasks.length > maxTextMasks) {
                  for (let i = 0; i < existingTextMasks.length - maxTextMasks; i++) {
                    textBody.parentNode.removeChild(existingTextMasks[0])
                  }
                }
              }, 10)
            }
          }
       }
     }
    });
    // configuration of the observer:
    var config = { childList: true };
    // pass in the target node, as well as the observer options
    observer.observe(body, config);
