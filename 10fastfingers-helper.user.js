// ==UserScript==
// @name 10FastFingers Helper
// @namespace https://github.com/narze/userscripts
// @author narze
// @version 0.0.2
// @description Quick restart
// @match https://10fastfingers.com/*
// @icon https://10fastfingers.com/favicon.ico
// @downloadURL https://github.com/narze/userscripts/raw/master/10fastfingers-helper.user.js
// @grant none
// ==/UserScript==

const ENTER = 13;

document.onkeypress = function (e) {
  let key = e.keyCode;

  if (key == ENTER) {
    document.querySelector('#reload-btn').click();
  }
}

