// ==UserScript==
// @name         Mastodon Enhanced Beep! 🔔🔊
// @namespace    mizle.net
// @description  Beep Beep Another Beep!
// @author       Eai <eai@mizle.net>
// @license      MIT
// @version      1.0.1
// @icon         https://cldup.com/VTnT7b3u9i.png

// @homepageURL  https://github.com/eai04191/mastodon-enhanced-beep
// @supportURL   https://github.com/eai04191/mastodon-enhanced-beep/issues

// @include      https://*/web/*

// @require      https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.15/howler.min.js
// @require      https://cdn.rawgit.com/arantius/3123124/raw/1866c6780e1946f657f688537b199e0102ccd19c/grant-none-shim.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js

// @grant        none
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
      label: "🔈 Test",
      click: function() {
        const sound = new Howl({
          src: GM_config.get("favouriteSource", true),
          volume: GM_config.get("favouriteVolume", true)
        });
        sound.play();
      }
    },
    favouriteMemo: {
      type: "text",
      label: "Memo",
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
      label: "🔈 Test",
      click: function() {
        const sound = new Howl({
          src: GM_config.get("reblogSource", true),
          volume: GM_config.get("reblogVolume", true)
        });
        sound.play();
      }
    },
    reblogMemo: {
      type: "text",
      label: "Memo",
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
      label: "🔈 Test",
      click: function() {
        const sound = new Howl({
          src: GM_config.get("replySource", true),
          volume: GM_config.get("replyVolume", true)
        });
        sound.play();
      }
    },
    replyMemo: {
      type: "text",
      label: "Memo",
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
      label: "🔈 Test",
      click: function() {
        const sound = new Howl({
          src: GM_config.get("privateSource", true),
          volume: GM_config.get("privateVolume", true)
        });
        sound.play();
      }
    },
    privateMemo: {
      type: "text",
      label: "Memo",
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
      label: "🔈 Test",
      click: function() {
        const sound = new Howl({
          src: GM_config.get("directSource", true),
          volume: GM_config.get("directVolume", true)
        });
        sound.play();
      }
    },
    directMemo: {
      type: "text",
      label: "Memo",
      default: null
    },
    deletedSource: {
      section: "Deleted",
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
      label: "🔈 Test",
      click: function() {
        const sound = new Howl({
          src: GM_config.get("deletedSource", true),
          volume: GM_config.get("deletedVolume", true)
        });
        sound.play();
      }
    },
    deletedeMemo: {
      type: "text",
      label: "Memo",
      default: null
    }
  },
  events: {
    open: function() {
      GM_config.frame.setAttribute(
        "style",
        `
        bottom: auto;
        solid #000;
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
      GM_config.frame.contentWindow.document
        .querySelectorAll("input[type='text']")
        .forEach(function(element) {
          element.setAttribute("placeholder", "\u00A0"); // &nbsp
        });
    },
    save: function() {
      location.reload();
    }
  },
  css: `
#eb {
  max-width: 1000px;
  padding: 20px 80px;
  margin: auto;
}
#eb #eb_wrapper {
  display: flex;
  flex-wrap: wrap;
}
#eb #eb_header{
  width: 100%;
  min-height: 115px;
  margin: 0 auto 10px;
  content: url(https://cldup.com/9iCOVswnCZ.svg);
}
#eb .section_header_holder {
  display: flex;
  flex-wrap: wrap;
  min-width: 400px;
  width: 50%;
  margin: 0;
  padding: 16px 4px;
  box-sizing: border-box;
}
#eb .section_header {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #292F33;
  margin-bottom: 20px;
}

#eb .config_var {
  position: relative;
  width: 100%;
  margin: 13px 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#eb .config_var[id$="Volume_var"] {
  width: 75%;
}
#eb .config_var[id$="Button_var"] {
  width: 25%;
}

#eb .config_var label {
  position: absolute;
  top: 9px;
  left: 0;
  font-size: 16px;
  color: #9098a9;
  transform-origin: 0 0;
  transition: all 0.2s ease;
}
#eb input[type="text"]:not(:placeholder-shown) + label {
  color: #5a667f;
  transform: translateY(-20px) scale(0.75);
}
#eb input[type="text"]:focus + label {
  color: #07f;
  transform: translateY(-22px) scale(0.75);
}

#eb input[type="text"] {
  width: 100%;
  border: 0;
  padding: 12px 0;
  height: 36px;
  border-bottom: 1px solid #c8ccd4;
  background: none;
  transition: all 0.15s ease;
}
#eb input[type="text"]:focus {
  background: none;
  outline: none;
}

#eb input[type="button"] {
  width: 80%;
  height: 36px;
  background-color: transparent;
  border: 1px solid #c8ccd4;
  cursor: pointer;
  outline: none;
  padding: 0;
}


#eb #eb_buttons_holder {
  margin: 20px auto;
}
#eb .saveclose_buttons {
  margin: 0;
  padding: 6px 24px;
  position: relative;
  width: 50vw;
  height: 40px;
  visibility: hidden;
}
#eb .saveclose_buttons:after {
  content: "💾 Save & Reload";
  visibility: visible;
  display: block;
  border: 1px solid #292f33;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 200px;
  margin: auto;
  padding: 8px;
}

#eb_closeBtn,
.reset_holder {
  display: none !important;
}`
});

window.addEventListener(
  "load",
  function() {
    addSettingButton();
    document.getElementById(
      "enhanced-beep-config"
    ).onclick = eventHandlerOpenConfig;

    // const showLog = GM_config.get("showLog");
    const showLog = false;

    class EnhancedBeep {
      constructor() {
        this.mutationObserver = new MutationObserver(mutations =>
          this.onUpdate(mutations)
        );
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

        if (mutation.removedNodes.length != 0) {
          this.beep("deleted");
          return;
        }
        if (
          mutation.addedNodes.length != 0 &&
          mutation.addedNodes[0].attributes[0].value == 1
        ) {
          const notificationElement =
            mutation.addedNodes[0].firstChild.firstChild;
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
            case "status__wrapper-private":
              this.beep("private");
              break;
            case "status__wrapper-public":
              this.beep("reply");
              break;
            case "status__wrapper-direct":
              this.beep("direct");
              break;
            default:
              break;
          }
        }
      }

      beep(type) {
        if (showLog) console.log("Play Beep:", type);
        const sound = new Howl({
          src: GM_config.get(`${type}Source`),
          volume: GM_config.get(`${type}Volume`) || 0.5
        });
        sound.play();
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
