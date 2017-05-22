// ==UserScript==
// @name           Google Timer Title Update
// @namespace      org.alorel.googletimer
// @author         Alorel <a.molcanovas@gmail.com>
// @homepage       https://github.com/AlorelUserscripts/google-timer-title-switcher
// @supportURL     https://github.com/AlorelUserscripts/google-timer-title-switcher/issues
// @description    Automatically updates the title when using Google's timer
// @include        https://*google.*/search?*
// @version        1.1
// @icon           https://cdn.rawgit.com/AlorelUserscripts/google-timer-title-switcher/master/icon.png
// @run-at         document-start
// @grant          unsafeWindow
// @require        https://cdn.rawgit.com/turuslan/HackTimer/master/HackTimer.silent.min.js
// @updateURL      https://raw.githubusercontent.com/AlorelUserscripts/google-timer-title-switcher/master/google-timer-title.meta.js
// @downloadURL    https://raw.githubusercontent.com/AlorelUserscripts/google-timer-title-switcher/master/google-timer-title.user.js
// ==/UserScript==

unsafeWindow.setTimeout = setTimeout;
unsafeWindow.setInterval = setInterval;

document.addEventListener('DOMContentLoaded', ()=>{
    const container = document.querySelector("#act-timer-section>div");

    if (container) {
        const timerArea = container.querySelector("div");

        try {
            document.head.querySelector('link[rel="shortcut icon"]').setAttribute("href", GM_info.script.icon);
        } catch (e) {
        }

        for (let selector of [".srg", "#searchform", "#extrares", "#top_nav", "#navcnt", "#appbar"]) {
            setTimeout(() => {
                const el = document.querySelector(selector);
                el.parentNode.removeChild(el);
            }, 0);
        }

        const mo = new MutationObserver(() => {
            if (container.classList.contains("act-tim-paused")) {
                document.title = "PAUSED";
            } else if (container.classList.contains("act-tim-finished")) {
                document.title = "FINISHED";
            } else {
                document.title = timerArea.innerText.trim();
            }
        });

        mo.observe(timerArea, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true
        });
    }
}, {once: true});
