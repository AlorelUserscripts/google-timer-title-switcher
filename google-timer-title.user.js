// ==UserScript==
// @name           Google Timer Title Update
// @namespace      org.alorel.googletimer
// @author         Alorel <a.molcanovas@gmail.com>
// @description    Automatically updates the title when using Google's timer
// @include        https://*google.*/search?*
// @version        1.0.2
// @icon           https://cdn.rawgit.com/AlorelUserscripts/google-timer-title-switcher/master/icon.png
// @run-at         document-end
// @grant          GM_info
// @updateURL      https://raw.githubusercontent.com/AlorelUserscripts/google-timer-title-switcher/master/google-timer-title.meta.js
// @downloadURL    https://raw.githubusercontent.com/AlorelUserscripts/google-timer-title-switcher/master/google-timer-title.user.js
// ==/UserScript==

(function () {
    var timerArea,
        container,
        title;

    if (container = document.querySelector("#act-timer-section>div")) {
        timerArea = container.querySelector("div");
        title = document.querySelector("head>title");

        try {
            document.querySelector('link[rel="shortcut icon"]').setAttribute("href", GM_info.script.icon);
        } catch (e) {
        }

        (new MutationObserver(function () {
            if (container.classList.contains("act-tim-paused")) {
                title.innerText = "PAUSED";
            } else if (container.classList.contains("act-tim-finished")) {
                title.innerText = "FINISHED";
            } else {
                title.innerText = timerArea.innerText.trim();
            }
        })).observe(timerArea, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true
        });
    }
})();