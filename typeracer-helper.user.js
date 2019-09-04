// ==UserScript==
// @name TypeRacer Helper
// @namespace https://github.com/narze/userscripts
// @author narze
// @version 0.0.3
// @description Shortcut keys to Typeracer, no cheats here!
// @match https://play.typeracer.com/
// @downloadURL  https://github.com/narze/userscripts/raw/master/typeracer-helper.user.js
// @grant none
// ==/UserScript==

const ENTER = 13;

document.onkeypress = function (e) {
  let char = e.charCode;

  if (char == ENTER) {
    document.querySelector('.raceAgainLink').click();
  }
}

