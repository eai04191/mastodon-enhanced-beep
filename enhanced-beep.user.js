// ==UserScript==
// @name         Mastodon Enhanced Beep! 🔔🔊
// @namespace    mizle.net
// @description  Beep Beep Another Beep!
// @author       Eai <eai@mizle.net>
// @license      MIT
// @version      2.0.0
// @icon         https://cldup.com/7zV-vUfafE.png
// @homepageURL  https://github.com/eai04191/mastodon-enhanced-beep
// @supportURL   https://github.com/eai04191/mastodon-enhanced-beep/issues
// @include      https://*/web/*
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @resource     config_css https://raw.githubusercontent.com/eai04191/mastodon-enhanced-beep/master/config.custom.css?20191127
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    "use strict";

    const id = "net_mizle_eb";

    GM_config.init({
        id: id,
        title: "Enhanced Beep! Settings",
        fields: {
            commonMasterVolume: {
                section: "Common Settings",
                type: "int",
                label: "Master Volume",
                min: 0,
                max: 100,
                default: 100
            },
            commonExportSettings: {
                type: "button",
                label: "📤 Export Settings",
                click: () => {
                    GM_config.write();
                    prompt(
                        "The settings have been exported. Save all of this.",
                        localStorage.getItem(id)
                    );
                }
            },
            commonImportSettings: {
                type: "button",
                label: "📥 Import Settings",
                click: () => {
                    const input = prompt("Paste your Settings here.");
                    if (!input) return;
                    try {
                        JSON.parse(input);
                    } catch (error) {
                        alert("Settings that are input is not a valid JSON.");
                        return;
                    }
                    localStorage.setItem(id, input);
                    location.reload();
                }
            },
            favouriteSource: {
                section: "Favourite",
                type: "text",
                label: "Sound Source URL",
                default: ""
            },
            favouriteVolume: {
                type: "int",
                label: "Volume",
                min: 0,
                max: 100,
                default: 50
            },
            favouriteTestButton: {
                type: "button",
                label: "🔊 Test",
                click: () => {
                    play(
                        GM_config.get("favouriteSource", true),
                        GM_config.get("favouriteVolume", true)
                    );
                }
            },
            favouriteNote: {
                type: "text",
                label: "Note",
                default: null
            },
            reblogSource: {
                section: "Boost",
                type: "text",
                label: "Sound Source URL",
                default: ""
            },
            reblogVolume: {
                type: "int",
                label: "Volume",
                min: 0,
                max: 100,
                default: 50
            },
            reblogTestButton: {
                type: "button",
                label: "🔊 Test",
                click: () => {
                    play(
                        GM_config.get("reblogSource", true),
                        GM_config.get("reblogVolume", true)
                    );
                }
            },
            reblogNote: {
                type: "text",
                label: "Note",
                default: null
            },
            replySource: {
                section: "Reply",
                type: "text",
                label: "Sound Source URL",
                default: ""
            },
            replyVolume: {
                type: "int",
                label: "Volume",
                min: 0,
                max: 100,
                default: 50
            },
            replyTestButton: {
                type: "button",
                label: "🔊 Test",
                click: () => {
                    play(
                        GM_config.get("replySource", true),
                        GM_config.get("replyVolume", true)
                    );
                }
            },
            replyNote: {
                type: "text",
                label: "Note",
                default: null
            },
            privateSource: {
                section: "Private Reply",
                type: "text",
                label: "Sound Source URL",
                default: ""
            },
            privateVolume: {
                type: "int",
                label: "Volume",
                min: 0,
                max: 100,
                default: 50
            },
            privateTestButton: {
                type: "button",
                label: "🔊 Test",
                click: () => {
                    play(
                        GM_config.get("privateSource", true),
                        GM_config.get("privateVolume", true)
                    );
                }
            },
            privateNote: {
                type: "text",
                label: "Note",
                default: null
            },
            directSource: {
                section: "Direct",
                type: "text",
                label: "Sound Source URL",
                default: ""
            },
            directVolume: {
                type: "int",
                label: "Volume",
                min: 0,
                max: 100,
                default: 50
            },
            directTestButton: {
                type: "button",
                label: "🔊 Test",
                click: () => {
                    play(
                        GM_config.get("directSource", true),
                        GM_config.get("directVolume", true)
                    );
                }
            },
            directNote: {
                type: "text",
                label: "Note",
                default: null
            },
            pollSource: {
                section: "Poll",
                type: "text",
                label: "Sound Source URL",
                default: ""
            },
            pollVolume: {
                type: "int",
                label: "Volume",
                min: 0,
                max: 100,
                default: 50
            },
            pollTestButton: {
                type: "button",
                label: "🔊 Test",
                click: () => {
                    play(
                        GM_config.get("pollSource", true),
                        GM_config.get("pollVolume", true)
                    );
                }
            },
            pollNote: {
                type: "text",
                label: "Note",
                default: null
            },
            followSource: {
                section: "Follow",
                type: "text",
                label: "Sound Source URL",
                default: ""
            },
            followVolume: {
                type: "int",
                label: "Volume",
                min: 0,
                max: 100,
                default: 50
            },
            followTestButton: {
                type: "button",
                label: "🔊 Test",
                click: () => {
                    play(
                        GM_config.get("followSource", true),
                        GM_config.get("followVolume", true)
                    );
                }
            },
            followNote: {
                type: "text",
                label: "Note",
                default: null
            }
        },
        events: {
            open: () => {
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
                z-index: 9999999999;
                `
                );
                GM_config.frame.contentWindow.document
                    .querySelectorAll("input[type='text']")
                    .forEach(element => {
                        element.setAttribute("placeholder", "\u00A0"); // &nbsp
                    });
            },
            save: () => {
                GM_config.close();
            }
        },
        css: GM_getResourceText("config_css")
    });

    window.addEventListener(
        "load",
        function() {
            addSettingButton();

            monitorNotification();
        },
        false
    );

    function monitorNotification() {
        const initialState = JSON.parse(
            document.querySelector("#initial-state").innerText
        );
        const socket = new WebSocket(
            `${initialState.meta.streaming_api_base_url}/api/v1/streaming/?stream=user`,
            initialState.meta.access_token
        );

        socket.addEventListener("message", event => {
            const message = JSON.parse(event.data);
            if (message.event !== "notification") return;
            const payload = JSON.parse(message.payload);
            switch (payload.type) {
                case "favourite":
                    beep("favourite");
                    break;
                case "reblog":
                    beep("reblog");
                    break;
                case "follow":
                    beep("follow");
                    break;
                case "poll":
                    beep("poll");
                    break;
                case "mention":
                    switch (payload.status.visibility) {
                        case "direct":
                            beep("direct");
                            break;
                        case "private":
                        case "unlisted":
                            beep("private");
                            break;
                        default:
                            beep("reply");
                    }
                    break;

                default:
                    console.warn("Unexpected notification!: " + payload.type);
            }
        });
    }

    function addSettingButton() {
        const html = `
        <button
            class="column-header__button"
            title="Show Enhanced Beep! settings."
            aria-label="Show Enhanced Beep! settings."
            aria-pressed="false"
            id="enhanced-beep-config"
        >
            <span class="fa-stack" style="width: 1em; height: 1em; line-height: 1em;">
                <i class="fa fa-bell fa-stack-1x"></i>
                <i class="fa fa-plus fa-stack-1x fa-inverse" style="font-size: 0.5em;"></i>
            </span>
        </button>
    `;
        const buttonContainer = document
            .querySelector(".fa-bell.column-header__icon")
            .closest(".column-header")
            .querySelector(".column-header__buttons");
        buttonContainer.insertAdjacentHTML("afterbegin", html);
        document.querySelector("#enhanced-beep-config").addEventListener(
            "click",
            () => {
                GM_config.open();
            },
            false
        );
    }

    function beep(type) {
        const source = GM_config.get(`${type}Source`);
        if (source) {
            play(source, GM_config.get(`${type}Volume`));
        }
    }

    function play(source, volume) {
        const audio = new Audio(source);
        const masterVolume = GM_config.get("commonMasterVolume", true);
        const calculatedVolume = volume * 0.01 * (masterVolume * 0.01);
        audio.volume = calculatedVolume < 1 ? calculatedVolume : 1;
        console.table({
            ArgVolume: volume,
            MasterVolume: masterVolume,
            CalculatedVolume: calculatedVolume,
            AudioVolume: audio.volume
        });

        audio.addEventListener("canplaythrough", event => {
            audio.play();
        });
    }
})();
