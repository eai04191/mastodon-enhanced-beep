// ==UserScript==
// @name         Mastodon Enhanced Beep! 🔔🔊
// @namespace    mizle.net
// @description  Beep Beep Another Beep!
// @author       Eai <eai@mizle.net>
// @license      MIT
// @version      1.0.4
// @icon         https://cldup.com/7zV-vUfafE.png

// @homepageURL  https://github.com/eai04191/mastodon-enhanced-beep
// @supportURL   https://github.com/eai04191/mastodon-enhanced-beep/issues

// @include      https://*/web/*

// @require      https://raw.githubusercontent.com/eai04191/userscript-graveyard/master/userscript/lib/player.js
// @require      https://cdn.rawgit.com/arantius/3123124/raw/1866c6780e1946f657f688537b199e0102ccd19c/grant-none-shim.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js

// @resource     config_css https://raw.githubusercontent.com/eai04191/mastodon-enhanced-beep/master/config.custom.css

// @grant        GM_getResourceText
// ==/UserScript==

"use strict";

GM_config.init({
    id: "eb",
    title: "Enhanced Beep! Settings",
    fields: {
        favouriteSource: {
            section: "Favourite",
            label: "Sound Source URL",
            type: "text",
            default: ""
        },
        favouriteVolume: {
            type: "unsigned float",
            label: "Volume",
            default: 0.5
        },
        favouriteTestButton: {
            type: "button",
            label: "🔊 Test",
            click: function() {
                player.play(GM_config.get("favouriteSource", true), { volume: GM_config.get("favouriteVolume", true) });
            }
        },
        favouriteNote: {
            type: "text",
            label: "Note",
            default: null
        },
        reblogSource: {
            section: "Boost",
            label: "Sound Source URL",
            type: "text",
            default: ""
        },
        reblogVolume: {
            type: "unsigned float",
            label: "Volume",
            default: 0.5
        },
        reblogTestButton: {
            type: "button",
            label: "🔊 Test",
            click: function() {
                player.play(GM_config.get("reblogSource", true), { volume: GM_config.get("reblogVolume", true) });
            }
        },
        reblogNote: {
            type: "text",
            label: "Note",
            default: null
        },
        replySource: {
            section: "Reply",
            label: "Sound Source URL",
            type: "text",
            default: ""
        },
        replyVolume: {
            type: "unsigned float",
            label: "Volume",
            default: 0.5
        },
        replyTestButton: {
            type: "button",
            label: "🔊 Test",
            click: function() {
                player.play(GM_config.get("replySource", true), { volume: GM_config.get("replyVolume", true) });
            }
        },
        replyNote: {
            type: "text",
            label: "Note",
            default: null
        },
        privateSource: {
            section: "Private Reply",
            label: "Sound Source URL",
            type: "text",
            default: ""
        },
        privateVolume: {
            type: "unsigned float",
            label: "Volume",
            default: 0.5
        },
        privateTestButton: {
            type: "button",
            label: "🔊 Test",
            click: function() {
                player.play(GM_config.get("privateSource", true), { volume: GM_config.get("privateVolume", true) });
            }
        },
        privateNote: {
            type: "text",
            label: "Note",
            default: null
        },
        directSource: {
            section: "Direct",
            label: "Sound Source URL",
            type: "text",
            default: ""
        },
        directVolume: {
            type: "unsigned float",
            label: "Volume",
            default: 0.5
        },
        directTestButton: {
            type: "button",
            label: "🔊 Test",
            click: function() {
                player.play(GM_config.get("directSource", true), { volume: GM_config.get("directVolume", true) });
            }
        },
        directNote: {
            type: "text",
            label: "Note",
            default: null
        },
        pollSource: {
            section: "Poll",
            label: "Sound Source URL",
            type: "text",
            default: ""
        },
        pollVolume: {
            type: "unsigned float",
            label: "Volume",
            default: 0.5
        },
        pollTestButton: {
            type: "button",
            label: "🔊 Test",
            click: function() {
                player.play(GM_config.get("pollSource", true), { volume: GM_config.get("pollVolume", true) });
            }
        },
        pollNote: {
            type: "text",
            label: "Note",
            default: null
        },
        deletedSource: {
            section: "Notification Deleted",
            label: "Sound Source URL",
            type: "text",
            default: ""
        },
        deletedVolume: {
            type: "unsigned float",
            label: "Volume",
            default: 0.5
        },
        deletedTestButton: {
            type: "button",
            label: "🔊 Test",
            click: function() {
                player.play(GM_config.get("deletedSource", true), { volume: GM_config.get("deletedVolume", true) });
            }
        },
        deletedNote: {
            type: "text",
            label: "Note",
            default: null
        },
        followSource: {
            section: "Follow",
            label: "Sound Source URL",
            type: "text",
            default: ""
        },
        followVolume: {
            type: "unsigned float",
            label: "Volume",
            default: 0.5
        },
        followTestButton: {
            type: "button",
            label: "🔊 Test",
            click: function() {
                player.play(GM_config.get("followSource", true), { volume: GM_config.get("followVolume", true) });
            }
        },
        followNote: {
            type: "text",
            label: "Note",
            default: null
        }
    },
    events: {
        open: function() {
            GM_config.frame.setAttribute(
                "style",
                `
                bottom: auto;
                display: none;
                height: 100%;
                left: 0;
                margin: 0;
                overflow: auto;
                padding: 0;
                position: fixed;
                right: auto;
                top: 0;
                width: 100%;
                z-index: 99999;
                `
            );
            GM_config.frame.contentWindow.document.querySelectorAll("input[type='text']").forEach(function(element) {
                element.setAttribute("placeholder", "\u00A0"); // &nbsp
            });
        },
        save: function() {
            location.reload();
        }
    },
    css: GM_getResourceText("config_css")
});

window.addEventListener(
    "load",
    function() {
        addSettingButton();
        document.getElementById("enhanced-beep-config").onclick = eventHandlerOpenConfig;
        // const showLog = GM_config.get("showLog");
        const showLog = false;

        class EnhancedBeep {
            constructor() {
                this.mutationObserver = new MutationObserver(mutations => this.onUpdate(mutations));
            }

            start() {
                this.mutationObserver.observe(
                    document
                        .querySelector(".fa-bell.column-header__icon") // Notification Column Icon
                        .closest("div.column") // Notification Column
                        .querySelector("div.item-list"),
                    {
                        childList: true
                    }
                );
            }

            onUpdate(mutations) {
                const mutation = mutations[0];
                if (showLog) console.log(mutation);

                if (
                    mutation.removedNodes.length != 0 &&
                    mutation.removedNodes[0].attributes[0].value != 21 // Mastodon Web displays the notification of 20. 21 is not a deletion of the notification in the case disappeared.
                ) {
                    this.beep("deleted");
                    return;
                }
                if (mutation.addedNodes.length != 0 && mutation.addedNodes[0].attributes[0].value == 1) {
                    const notificationElement = mutation.addedNodes[0].firstChild.firstChild;
                    const notificationClassList = notificationElement.classList;
                    if (showLog) console.log("Element:", notificationElement);
                    if (showLog) console.log("Class:", notificationClassList);
                    switch (notificationClassList[1]) {
                        case "notification-favourite":
                            this.beep("favourite");
                            break;
                        case "notification-reblog":
                            this.beep("reblog");
                            break;
                        case "notification-follow":
                            this.beep("follow");
                            break;
                        case "notification-poll":
                            this.beep("poll");
                            break;
                        case "status__wrapper-unlisted":
                        case "status__wrapper-private":
                            this.beep("private");
                            break;
                        case "status__wrapper-public":
                            this.beep("reply");
                            break;
                        case "status__wrapper-direct":
                            this.beep("direct");
                            break;
                        case "fa-ellipsis-h": // Load more
                            // Do nothing.
                            break;
                        default:
                            console.warn("Unexpected notification!");
                            console.log("Element:", notificationElement);
                            console.log("Class:", notificationClassList);
                            break;
                    }
                }
            }

            beep(type) {
                if (showLog) console.log("Play Beep:", type);
                const source = GM_config.get(`${type}Source`);
                if (source) {
                    player.play(source, { volume: GM_config.get(`${type}Volume`) || 0.5 });
                }
            }
        }

        new EnhancedBeep().start();
    },
    false
);

function eventHandlerOpenConfig() {
    GM_config.open();
}

function addSettingButton() {
    const buttonContainer = document
        .querySelector(".fa-bell.column-header__icon")
        .closest(".column-header")
        .querySelector(".column-header__buttons");
    const button = document.createElement("button");
    button.classList.add("column-header__button");
    button.setAttribute("title", "Show Enhanced Beep! settings.");
    button.setAttribute("aria-label", "Show Enhanced Beep! settings.");
    button.setAttribute("aria-pressed", "false");
    button.id = "enhanced-beep-config";

    const iconContainer = document.createElement("span");
    iconContainer.classList.add("fa-stack");
    iconContainer.style.width = "1em";
    iconContainer.style.height = "1em";
    iconContainer.style.lineHeight = "1em";

    const iconBell = document.createElement("i");
    iconBell.classList.add("fa", "fa-bell", "fa-stack-1x");
    const iconPlus = document.createElement("i");
    iconPlus.classList.add("fa", "fa-plus", "fa-stack-1x", "fa-inverse");
    iconPlus.style.fontSize = ".5em";

    iconContainer.appendChild(iconBell);
    iconContainer.appendChild(iconPlus);
    button.appendChild(iconContainer);
    buttonContainer.insertBefore(button, buttonContainer.lastChild);
}
