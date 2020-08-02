function fancyTimeFormat(t) {
    var e = ~~(t / 3600)
      , i = ~~(t % 3600 / 60)
      , s = Math.round(t % 60)
      , n = "";
    return 0 < e && (n += e + ":" + (i < 10 ? "0" : "")),
    n += i + ":" + (s < 10 ? "0" : ""),
    n += "" + s
}
function hasClass(t, e) {
    return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)","gi").test(t.className)
}
function addClass(t, e) {
    t.classList ? t.classList.add(e) : t.className += " " + e
}
function removeClass(t, e) {
    t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)","gi"), " ")
}
function toggleClass(t, e) {
    if (t.classList)
        t.classList.toggle(e);
    else {
        var i = t.className.split(" ")
          , s = i.indexOf(e);
        0 <= s ? i.splice(s, 1) : i.push(e),
        t.className = i.join(" ")
    }
}
function targetBlank() {
    var t = location.host.replace("www.", "");
    t = new RegExp(t,"i");
    for (var e = document.getElementsByTagName("a"), i = 0; i < e.length; i++) {
        var s = e[i].host;
        t.test(s) ? hasClass(e[i].parentNode, "cases--block") || e[i].addEventListener("click", function() {
            var t;
            addClass(document.querySelector("main"), "hidden"),
            addClass(document.body, "loading"),
            removeClass(document.body, "nav-open")
        }) : e[i].setAttribute("target", "_blank")
    }
}
function isAdvancedUpload() {
    var t = document.createElement("div");
    return ("draggable"in t || "ondragstart"in t && "ondrop"in t) && "FormData"in window && "FileReader"in window
}
function addListenerMulti(t, e, i) {
    for (var s = e.split(" "), n = 0, r = s.length; n < r; n++)
        t.addEventListener(s[n], i, !1)
}
function ready(t) {
    (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? t() : document.addEventListener("DOMContentLoaded", t)
}
function initPlayer(i, t) {
    switch (i.i = t,
    i.type = hasClass(i, "audio-player") ? "audio" : "video",
    i.playerElement = null,
    i.duration,
    i.isPlaying,
    i.canplay,
    i.type) {
    case "audio":
        i.playerElements = i.getElementsByTagName("audio"),
        0 < i.playerElements.length && (i.playerElement = i.playerElements[0]);
        break;
    case "video":
        i.playerElements = i.getElementsByTagName("video"),
        0 < i.playerElements.length && (i.playerElement = i.playerElements[0]);
        break
    }
    i.playBtn,
    i.playBtns = i.getElementsByClassName("play-btn"),
    0 < i.playBtns.length && (i.playBtn = i.playBtns[0]),
    i.progress,
    i.progressSpan,
    i.progresses = i.getElementsByClassName("progress"),
    0 < i.progresses.length && (i.progress = i.progresses[0],
    i.progressSpans = i.progress.getElementsByTagName("span"),
    0 < i.progressSpans.length && (i.progressSpan = i.progressSpans[0])),
    i.endTimeEl,
    i.currentTimeEl,
    i.endTimeEls = i.getElementsByClassName("end-time"),
    0 < i.endTimeEls.length && (i.endTimeEl = i.endTimeEls[0]),
    i.currentTimeEls = i.getElementsByClassName("current-time"),
    0 < i.currentTimeEls.length && (i.currentTimeEl = i.currentTimeEls[0]),
    i.playerElement.id = t,
    i.init = function() {
        i.canplay || (i.canplay = !0,
        i.duration || (i.duration = i.playerElement.duration,
        i.endTimeEl && (i.endTimeEl.textContent = fancyTimeFormat(i.duration))),
        i.progress && (i.playerElement.addEventListener("timeupdate", function() {
            i.playerElement.currentTime != i.duration ? (i.progressSpan.style.width = i.playerElement.currentTime / i.duration * 100 + "%",
            i.currentTimeEl && (i.currentTimeEl.textContent = fancyTimeFormat(i.playerElement.currentTime))) : (i.progressSpan.style.width = 0,
            i.currentTimeEl && (i.currentTimeEl.textContent = "0:00"),
            i.playerElement.pause(),
            removeClass(i, "playing"),
            i.isPlaying = !1)
        }),
        i.progress.addEventListener("click", function(t) {
            var e = t.offsetX / i.progress.offsetWidth;
            i.playerElement.currentTime = e * i.duration
        })),
        i.playBtn.addEventListener("click", function() {
            for (var t = 0; t < window.players.length; t++)
                window.players[t].pause(),
                window.players[t].id != i.playerElement.id && (window.players[t].parentElement.isPlaying = !1,
                removeClass(window.players[t].parentElement, "playing"));
            i.isPlaying ? (i.playerElement.pause(),
            removeClass(i, "playing"),
            i.isPlaying = !1) : (i.playerElement.play(),
            addClass(i, "playing"),
            i.isPlaying = !0)
        }))
    }
    ,
    i.listen = function() {
        i.canplay && void 0 !== i.canplay || (3 < i.playerElement.readyState ? i.init() : i.playerElement.load(),
        setTimeout(i.listen, 1e3))
    }
    ,
    i.playerElement && i.playBtn && (i.playerElement.addEventListener("loadedmetadata", function(t) {
        i.duration = t.target.duration,
        i.endTimeEl && (i.endTimeEl.textContent = fancyTimeFormat(i.duration))
    }),
    i.listen())
}
function toArray(t) {
    return Array.prototype.slice.call(t)
}
function formHandling() {
    if (isAdvancedUpload()) {
        var t = document.getElementById("form--artist")
          , o = document.getElementById("attachments-label")
          , e = document.getElementById("attachments");
        if (t) {
            t.classList.add("has-advanced-upload");
            var i = !1;
            addListenerMulti(o, "drag dragstart dragend dragover dragenter dragleave drop", function(t) {
                t.preventDefault(),
                t.stopPropagation()
            }),
            addListenerMulti(o, "dragover dragenter", function(t) {
                o.classList.add("is-dragover")
            }),
            addListenerMulti(o, "dragleave dragend drop", function(t) {
                o.classList.remove("is-dragover")
            }),
            e.addEventListener("change", function(t, e) {
                for (var i = this.files, s = "<div>", n = 0; n < i.length; n++) {
                    var r, a;
                    s += i[n].name + "<br/>"
                }
                s += "</div>",
                o.innerHTML = s
            }),
            addListenerMulti(o, "drop", function(t) {
                i = t.dataTransfer.files,
                e.files = i
            })
        }
    }
}
function initOverlays() {
    for (var t = Array.prototype.slice.call(document.getElementsByClassName("videoOverlay"), 0), i = document.getElementById("overlayIframe"), e = document.getElementById("overlayClose"), s = document.getElementById("overlay"), n = window.location.pathname, r = function() {
        removeClass(s, "show"),
        i.contentWindow.location.replace("about:blank")
    }, a = function(t) {
        addClass(s, "show"),
        i.contentWindow.location.replace(t);
        for (var e = 0; e < window.players.length; e++)
            window.players[e].pause(),
            window.players[e].parentElement.isPlaying = !1,
            removeClass(window.players[e].parentElement, "playing")
    }, o = 0; o < t.length; o++) {
        var h = t[o];
        "embed"in h.dataset && "true" !== h.dataset.initialized && (h.dataset.initialized = "true",
        h.addEventListener("click", function(t) {
            var e = this.dataset.embed;
            a(e),
            window.history.pushState({
                video: e
            }, document.title)
        }))
    }
    "true" !== e.dataset.initialized && (e.dataset.initialized = "true",
    window.addEventListener("popstate", function(t) {
        t.state && t.state.video ? a(t.state.video) : r()
    }),
    e.addEventListener("click", function(t) {
        window.history.back()
    }))
}
function initCredits() {
    for (var t = Array.prototype.slice.call(document.getElementsByClassName("card-credits-link"), 0), e = 0; e < t.length; e++)
        t[e].hasAttribute("data-init") || (t[e].addEventListener("click", function(t) {
            toggleClass(this.nextElementSibling, "show"),
            hasClass(this.nextElementSibling, "show") ? this.innerHTML = "credits -" : this.innerHTML = "credits +"
        }),
        t[e].setAttribute("data-init", "true"))
}
function toggleNav() {
    var t, e, i;
    document.getElementById("open-menu").addEventListener("click", function(t) {
        addClass(document.body, "nav-open")
    }),
    document.getElementById("close-menu").addEventListener("click", function(t) {
        removeClass(document.body, "nav-open")
    })
}
function formSetup() {
    for (var t = Array.prototype.slice.call(document.getElementsByClassName("form-field"), 0), e = 0; e < t.length; e++) {
        var i = t[e]
          , s = i.querySelector("label")
          , n = i.querySelector("input, textarea");
        n.value && addClass(i, "active"),
        n.addEventListener("focus", function(t) {
            addClass(this.parentElement, "active")
        }),
        n.addEventListener("blur", function(t) {
            this.value ? addClass(this.parentElement, "active") : removeClass(this.parentElement, "active")
        })
    }
}
function loadMore() {
    var t = document.getElementById("load-more");
    window.lm = 6,
    t && t.addEventListener("click", function() {
        var t = this.dataset.url;
        addClass(document.getElementById("load-more"), "disabled"),
        document.getElementById("load-more").textContent = "Loading…",
        window.loading = !0;
        var i = new XMLHttpRequest;
        i.open("GET", t + "?offset=" + window.lm, !0),
        i.responseType = "document",
        window.lm += 6,
        i.onload = function() {
            if (200 <= i.status && i.status < 400) {
                var t = i.responseXML.getElementById("more-loaded")
                  , e = t.children ? t.children.length : 0;
                document.getElementById("project_list").appendChild(t),
                window.requestAnimationFrame(function() {
                    if (null !== document.querySelector("#more-loaded .rellax"))
                        var t = new Rellax("#more-loaded .rellax");
                    ScrollTriggers([{
                        el: document.querySelectorAll("#more-loaded .w_hp"),
                        className: "animate_lines"
                    }, {
                        el: document.querySelectorAll("#more-loaded .w_rp"),
                        className: "animate_arm"
                    }, {
                        el: document.querySelectorAll("#more-loaded .w_pedal"),
                        className: "animate_lines"
                    }]),
                    document.getElementById("more-loaded").removeAttribute("id"),
                    3 < e ? (removeClass(document.getElementById("load-more"), "disabled"),
                    document.getElementById("load-more").textContent = "Load more") : document.getElementById("load-more").remove(),
                    window.loading = !1,
                    initOverlays(),
                    initCredits()
                })
            }
        }
        ,
        i.onerror = function() {}
        ,
        i.send()
    })
}
function setCookie(t, e, i) {
    var s = new Date;
    s.setTime(s.getTime() + 24 * i * 60 * 60 * 1e3);
    var n = "expires=" + s.toUTCString();
    document.cookie = t + "=" + e + ";" + n + ";path=/"
}
function getCookie(t) {
    for (var e = t + "=", i, s = decodeURIComponent(document.cookie).split(";"), n = 0; n < s.length; n++) {
        for (var r = s[n]; " " == r.charAt(0); )
            r = r.substring(1);
        if (0 == r.indexOf(e))
            return r.substring(e.length, r.length)
    }
    return ""
}
function initVolume() {
    var t = document.getElementById("volume--master")
      , s = document.body.getElementsByClassName("js-volume-knob").item(0)
      , e = getCookie("volume");
    0 < e.length ? (window.masterVolume = parseInt(e),
    t.value = window.masterVolume,
    s.style.transform = "rotate(" + Math.round(masterVolume / 100 * 180 - 90) + "deg)") : setCookie("volume", window.masterVolume);
    for (var i = 0; i < window.playableElements.length; i++) {
        var n;
        window.players[i].volume = window.masterVolume / 100
    }
    t.addEventListener("input", function() {
        var t = this.value;
        window.masterVolume = t,
        s.style.transform = "rotate(" + Math.round(t / 100 * 180 - 90) + "deg)",
        setCookie("volume", window.masterVolume);
        for (var e = 0; e < window.players.length; e++) {
            var i;
            window.players[e].volume = window.masterVolume / 100
        }
    }),
    document.getElementById("volume--knob").addEventListener("click", function(t) {
        toggleClass(document.body, "show-volume")
    })
}
function scrollEffect() {
    function e(t, e) {
        var i = function(t, e, i, s) {
            return (t /= s / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
        }
          , s = 0
          , n = t - 0
          , r = 0
          , a = 16
          , o = function() {
            console.log("scroll");
            var t = i(r += 16, 0, n, e);
            window.requestAnimationFrame(function() {
                window.scrollTo(0, t),
                r < e && setTimeout(o, 16)
            })
        };
        o()
    }
    window.hp_holder = document.getElementById("hp_holder"),
    window.hp_step1 = document.querySelector(".hp_step1"),
    window.hp_step2 = document.querySelector(".hp_step2"),
    window.hp_step1 && window.hp_step2 && (window.stopAtFrame = 130,
    window.hp_step1.addEventListener("mouseover", function() {
        991 < window.innerWidth && (addClass(window.hp_step1, "hp_hover"),
        removeClass(window.hp_step2, "hp_hover"),
        window.stopAtFrame = 130)
    }),
    window.hp_step2.addEventListener("mouseover", function() {
        991 < window.innerWidth && (addClass(window.hp_step2, "hp_hover"),
        removeClass(window.hp_step1, "hp_hover"),
        window.stopAtFrame = 60)
    }),
    setTimeout(function() {
        setInterval(function() {
            var t;
            Math.round(window.jackAnim.currentFrame) == window.stopAtFrame ? window.jackAnim.pause() : window.jackAnim.play()
        }, 5)
    }, 2e3)),
    window.ticking = !1,
    window.hp_holder && (window.requestAnimationFrame(function() {
        window.scrollTo(0, 0)
    }),
    911 < window.innerWidth ? (window.hp_holder.setAttribute("class", "step0"),
    setTimeout(function() {
        window.hp_holder.setAttribute("class", "step1"),
        window.jackAnim.play()
    }, 2500),
    setTimeout(function() {
        window.hp_holder.setAttribute("class", "step2")
    }, 3500)) : (window.hp_holder.setAttribute("class", "step0"),
    setTimeout(function() {
        var t;
        window.hp_holder.setAttribute("class", "step2"),
        e(window.hp_step1.getBoundingClientRect().top, 256)
    }, 2500)));
    var t = function() {
        var t;
        window.ticking = !1,
        document.body.getElementsByClassName("js-body-background").item(0).style.transform = "translateY(" + Math.ceil(window.latestKnownScrollY / 20) + "px)",
        window.hp_holder && (document.documentElement.clientHeight - window.latestKnownScrollY < 100 ? addClass(document.body, "darkNav") : removeClass(document.body, "darkNav"))
    }
      , i = function() {
        window.ticking || (requestAnimationFrame(t),
        window.ticking = !0)
    }
      , s = function() {
        window.latestKnownScrollY = window.scrollY,
        i()
    };
    window.addEventListener("scroll", s, {
        capture: !1,
        passive: !0
    }),
    s()
}
function animateJson() {
    var t = document.getElementById("jack--holder");
    t && (window.jackAnim = bodymovin.loadAnimation({
        container: t,
        renderer: "svg",
        loop: !0,
        autoplay: !1,
        //path: "/assets/json/data.json"
        path: "/node/exodus/assets/json/data.json"
    }),
    window.jackAnim.goToAndStop(0, !0),
    window.jackAnim.setSpeed(2))
}
!function(e, i) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery)
}(window, function(t, e) {
    "use strict";
    function i(l, n, p) {
        function i(t, r, a) {
            var o, h = "$()." + l + '("' + r + '")';
            return t.each(function(t, e) {
                var i = p.data(e, l);
                if (i) {
                    var s = i[r];
                    if (s && "_" != r.charAt(0)) {
                        var n = s.apply(i, a);
                        o = void 0 === o ? n : o
                    } else
                        d(h + " is not a valid method")
                } else
                    d(l + " not initialized. Cannot call methods, i.e. " + h)
            }),
            void 0 !== o ? o : t
        }
        function s(t, s) {
            t.each(function(t, e) {
                var i = p.data(e, l);
                i ? (i.option(s),
                i._init()) : (i = new n(e,s),
                p.data(e, l, i))
            })
        }
        (p = p || e || t.jQuery) && (n.prototype.option || (n.prototype.option = function(t) {
            p.isPlainObject(t) && (this.options = p.extend(!0, this.options, t))
        }
        ),
        p.fn[l] = function(t) {
            return "string" != typeof t ? (s(this, t),
            this) : i(this, t, a.call(arguments, 1));
            var e
        }
        ,
        r(p))
    }
    function r(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var a = Array.prototype.slice
      , s = t.console
      , d = void 0 === s ? function() {}
    : function(t) {
        s.error(t)
    }
    ;
    return r(e || t.jQuery),
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , s = i[t] = i[t] || [];
            return -1 == s.indexOf(e) && s.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, s;
            return (i[t] = i[t] || {})[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var s = i.indexOf(e);
            return -1 != s && i.splice(s, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0),
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                var r = i[n], a;
                s && s[r] && (this.off(t, r),
                delete s[r]),
                r.apply(this, e)
            }
            return this
        }
    }
    ,
    e.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";
    function v(t) {
        var e = parseFloat(t), i;
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }
    function t() {}
    function y() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; e < k; e++) {
            var i;
            t[_[e]] = 0
        }
        return t
    }
    function b(t) {
        var e = getComputedStyle(t);
        return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
        e
    }
    function w() {
        if (!n) {
            n = !0;
            var t = document.createElement("div");
            t.style.width = "200px",
            t.style.padding = "1px 2px 3px 4px",
            t.style.borderStyle = "solid",
            t.style.borderWidth = "1px 2px 3px 4px",
            t.style.boxSizing = "border-box";
            var e = document.body || document.documentElement;
            e.appendChild(t);
            var i = b(t);
            s.isBoxSizeOuter = E = 200 == v(i.width),
            e.removeChild(t)
        }
    }
    function s(t) {
        if (w(),
        "string" == typeof t && (t = document.querySelector(t)),
        t && "object" == typeof t && t.nodeType) {
            var e = b(t);
            if ("none" == e.display)
                return y();
            var i = {};
            i.width = t.offsetWidth,
            i.height = t.offsetHeight;
            for (var s = i.isBorderBox = "border-box" == e.boxSizing, n = 0; n < k; n++) {
                var r = _[n]
                  , a = e[r]
                  , o = parseFloat(a);
                i[r] = isNaN(o) ? 0 : o
            }
            var h = i.paddingLeft + i.paddingRight
              , l = i.paddingTop + i.paddingBottom
              , p = i.marginLeft + i.marginRight
              , d = i.marginTop + i.marginBottom
              , c = i.borderLeftWidth + i.borderRightWidth
              , f = i.borderTopWidth + i.borderBottomWidth
              , u = s && E
              , m = v(e.width);
            !1 !== m && (i.width = m + (u ? 0 : h + c));
            var g = v(e.height);
            return !1 !== g && (i.height = g + (u ? 0 : l + f)),
            i.innerWidth = i.width - (h + c),
            i.innerHeight = i.height - (l + f),
            i.outerWidth = i.width + p,
            i.outerHeight = i.height + d,
            i
        }
    }
    var E, i = "undefined" == typeof console ? t : function(t) {
        console.error(t)
    }
    , _ = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], k = _.length, n = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var i = function() {
        var t = window.Element.prototype;
        if (t.matches)
            return "matches";
        if (t.matchesSelector)
            return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var s, n = e[i] + "MatchesSelector";
            if (t[n])
                return n
        }
    }();
    return function(t, e) {
        return t[i](e)
    }
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("desandro-matches-selector")) : e.fizzyUIUtils = i(e, e.matchesSelector)
}(window, function(l, r) {
    var p = {
        extend: function(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        },
        modulo: function(t, e) {
            return (t % e + e) % e
        }
    }
      , i = Array.prototype.slice;
    p.makeArray = function(t) {
        return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? i.call(t) : [t];
        var e
    }
    ,
    p.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }
    ,
    p.getParent = function(t, e) {
        for (; t.parentNode && t != document.body; )
            if (t = t.parentNode,
            r(t, e))
                return t
    }
    ,
    p.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }
    ,
    p.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    p.filterFindElements = function(t, s) {
        t = p.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!s)
                    return void n.push(t);
                r(t, s) && n.push(t);
                for (var e = t.querySelectorAll(s), i = 0; i < e.length; i++)
                    n.push(e[i])
            }
        }),
        n
    }
    ,
    p.debounceMethod = function(t, e, s) {
        s = s || 100;
        var n = t.prototype[e]
          , r = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[r];
            clearTimeout(t);
            var e = arguments
              , i = this;
            this[r] = setTimeout(function() {
                n.apply(i, e),
                delete i[r]
            }, s)
        }
    }
    ,
    p.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }
    ,
    p.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    ;
    var d = l.console;
    return p.htmlInit = function(o, h) {
        p.docReady(function() {
            var t = p.toDashed(h)
              , n = "data-" + t
              , e = document.querySelectorAll("[" + n + "]")
              , i = document.querySelectorAll(".js-" + t)
              , s = p.makeArray(e).concat(p.makeArray(i))
              , r = n + "-options"
              , a = l.jQuery;
            s.forEach(function(e) {
                var t, i = e.getAttribute(n) || e.getAttribute(r);
                try {
                    t = i && JSON.parse(i)
                } catch (t) {
                    return void (d && d.error("Error parsing " + n + " on " + e.className + ": " + t))
                }
                var s = new o(e,t);
                a && a.data(e, h, s)
            })
        })
    }
    ,
    p
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("get-size")) : (e.Flickity = e.Flickity || {},
    e.Flickity.Cell = i(e, e.getSize))
}(window, function(t, e) {
    function i(t, e) {
        this.element = t,
        this.parent = e,
        this.create()
    }
    var s = i.prototype;
    return s.create = function() {
        this.element.style.position = "absolute",
        this.element.setAttribute("aria-selected", "false"),
        this.x = 0,
        this.shift = 0
    }
    ,
    s.destroy = function() {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.removeAttribute("aria-selected"),
        this.element.style[t] = ""
    }
    ,
    s.getSize = function() {
        this.size = e(this.element)
    }
    ,
    s.setPosition = function(t) {
        this.x = t,
        this.updateTarget(),
        this.renderPosition(t)
    }
    ,
    s.updateTarget = s.setDefaultTarget = function() {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }
    ,
    s.renderPosition = function(t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }
    ,
    s.wrapShift = function(t) {
        this.shift = t,
        this.renderPosition(this.x + this.parent.slideableWidth * t)
    }
    ,
    s.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {},
    t.Flickity.Slide = e())
}(window, function() {
    "use strict";
    function t(t) {
        this.parent = t,
        this.isOriginLeft = "left" == t.originSide,
        this.cells = [],
        this.outerWidth = 0,
        this.height = 0
    }
    var e = t.prototype;
    return e.addCell = function(t) {
        if (this.cells.push(t),
        this.outerWidth += t.size.outerWidth,
        this.height = Math.max(t.size.outerHeight, this.height),
        1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }
    ,
    e.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft"
          , e = this.getLastCell()
          , i = e ? e.size[t] : 0
          , s = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + s * this.parent.cellAlign
    }
    ,
    e.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    e.select = function() {
        this.changeSelected(!0)
    }
    ,
    e.unselect = function() {
        this.changeSelected(!1)
    }
    ,
    e.changeSelected = function(e) {
        var i = e ? "add" : "remove";
        this.cells.forEach(function(t) {
            t.element.classList[i]("is-selected"),
            t.element.setAttribute("aria-selected", e.toString())
        })
    }
    ,
    e.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }
    ,
    t
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {},
    e.Flickity.animatePrototype = i(e, e.fizzyUIUtils))
}(window, function(t, r) {
    var e = {
        startAnimation: function() {
            this.isAnimating || (this.isAnimating = !0,
            this.restingFrames = 0,
            this.animate())
        },
        animate: function() {
            this.applyDragForce(),
            this.applySelectedAttraction();
            var t = this.x;
            if (this.integratePhysics(),
            this.positionSlider(),
            this.settle(t),
            this.isAnimating) {
                var e = this;
                requestAnimationFrame(function() {
                    e.animate()
                })
            }
        },
        positionSlider: function() {
            var t = this.x;
            this.options.wrapAround && 1 < this.cells.length && (t = r.modulo(t, this.slideableWidth),
            t -= this.slideableWidth,
            this.shiftWrapCells(t)),
            t += this.cursorPosition,
            t = this.options.rightToLeft ? -t : t;
            var e = this.getPositionValue(t);
            this.slider.style.transform = this.isAnimating ? "translate3d(" + e + ",0,0)" : "translateX(" + e + ")";
            var i = this.slides[0];
            if (i) {
                var s = -this.x - i.target
                  , n = s / this.slidesWidth;
                this.dispatchEvent("scroll", null, [n, s])
            }
        },
        positionSliderAtSelected: function() {
            this.cells.length && (this.x = -this.selectedSlide.target,
            this.velocity = 0,
            this.positionSlider())
        },
        getPositionValue: function(t) {
            return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
        },
        settle: function(t) {
            this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++,
            2 < this.restingFrames && (this.isAnimating = !1,
            delete this.isFreeScrolling,
            this.positionSlider(),
            this.dispatchEvent("settle", null, [this.selectedIndex]))
        },
        shiftWrapCells: function(t) {
            var e = this.cursorPosition + t;
            this._shiftCells(this.beforeShiftCells, e, -1);
            var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, i, 1)
        },
        _shiftCells: function(t, e, i) {
            for (var s = 0; s < t.length; s++) {
                var n = t[s]
                  , r = 0 < e ? i : 0;
                n.wrapShift(r),
                e -= n.size.outerWidth
            }
        },
        _unshiftCells: function(t) {
            if (t && t.length)
                for (var e = 0; e < t.length; e++)
                    t[e].wrapShift(0)
        },
        integratePhysics: function() {
            this.x += this.velocity,
            this.velocity *= this.getFrictionFactor()
        },
        applyForce: function(t) {
            this.velocity += t
        },
        getFrictionFactor: function() {
            return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        },
        getRestingPosition: function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor())
        },
        applyDragForce: function() {
            if (this.isDraggable && this.isPointerDown) {
                var t, e = this.dragX - this.x - this.velocity;
                this.applyForce(e)
            }
        },
        applySelectedAttraction: function() {
            var t;
            if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                var e, i = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                this.applyForce(i)
            }
        }
    };
    return e
}),
function(a, o) {
    if ("function" == typeof define && define.amd)
        define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(t, e, i, s, n, r) {
            return o(a, t, e, i, s, n, r)
        });
    else if ("object" == typeof module && module.exports)
        module.exports = o(a, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var t = a.Flickity;
        a.Flickity = o(a, a.EvEmitter, a.getSize, a.fizzyUIUtils, t.Cell, t.Slide, t.animatePrototype)
    }
}(window, function(s, t, e, o, n, a, i) {
    function r(t, e) {
        for (t = o.makeArray(t); t.length; )
            e.appendChild(t.shift())
    }
    function h(t, e) {
        var i = o.getQueryElement(t);
        if (i) {
            if (this.element = i,
            this.element.flickityGUID) {
                var s = f[this.element.flickityGUID];
                return s.option(e),
                s
            }
            l && (this.$element = l(this.element)),
            this.options = o.extend({}, this.constructor.defaults),
            this.option(e),
            this._create()
        } else
            d && d.error("Bad element for Flickity: " + (i || t))
    }
    var l = s.jQuery
      , p = s.getComputedStyle
      , d = s.console
      , c = 0
      , f = {};
    h.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    },
    h.createMethods = [];
    var u = h.prototype;
    o.extend(u, t.prototype),
    u._create = function() {
        var t = this.guid = ++c;
        for (var e in this.element.flickityGUID = t,
        (f[t] = this).selectedIndex = 0,
        this.restingFrames = 0,
        this.x = 0,
        this.velocity = 0,
        this.originSide = this.options.rightToLeft ? "right" : "left",
        this.viewport = document.createElement("div"),
        this.viewport.className = "flickity-viewport",
        this._createSlider(),
        (this.options.resize || this.options.watchCSS) && s.addEventListener("resize", this),
        this.options.on) {
            var i = this.options.on[e];
            this.on(e, i)
        }
        h.createMethods.forEach(function(t) {
            this[t]()
        }, this),
        this.options.watchCSS ? this.watchCSS() : this.activate()
    }
    ,
    u.option = function(t) {
        o.extend(this.options, t)
    }
    ,
    u.activate = function() {
        if (!this.isActive) {
            var t;
            this.isActive = !0,
            this.element.classList.add("flickity-enabled"),
            this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
            this.getSize(),
            r(this._filterFindCellElements(this.element.children), this.slider),
            this.viewport.appendChild(this.slider),
            this.element.appendChild(this.viewport),
            this.reloadCells(),
            this.options.accessibility && (this.element.tabIndex = 0,
            this.element.addEventListener("keydown", this)),
            this.emitEvent("activate");
            var e, i = this.options.initialIndex;
            e = this.isInitActivated ? this.selectedIndex : void 0 !== i && this.cells[i] ? i : 0,
            this.select(e, !1, !0),
            this.isInitActivated = !0,
            this.dispatchEvent("ready")
        }
    }
    ,
    u._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider",
        t.style[this.originSide] = 0,
        this.slider = t
    }
    ,
    u._filterFindCellElements = function(t) {
        return o.filterFindElements(t, this.options.cellSelector)
    }
    ,
    u.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children),
        this.positionCells(),
        this._getWrapShiftCells(),
        this.setGallerySize()
    }
    ,
    u._makeCells = function(t) {
        var e, i;
        return this._filterFindCellElements(t).map(function(t) {
            return new n(t,this)
        }, this)
    }
    ,
    u.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    u.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }
    ,
    u.positionCells = function() {
        this._sizeCells(this.cells),
        this._positionCells(0)
    }
    ,
    u._positionCells = function(t) {
        t = t || 0,
        this.maxCellHeight = t && this.maxCellHeight || 0;
        var e = 0;
        if (0 < t) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var s = this.cells.length, n = t; n < s; n++) {
            var r = this.cells[n];
            r.setPosition(e),
            e += r.size.outerWidth,
            this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e,
        this.updateSlides(),
        this._containSlides(),
        this.slidesWidth = s ? this.getLastSlide().target - this.slides[0].target : 0
    }
    ,
    u._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    }
    ,
    u.updateSlides = function() {
        if (this.slides = [],
        this.cells.length) {
            var s = new a(this);
            this.slides.push(s);
            var t, n = "left" == this.originSide ? "marginRight" : "marginLeft", r = this._getCanCellFit();
            this.cells.forEach(function(t, e) {
                if (s.cells.length) {
                    var i = s.outerWidth - s.firstMargin + (t.size.outerWidth - t.size[n]);
                    r.call(this, e, i) || (s.updateTarget(),
                    s = new a(this),
                    this.slides.push(s)),
                    s.addCell(t)
                } else
                    s.addCell(t)
            }, this),
            s.updateTarget(),
            this.updateSelectedSlide()
        }
    }
    ,
    u._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t)
            return function() {
                return !1
            }
            ;
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e != 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/)
          , s = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * s
        }
    }
    ,
    u._init = u.reposition = function() {
        this.positionCells(),
        this.positionSliderAtSelected()
    }
    ,
    u.getSize = function() {
        this.size = e(this.element),
        this.setCellAlign(),
        this.cursorPosition = this.size.innerWidth * this.cellAlign
    }
    ;
    var m = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return u.setCellAlign = function() {
        var t = m[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }
    ,
    u.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }
    ,
    u._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition
              , e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1),
            t = this.size.innerWidth - this.cursorPosition,
            this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }
    ,
    u._getGapCells = function(t, e, i) {
        for (var s = []; 0 < t; ) {
            var n = this.cells[e];
            if (!n)
                break;
            s.push(n),
            e += i,
            t -= n.size.outerWidth
        }
        return s
    }
    ,
    u._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft
              , e = t ? "marginRight" : "marginLeft"
              , i = t ? "marginLeft" : "marginRight"
              , s = this.slideableWidth - this.getLastCell().size[i]
              , n = s < this.size.innerWidth
              , r = this.cursorPosition + this.cells[0].size[e]
              , a = s - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(t) {
                t.target = n ? s * this.cellAlign : (t.target = Math.max(t.target, r),
                Math.min(t.target, a))
            }, this)
        }
    }
    ,
    u.dispatchEvent = function(t, e, i) {
        var s = e ? [e].concat(i) : i;
        if (this.emitEvent(t, s),
        l && this.$element) {
            var n = t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            if (e) {
                var r = l.Event(e);
                r.type = t,
                n = r
            }
            this.$element.trigger(n, i)
        }
    }
    ,
    u.select = function(t, e, i) {
        if (this.isActive && (t = parseInt(t, 10),
        this._wrapSelect(t),
        (this.options.wrapAround || e) && (t = o.modulo(t, this.slides.length)),
        this.slides[t])) {
            var s = this.selectedIndex;
            this.selectedIndex = t,
            this.updateSelectedSlide(),
            i ? this.positionSliderAtSelected() : this.startAnimation(),
            this.options.adaptiveHeight && this.setGallerySize(),
            this.dispatchEvent("select", null, [t]),
            t != s && this.dispatchEvent("change", null, [t]),
            this.dispatchEvent("cellSelect")
        }
    }
    ,
    u._wrapSelect = function(t) {
        var e = this.slides.length, i;
        if (!(this.options.wrapAround && 1 < e))
            return t;
        var s = o.modulo(t, e)
          , n = Math.abs(s - this.selectedIndex)
          , r = Math.abs(s + e - this.selectedIndex)
          , a = Math.abs(s - e - this.selectedIndex);
        !this.isDragSelect && r < n ? t += e : !this.isDragSelect && a < n && (t -= e),
        t < 0 ? this.x -= this.slideableWidth : e <= t && (this.x += this.slideableWidth)
    }
    ,
    u.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }
    ,
    u.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }
    ,
    u.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(),
        (this.selectedSlide = t).select(),
        this.selectedCells = t.cells,
        this.selectedElements = t.getCellElements(),
        this.selectedCell = t.cells[0],
        this.selectedElement = this.selectedElements[0])
    }
    ,
    u.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }
    ,
    u.selectCell = function(t, e, i) {
        var s = this.queryCell(t);
        if (s) {
            var n = this.getCellSlideIndex(s);
            this.select(n, e, i)
        }
    }
    ,
    u.getCellSlideIndex = function(t) {
        for (var e = 0; e < this.slides.length; e++) {
            var i, s;
            if (-1 != this.slides[e].cells.indexOf(t))
                return e
        }
    }
    ,
    u.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t)
                return i
        }
    }
    ,
    u.getCells = function(t) {
        t = o.makeArray(t);
        var i = [];
        return t.forEach(function(t) {
            var e = this.getCell(t);
            e && i.push(e)
        }, this),
        i
    }
    ,
    u.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }
    ,
    u.getParentCell = function(t) {
        var e = this.getCell(t);
        return e || (t = o.getParent(t, ".flickity-slider > *"),
        this.getCell(t))
    }
    ,
    u.getAdjacentCellElements = function(t, e) {
        if (!t)
            return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (i <= 1 + 2 * t)
            return this.getCellElements();
        for (var s = [], n = e - t; n <= e + t; n++) {
            var r = this.options.wrapAround ? o.modulo(n, i) : n
              , a = this.slides[r];
            a && (s = s.concat(a.getCellElements()))
        }
        return s
    }
    ,
    u.queryCell = function(t) {
        return "number" == typeof t ? this.cells[t] : ("string" == typeof t && (t = this.element.querySelector(t)),
        this.getCell(t))
    }
    ,
    u.uiChange = function() {
        this.emitEvent("uiChange")
    }
    ,
    u.childUIPointerDown = function(t) {
        this.emitEvent("childUIPointerDown", [t])
    }
    ,
    u.onresize = function() {
        this.watchCSS(),
        this.resize()
    }
    ,
    o.debounceMethod(h, "onresize", 150),
    u.resize = function() {
        if (this.isActive) {
            this.getSize(),
            this.options.wrapAround && (this.x = o.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }
    ,
    u.watchCSS = function() {
        var t, e;
        this.options.watchCSS && (-1 != p(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
    }
    ,
    u.onkeydown = function(t) {
        var e = document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !e) {
            var i = h.keyboardHandlers[t.keyCode];
            i && i.call(this)
        }
    }
    ,
    h.keyboardHandlers = {
        37: function() {
            var t = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(),
            this[t]()
        },
        39: function() {
            var t = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(),
            this[t]()
        }
    },
    u.focus = function() {
        var t = s.pageYOffset;
        this.element.focus(),
        s.pageYOffset != t && s.scrollTo(s.pageXOffset, t)
    }
    ,
    u.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"),
        this.element.classList.remove("flickity-rtl"),
        this.unselectSelectedSlide(),
        this.cells.forEach(function(t) {
            t.destroy()
        }),
        this.element.removeChild(this.viewport),
        r(this.slider.children, this.element),
        this.options.accessibility && (this.element.removeAttribute("tabIndex"),
        this.element.removeEventListener("keydown", this)),
        this.isActive = !1,
        this.emitEvent("deactivate"))
    }
    ,
    u.destroy = function() {
        this.deactivate(),
        s.removeEventListener("resize", this),
        this.emitEvent("destroy"),
        l && this.$element && l.removeData(this.element, "flickity"),
        delete this.element.flickityGUID,
        delete f[this.guid]
    }
    ,
    o.extend(u, i),
    h.data = function(t) {
        var e = (t = o.getQueryElement(t)) && t.flickityGUID;
        return e && f[e]
    }
    ,
    o.htmlInit(h, "flickity"),
    l && l.bridget && l.bridget("flickity", h),
    h.setJQuery = function(t) {
        l = t
    }
    ,
    h.Cell = n,
    h
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.Unipointer = i(e, e.EvEmitter)
}(window, function(n, t) {
    function e() {}
    function i() {}
    var s = i.prototype = Object.create(t.prototype);
    s.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }
    ,
    s.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }
    ,
    s._bindStartEvent = function(t, e) {
        var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener"
          , s = "mousedown";
        n.PointerEvent ? s = "pointerdown" : "ontouchstart"in n && (s = "touchstart"),
        t[i](s, this)
    }
    ,
    s.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    s.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier)
                return i
        }
    }
    ,
    s.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }
    ,
    s.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }
    ,
    s.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }
    ,
    s._pointerDown = function(t, e) {
        t.button || this.isPointerDown || (this.isPointerDown = !0,
        this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier,
        this.pointerDown(t, e))
    }
    ,
    s.pointerDown = function(t, e) {
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e])
    }
    ;
    var r = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return s._bindPostStartEvents = function(t) {
        if (t) {
            var e = r[t.type];
            e.forEach(function(t) {
                n.addEventListener(t, this)
            }, this),
            this._boundPointerEvents = e
        }
    }
    ,
    s._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(t) {
            n.removeEventListener(t, this)
        }, this),
        delete this._boundPointerEvents)
    }
    ,
    s.onmousemove = function(t) {
        this._pointerMove(t, t)
    }
    ,
    s.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }
    ,
    s.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }
    ,
    s._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }
    ,
    s.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }
    ,
    s.onmouseup = function(t) {
        this._pointerUp(t, t)
    }
    ,
    s.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }
    ,
    s.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }
    ,
    s._pointerUp = function(t, e) {
        this._pointerDone(),
        this.pointerUp(t, e)
    }
    ,
    s.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }
    ,
    s._pointerDone = function() {
        this._pointerReset(),
        this._unbindPostStartEvents(),
        this.pointerDone()
    }
    ,
    s._pointerReset = function() {
        this.isPointerDown = !1,
        delete this.pointerIdentifier
    }
    ,
    s.pointerDone = e,
    s.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }
    ,
    s.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }
    ,
    s._pointerCancel = function(t, e) {
        this._pointerDone(),
        this.pointerCancel(t, e)
    }
    ,
    s.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }
    ,
    i.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }
    ,
    i
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.Unidragger = i(e, e.Unipointer)
}(window, function(r, t) {
    function e() {}
    var i = e.prototype = Object.create(t.prototype);
    i.bindHandles = function() {
        this._bindHandles(!0)
    }
    ,
    i.unbindHandles = function() {
        this._bindHandles(!1)
    }
    ,
    i._bindHandles = function(t) {
        for (var e = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", i = t ? this._touchActionValue : "", s = 0; s < this.handles.length; s++) {
            var n = this.handles[s];
            this._bindStartEvent(n, t),
            n[e]("click", this),
            r.PointerEvent && (n.style.touchAction = i)
        }
    }
    ,
    i._touchActionValue = "none",
    i.pointerDown = function(t, e) {
        var i;
        this.okayPointerDown(t) && (this.pointerDownPointer = e,
        t.preventDefault(),
        this.pointerDownBlur(),
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e]))
    }
    ;
    var n = {
        TEXTAREA: !0,
        INPUT: !0,
        SELECT: !0,
        OPTION: !0
    }
      , a = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0
    };
    return i.okayPointerDown = function(t) {
        var e = n[t.target.nodeName]
          , i = a[t.target.type]
          , s = !e || i;
        return s || this._pointerReset(),
        s
    }
    ,
    i.pointerDownBlur = function() {
        var t = document.activeElement, e;
        t && t.blur && t != document.body && t.blur()
    }
    ,
    i.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]),
        this._dragMove(t, e, i)
    }
    ,
    i._dragPointerMove = function(t, e) {
        var i = {
            x: e.pageX - this.pointerDownPointer.pageX,
            y: e.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e),
        i
    }
    ,
    i.hasDragStarted = function(t) {
        return 3 < Math.abs(t.x) || 3 < Math.abs(t.y)
    }
    ,
    i.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]),
        this._dragPointerUp(t, e)
    }
    ,
    i._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }
    ,
    i._dragStart = function(t, e) {
        this.isDragging = !0,
        this.isPreventingClicks = !0,
        this.dragStart(t, e)
    }
    ,
    i.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }
    ,
    i._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }
    ,
    i.dragMove = function(t, e, i) {
        t.preventDefault(),
        this.emitEvent("dragMove", [t, e, i])
    }
    ,
    i._dragEnd = function(t, e) {
        this.isDragging = !1,
        setTimeout(function() {
            delete this.isPreventingClicks
        }
        .bind(this)),
        this.dragEnd(t, e)
    }
    ,
    i.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }
    ,
    i.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }
    ,
    i._staticClick = function(t, e) {
        this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e),
        "mouseup" != t.type && (this.isIgnoringMouseUp = !0,
        setTimeout(function() {
            delete this.isIgnoringMouseUp
        }
        .bind(this), 400)))
    }
    ,
    i.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }
    ,
    e.getPointerPoint = t.getPointerPoint,
    e
}),
function(s, n) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(t, e, i) {
        return n(s, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = n(s, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : s.Flickity = n(s, s.Flickity, s.Unidragger, s.fizzyUIUtils)
}(window, function(s, t, e, o) {
    function n() {
        return {
            x: s.pageXOffset,
            y: s.pageYOffset
        }
    }
    o.extend(t.defaults, {
        draggable: ">1",
        dragThreshold: 3
    }),
    t.createMethods.push("_createDrag");
    var i = t.prototype;
    o.extend(i, e.prototype),
    i._touchActionValue = "pan-y";
    var r = "createTouch"in document
      , a = !1;
    i._createDrag = function() {
        this.on("activate", this.onActivateDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("childUIPointerDown", this._childUIPointerDownDrag),
        this.on("deactivate", this.unbindDrag),
        this.on("cellChange", this.updateDraggable),
        r && !a && (s.addEventListener("touchmove", function() {}),
        a = !0)
    }
    ,
    i.onActivateDrag = function() {
        this.handles = [this.viewport],
        this.bindHandles(),
        this.updateDraggable()
    }
    ,
    i.onDeactivateDrag = function() {
        this.unbindHandles(),
        this.element.classList.remove("is-draggable")
    }
    ,
    i.updateDraggable = function() {
        ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable,
        this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
    }
    ,
    i.bindDrag = function() {
        this.options.draggable = !0,
        this.updateDraggable()
    }
    ,
    i.unbindDrag = function() {
        this.options.draggable = !1,
        this.updateDraggable()
    }
    ,
    i._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }
    ,
    i._childUIPointerDownDrag = function(t) {
        t.preventDefault(),
        this.pointerDownFocus(t)
    }
    ,
    i.pointerDown = function(t, e) {
        var i;
        this.isDraggable ? this.okayPointerDown(t) && (this._pointerDownPreventDefault(t),
        this.pointerDownFocus(t),
        document.activeElement != this.element && this.pointerDownBlur(),
        this.dragX = this.x,
        this.viewport.classList.add("is-pointer-down"),
        this.pointerDownScroll = n(),
        s.addEventListener("scroll", this),
        this._pointerDownDefault(t, e)) : this._pointerDownDefault(t, e)
    }
    ,
    i._pointerDownDefault = function(t, e) {
        this.pointerDownPointer = e,
        this._bindPostStartEvents(t),
        this.dispatchEvent("pointerDown", t, [e])
    }
    ;
    var h = {
        INPUT: !0,
        TEXTAREA: !0,
        SELECT: !0
    };
    return i.pointerDownFocus = function(t) {
        var e;
        h[t.target.nodeName] || this.focus()
    }
    ,
    i._pointerDownPreventDefault = function(t) {
        var e = "touchstart" == t.type
          , i = "touch" == t.pointerType
          , s = h[t.target.nodeName];
        e || i || s || t.preventDefault()
    }
    ,
    i.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }
    ,
    i.pointerUp = function(t, e) {
        delete this.isTouchScrolling,
        this.viewport.classList.remove("is-pointer-down"),
        this.dispatchEvent("pointerUp", t, [e]),
        this._dragPointerUp(t, e)
    }
    ,
    i.pointerDone = function() {
        s.removeEventListener("scroll", this),
        delete this.pointerDownScroll
    }
    ,
    i.dragStart = function(t, e) {
        this.isDraggable && (this.dragStartPosition = this.x,
        this.startAnimation(),
        s.removeEventListener("scroll", this),
        this.dispatchEvent("dragStart", t, [e]))
    }
    ,
    i.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]),
        this._dragMove(t, e, i)
    }
    ,
    i.dragMove = function(t, e, i) {
        if (this.isDraggable) {
            t.preventDefault(),
            this.previousDragX = this.dragX;
            var s = this.options.rightToLeft ? -1 : 1;
            this.options.wrapAround && (i.x = i.x % this.slideableWidth);
            var n = this.dragStartPosition + i.x * s;
            if (!this.options.wrapAround && this.slides.length) {
                var r = Math.max(-this.slides[0].target, this.dragStartPosition);
                n = r < n ? .5 * (n + r) : n;
                var a = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                n = n < a ? .5 * (n + a) : n
            }
            this.dragX = n,
            this.dragMoveTime = new Date,
            this.dispatchEvent("dragMove", t, [e, i])
        }
    }
    ,
    i.dragEnd = function(t, e) {
        if (this.isDraggable) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var s = this.getRestingPosition();
                this.isFreeScrolling = -s > this.slides[0].target && -s < this.getLastSlide().target
            } else
                this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX,
            this.isDragSelect = this.options.wrapAround,
            this.select(i),
            delete this.isDragSelect,
            this.dispatchEvent("dragEnd", t, [e])
        }
    }
    ,
    i.dragEndRestingSelect = function() {
        var t = this.getRestingPosition(), e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)), i = this._getClosestResting(t, e, 1), s = this._getClosestResting(t, e, -1), n;
        return i.distance < s.distance ? i.index : s.index
    }
    ,
    i._getClosestResting = function(t, e, i) {
        for (var s = this.selectedIndex, n = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function(t, e) {
            return t <= e
        }
        : function(t, e) {
            return t < e
        }
        ; r(e, n) && (s += i,
        n = e,
        null !== (e = this.getSlideDistance(-t, s))); )
            e = Math.abs(e);
        return {
            distance: n,
            index: s - i
        }
    }
    ,
    i.getSlideDistance = function(t, e) {
        var i = this.slides.length
          , s = this.options.wrapAround && 1 < i
          , n = s ? o.modulo(e, i) : e
          , r = this.slides[n];
        if (!r)
            return null;
        var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (r.target + a)
    }
    ,
    i.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date - this.dragMoveTime)
            return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex)
          , e = this.previousDragX - this.dragX;
        return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0
    }
    ,
    i.staticClick = function(t, e) {
        var i = this.getParentCell(t.target)
          , s = i && i.element
          , n = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, s, n])
    }
    ,
    i.onscroll = function() {
        var t = n()
          , e = this.pointerDownScroll.x - t.x
          , i = this.pointerDownScroll.y - t.y;
        (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone()
    }
    ,
    t
}),
function(e, i) {
    "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.TapListener = i(e, e.Unipointer)
}(window, function(h, l) {
    function t(t) {
        this.bindTap(t)
    }
    var e = t.prototype = Object.create(l.prototype);
    return e.bindTap = function(t) {
        t && (this.unbindTap(),
        this.tapElement = t,
        this._bindStartEvent(t, !0))
    }
    ,
    e.unbindTap = function() {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0),
        delete this.tapElement)
    }
    ,
    e.pointerUp = function(t, e) {
        if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
            var i = l.getPointerPoint(e), s = this.tapElement.getBoundingClientRect(), n = h.pageXOffset, r = h.pageYOffset, a;
            if (i.x >= s.left + n && i.x <= s.right + n && i.y >= s.top + r && i.y <= s.bottom + r && this.emitEvent("tap", [t, e]),
            "mouseup" != t.type) {
                this.isIgnoringMouseUp = !0;
                var o = this;
                setTimeout(function() {
                    delete o.isIgnoringMouseUp
                }, 400)
            }
        }
    }
    ,
    e.destroy = function() {
        this.pointerDone(),
        this.unbindTap()
    }
    ,
    t
}),
function(s, n) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(t, e, i) {
        return n(s, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = n(s, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : n(s, s.Flickity, s.TapListener, s.fizzyUIUtils)
}(window, function(t, e, i, s) {
    "use strict";
    function n(t, e) {
        this.direction = t,
        this.parent = e,
        this._create()
    }
    function r(t) {
        return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
    }
    var a = "http://www.w3.org/2000/svg";
    n.prototype = Object.create(i.prototype),
    n.prototype._create = function() {
        this.isEnabled = !0,
        this.isPrevious = -1 == this.direction;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-button flickity-prev-next-button",
        e.className += this.isPrevious ? " previous" : " next",
        e.setAttribute("type", "button"),
        this.disable(),
        e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        e.appendChild(i),
        this.on("tap", this.onTap),
        this.parent.on("select", this.update.bind(this)),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    n.prototype.activate = function() {
        this.bindTap(this.element),
        this.element.addEventListener("click", this),
        this.parent.element.appendChild(this.element)
    }
    ,
    n.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element),
        i.prototype.destroy.call(this),
        this.element.removeEventListener("click", this)
    }
    ,
    n.prototype.createSVG = function() {
        var t = document.createElementNS(a, "svg");
        t.setAttribute("class", "flickity-button-icon"),
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(a, "path")
          , i = r(this.parent.options.arrowShape);
        return e.setAttribute("d", i),
        e.setAttribute("class", "arrow"),
        this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "),
        t.appendChild(e),
        t
    }
    ,
    n.prototype.onTap = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }
    ,
    n.prototype.handleEvent = s.handleEvent,
    n.prototype.onclick = function(t) {
        var e = document.activeElement;
        e && e == this.element && this.onTap(t, t)
    }
    ,
    n.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1,
        this.isEnabled = !0)
    }
    ,
    n.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0,
        this.isEnabled = !1)
    }
    ,
    n.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && 1 < t.length)
            this.enable();
        else {
            var e = t.length ? t.length - 1 : 0, i = this.isPrevious ? 0 : e, s;
            this[this.parent.selectedIndex == i ? "disable" : "enable"]()
        }
    }
    ,
    n.prototype.destroy = function() {
        this.deactivate()
    }
    ,
    s.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }),
    e.createMethods.push("_createPrevNextButtons");
    var o = e.prototype;
    return o._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new n(-1,this),
        this.nextButton = new n(1,this),
        this.on("activate", this.activatePrevNextButtons))
    }
    ,
    o.activatePrevNextButtons = function() {
        this.prevButton.activate(),
        this.nextButton.activate(),
        this.on("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    o.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(),
        this.nextButton.deactivate(),
        this.off("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    e.PrevNextButton = n,
    e
}),
function(s, n) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(t, e, i) {
        return n(s, t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = n(s, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : n(s, s.Flickity, s.TapListener, s.fizzyUIUtils)
}(window, function(t, e, i, s) {
    function n(t) {
        this.parent = t,
        this._create()
    }
    n.prototype = new i,
    n.prototype._create = function() {
        this.holder = document.createElement("ol"),
        this.holder.className = "flickity-page-dots",
        this.dots = [],
        this.on("tap", this.onTap),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    n.prototype.activate = function() {
        this.setDots(),
        this.bindTap(this.holder),
        this.parent.element.appendChild(this.holder)
    }
    ,
    n.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder),
        i.prototype.destroy.call(this)
    }
    ,
    n.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }
    ,
    n.prototype.addDots = function(t) {
        for (var e = document.createDocumentFragment(), i = [], s = this.dots.length, n = s + t, r = s; r < n; r++) {
            var a = document.createElement("li");
            a.className = "dot",
            a.setAttribute("aria-label", "Page dot " + (r + 1)),
            e.appendChild(a),
            i.push(a)
        }
        this.holder.appendChild(e),
        this.dots = this.dots.concat(i)
    }
    ,
    n.prototype.removeDots = function(t) {
        var e;
        this.dots.splice(this.dots.length - t, t).forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    }
    ,
    n.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot",
        this.selectedDot.removeAttribute("aria-current")),
        this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex],
        this.selectedDot.className = "dot is-selected",
        this.selectedDot.setAttribute("aria-current", "step"))
    }
    ,
    n.prototype.onTap = function(t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }
    ,
    n.prototype.destroy = function() {
        this.deactivate()
    }
    ,
    e.PageDots = n,
    s.extend(e.defaults, {
        pageDots: !0
    }),
    e.createMethods.push("_createPageDots");
    var r = e.prototype;
    return r._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new n(this),
        this.on("activate", this.activatePageDots),
        this.on("select", this.updateSelectedPageDots),
        this.on("cellChange", this.updatePageDots),
        this.on("resize", this.updatePageDots),
        this.on("deactivate", this.deactivatePageDots))
    }
    ,
    r.activatePageDots = function() {
        this.pageDots.activate()
    }
    ,
    r.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }
    ,
    r.updatePageDots = function() {
        this.pageDots.setDots()
    }
    ,
    r.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }
    ,
    e.PageDots = n,
    e
}),
function(t, s) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, e, i) {
        return s(t, e, i)
    }) : "object" == typeof module && module.exports ? module.exports = s(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : s(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function(t, e, i) {
    function s(t) {
        this.parent = t,
        this.state = "stopped",
        this.onVisibilityChange = this.visibilityChange.bind(this),
        this.onVisibilityPlay = this.visibilityPlay.bind(this)
    }
    s.prototype = Object.create(t.prototype),
    s.prototype.play = function() {
        if ("playing" != this.state) {
            var t;
            if (document.hidden)
                return void document.addEventListener("visibilitychange", this.onVisibilityPlay);
            this.state = "playing",
            document.addEventListener("visibilitychange", this.onVisibilityChange),
            this.tick()
        }
    }
    ,
    s.prototype.tick = function() {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(),
            this.timeout = setTimeout(function() {
                e.parent.next(!0),
                e.tick()
            }, t)
        }
    }
    ,
    s.prototype.stop = function() {
        this.state = "stopped",
        this.clear(),
        document.removeEventListener("visibilitychange", this.onVisibilityChange)
    }
    ,
    s.prototype.clear = function() {
        clearTimeout(this.timeout)
    }
    ,
    s.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused",
        this.clear())
    }
    ,
    s.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }
    ,
    s.prototype.visibilityChange = function() {
        var t;
        this[document.hidden ? "pause" : "unpause"]()
    }
    ,
    s.prototype.visibilityPlay = function() {
        this.play(),
        document.removeEventListener("visibilitychange", this.onVisibilityPlay)
    }
    ,
    e.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }),
    i.createMethods.push("_createPlayer");
    var n = i.prototype;
    return n._createPlayer = function() {
        this.player = new s(this),
        this.on("activate", this.activatePlayer),
        this.on("uiChange", this.stopPlayer),
        this.on("pointerDown", this.stopPlayer),
        this.on("deactivate", this.deactivatePlayer)
    }
    ,
    n.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(),
        this.element.addEventListener("mouseenter", this))
    }
    ,
    n.playPlayer = function() {
        this.player.play()
    }
    ,
    n.stopPlayer = function() {
        this.player.stop()
    }
    ,
    n.pausePlayer = function() {
        this.player.pause()
    }
    ,
    n.unpausePlayer = function() {
        this.player.unpause()
    }
    ,
    n.deactivatePlayer = function() {
        this.player.stop(),
        this.element.removeEventListener("mouseenter", this)
    }
    ,
    n.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(),
        this.element.addEventListener("mouseleave", this))
    }
    ,
    n.onmouseleave = function() {
        this.player.unpause(),
        this.element.removeEventListener("mouseleave", this)
    }
    ,
    i.Player = s,
    i
}),
function(i, s) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(t, e) {
        return s(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = s(i, require("./flickity"), require("fizzy-ui-utils")) : s(i, i.Flickity, i.fizzyUIUtils)
}(window, function(t, e, s) {
    function h(t) {
        var e = document.createDocumentFragment();
        return t.forEach(function(t) {
            e.appendChild(t.element)
        }),
        e
    }
    var i = e.prototype;
    return i.insert = function(t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var s = this.cells.length;
            e = void 0 === e ? s : e;
            var n = h(i)
              , r = e == s;
            if (r)
                this.slider.appendChild(n);
            else {
                var a = this.cells[e].element;
                this.slider.insertBefore(n, a)
            }
            if (0 === e)
                this.cells = i.concat(this.cells);
            else if (r)
                this.cells = this.cells.concat(i);
            else {
                var o = this.cells.splice(e, s - e);
                this.cells = this.cells.concat(i).concat(o)
            }
            this._sizeCells(i),
            this.cellChange(e, !0)
        }
    }
    ,
    i.append = function(t) {
        this.insert(t, this.cells.length)
    }
    ,
    i.prepend = function(t) {
        this.insert(t, 0)
    }
    ,
    i.remove = function(t) {
        var e = this.getCells(t);
        if (e && e.length) {
            var i = this.cells.length - 1;
            e.forEach(function(t) {
                t.remove();
                var e = this.cells.indexOf(t);
                i = Math.min(e, i),
                s.removeFrom(this.cells, t)
            }, this),
            this.cellChange(i, !0)
        }
    }
    ,
    i.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }
    ,
    i.cellChange = function(t, e) {
        var i = this.selectedElement;
        this._positionCells(t),
        this._getWrapShiftCells(),
        this.setGallerySize();
        var s = this.getCell(i);
        s && (this.selectedIndex = this.getCellSlideIndex(s)),
        this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex),
        this.emitEvent("cellChange", [t]),
        this.select(this.selectedIndex),
        e && this.positionSliderAtSelected()
    }
    ,
    e
}),
function(i, s) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(t, e) {
        return s(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = s(i, require("./flickity"), require("fizzy-ui-utils")) : s(i, i.Flickity, i.fizzyUIUtils)
}(window, function(t, e, a) {
    "use strict";
    function n(t) {
        if ("IMG" == t.nodeName) {
            var e = t.getAttribute("data-flickity-lazyload")
              , i = t.getAttribute("data-flickity-lazyload-src")
              , s = t.getAttribute("data-flickity-lazyload-srcset");
            if (e || i || s)
                return [t]
        }
        var n = "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]"
          , r = t.querySelectorAll(n);
        return a.makeArray(r)
    }
    function r(t, e) {
        this.img = t,
        this.flickity = e,
        this.load()
    }
    e.createMethods.push("_createLazyload");
    var i = e.prototype;
    return i._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }
    ,
    i.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0
              , i = this.getAdjacentCellElements(e)
              , s = [];
            i.forEach(function(t) {
                var e = n(t);
                s = s.concat(e)
            }),
            s.forEach(function(t) {
                new r(t,this)
            }, this)
        }
    }
    ,
    r.prototype.handleEvent = a.handleEvent,
    r.prototype.load = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this);
        var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src")
          , e = this.img.getAttribute("data-flickity-lazyload-srcset");
        this.img.src = t,
        e && this.img.setAttribute("srcset", e),
        this.img.removeAttribute("data-flickity-lazyload"),
        this.img.removeAttribute("data-flickity-lazyload-src"),
        this.img.removeAttribute("data-flickity-lazyload-srcset")
    }
    ,
    r.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    }
    ,
    r.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    }
    ,
    r.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img)
          , s = i && i.element;
        this.flickity.cellSizeChange(s),
        this.img.classList.add(e),
        this.flickity.dispatchEvent("lazyLoad", t, s)
    }
    ,
    e.LazyLoader = r,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(t) {
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function(s, n) {
    function a(t, e, i) {
        return (e - t) * i + t
    }
    s.createMethods.push("_createAsNavFor");
    var t = s.prototype;
    return t._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor),
        this.on("deactivate", this.deactivateAsNavFor),
        this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function() {
                e.setNavCompanion(t)
            })
        }
    }
    ,
    t.setNavCompanion = function(t) {
        t = n.getQueryElement(t);
        var e = s.data(t);
        if (e && e != this) {
            this.navCompanion = e;
            var i = this;
            this.onNavCompanionSelect = function() {
                i.navCompanionSelect()
            }
            ,
            e.on("select", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect(!0)
        }
    }
    ,
    t.navCompanionSelect = function(t) {
        if (this.navCompanion) {
            var e = this.navCompanion.selectedCells[0]
              , i = this.navCompanion.cells.indexOf(e)
              , s = i + this.navCompanion.selectedCells.length - 1
              , n = Math.floor(a(i, s, this.navCompanion.cellAlign));
            if (this.selectCell(n, !1, t),
            this.removeNavSelectedElements(),
            !(n >= this.cells.length)) {
                var r = this.cells.slice(i, s + 1);
                this.navSelectedElements = r.map(function(t) {
                    return t.element
                }),
                this.changeNavSelectedClass("add")
            }
        }
    }
    ,
    t.changeNavSelectedClass = function(e) {
        this.navSelectedElements.forEach(function(t) {
            t.classList[e]("is-nav-selected")
        })
    }
    ,
    t.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }
    ,
    t.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"),
        delete this.navSelectedElements)
    }
    ,
    t.onNavStaticClick = function(t, e, i, s) {
        "number" == typeof s && this.navCompanion.selectCell(s)
    }
    ,
    t.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }
    ,
    t.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect),
        this.off("staticClick", this.onNavStaticClick),
        delete this.navCompanion)
    }
    ,
    s
}),
function(e, i) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(t) {
        return i(e, t)
    }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.imagesLoaded = i(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    function r(t) {
        return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? l.call(t) : [t];
        var e
    }
    function a(t, e, i) {
        if (!(this instanceof a))
            return new a(t,e,i);
        var s = t;
        return "string" == typeof t && (s = document.querySelectorAll(t)),
        s ? (this.elements = r(s),
        this.options = n({}, this.options),
        "function" == typeof e ? i = e : n(this.options, e),
        i && this.on("always", i),
        this.getImages(),
        o && (this.jqDeferred = new o.Deferred),
        void setTimeout(this.check.bind(this))) : void h.error("Bad element for imagesLoaded " + (s || t))
    }
    function i(t) {
        this.img = t
    }
    function s(t, e) {
        this.url = t,
        this.element = e,
        this.img = new Image
    }
    var o = e.jQuery
      , h = e.console
      , l = Array.prototype.slice;
    a.prototype = Object.create(t.prototype),
    a.prototype.options = {},
    a.prototype.getImages = function() {
        this.images = [],
        this.elements.forEach(this.addElementImages, this)
    }
    ,
    a.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t),
        !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && p[e]) {
            for (var i = t.querySelectorAll("img"), s = 0; s < i.length; s++) {
                var n = i[s];
                this.addImage(n)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (s = 0; s < r.length; s++) {
                    var a = r[s];
                    this.addElementBackgroundImages(a)
                }
            }
        }
    }
    ;
    var p = {
        1: !0,
        9: !0,
        11: !0
    };
    return a.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, s = i.exec(e.backgroundImage); null !== s; ) {
                var n = s && s[2];
                n && this.addBackground(n, t),
                s = i.exec(e.backgroundImage)
            }
    }
    ,
    a.prototype.addImage = function(t) {
        var e = new i(t);
        this.images.push(e)
    }
    ,
    a.prototype.addBackground = function(t, e) {
        var i = new s(t,e);
        this.images.push(i)
    }
    ,
    a.prototype.check = function() {
        function e(t, e, i) {
            setTimeout(function() {
                s.progress(t, e, i)
            })
        }
        var s = this;
        return this.progressedCount = 0,
        this.hasAnyBroken = !1,
        this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e),
            t.check()
        }) : void this.complete()
    }
    ,
    a.prototype.progress = function(t, e, i) {
        this.progressedCount++,
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
        this.emitEvent("progress", [this, t, e]),
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
        this.progressedCount == this.images.length && this.complete(),
        this.options.debug && h && h.log("progress: " + i, t, e)
    }
    ,
    a.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0,
        this.emitEvent(t, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }
    ,
    i.prototype = Object.create(t.prototype),
    i.prototype.check = function() {
        var t;
        return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
        this.proxyImage.addEventListener("load", this),
        this.proxyImage.addEventListener("error", this),
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        void (this.proxyImage.src = this.img.src))
    }
    ,
    i.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }
    ,
    i.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.img, e])
    }
    ,
    i.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    i.prototype.onload = function() {
        this.confirm(!0, "onload"),
        this.unbindEvents()
    }
    ,
    i.prototype.onerror = function() {
        this.confirm(!1, "onerror"),
        this.unbindEvents()
    }
    ,
    i.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    s.prototype = Object.create(i.prototype),
    s.prototype.check = function() {
        var t;
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.img.src = this.url,
        this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
        this.unbindEvents())
    }
    ,
    s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    s.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.element, e])
    }
    ,
    a.makeJQueryPlugin = function(t) {
        (t = t || e.jQuery) && ((o = t).fn.imagesLoaded = function(t, e) {
            var i;
            return new a(this,t,e).jqDeferred.promise(o(this))
        }
        )
    }
    ,
    a.makeJQueryPlugin(),
    a
}),
function(i, s) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(t, e) {
        return s(i, t, e)
    }) : "object" == typeof module && module.exports ? module.exports = s(i, require("flickity"), require("imagesloaded")) : i.Flickity = s(i, i.Flickity, i.imagesLoaded)
}(window, function(t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var s = e.prototype;
    return s._createImagesLoaded = function() {
        this.on("activate", this.imagesLoaded)
    }
    ,
    s.imagesLoaded = function() {
        function t(t, e) {
            var i = s.getParentCell(e.img);
            s.cellSizeChange(i && i.element),
            s.options.freeScroll || s.positionSliderAtSelected()
        }
        if (this.options.imagesLoaded) {
            var s = this;
            i(this.slider).on("progress", t)
        }
    }
    ,
    e
}),
"undefined" != typeof navigator && function(t, e) {
    "function" == typeof define && define.amd ? define(function() {
        return e(t)
    }) : "object" == typeof module && module.exports ? module.exports = e(t) : (t.lottie = e(t),
    t.bodymovin = t.lottie)
}(window || {}, function(S) {
    "use strict";
    function t() {
        return {}
    }
    function e(t) {
        Ot = t ? Math.round : function(t) {
            return t
        }
    }
    function i(t, e, i, s) {
        this.type = t,
        this.currentTime = e,
        this.totalTime = i,
        this.direction = s < 0 ? -1 : 1
    }
    function s(t, e) {
        this.type = t,
        this.direction = e < 0 ? -1 : 1
    }
    function n(t, e, i, s) {
        this.type = t,
        this.currentLoop = i,
        this.totalLoops = e,
        this.direction = s < 0 ? -1 : 1
    }
    function r(t, e, i) {
        this.type = t,
        this.firstFrame = e,
        this.totalFrames = i
    }
    function a(t, e) {
        this.type = t,
        this.target = e
    }
    function _(t, e) {
        void 0 === e && (e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
        var i, s = "";
        for (i = t; 0 < i; --i)
            s += e[Math.round(Math.random() * (e.length - 1))];
        return s
    }
    function o(t, e, i) {
        var s, n, r, a, o, h, l, p;
        switch (h = i * (1 - e),
        l = i * (1 - (o = 6 * t - (a = Math.floor(6 * t))) * e),
        p = i * (1 - (1 - o) * e),
        a % 6) {
        case 0:
            s = i,
            n = p,
            r = h;
            break;
        case 1:
            s = l,
            n = i,
            r = h;
            break;
        case 2:
            s = h,
            n = i,
            r = p;
            break;
        case 3:
            s = h,
            n = l,
            r = i;
            break;
        case 4:
            s = p,
            n = h,
            r = i;
            break;
        case 5:
            s = i,
            n = h,
            r = l
        }
        return [s, n, r]
    }
    function h(t, e, i) {
        var s, n = Math.max(t, e, i), r = Math.min(t, e, i), a = n - r, o = 0 === n ? 0 : a / n, h = n / 255;
        switch (n) {
        case r:
            s = 0;
            break;
        case t:
            s = e - i + a * (e < i ? 6 : 0),
            s /= 6 * a;
            break;
        case e:
            s = i - t + 2 * a,
            s /= 6 * a;
            break;
        case i:
            s = t - e + 4 * a,
            s /= 6 * a
        }
        return [s, o, h]
    }
    function dt(t, e) {
        var i = h(255 * t[0], 255 * t[1], 255 * t[2]);
        return i[1] += e,
        1 < i[1] ? i[1] = 1 : i[1] <= 0 && (i[1] = 0),
        o(i[0], i[1], i[2])
    }
    function ct(t, e) {
        var i = h(255 * t[0], 255 * t[1], 255 * t[2]);
        return i[2] += e,
        1 < i[2] ? i[2] = 1 : i[2] < 0 && (i[2] = 0),
        o(i[0], i[1], i[2])
    }
    function ft(t, e) {
        var i = h(255 * t[0], 255 * t[1], 255 * t[2]);
        return i[0] += e / 360,
        1 < i[0] ? i[0] -= 1 : i[0] < 0 && (i[0] += 1),
        o(i[0], i[1], i[2])
    }
    function l() {}
    function k(t) {
        return Array.apply(null, {
            length: t
        })
    }
    function A(t) {
        return document.createElementNS(qt, t)
    }
    function x(t) {
        return document.createElement(t)
    }
    function g() {}
    function v(t, e) {
        var i, s, n = t.length;
        for (i = 0; i < n; i += 1)
            for (var r in s = t[i].prototype)
                s.hasOwnProperty(r) && (e.prototype[r] = s[r])
    }
    function p(t) {
        function e() {}
        return e.prototype = t,
        e
    }
    function d() {
        function v(t, e, i, s, n, r) {
            var a = t * s + e * n + i * r - n * s - r * t - i * e;
            return -.001 < a && a < .001
        }
        function t(t, e, i, s, n, r, a, o, h) {
            if (0 === i && 0 === r && 0 === h)
                return v(t, e, s, n, a, o);
            var l, p = Math.sqrt(Math.pow(s - t, 2) + Math.pow(n - e, 2) + Math.pow(r - i, 2)), d = Math.sqrt(Math.pow(a - t, 2) + Math.pow(o - e, 2) + Math.pow(h - i, 2)), c = Math.sqrt(Math.pow(a - s, 2) + Math.pow(o - n, 2) + Math.pow(h - r, 2));
            return -1e-4 < (l = d < p ? c < p ? p - d - c : c - d - p : d < c ? c - d - p : d - p - c) && l < 1e-4
        }
        function e(t) {
            var e, i = we.newElement(), s = t.c, n = t.v, r = t.o, a = t.i, o = t._length, h = i.lengths, l = 0;
            for (e = 0; e < o - 1; e += 1)
                h[e] = p(n[e], n[e + 1], r[e], a[e + 1]),
                l += h[e].addedLength;
            return s && (h[e] = p(n[e], n[0], r[e], a[0]),
            l += h[e].addedLength),
            i.totalLength = l,
            i
        }
        function y(t) {
            this.segmentLength = 0,
            this.points = new Array(t)
        }
        function b(t, e) {
            this.partialLength = t,
            this.point = e
        }
        function P(t, e) {
            var i = e.percents
              , s = e.lengths
              , n = i.length
              , r = Gt((n - 1) * t)
              , a = t * e.addedLength
              , o = 0;
            if (r === n - 1 || 0 === r || a === s[r])
                return i[r];
            for (var h = s[r] > a ? -1 : 1, l = !0; l; )
                if (s[r] <= a && s[r + 1] > a ? (o = (a - s[r]) / (s[r + 1] - s[r]),
                l = !1) : r += h,
                r < 0 || n - 1 <= r) {
                    if (r === n - 1)
                        return i[r];
                    l = !1
                }
            return i[r] + (i[r + 1] - i[r]) * o
        }
        function i(t, e, i, s, n, r) {
            var a = P(n, r), o = 1 - a, h, l;
            return [Math.round(1e3 * (o * o * o * t[0] + (a * o * o + o * a * o + o * o * a) * i[0] + (a * a * o + o * a * a + a * o * a) * s[0] + a * a * a * e[0])) / 1e3, Math.round(1e3 * (o * o * o * t[1] + (a * o * o + o * a * o + o * o * a) * i[1] + (a * a * o + o * a * a + a * o * a) * s[1] + a * a * a * e[1])) / 1e3]
        }
        function s(t, e, i, s, n, r, a) {
            var o = P(n = n < 0 ? 0 : 1 < n ? 1 : n, a), h, l = P(r = 1 < r ? 1 : r, a), p = t.length, d = 1 - o, c = 1 - l, f = d * d * d, u = o * d * d * 3, m = o * o * d * 3, g = o * o * o, v = d * d * c, y = o * d * c + d * o * c + d * d * l, b = o * o * c + d * o * l + o * d * l, w = o * o * l, E = d * c * c, _ = o * c * c + d * l * c + d * c * l, k = o * l * c + d * l * l + o * c * l, A = o * l * l, C = c * c * c, S = l * c * c + c * l * c + c * c * l, x = l * l * c + c * l * l + l * c * l, D = l * l * l;
            for (h = 0; h < p; h += 1)
                M[4 * h] = Math.round(1e3 * (f * t[h] + u * i[h] + m * s[h] + g * e[h])) / 1e3,
                M[4 * h + 1] = Math.round(1e3 * (v * t[h] + y * i[h] + b * s[h] + w * e[h])) / 1e3,
                M[4 * h + 2] = Math.round(1e3 * (E * t[h] + _ * i[h] + k * s[h] + A * e[h])) / 1e3,
                M[4 * h + 3] = Math.round(1e3 * (C * t[h] + S * i[h] + x * s[h] + D * e[h])) / 1e3;
            return M
        }
        var p = (Math,
        function(t, e, i, s) {
            var n, r, a, o, h, l, p = Jt, d = 0, c = [], f = [], u = Ee.newElement();
            for (a = i.length,
            n = 0; n < p; n += 1) {
                for (h = n / (p - 1),
                r = l = 0; r < a; r += 1)
                    o = Ht(1 - h, 3) * t[r] + 3 * Ht(1 - h, 2) * h * i[r] + 3 * (1 - h) * Ht(h, 2) * s[r] + Ht(h, 3) * e[r],
                    c[r] = o,
                    null !== f[r] && (l += Ht(c[r] - f[r], 2)),
                    f[r] = c[r];
                l && (d += l = Ut(l)),
                u.percents[n] = h,
                u.lengths[n] = d
            }
            return u.addedLength = d,
            u
        }
        ), n = (w = {},
        function(t) {
            var e = t.s
              , i = t.e
              , s = t.to
              , n = t.ti
              , r = (e[0] + "_" + e[1] + "_" + i[0] + "_" + i[1] + "_" + s[0] + "_" + s[1] + "_" + n[0] + "_" + n[1]).replace(/\./g, "p");
            if (w[r])
                t.bezierData = w[r];
            else {
                var a, o, h, l, p, d, c, f = Jt, u = 0, m = null;
                2 === e.length && (e[0] != i[0] || e[1] != i[1]) && v(e[0], e[1], i[0], i[1], e[0] + s[0], e[1] + s[1]) && v(e[0], e[1], i[0], i[1], i[0] + n[0], i[1] + n[1]) && (f = 2);
                var g = new y(f);
                for (h = s.length,
                a = 0; a < f; a += 1) {
                    for (c = k(h),
                    p = a / (f - 1),
                    o = d = 0; o < h; o += 1)
                        l = Ht(1 - p, 3) * e[o] + 3 * Ht(1 - p, 2) * p * (e[o] + s[o]) + 3 * (1 - p) * Ht(p, 2) * (i[o] + n[o]) + Ht(p, 3) * i[o],
                        c[o] = l,
                        null !== m && (d += Ht(c[o] - m[o], 2));
                    u += d = Ut(d),
                    g.points[a] = new b(d,c),
                    m = c
                }
                g.segmentLength = u,
                t.bezierData = g,
                w[r] = g
            }
        }
        ), M = $t("float32", 8), w;
        return {
            getSegmentsLength: e,
            getNewSegment: s,
            getPointInSegment: i,
            buildBezierData: n,
            pointOnLine2D: v,
            pointOnLine3D: t
        }
    }
    function c() {
        function f(t, e, i) {
            var s, n, r, a, o, h, l, p, d = t.length;
            for (a = 0; a < d; a += 1)
                if ("ks"in (s = t[a]) && !s.completed) {
                    if (s.completed = !0,
                    s.tt && (t[a - 1].td = s.tt),
                    n = [],
                    r = -1,
                    s.hasMask) {
                        var c = s.masksProperties;
                        for (h = c.length,
                        o = 0; o < h; o += 1)
                            if (c[o].pt.k.i)
                                g(c[o].pt.k);
                            else
                                for (p = c[o].pt.k.length,
                                l = 0; l < p; l += 1)
                                    c[o].pt.k[l].s && g(c[o].pt.k[l].s[0]),
                                    c[o].pt.k[l].e && g(c[o].pt.k[l].e[0])
                    }
                    0 === s.ty ? (s.layers = u(s.refId, e),
                    f(s.layers, e, i)) : 4 === s.ty ? m(s.shapes) : 5 == s.ty && v(s, i)
                }
        }
        function u(t, e) {
            for (var i = 0, s = e.length; i < s; ) {
                if (e[i].id === t)
                    return e[i].layers.__used ? JSON.parse(JSON.stringify(e[i].layers)) : (e[i].layers.__used = !0,
                    e[i].layers);
                i += 1
            }
        }
        function m(t) {
            var e, i, s, n, r = !1;
            for (e = t.length - 1; 0 <= e; e -= 1)
                if ("sh" == t[e].ty) {
                    if (t[e].ks.k.i)
                        g(t[e].ks.k);
                    else
                        for (s = t[e].ks.k.length,
                        i = 0; i < s; i += 1)
                            t[e].ks.k[i].s && g(t[e].ks.k[i].s[0]),
                            t[e].ks.k[i].e && g(t[e].ks.k[i].e[0]);
                    r = !0
                } else
                    "gr" == t[e].ty && m(t[e].it)
        }
        function g(t) {
            var e, i = t.i.length;
            for (e = 0; e < i; e += 1)
                t.i[e][0] += t.v[e][0],
                t.i[e][1] += t.v[e][1],
                t.o[e][0] += t.v[e][0],
                t.o[e][1] += t.v[e][1]
        }
        function o(t, e) {
            var i = e ? e.split(".") : [100, 100, 100];
            return t[0] > i[0] || !(i[0] > t[0]) && (t[1] > i[1] || !(i[1] > t[1]) && (t[2] > i[2] || !(i[2] > t[2]) && void 0))
        }
        function t(t, e) {
            t.__complete || (n(t),
            i(t),
            s(t),
            r(t),
            f(t.layers, t.assets, e),
            t.__complete = !0)
        }
        function v(t, e) {
            0 !== t.t.a.length || "m"in t.t.p || (t.singleShape = !0)
        }
        var i = function() {
            function s(t) {
                var e = t.t.d;
                t.t.d = {
                    k: [{
                        s: e,
                        t: 0
                    }]
                }
            }
            function n(t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1)
                    5 === t[e].ty && s(t[e])
            }
            var r = [4, 4, 14];
            return function(t) {
                if (o(r, t.v) && (n(t.layers),
                t.assets)) {
                    var e, i = t.assets.length;
                    for (e = 0; e < i; e += 1)
                        t.assets[e].layers && n(t.assets[e].layers)
                }
            }
        }(), s = (h = [4, 7, 99],
        function(t) {
            if (t.chars && !o(h, t.v)) {
                var e, i, s, n, r, a = t.chars.length;
                for (e = 0; e < a; e += 1)
                    if (t.chars[e].data && t.chars[e].data.shapes)
                        for (s = (r = t.chars[e].data.shapes[0].it).length,
                        i = 0; i < s; i += 1)
                            (n = r[i].ks.k).__converted || (g(r[i].ks.k),
                            n.__converted = !0)
            }
        }
        ), n = function() {
            function r(t) {
                var e, i, s, n = t.length;
                for (e = 0; e < n; e += 1)
                    if ("gr" === t[e].ty)
                        r(t[e].it);
                    else if ("fl" === t[e].ty || "st" === t[e].ty)
                        if (t[e].c.k && t[e].c.k[0].i)
                            for (s = t[e].c.k.length,
                            i = 0; i < s; i += 1)
                                t[e].c.k[i].s && (t[e].c.k[i].s[0] /= 255,
                                t[e].c.k[i].s[1] /= 255,
                                t[e].c.k[i].s[2] /= 255,
                                t[e].c.k[i].s[3] /= 255),
                                t[e].c.k[i].e && (t[e].c.k[i].e[0] /= 255,
                                t[e].c.k[i].e[1] /= 255,
                                t[e].c.k[i].e[2] /= 255,
                                t[e].c.k[i].e[3] /= 255);
                        else
                            t[e].c.k[0] /= 255,
                            t[e].c.k[1] /= 255,
                            t[e].c.k[2] /= 255,
                            t[e].c.k[3] /= 255
            }
            function s(t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1)
                    4 === t[e].ty && r(t[e].shapes)
            }
            var n = [4, 1, 9];
            return function(t) {
                if (o(n, t.v) && (s(t.layers),
                t.assets)) {
                    var e, i = t.assets.length;
                    for (e = 0; e < i; e += 1)
                        t.assets[e].layers && s(t.assets[e].layers)
                }
            }
        }(), r = function() {
            function l(t) {
                var e, i, s, n, r = !1;
                for (e = t.length - 1; 0 <= e; e -= 1)
                    if ("sh" == t[e].ty) {
                        if (t[e].ks.k.i)
                            t[e].ks.k.c = t[e].closed;
                        else
                            for (s = t[e].ks.k.length,
                            i = 0; i < s; i += 1)
                                t[e].ks.k[i].s && (t[e].ks.k[i].s[0].c = t[e].closed),
                                t[e].ks.k[i].e && (t[e].ks.k[i].e[0].c = t[e].closed);
                        r = !0
                    } else
                        "gr" == t[e].ty && l(t[e].it)
            }
            function s(t) {
                var e, i, s, n, r, a, o = t.length;
                for (i = 0; i < o; i += 1) {
                    if ((e = t[i]).hasMask) {
                        var h = e.masksProperties;
                        for (n = h.length,
                        s = 0; s < n; s += 1)
                            if (h[s].pt.k.i)
                                h[s].pt.k.c = h[s].cl;
                            else
                                for (a = h[s].pt.k.length,
                                r = 0; r < a; r += 1)
                                    h[s].pt.k[r].s && (h[s].pt.k[r].s[0].c = h[s].cl),
                                    h[s].pt.k[r].e && (h[s].pt.k[r].e[0].c = h[s].cl)
                    }
                    4 === e.ty && l(e.shapes)
                }
            }
            var n = [4, 4, 18];
            return function(t) {
                if (o(n, t.v) && (s(t.layers),
                t.assets)) {
                    var e, i = t.assets.length;
                    for (e = 0; e < i; e += 1)
                        t.assets[e].layers && s(t.assets[e].layers)
                }
            }
        }(), e = {}, h;
        return e.completeData = t,
        e
    }
    function f() {
        this.c = !1,
        this._length = 0,
        this._maxLength = 8,
        this.v = k(this._maxLength),
        this.o = k(this._maxLength),
        this.i = k(this._maxLength)
    }
    function u() {}
    function m() {}
    function y() {}
    function b() {}
    function w() {
        this._length = 0,
        this._maxLength = 4,
        this.shapes = k(this._maxLength)
    }
    function E(t, e, i) {
        this.elem = t,
        this.frameId = -1,
        this.dataProps = k(e.length),
        this.renderer = i,
        this.k = !1,
        this.dashStr = "",
        this.dashArray = $t("float32", e.length ? e.length - 1 : 0),
        this.dashoffset = $t("float32", 1),
        this.initDynamicPropertyContainer(t);
        var s, n, r = e.length || 0;
        for (s = 0; s < r; s += 1)
            n = re.getProp(t, e[s].v, 0, 0, this),
            this.k = n.k || this.k,
            this.dataProps[s] = {
                n: e[s].n,
                p: n
            };
        this.k || this.getValue(!0),
        this._isAnimated = this.k
    }
    function C(t, e) {
        this.data = e,
        this.c = $t("uint8c", 4 * e.p);
        var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
        this.o = $t("float32", i),
        this._cmdf = !1,
        this._omdf = !1,
        this._collapsable = this.checkCollapsable(),
        this._hasOpacity = i,
        this.initDynamicPropertyContainer(t),
        this.prop = re.getProp(t, e.k, 1, null, this),
        this.k = this.prop.k,
        this.getValue(!0)
    }
    function D(t, e, i) {
        this._isFirstFrame = !0,
        this._hasMaskedPath = !1,
        this._frameId = -1,
        this._textData = t,
        this._renderType = e,
        this._elem = i,
        this._animatorsData = k(this._textData.a.length),
        this._pathData = {},
        this._moreOptions = {
            alignment: {}
        },
        this.renderedLetters = [],
        this.lettersChangedFlag = !1,
        this.initDynamicPropertyContainer(i)
    }
    function P(t, e, i) {
        var s = {
            propType: !1
        }
          , n = re.getProp
          , r = e.a;
        this.a = {
            r: r.r ? n(t, r.r, 0, Qt, i) : s,
            rx: r.rx ? n(t, r.rx, 0, Qt, i) : s,
            ry: r.ry ? n(t, r.ry, 0, Qt, i) : s,
            sk: r.sk ? n(t, r.sk, 0, Qt, i) : s,
            sa: r.sa ? n(t, r.sa, 0, Qt, i) : s,
            s: r.s ? n(t, r.s, 1, .01, i) : s,
            a: r.a ? n(t, r.a, 1, 0, i) : s,
            o: r.o ? n(t, r.o, 0, .01, i) : s,
            p: r.p ? n(t, r.p, 1, 0, i) : s,
            sw: r.sw ? n(t, r.sw, 0, 0, i) : s,
            sc: r.sc ? n(t, r.sc, 1, 0, i) : s,
            fc: r.fc ? n(t, r.fc, 1, 0, i) : s,
            fh: r.fh ? n(t, r.fh, 0, 0, i) : s,
            fs: r.fs ? n(t, r.fs, 0, .01, i) : s,
            fb: r.fb ? n(t, r.fb, 0, .01, i) : s,
            t: r.t ? n(t, r.t, 0, 0, i) : s
        },
        this.s = ue.getTextSelectorProp(t, e.s, i),
        this.s.t = e.s.t
    }
    function ut(t, e, i, s, n, r) {
        this.o = t,
        this.sw = e,
        this.sc = i,
        this.fc = s,
        this.m = n,
        this.p = r,
        this._mdf = {
            o: !0,
            sw: !!e,
            sc: !!i,
            fc: !!s,
            m: !0,
            p: !0
        }
    }
    function M(t, e) {
        this._frameId = Vt,
        this.pv = "",
        this.v = "",
        this.kf = !1,
        this._isFirstFrame = !0,
        this._mdf = !1,
        this.data = e,
        this.elem = t,
        this.comp = this.elem.comp,
        this.keysIndex = -1,
        this.canResize = !1,
        this.minimumFontSize = 1,
        this.effectsSequence = [],
        this.currentData = {
            ascent: 0,
            boxWidth: this.defaultBoxWidth,
            f: "",
            fStyle: "",
            fWeight: "",
            fc: "",
            j: "",
            justifyOffset: "",
            l: [],
            lh: 0,
            lineWidths: [],
            ls: "",
            of: "",
            s: "",
            sc: "",
            sw: 0,
            t: 0,
            tr: 0,
            sz: 0,
            ps: null,
            fillColorAnim: !1,
            strokeColorAnim: !1,
            strokeWidthAnim: !1,
            yOffset: 0,
            finalSize: 0,
            finalText: [],
            finalLineHeight: 0,
            __test: !0
        },
        this.copyFromDocumentData(this.data.d.k[0].s),
        this.searchProperty() || (this.completeTextData(this.currentData),
        this.keysIndex = 0)
    }
    function T() {}
    function F(t, e) {
        this.animationItem = t,
        this.layers = null,
        this.renderedFrame = -1,
        this.svgElement = A("svg");
        var i = A("g");
        this.svgElement.appendChild(i),
        this.layerElement = i;
        var s = A("defs");
        this.svgElement.appendChild(s),
        this.renderConfig = {
            preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
            progressiveLoad: e && e.progressiveLoad || !1,
            hideOnTransparent: !e || !1 !== e.hideOnTransparent,
            viewBoxOnly: e && e.viewBoxOnly || !1,
            viewBoxSize: e && e.viewBoxSize || !1,
            className: e && e.className || ""
        },
        this.globalData = {
            _mdf: !1,
            frameNum: -1,
            defs: s,
            frameId: 0,
            compSize: {
                w: 0,
                h: 0
            },
            renderConfig: this.renderConfig,
            fontManager: new ne
        },
        this.elements = [],
        this.pendingElements = [],
        this.destroyed = !1
    }
    function I(t, e, i) {
        this.data = t,
        this.element = e,
        this.globalData = i,
        this.storedData = [],
        this.masksProperties = this.data.masksProperties || [],
        this.maskElement = null;
        var s, n = this.globalData.defs, r = this.masksProperties ? this.masksProperties.length : 0;
        this.viewData = k(r),
        this.solidPath = "";
        var a, o, h, l, p, d, c, f = this.masksProperties, u = 0, m = [], g = _(10), v = "clipPath", y = "clip-path";
        for (s = 0; s < r; s++)
            if (("a" !== f[s].mode && "n" !== f[s].mode || f[s].inv || 100 !== f[s].o.k) && (y = v = "mask"),
            "s" != f[s].mode && "i" != f[s].mode || 0 !== u ? l = null : ((l = A("rect")).setAttribute("fill", "#ffffff"),
            l.setAttribute("width", this.element.comp.data.w),
            l.setAttribute("height", this.element.comp.data.h),
            m.push(l)),
            a = A("path"),
            "n" != f[s].mode) {
                var b;
                if (u += 1,
                a.setAttribute("fill", "s" === f[s].mode ? "#000000" : "#ffffff"),
                a.setAttribute("clip-rule", "nonzero"),
                0 !== f[s].x.k ? (y = v = "mask",
                c = re.getProp(this.element, f[s].x, 0, null, this.element),
                b = "fi_" + _(10),
                (p = A("filter")).setAttribute("id", b),
                (d = A("feMorphology")).setAttribute("operator", "dilate"),
                d.setAttribute("in", "SourceGraphic"),
                d.setAttribute("radius", "0"),
                p.appendChild(d),
                n.appendChild(p),
                a.setAttribute("stroke", "s" === f[s].mode ? "#000000" : "#ffffff")) : c = d = null,
                this.storedData[s] = {
                    elem: a,
                    x: c,
                    expan: d,
                    lastPath: "",
                    lastOperator: "",
                    filterId: b,
                    lastRadius: 0
                },
                "i" == f[s].mode) {
                    h = m.length;
                    var w = A("g");
                    for (o = 0; o < h; o += 1)
                        w.appendChild(m[o]);
                    var E = A("mask");
                    E.setAttribute("mask-type", "alpha"),
                    E.setAttribute("id", g + "_" + u),
                    E.appendChild(a),
                    n.appendChild(E),
                    w.setAttribute("mask", "url(" + jt + "#" + g + "_" + u + ")"),
                    m.length = 0,
                    m.push(w)
                } else
                    m.push(a);
                f[s].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()),
                this.viewData[s] = {
                    elem: a,
                    lastPath: "",
                    op: re.getProp(this.element, f[s].o, 0, .01, this.element),
                    prop: oe.getShapeProp(this.element, f[s], 3),
                    invRect: l
                },
                this.viewData[s].prop.k || this.drawPath(f[s], this.viewData[s].prop.v, this.viewData[s])
            } else
                this.viewData[s] = {
                    op: re.getProp(this.element, f[s].o, 0, .01, this.element),
                    prop: oe.getShapeProp(this.element, f[s], 3),
                    elem: a,
                    lastPath: ""
                },
                n.appendChild(a);
        for (this.maskElement = A(v),
        r = m.length,
        s = 0; s < r; s += 1)
            this.maskElement.appendChild(m[s]);
        0 < u && (this.maskElement.setAttribute("id", g),
        this.element.maskedElement.setAttribute(y, "url(" + jt + "#" + g + ")"),
        n.appendChild(this.maskElement)),
        this.viewData.length && this.element.addRenderableComponent(this)
    }
    function L() {}
    function z() {}
    function N() {}
    function B() {}
    function R() {}
    function O(t, e) {
        this.elem = t,
        this.pos = e
    }
    function q(t, e) {
        this.data = t,
        this.type = t.ty,
        this.d = "",
        this.lvl = e,
        this._mdf = !1,
        this.closed = !1,
        this.pElem = A("path"),
        this.msElem = null
    }
    function j(t, e, i) {
        this.caches = [],
        this.styles = [],
        this.transformers = t,
        this.lStr = "",
        this.sh = i,
        this.lvl = e,
        this._isAnimated = !!i.k;
        for (var s = 0, n = t.length; s < n; ) {
            if (t[s].mProps.dynamicProperties.length) {
                this._isAnimated = !0;
                break
            }
            s += 1
        }
    }
    function V(t, e, i) {
        this.transform = {
            mProps: t,
            op: e,
            container: i
        },
        this.elements = [],
        this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
    }
    function W(t, e, i) {
        this.initDynamicPropertyContainer(t),
        this.getValue = this.iterateDynamicProperties,
        this.o = re.getProp(t, e.o, 0, .01, this),
        this.w = re.getProp(t, e.w, 0, null, this),
        this.d = new E(t,e.d || {},"svg",this),
        this.c = re.getProp(t, e.c, 1, 255, this),
        this.style = i,
        this._isAnimated = !!this._isAnimated
    }
    function H(t, e, i) {
        this.initDynamicPropertyContainer(t),
        this.getValue = this.iterateDynamicProperties,
        this.o = re.getProp(t, e.o, 0, .01, this),
        this.c = re.getProp(t, e.c, 1, 255, this),
        this.style = i
    }
    function U(t, e, i) {
        this.initDynamicPropertyContainer(t),
        this.getValue = this.iterateDynamicProperties,
        this.initGradientData(t, e, i)
    }
    function G(t, e, i) {
        this.initDynamicPropertyContainer(t),
        this.getValue = this.iterateDynamicProperties,
        this.w = re.getProp(t, e.w, 0, null, this),
        this.d = new E(t,e.d || {},"svg",this),
        this.initGradientData(t, e, i),
        this._isAnimated = !!this._isAnimated
    }
    function X() {
        this.it = [],
        this.prevViewData = [],
        this.gr = A("g")
    }
    function Y() {}
    function J(t, e, i) {
        this.initFrame(),
        this.initBaseData(t, e, i),
        this.initFrame(),
        this.initTransform(t, e, i),
        this.initHierarchy()
    }
    function Q() {}
    function K() {}
    function Z() {}
    function $() {}
    function tt(t, e, i) {
        this.assetData = e.getAssetData(t.refId),
        this.initElement(t, e, i)
    }
    function et(t, e, i) {
        this.initElement(t, e, i)
    }
    function it(t, e, i) {
        this.layers = t.layers,
        this.supports3d = !0,
        this.completeLayers = !1,
        this.pendingElements = [],
        this.elements = this.layers ? k(this.layers.length) : [],
        this.initElement(t, e, i),
        this.tm = t.tm ? re.getProp(this, t.tm, 0, e.frameRate, this) : {
            _placeholder: !0
        }
    }
    function st(t, e, i) {
        this.textSpans = [],
        this.renderType = "svg",
        this.initElement(t, e, i)
    }
    function nt(t, e, i) {
        this.shapes = [],
        this.shapesData = t.shapes,
        this.stylesList = [],
        this.shapeModifiers = [],
        this.itemsData = [],
        this.processedElements = [],
        this.animatedContents = [],
        this.initElement(t, e, i),
        this.prevViewData = []
    }
    function rt(t, e) {
        this.filterManager = e;
        var i = A("feColorMatrix");
        if (i.setAttribute("type", "matrix"),
        i.setAttribute("color-interpolation-filters", "linearRGB"),
        i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),
        i.setAttribute("result", "f1"),
        t.appendChild(i),
        (i = A("feColorMatrix")).setAttribute("type", "matrix"),
        i.setAttribute("color-interpolation-filters", "sRGB"),
        i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
        i.setAttribute("result", "f2"),
        t.appendChild(i),
        this.matrixFilter = i,
        100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
            var s = A("feMerge"), n;
            t.appendChild(s),
            (n = A("feMergeNode")).setAttribute("in", "SourceGraphic"),
            s.appendChild(n),
            (n = A("feMergeNode")).setAttribute("in", "f2"),
            s.appendChild(n)
        }
    }
    function at(t, e) {
        this.filterManager = e;
        var i = A("feColorMatrix");
        i.setAttribute("type", "matrix"),
        i.setAttribute("color-interpolation-filters", "sRGB"),
        i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
        t.appendChild(i),
        this.matrixFilter = i
    }
    function ot(t, e) {
        this.initialized = !1,
        this.filterManager = e,
        this.elem = t,
        this.paths = []
    }
    function ht(t, e) {
        this.filterManager = e;
        var i = A("feColorMatrix");
        i.setAttribute("type", "matrix"),
        i.setAttribute("color-interpolation-filters", "linearRGB"),
        i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),
        i.setAttribute("result", "f1"),
        t.appendChild(i);
        var s = A("feComponentTransfer");
        s.setAttribute("color-interpolation-filters", "sRGB"),
        t.appendChild(s),
        this.matrixFilter = s;
        var n = A("feFuncR");
        n.setAttribute("type", "table"),
        s.appendChild(n),
        this.feFuncR = n;
        var r = A("feFuncG");
        r.setAttribute("type", "table"),
        s.appendChild(r),
        this.feFuncG = r;
        var a = A("feFuncB");
        a.setAttribute("type", "table"),
        s.appendChild(a),
        this.feFuncB = a
    }
    function lt(t, e) {
        this.filterManager = e;
        var i = this.filterManager.effectElements
          , s = A("feComponentTransfer");
        (i[10].p.k || 0 !== i[10].p.v || i[11].p.k || 1 !== i[11].p.v || i[12].p.k || 1 !== i[12].p.v || i[13].p.k || 0 !== i[13].p.v || i[14].p.k || 1 !== i[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", s)),
        (i[17].p.k || 0 !== i[17].p.v || i[18].p.k || 1 !== i[18].p.v || i[19].p.k || 1 !== i[19].p.v || i[20].p.k || 0 !== i[20].p.v || i[21].p.k || 1 !== i[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", s)),
        (i[24].p.k || 0 !== i[24].p.v || i[25].p.k || 1 !== i[25].p.v || i[26].p.k || 1 !== i[26].p.v || i[27].p.k || 0 !== i[27].p.v || i[28].p.k || 1 !== i[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", s)),
        (i[31].p.k || 0 !== i[31].p.v || i[32].p.k || 1 !== i[32].p.v || i[33].p.k || 1 !== i[33].p.v || i[34].p.k || 0 !== i[34].p.v || i[35].p.k || 1 !== i[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", s)),
        (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (s.setAttribute("color-interpolation-filters", "sRGB"),
        t.appendChild(s),
        s = A("feComponentTransfer")),
        (i[3].p.k || 0 !== i[3].p.v || i[4].p.k || 1 !== i[4].p.v || i[5].p.k || 1 !== i[5].p.v || i[6].p.k || 0 !== i[6].p.v || i[7].p.k || 1 !== i[7].p.v) && (s.setAttribute("color-interpolation-filters", "sRGB"),
        t.appendChild(s),
        this.feFuncRComposed = this.createFeFunc("feFuncR", s),
        this.feFuncGComposed = this.createFeFunc("feFuncG", s),
        this.feFuncBComposed = this.createFeFunc("feFuncB", s))
    }
    function pt(t, e) {
        t.setAttribute("x", "-100%"),
        t.setAttribute("y", "-100%"),
        t.setAttribute("width", "400%"),
        t.setAttribute("height", "400%"),
        this.filterManager = e;
        var i = A("feGaussianBlur");
        i.setAttribute("in", "SourceAlpha"),
        i.setAttribute("result", "drop_shadow_1"),
        i.setAttribute("stdDeviation", "0"),
        this.feGaussianBlur = i,
        t.appendChild(i);
        var s = A("feOffset");
        s.setAttribute("dx", "25"),
        s.setAttribute("dy", "0"),
        s.setAttribute("in", "drop_shadow_1"),
        s.setAttribute("result", "drop_shadow_2"),
        this.feOffset = s,
        t.appendChild(s);
        var n = A("feFlood");
        n.setAttribute("flood-color", "#00ff00"),
        n.setAttribute("flood-opacity", "1"),
        n.setAttribute("result", "drop_shadow_3"),
        this.feFlood = n,
        t.appendChild(n);
        var r = A("feComposite");
        r.setAttribute("in", "drop_shadow_3"),
        r.setAttribute("in2", "drop_shadow_2"),
        r.setAttribute("operator", "in"),
        r.setAttribute("result", "drop_shadow_4"),
        t.appendChild(r);
        var a = A("feMerge"), o;
        t.appendChild(a),
        o = A("feMergeNode"),
        a.appendChild(o),
        (o = A("feMergeNode")).setAttribute("in", "SourceGraphic"),
        this.feMergeNode = o,
        this.feMerge = a,
        this.originalNodeAdded = !1,
        a.appendChild(o)
    }
    function mt(t, e, i) {
        this.initialized = !1,
        this.filterManager = e,
        this.filterElem = t,
        (this.elem = i).matteElement = A("g"),
        i.matteElement.appendChild(i.layerElement),
        i.matteElement.appendChild(i.transformedElement),
        i.baseElement = i.matteElement
    }
    function gt(t) {
        var e, i = t.data.ef ? t.data.ef.length : 0, s = _(10), n = ce.createFilter(s), r = 0, a;
        for (this.filters = [],
        e = 0; e < i; e += 1)
            a = null,
            20 === t.data.ef[e].ty ? (r += 1,
            a = new rt(n,t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (r += 1,
            a = new at(n,t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? a = new ot(t,t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (r += 1,
            a = new ht(n,t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (r += 1,
            a = new lt(n,t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (r += 1,
            a = new pt(n,t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty && (a = new mt(n,t.effectsManager.effectElements[e],t)),
            a && this.filters.push(a);
        r && (t.globalData.defs.appendChild(n),
        t.layerElement.setAttribute("filter", "url(" + jt + "#" + s + ")")),
        this.filters.length && t.addRenderableComponent(this)
    }
    function vt() {}
    function yt(t) {
        jt = t
    }
    function bt(t) {
        Se.play(t)
    }
    function wt(t) {
        Se.pause(t)
    }
    function Et(t) {
        Se.togglePause(t)
    }
    function _t(t, e) {
        Se.setSpeed(t, e)
    }
    function kt(t, e) {
        Se.setDirection(t, e)
    }
    function At(t) {
        Se.stop(t)
    }
    function Ct() {
        !0 === Pe ? Se.searchAnimations(Me, Pe, Te) : Se.searchAnimations()
    }
    function St(t) {
        return Se.registerAnimation(t)
    }
    function xt() {
        Se.resize()
    }
    function Dt(t, e, i) {
        Se.goToAndStop(t, e, i)
    }
    function Pt(t) {
        Wt = t
    }
    function Mt(t) {
        return !0 === Pe && (t.animationData = JSON.parse(Me)),
        Se.loadAnimation(t)
    }
    function Tt(t) {
        return Se.destroy(t)
    }
    function Ft(t) {
        if ("string" == typeof t)
            switch (t) {
            case "high":
                Jt = 200;
                break;
            case "medium":
                Jt = 50;
                break;
            case "low":
                Jt = 10
            }
        else
            !isNaN(t) && 1 < t && (Jt = t);
        e(!(50 <= Jt))
    }
    function It() {
        return "undefined" != typeof navigator
    }
    function Lt(t, e) {
        "expressions" === t && (Rt = e)
    }
    function zt(t) {
        switch (t) {
        case "propertyFactory":
            return re;
        case "shapePropertyFactory":
            return oe;
        case "matrix":
            return te
        }
    }
    function Nt() {
        "complete" === document.readyState && (clearInterval(Ne),
        Ct())
    }
    function Bt(t) {
        for (var e = ze.split("&"), i = 0; i < e.length; i++) {
            var s = e[i].split("=");
            if (decodeURIComponent(s[0]) == t)
                return decodeURIComponent(s[1])
        }
    }
    var Rt, Ot, qt = "http://www.w3.org/2000/svg", jt = "", Vt = -999999, Wt = !0, Ht = (/^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    Math.round,
    Math.pow), Ut = Math.sqrt, Gt = (Math.abs,
    Math.floor), Xt = (Math.max,
    Math.min), Yt = {};
    !function() {
        var t, e = Object.getOwnPropertyNames(Math), i = e.length;
        for (t = 0; t < i; t += 1)
            Yt[e[t]] = Math[e[t]]
    }(),
    Yt.random = Math.random,
    Yt.abs = function(t) {
        var e;
        if ("object" === typeof t && t.length) {
            var i, s = k(t.length), n = t.length;
            for (i = 0; i < n; i += 1)
                s[i] = Math.abs(t[i]);
            return s
        }
        return Math.abs(t)
    }
    ;
    var Jt = 150
      , Qt = Math.PI / 180
      , Kt = .5519;
    e(!1);
    var Zt = function() {
        var t, e, s = [];
        for (t = 0; t < 256; t += 1)
            e = t.toString(16),
            s[t] = 1 == e.length ? "0" + e : e;
        return function(t, e, i) {
            return t < 0 && (t = 0),
            e < 0 && (e = 0),
            i < 0 && (i = 0),
            "#" + s[t] + s[e] + s[i]
        }
    }();
    l.prototype = {
        triggerEvent: function(t, e) {
            if (this._cbs[t])
                for (var i = this._cbs[t].length, s = 0; s < i; s++)
                    this._cbs[t][s](e)
        },
        addEventListener: function(t, e) {
            return this._cbs[t] || (this._cbs[t] = []),
            this._cbs[t].push(e),
            function() {
                this.removeEventListener(t, e)
            }
            .bind(this)
        },
        removeEventListener: function(t, e) {
            if (e) {
                if (this._cbs[t]) {
                    for (var i = 0, s = this._cbs[t].length; i < s; )
                        this._cbs[t][i] === e && (this._cbs[t].splice(i, 1),
                        i -= 1,
                        s -= 1),
                        i += 1;
                    this._cbs[t].length || (this._cbs[t] = null)
                }
            } else
                this._cbs[t] = null
        }
    };
    var $t = function() {
        function t(t, e) {
            var i, s = 0, n = [];
            switch (t) {
            case "int16":
            case "uint8c":
                i = 1;
                break;
            default:
                i = 1.1
            }
            for (s = 0; s < e; s += 1)
                n.push(i);
            return n
        }
        function e(t, e) {
            return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0
        }
        return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? e : t
    }();
    g.prototype = {
        addDynamicProperty: function(t) {
            -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t),
            this.container.addDynamicProperty(this),
            this._isAnimated = !0)
        },
        iterateDynamicProperties: function() {
            this._mdf = !1;
            var t, e = this.dynamicProperties.length;
            for (t = 0; t < e; t += 1)
                this.dynamicProperties[t].getValue(),
                this.dynamicProperties[t]._mdf && (this._mdf = !0)
        },
        initDynamicPropertyContainer: function(t) {
            this.container = t,
            this.dynamicProperties = [],
            this._mdf = !1,
            this._isAnimated = !1
        }
    };
    var te = function() {
        function t() {
            return this.props[0] = 1,
            this.props[1] = 0,
            this.props[2] = 0,
            this.props[3] = 0,
            this.props[4] = 0,
            this.props[5] = 1,
            this.props[6] = 0,
            this.props[7] = 0,
            this.props[8] = 0,
            this.props[9] = 0,
            this.props[10] = 1,
            this.props[11] = 0,
            this.props[12] = 0,
            this.props[13] = 0,
            this.props[14] = 0,
            this.props[15] = 1,
            this
        }
        function e(t) {
            if (0 === t)
                return this;
            var e = D(t)
              , i = P(t);
            return this._t(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
        }
        function i(t) {
            if (0 === t)
                return this;
            var e = D(t)
              , i = P(t);
            return this._t(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1)
        }
        function s(t) {
            if (0 === t)
                return this;
            var e = D(t)
              , i = P(t);
            return this._t(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1)
        }
        function n(t) {
            if (0 === t)
                return this;
            var e = D(t)
              , i = P(t);
            return this._t(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
        }
        function r(t, e) {
            return this._t(1, e, t, 1, 0, 0)
        }
        function a(t, e) {
            return this.shear(M(t), M(e))
        }
        function o(t, e) {
            var i = D(e)
              , s = P(e);
            return this._t(i, s, 0, 0, -s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, M(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
        }
        function h(t, e, i) {
            return i = isNaN(i) ? 1 : i,
            1 == t && 1 == e && 1 == i ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1)
        }
        function l(t, e, i, s, n, r, a, o, h, l, p, d, c, f, u, m) {
            return this.props[0] = t,
            this.props[1] = e,
            this.props[2] = i,
            this.props[3] = s,
            this.props[4] = n,
            this.props[5] = r,
            this.props[6] = a,
            this.props[7] = o,
            this.props[8] = h,
            this.props[9] = l,
            this.props[10] = p,
            this.props[11] = d,
            this.props[12] = c,
            this.props[13] = f,
            this.props[14] = u,
            this.props[15] = m,
            this
        }
        function p(t, e, i) {
            return i = i || 0,
            0 !== t || 0 !== e || 0 !== i ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, i, 1) : this
        }
        function d(t, e, i, s, n, r, a, o, h, l, p, d, c, f, u, m) {
            var g = this.props;
            if (1 === t && 0 === e && 0 === i && 0 === s && 0 === n && 1 === r && 0 === a && 0 === o && 0 === h && 0 === l && 1 === p && 0 === d)
                return g[12] = g[12] * t + g[15] * c,
                g[13] = g[13] * r + g[15] * f,
                g[14] = g[14] * p + g[15] * u,
                g[15] = g[15] * m,
                this._identityCalculated = !1,
                this;
            var v = g[0]
              , y = g[1]
              , b = g[2]
              , w = g[3]
              , E = g[4]
              , _ = g[5]
              , k = g[6]
              , A = g[7]
              , C = g[8]
              , S = g[9]
              , x = g[10]
              , D = g[11]
              , P = g[12]
              , M = g[13]
              , T = g[14]
              , F = g[15];
            return g[0] = v * t + y * n + b * h + w * c,
            g[1] = v * e + y * r + b * l + w * f,
            g[2] = v * i + y * a + b * p + w * u,
            g[3] = v * s + y * o + b * d + w * m,
            g[4] = E * t + _ * n + k * h + A * c,
            g[5] = E * e + _ * r + k * l + A * f,
            g[6] = E * i + _ * a + k * p + A * u,
            g[7] = E * s + _ * o + k * d + A * m,
            g[8] = C * t + S * n + x * h + D * c,
            g[9] = C * e + S * r + x * l + D * f,
            g[10] = C * i + S * a + x * p + D * u,
            g[11] = C * s + S * o + x * d + D * m,
            g[12] = P * t + M * n + T * h + F * c,
            g[13] = P * e + M * r + T * l + F * f,
            g[14] = P * i + M * a + T * p + F * u,
            g[15] = P * s + M * o + T * d + F * m,
            this._identityCalculated = !1,
            this
        }
        function c() {
            return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]),
            this._identityCalculated = !0),
            this._identity
        }
        function f(t) {
            for (var e = 0; e < 16; ) {
                if (t.props[e] !== this.props[e])
                    return !1;
                e += 1
            }
            return !0
        }
        function u(t) {
            var e;
            for (e = 0; e < 16; e += 1)
                t.props[e] = this.props[e]
        }
        function m(t) {
            var e;
            for (e = 0; e < 16; e += 1)
                this.props[e] = t[e]
        }
        function g(t, e, i) {
            return {
                x: t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12],
                y: t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13],
                z: t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]
            }
        }
        function v(t, e, i) {
            return t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12]
        }
        function y(t, e, i) {
            return t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13]
        }
        function b(t, e, i) {
            return t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]
        }
        function w(t) {
            var e = this.props[0] * this.props[5] - this.props[1] * this.props[4]
              , i = this.props[5] / e
              , s = -this.props[1] / e
              , n = -this.props[4] / e
              , r = this.props[0] / e
              , a = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e
              , o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
            return [t[0] * i + t[1] * n + a, t[0] * s + t[1] * r + o, 0]
        }
        function E(t) {
            var e, i = t.length, s = [];
            for (e = 0; e < i; e += 1)
                s[e] = w(t[e]);
            return s
        }
        function _(t, e, i) {
            var s = $t("float32", 6);
            if (this.isIdentity())
                s[0] = t[0],
                s[1] = t[1],
                s[2] = e[0],
                s[3] = e[1],
                s[4] = i[0],
                s[5] = i[1];
            else {
                var n = this.props[0]
                  , r = this.props[1]
                  , a = this.props[4]
                  , o = this.props[5]
                  , h = this.props[12]
                  , l = this.props[13];
                s[0] = t[0] * n + t[1] * a + h,
                s[1] = t[0] * r + t[1] * o + l,
                s[2] = e[0] * n + e[1] * a + h,
                s[3] = e[0] * r + e[1] * o + l,
                s[4] = i[0] * n + i[1] * a + h,
                s[5] = i[0] * r + i[1] * o + l
            }
            return s
        }
        function k(t, e, i) {
            var s;
            return s = this.isIdentity() ? [t, e, i] : [t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]]
        }
        function A(t, e) {
            if (this.isIdentity())
                return t + "," + e;
            var i = this.props;
            return Math.round(100 * (t * i[0] + e * i[4] + i[12])) / 100 + "," + Math.round(100 * (t * i[1] + e * i[5] + i[13])) / 100
        }
        function C() {
            for (var t = 0, e = this.props, i = "matrix3d(", s = 1e4; t < 16; )
                i += T(e[t] * s) / s,
                i += 15 === t ? ")" : ",",
                t += 1;
            return i
        }
        function S(t) {
            var e = 1e4;
            return t < 1e-6 && 0 < t || -1e-6 < t && t < 0 ? T(t * e) / e : t
        }
        function x() {
            var t = this.props, e, i, s, n, r, a;
            return "matrix(" + S(t[0]) + "," + S(t[1]) + "," + S(t[4]) + "," + S(t[5]) + "," + S(t[12]) + "," + S(t[13]) + ")"
        }
        var D = Math.cos
          , P = Math.sin
          , M = Math.tan
          , T = Math.round;
        return function() {
            this.reset = t,
            this.rotate = e,
            this.rotateX = i,
            this.rotateY = s,
            this.rotateZ = n,
            this.skew = a,
            this.skewFromAxis = o,
            this.shear = r,
            this.scale = h,
            this.setTransform = l,
            this.translate = p,
            this.transform = d,
            this.applyToPoint = g,
            this.applyToX = v,
            this.applyToY = y,
            this.applyToZ = b,
            this.applyToPointArray = k,
            this.applyToTriplePoints = _,
            this.applyToPointStringified = A,
            this.toCSS = C,
            this.to2dCSS = x,
            this.clone = u,
            this.cloneFromProps = m,
            this.equals = f,
            this.inversePoints = E,
            this.inversePoint = w,
            this._t = this.transform,
            this.isIdentity = c,
            this._identity = !0,
            this._identityCalculated = !1,
            this.props = $t("float32", 16),
            this.reset()
        }
    }();
    !function(o, h) {
        function t(t, e, i) {
            var s = []
              , n = c(d((e = !0 === e ? {
                entropy: !0
            } : e || {}).entropy ? [t, u(o)] : null === t ? f() : t, 3), s)
              , r = new l(s)
              , a = function() {
                for (var t = r.g(g), e = y, i = 0; t < b; )
                    t = (t + i) * m,
                    e *= m,
                    i = r.g(1);
                for (; w <= t; )
                    t /= 2,
                    e /= 2,
                    i >>>= 1;
                return (t + i) / e
            };
            return a.int32 = function() {
                return 0 | r.g(4)
            }
            ,
            a.quick = function() {
                return r.g(4) / 4294967296
            }
            ,
            a.double = a,
            c(u(r.S), o),
            (e.pass || i || function(t, e, i, s) {
                return s && (s.S && p(s, r),
                t.state = function() {
                    return p(r, {})
                }
                ),
                i ? (h[v] = t,
                e) : t
            }
            )(a, n, "global"in e ? e.global : this == h, e.state)
        }
        function l(t) {
            var e, i = t.length, a = this, s = 0, n = a.i = a.j = 0, r = a.S = [];
            for (i || (t = [i++]); s < m; )
                r[s] = s++;
            for (s = 0; s < m; s++)
                r[s] = r[n = E & n + t[s % i] + (e = r[s])],
                r[n] = e;
            a.g = function(t) {
                for (var e, i = 0, s = a.i, n = a.j, r = a.S; t--; )
                    e = r[s = E & s + 1],
                    i = i * m + r[E & (r[s] = r[n = E & n + e]) + (r[n] = e)];
                return a.i = s,
                a.j = n,
                i
            }
        }
        function p(t, e) {
            return e.i = t.i,
            e.j = t.j,
            e.S = t.S.slice(),
            e
        }
        function d(t, e) {
            var i, s = [], n = typeof t;
            if (e && "object" == n)
                for (i in t)
                    try {
                        s.push(d(t[i], e - 1))
                    } catch (t) {}
            return s.length ? s : "string" == n ? t : t + "\0"
        }
        function c(t, e) {
            for (var i, s = t + "", n = 0; n < s.length; )
                e[E & n] = E & (i ^= 19 * e[E & n]) + s.charCodeAt(n++);
            return u(e)
        }
        function f() {
            try {
                if (s)
                    return u(s.randomBytes(m));
                var t = new Uint8Array(m);
                return (n.crypto || n.msCrypto).getRandomValues(t),
                u(t)
            } catch (t) {
                var e = n.navigator
                  , i = e && e.plugins;
                return [+new Date, n, i, n.screen, u(o)]
            }
        }
        function u(t) {
            return String.fromCharCode.apply(0, t)
        }
        var s, n = this, m = 256, g = 6, e = 52, v = "random", y = h.pow(m, g), b = h.pow(2, 52), w = 2 * b, E = m - 1;
        h["seed" + v] = t,
        c(h.random(), o)
    }([], Yt);
    var ee = function() {
        function t(t, e, i, s, n) {
            var r = n || ("bez_" + t + "_" + e + "_" + i + "_" + s).replace(/\./g, "p");
            if (l[r])
                return l[r];
            var a = new o([t, e, i, s]);
            return l[r] = a
        }
        function s(t, e) {
            return 1 - 3 * e + 3 * t
        }
        function n(t, e) {
            return 3 * e - 6 * t
        }
        function r(t) {
            return 3 * t
        }
        function h(t, e, i) {
            return ((s(e, i) * t + n(e, i)) * t + r(e)) * t
        }
        function p(t, e, i) {
            return 3 * s(e, i) * t * t + 2 * n(e, i) * t + r(e)
        }
        function d(t, e, i, s, n) {
            for (var r, a, o = 0; 0 < (r = h(a = e + (i - e) / 2, s, n) - t) ? i = a : e = a,
            Math.abs(r) > u && ++o < 10; )
                ;
            return a
        }
        function c(t, e, i, s) {
            for (var n = 0; n < 4; ++n) {
                var r = p(e, i, s), a;
                if (0 === r)
                    return e;
                e -= (h(e, i, s) - t) / r
            }
            return e
        }
        function o(t) {
            this._p = t,
            this._mSampleValues = v ? new Float32Array(m) : new Array(m),
            this._precomputed = !1,
            this.get = this.get.bind(this)
        }
        var e = {};
        e.getBezierEasing = t;
        var l = {}
          , i = 4
          , f = .001
          , u = 1e-7
          , a = 10
          , m = 11
          , g = 1 / (m - 1)
          , v = "function" == typeof Float32Array;
        return o.prototype = {
            get: function(t) {
                var e = this._p[0]
                  , i = this._p[1]
                  , s = this._p[2]
                  , n = this._p[3];
                return this._precomputed || this._precompute(),
                e === i && s === n ? t : 0 === t ? 0 : 1 === t ? 1 : h(this._getTForX(t), i, n)
            },
            _precompute: function() {
                var t = this._p[0]
                  , e = this._p[1]
                  , i = this._p[2]
                  , s = this._p[3];
                this._precomputed = !0,
                t === e && i === s || this._calcSampleValues()
            },
            _calcSampleValues: function() {
                for (var t = this._p[0], e = this._p[2], i = 0; i < m; ++i)
                    this._mSampleValues[i] = h(i * g, t, e)
            },
            _getTForX: function(t) {
                for (var e = this._p[0], i = this._p[2], s = this._mSampleValues, n = 0, r = 1, a = m - 1; r !== a && s[r] <= t; ++r)
                    n += g;
                var o, h = n + (t - s[--r]) / (s[r + 1] - s[r]) * g, l = p(h, e, i);
                return f <= l ? c(t, h, e, i) : 0 === l ? h : d(t, n, n + g, e, i)
            }
        },
        e
    }();
    !function() {
        for (var r = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !S.requestAnimationFrame; ++e)
            S.requestAnimationFrame = S[t[e] + "RequestAnimationFrame"],
            S.cancelAnimationFrame = S[t[e] + "CancelAnimationFrame"] || S[t[e] + "CancelRequestAnimationFrame"];
        S.requestAnimationFrame || (S.requestAnimationFrame = function(t, e) {
            var i = (new Date).getTime()
              , s = Math.max(0, 16 - (i - r))
              , n = setTimeout(function() {
                t(i + s)
            }, s);
            return r = i + s,
            n
        }
        ),
        S.cancelAnimationFrame || (S.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        }
        )
    }();
    var ie = d()
      , se = c()
      , ne = function() {
        function h(t, e) {
            var i = x("span");
            i.style.fontFamily = e;
            var s = x("span");
            s.innerHTML = "giItT1WQy@!-/#",
            i.style.position = "absolute",
            i.style.left = "-10000px",
            i.style.top = "-10000px",
            i.style.fontSize = "300px",
            i.style.fontVariant = "normal",
            i.style.fontStyle = "normal",
            i.style.fontWeight = "normal",
            i.style.letterSpacing = "0",
            i.appendChild(s),
            document.body.appendChild(i);
            var n = s.offsetWidth;
            return s.style.fontFamily = t + ", " + e,
            {
                node: s,
                w: n,
                parent: i
            }
        }
        function l() {
            var t, e, i, s = this.fonts.length, n = s;
            for (t = 0; t < s; t += 1)
                if (this.fonts[t].loaded)
                    n -= 1;
                else if ("t" === this.fonts[t].fOrigin || 2 === this.fonts[t].origin) {
                    if (S.Typekit && S.Typekit.load && 0 === this.typekitLoaded) {
                        this.typekitLoaded = 1;
                        try {
                            S.Typekit.load({
                                async: !0,
                                active: function() {
                                    this.typekitLoaded = 2
                                }
                                .bind(this)
                            })
                        } catch (t) {}
                    }
                    2 === this.typekitLoaded && (this.fonts[t].loaded = !0)
                } else
                    "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node,
                    i = this.fonts[t].monoCase.w,
                    e.offsetWidth !== i ? (n -= 1,
                    this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node,
                    i = this.fonts[t].sansCase.w,
                    e.offsetWidth !== i && (n -= 1,
                    this.fonts[t].loaded = !0)),
                    this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent),
                    this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
            0 !== n && Date.now() - this.initTime < a ? setTimeout(l.bind(this), 20) : setTimeout(function() {
                this.loaded = !0
            }
            .bind(this), 0)
        }
        function p(t, e) {
            var i = A("text"), s;
            return i.style.fontSize = "100px",
            i.setAttribute("font-family", e.fFamily),
            i.setAttribute("font-style", e.fStyle),
            i.setAttribute("font-weight", e.fWeight),
            i.textContent = "1",
            e.fClass ? (i.style.fontFamily = "inherit",
            i.className = e.fClass) : i.style.fontFamily = e.fFamily,
            t.appendChild(i),
            x("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily,
            i
        }
        function t(t, e) {
            if (t) {
                if (this.chars)
                    return this.loaded = !0,
                    void (this.fonts = t.list);
                var i, s = t.list, n = s.length;
                for (i = 0; i < n; i += 1) {
                    if (s[i].loaded = !1,
                    s[i].monoCase = h(s[i].fFamily, "monospace"),
                    s[i].sansCase = h(s[i].fFamily, "sans-serif"),
                    s[i].fPath) {
                        if ("p" === s[i].fOrigin || 3 === s[i].origin) {
                            var r = x("style");
                            r.type = "text/css",
                            r.innerHTML = "@font-face {font-family: " + s[i].fFamily + "; font-style: normal; src: url('" + s[i].fPath + "');}",
                            e.appendChild(r)
                        } else if ("g" === s[i].fOrigin || 1 === s[i].origin) {
                            var a = x("link");
                            a.type = "text/css",
                            a.rel = "stylesheet",
                            a.href = s[i].fPath,
                            document.body.appendChild(a)
                        } else if ("t" === s[i].fOrigin || 2 === s[i].origin) {
                            var o = x("script");
                            o.setAttribute("src", s[i].fPath),
                            e.appendChild(o)
                        }
                    } else
                        s[i].loaded = !0;
                    s[i].helper = p(e, s[i]),
                    s[i].cache = {},
                    this.fonts.push(s[i])
                }
                setTimeout(function() {
                    l.bind(this)()
                }
                .bind(this), 100)
            } else
                this.loaded = !0
        }
        function e(t) {
            if (t) {
                this.chars || (this.chars = []);
                var e, i, s, n = t.length, r = this.chars.length;
                for (e = 0; e < n; e += 1) {
                    for (i = 0,
                    s = !1; i < r; )
                        this.chars[i].style === t[e].style && this.chars[i].fFamily === t[e].fFamily && this.chars[i].ch === t[e].ch && (s = !0),
                        i += 1;
                    s || (this.chars.push(t[e]),
                    r += 1)
                }
            }
        }
        function i(t, e, i) {
            for (var s = 0, n = this.chars.length; s < n; ) {
                if (this.chars[s].ch === t && this.chars[s].style === e && this.chars[s].fFamily === i)
                    return this.chars[s];
                s += 1
            }
            return console && console.warn && console.warn("Missing character from exported characters list: ", t, e, i),
            o
        }
        function s(t, e, i) {
            var s = this.getFontByName(e)
              , n = t.charCodeAt(0);
            if (!s.cache[n + 1]) {
                var r = s.helper;
                r.textContent = t,
                s.cache[n + 1] = r.getComputedTextLength() / 100
            }
            return s.cache[n + 1] * i
        }
        function n(t) {
            for (var e = 0, i = this.fonts.length; e < i; ) {
                if (this.fonts[e].fName === t)
                    return this.fonts[e];
                e += 1
            }
            return this.fonts[0]
        }
        function r() {
            return d
        }
        var a = 5e3
          , o = {
            w: 0,
            size: 0,
            shapes: []
        }
          , d = [];
        d = d.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
        var c = function() {
            this.fonts = [],
            this.chars = null,
            this.typekitLoaded = 0,
            this.loaded = !1,
            this.initTime = Date.now()
        };
        return c.getCombinedCharacterCodes = r,
        c.prototype.addChars = e,
        c.prototype.addFonts = t,
        c.prototype.getCharData = i,
        c.prototype.getFontByName = n,
        c.prototype.measureText = s,
        c
    }()
      , re = function() {
        function d(t, e) {
            var i, s = this.offsetTime, n, r, a, o, h, l;
            "multidimensional" === this.propType && (i = $t("float32", this.pv.length));
            for (var p, d, c = e.lastIndex, f = c, u = this.keyframes.length - 1, m = !0; m; ) {
                if (p = this.keyframes[f],
                d = this.keyframes[f + 1],
                f == u - 1 && t >= d.t - s) {
                    p.h && (p = d),
                    c = 0;
                    break
                }
                if (d.t - s > t) {
                    c = f;
                    break
                }
                f < u - 1 ? f += 1 : (c = 0,
                m = !1)
            }
            if (p.to) {
                p.bezierData || ie.buildBezierData(p);
                var g = p.bezierData;
                if (t >= d.t - s || t < p.t - s) {
                    var v = t >= d.t - s ? g.points.length - 1 : 0;
                    for (r = g.points[v].point.length,
                    n = 0; n < r; n += 1)
                        i[n] = g.points[v].point[n];
                    e._lastBezierData = null
                } else {
                    p.__fnct ? l = p.__fnct : (l = ee.getBezierEasing(p.o.x, p.o.y, p.i.x, p.i.y, p.n).get,
                    p.__fnct = l),
                    a = l((t - (p.t - s)) / (d.t - s - (p.t - s)));
                    var y, b = g.segmentLength * a, w = e.lastFrame < t && e._lastBezierData === g ? e._lastAddedLength : 0;
                    for (h = e.lastFrame < t && e._lastBezierData === g ? e._lastPoint : 0,
                    m = !0,
                    o = g.points.length; m; ) {
                        if (w += g.points[h].partialLength,
                        0 === b || 0 === a || h == g.points.length - 1) {
                            for (r = g.points[h].point.length,
                            n = 0; n < r; n += 1)
                                i[n] = g.points[h].point[n];
                            break
                        }
                        if (w <= b && b < w + g.points[h + 1].partialLength) {
                            for (y = (b - w) / g.points[h + 1].partialLength,
                            r = g.points[h].point.length,
                            n = 0; n < r; n += 1)
                                i[n] = g.points[h].point[n] + (g.points[h + 1].point[n] - g.points[h].point[n]) * y;
                            break
                        }
                        h < o - 1 ? h += 1 : m = !1
                    }
                    e._lastPoint = h,
                    e._lastAddedLength = w - g.points[h].partialLength,
                    e._lastBezierData = g
                }
            } else {
                var E, _, k, A, C;
                if (u = p.s.length,
                this.sh && 1 !== p.h)
                    if (t >= d.t - s)
                        i[0] = p.e[0],
                        i[1] = p.e[1],
                        i[2] = p.e[2];
                    else if (t <= p.t - s)
                        i[0] = p.s[0],
                        i[1] = p.s[1],
                        i[2] = p.s[2];
                    else {
                        var S, x, D;
                        M(i, P(T(p.s), T(p.e), (t - (p.t - s)) / (d.t - s - (p.t - s))))
                    }
                else
                    for (f = 0; f < u; f += 1)
                        1 !== p.h && (a = t >= d.t - s ? 1 : t < p.t - s ? 0 : (p.o.x.constructor === Array ? (p.__fnct || (p.__fnct = []),
                        p.__fnct[f] ? l = p.__fnct[f] : (E = p.o.x[f] || p.o.x[0],
                        _ = p.o.y[f] || p.o.y[0],
                        k = p.i.x[f] || p.i.x[0],
                        A = p.i.y[f] || p.i.y[0],
                        l = ee.getBezierEasing(E, _, k, A).get,
                        p.__fnct[f] = l)) : p.__fnct ? l = p.__fnct : (E = p.o.x,
                        _ = p.o.y,
                        k = p.i.x,
                        A = p.i.y,
                        l = ee.getBezierEasing(E, _, k, A).get,
                        p.__fnct = l),
                        l((t - (p.t - s)) / (d.t - s - (p.t - s))))),
                        C = 1 === p.h ? p.s[f] : p.s[f] + (p.e[f] - p.s[f]) * a,
                        1 === u ? i = C : i[f] = C
            }
            return e.lastIndex = c,
            i
        }
        function P(t, e, i) {
            var s, n, r, a, o, h = [], l = t[0], p = t[1], d = t[2], c = t[3], f = e[0], u = e[1], m = e[2], g = e[3];
            return (n = l * f + p * u + d * m + c * g) < 0 && (n = -n,
            f = -f,
            u = -u,
            m = -m,
            g = -g),
            o = 1e-6 < 1 - n ? (s = Math.acos(n),
            r = Math.sin(s),
            a = Math.sin((1 - i) * s) / r,
            Math.sin(i * s) / r) : (a = 1 - i,
            i),
            h[0] = a * l + o * f,
            h[1] = a * p + o * u,
            h[2] = a * d + o * m,
            h[3] = a * c + o * g,
            h
        }
        function M(t, e) {
            var i = e[0]
              , s = e[1]
              , n = e[2]
              , r = e[3]
              , a = Math.atan2(2 * s * r - 2 * i * n, 1 - 2 * s * s - 2 * n * n)
              , o = Math.asin(2 * i * s + 2 * n * r)
              , h = Math.atan2(2 * i * r - 2 * s * n, 1 - 2 * i * i - 2 * n * n);
            t[0] = a / Qt,
            t[1] = o / Qt,
            t[2] = h / Qt
        }
        function T(t) {
            var e = t[0] * Qt, i = t[1] * Qt, s = t[2] * Qt, n = Math.cos(e / 2), r = Math.cos(i / 2), a = Math.cos(s / 2), o = Math.sin(e / 2), h = Math.sin(i / 2), l = Math.sin(s / 2), p, d, c, f;
            return [o * h * a + n * r * l, o * r * a + n * h * l, n * h * a - o * r * l, n * r * a - o * h * l]
        }
        function c() {
            var t = this.comp.renderedFrame - this.offsetTime
              , e = this.keyframes[0].t - this.offsetTime
              , i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
            if (!(t === this._caching.lastFrame || this._caching.lastFrame !== g && (this._caching.lastFrame >= i && i <= t || this._caching.lastFrame < e && t < e))) {
                this._caching.lastIndex = this._caching.lastFrame < t ? this._caching.lastIndex : 0;
                var s = this.interpolateValue(t, this._caching);
                this.pv = s
            }
            return this._caching.lastFrame = t,
            this.pv
        }
        function f(t) {
            var e;
            if ("unidimensional" === this.propType)
                e = t * this.mult,
                1e-5 < n(this.v - e) && (this.v = e,
                this._mdf = !0);
            else
                for (var i = 0, s = this.v.length; i < s; )
                    e = t[i] * this.mult,
                    1e-5 < n(this.v[i] - e) && (this.v[i] = e,
                    this._mdf = !0),
                    i += 1
        }
        function u() {
            if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) {
                if (this.lock)
                    return void this.setVValue(this.pv);
                this.lock = !0,
                this._mdf = this._isFirstFrame;
                var t, e = this.effectsSequence.length, i = this.kf ? this.pv : this.data.k;
                for (t = 0; t < e; t += 1)
                    i = this.effectsSequence[t](i);
                this.setVValue(i),
                this._isFirstFrame = !1,
                this.lock = !1,
                this.frameId = this.elem.globalData.frameId
            }
        }
        function m(t) {
            this.effectsSequence.push(t),
            this.container.addDynamicProperty(this)
        }
        function a(t, e, i, s) {
            this.propType = "unidimensional",
            this.mult = i || 1,
            this.data = e,
            this.v = i ? e.k * i : e.k,
            this.pv = e.k,
            this._mdf = !1,
            this.elem = t,
            this.container = s,
            this.comp = t.comp,
            this.k = !1,
            this.kf = !1,
            this.vel = 0,
            this.effectsSequence = [],
            this._isFirstFrame = !0,
            this.getValue = u,
            this.setVValue = f,
            this.addEffect = m
        }
        function o(t, e, i, s) {
            this.propType = "multidimensional",
            this.mult = i || 1,
            this.data = e,
            this._mdf = !1,
            this.elem = t,
            this.container = s,
            this.comp = t.comp,
            this.k = !1,
            this.kf = !1,
            this.frameId = -1;
            var n, r = e.k.length;
            for (this.v = $t("float32", r),
            this.pv = $t("float32", r),
            $t("float32", r),
            this.vel = $t("float32", r),
            n = 0; n < r; n += 1)
                this.v[n] = e.k[n] * this.mult,
                this.pv[n] = e.k[n];
            this._isFirstFrame = !0,
            this.effectsSequence = [],
            this.getValue = u,
            this.setVValue = f,
            this.addEffect = m
        }
        function h(t, e, i, s) {
            this.propType = "unidimensional",
            this.keyframes = e.k,
            this.offsetTime = t.data.st,
            this.frameId = -1,
            this._caching = {
                lastFrame: g,
                lastIndex: 0,
                value: 0
            },
            this.k = !0,
            this.kf = !0,
            this.data = e,
            this.mult = i || 1,
            this.elem = t,
            this.container = s,
            this.comp = t.comp,
            this.v = g,
            this.pv = g,
            this._isFirstFrame = !0,
            this.getValue = u,
            this.setVValue = f,
            this.interpolateValue = d,
            this.effectsSequence = [c.bind(this)],
            this.addEffect = m
        }
        function l(t, e, i, s) {
            this.propType = "multidimensional";
            var n, r, a, o, h, l = e.k.length;
            for (n = 0; n < l - 1; n += 1)
                e.k[n].to && e.k[n].s && e.k[n].e && (r = e.k[n].s,
                a = e.k[n].e,
                o = e.k[n].to,
                h = e.k[n].ti,
                (2 === r.length && (r[0] !== a[0] || r[1] !== a[1]) && ie.pointOnLine2D(r[0], r[1], a[0], a[1], r[0] + o[0], r[1] + o[1]) && ie.pointOnLine2D(r[0], r[1], a[0], a[1], a[0] + h[0], a[1] + h[1]) || 3 === r.length && (r[0] !== a[0] || r[1] !== a[1] || r[2] !== a[2]) && ie.pointOnLine3D(r[0], r[1], r[2], a[0], a[1], a[2], r[0] + o[0], r[1] + o[1], r[2] + o[2]) && ie.pointOnLine3D(r[0], r[1], r[2], a[0], a[1], a[2], a[0] + h[0], a[1] + h[1], a[2] + h[2])) && (e.k[n].to = null,
                e.k[n].ti = null),
                r[0] === a[0] && r[1] === a[1] && 0 === o[0] && 0 === o[1] && 0 === h[0] && 0 === h[1] && (2 === r.length || r[2] === a[2] && 0 === o[2] && 0 === h[2]) && (e.k[n].to = null,
                e.k[n].ti = null));
            this.effectsSequence = [c.bind(this)],
            this.keyframes = e.k,
            this.offsetTime = t.data.st,
            this.k = !0,
            this.kf = !0,
            this._isFirstFrame = !0,
            this.mult = i || 1,
            this.elem = t,
            this.container = s,
            this.comp = t.comp,
            this.getValue = u,
            this.setVValue = f,
            this.interpolateValue = d,
            this.frameId = -1;
            var p = e.k[0].s.length;
            for (this.v = $t("float32", p),
            this.pv = $t("float32", p),
            n = 0; n < p; n += 1)
                this.v[n] = g,
                this.pv[n] = g;
            this._caching = {
                lastFrame: g,
                lastIndex: 0,
                value: $t("float32", p)
            },
            this.addEffect = m
        }
        function t(t, e, i, s, n) {
            var r;
            if (0 === e.a)
                r = 0 === i ? new a(t,e,s,n) : new o(t,e,s,n);
            else if (1 === e.a)
                r = 0 === i ? new h(t,e,s,n) : new l(t,e,s,n);
            else if (e.k.length)
                if ("number" == typeof e.k[0])
                    r = new o(t,e,s,n);
                else
                    switch (i) {
                    case 0:
                        r = new h(t,e,s,n);
                        break;
                    case 1:
                        r = new l(t,e,s,n)
                    }
            else
                r = new a(t,e,s,n);
            return r.effectsSequence.length && n.addDynamicProperty(r),
            r
        }
        var g = Vt, n = Math.abs, e;
        return {
            getProp: t
        }
    }()
      , ae = function() {
        function t(t) {
            var e = this._mdf;
            this.iterateDynamicProperties(),
            this._mdf = this._mdf || e,
            this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
            this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
            this.sk && t.skewFromAxis(-this.sk.v, this.sa.v),
            this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
            this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
        }
        function e(t) {
            if (this.elem.globalData.frameId !== this.frameId) {
                if (this._isDirty && (this.precalculateMatrix(),
                this._isDirty = !1),
                this.iterateDynamicProperties(),
                this._mdf || t) {
                    var e, i;
                    if (this.v.cloneFromProps(this.pre.props),
                    this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                    this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                    this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v),
                    this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                    this.autoOriented && this.p.keyframes && this.p.getValueAtTime)
                        i = this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / this.elem.globalData.frameRate, 0),
                        this.p.getValueAtTime(this.p.keyframes[0].t / this.elem.globalData.frameRate, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / this.elem.globalData.frameRate, 0),
                        this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .01) / this.elem.globalData.frameRate, 0)) : (e = this.p.pv,
                        this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / this.elem.globalData.frameRate, this.p.offsetTime)),
                        this.v.rotate(-Math.atan2(e[1] - i[1], e[0] - i[0]));
                    this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                }
                this.frameId = this.elem.globalData.frameId
            }
        }
        function i() {
            if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
            this.appliedTransformations = 1,
            !this.s.effectsSequence.length)) {
                if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                this.appliedTransformations = 2,
                this.sk) {
                    if (this.sk.effectsSequence.length || this.sa.effectsSequence.length)
                        return;
                    this.pre.skewFromAxis(-this.sk.v, this.sa.v),
                    this.appliedTransformations = 3
                }
                if (this.r) {
                    if (this.r.effectsSequence.length)
                        return;
                    this.pre.rotate(-this.r.v),
                    this.appliedTransformations = 4
                } else
                    this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                    this.appliedTransformations = 4)
            }
        }
        function s() {}
        function n(t) {
            this._addDynamicProperty(t),
            this.elem.addDynamicProperty(t),
            this._isDirty = !0
        }
        function r(t, e, i) {
            if (this.elem = t,
            this.frameId = -1,
            this.propType = "transform",
            this.data = e,
            this.v = new te,
            this.pre = new te,
            this.appliedTransformations = 0,
            this.initDynamicPropertyContainer(i || t),
            e.p.s ? (this.px = re.getProp(t, e.p.x, 0, 0, this),
            this.py = re.getProp(t, e.p.y, 0, 0, this),
            e.p.z && (this.pz = re.getProp(t, e.p.z, 0, 0, this))) : this.p = re.getProp(t, e.p, 1, 0, this),
            e.r)
                this.r = re.getProp(t, e.r, 0, Qt, this);
            else if (e.rx) {
                if (this.rx = re.getProp(t, e.rx, 0, Qt, this),
                this.ry = re.getProp(t, e.ry, 0, Qt, this),
                this.rz = re.getProp(t, e.rz, 0, Qt, this),
                e.or.k[0].ti) {
                    var s, n = e.or.k.length;
                    for (s = 0; s < n; s += 1)
                        e.or.k[s].to = e.or.k[s].ti = null
                }
                this.or = re.getProp(t, e.or, 1, Qt, this),
                this.or.sh = !0
            }
            e.sk && (this.sk = re.getProp(t, e.sk, 0, Qt, this),
            this.sa = re.getProp(t, e.sa, 0, Qt, this)),
            e.a && (this.a = re.getProp(t, e.a, 1, 0, this)),
            e.s && (this.s = re.getProp(t, e.s, 1, .01, this)),
            e.o ? this.o = re.getProp(t, e.o, 0, .01, t) : this.o = {
                _mdf: !1,
                v: 1
            },
            this._isDirty = !0,
            this.dynamicProperties.length || this.getValue(!0)
        }
        function a(t, e, i) {
            return new r(t,e,i)
        }
        return r.prototype = {
            applyToMatrix: t,
            getValue: e,
            precalculateMatrix: i,
            autoOrient: s
        },
        v([g], r),
        r.prototype.addDynamicProperty = n,
        r.prototype._addDynamicProperty = g.prototype.addDynamicProperty,
        {
            getTransformProperty: a
        }
    }();
    f.prototype.setPathData = function(t, e) {
        this.c = t,
        this.setLength(e);
        for (var i = 0; i < e; )
            this.v[i] = ve.newElement(),
            this.o[i] = ve.newElement(),
            this.i[i] = ve.newElement(),
            i += 1
    }
    ,
    f.prototype.setLength = function(t) {
        for (; this._maxLength < t; )
            this.doubleArrayLength();
        this._length = t
    }
    ,
    f.prototype.doubleArrayLength = function() {
        this.v = this.v.concat(k(this._maxLength)),
        this.i = this.i.concat(k(this._maxLength)),
        this.o = this.o.concat(k(this._maxLength)),
        this._maxLength *= 2
    }
    ,
    f.prototype.setXYAt = function(t, e, i, s, n) {
        var r;
        switch (this._length = Math.max(this._length, s + 1),
        this._length >= this._maxLength && this.doubleArrayLength(),
        i) {
        case "v":
            r = this.v;
            break;
        case "i":
            r = this.i;
            break;
        case "o":
            r = this.o
        }
        (!r[s] || r[s] && !n) && (r[s] = ve.newElement()),
        r[s][0] = t,
        r[s][1] = e
    }
    ,
    f.prototype.setTripleAt = function(t, e, i, s, n, r, a, o) {
        this.setXYAt(t, e, "v", a, o),
        this.setXYAt(i, s, "o", a, o),
        this.setXYAt(n, r, "i", a, o)
    }
    ,
    f.prototype.reverse = function() {
        var t = new f;
        t.setPathData(this.c, this._length);
        var e = this.v
          , i = this.o
          , s = this.i
          , n = 0;
        this.c && (t.setTripleAt(e[0][0], e[0][1], s[0][0], s[0][1], i[0][0], i[0][1], 0, !1),
        n = 1);
        var r, a = this._length - 1, o = this._length;
        for (r = n; r < o; r += 1)
            t.setTripleAt(e[a][0], e[a][1], s[a][0], s[a][1], i[a][0], i[a][1], r, !1),
            a -= 1;
        return t
    }
    ;
    var oe = function() {
        function t(t, e, i) {
            var s, n, r, a, o, h, l, p, d, c = i.lastIndex, f = this.keyframes;
            if (t < f[0].t - this.offsetTime)
                s = f[0].s[0],
                r = !0,
                c = 0;
            else if (t >= f[f.length - 1].t - this.offsetTime)
                s = 1 === f[f.length - 2].h ? f[f.length - 1].s[0] : f[f.length - 2].e[0],
                r = !0;
            else {
                for (var u, m, g = c, v = f.length - 1, y = !0; y && (u = f[g],
                !((m = f[g + 1]).t - this.offsetTime > t)); )
                    g < v - 1 ? g += 1 : y = !1;
                if (c = g,
                !(r = 1 === u.h)) {
                    if (t >= m.t - this.offsetTime)
                        p = 1;
                    else if (t < u.t - this.offsetTime)
                        p = 0;
                    else {
                        var b;
                        u.__fnct ? b = u.__fnct : (b = ee.getBezierEasing(u.o.x, u.o.y, u.i.x, u.i.y).get,
                        u.__fnct = b),
                        p = b((t - (u.t - this.offsetTime)) / (m.t - this.offsetTime - (u.t - this.offsetTime)))
                    }
                    n = u.e[0]
                }
                s = u.s[0]
            }
            for (h = e._length,
            l = s.i[0].length,
            i.lastIndex = c,
            a = 0; a < h; a += 1)
                for (o = 0; o < l; o += 1)
                    d = r ? s.i[a][o] : s.i[a][o] + (n.i[a][o] - s.i[a][o]) * p,
                    e.i[a][o] = d,
                    d = r ? s.o[a][o] : s.o[a][o] + (n.o[a][o] - s.o[a][o]) * p,
                    e.o[a][o] = d,
                    d = r ? s.v[a][o] : s.v[a][o] + (n.v[a][o] - s.v[a][o]) * p,
                    e.v[a][o] = d
        }
        function n() {
            var t = this.comp.renderedFrame - this.offsetTime
              , e = this.keyframes[0].t - this.offsetTime
              , i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime
              , s = this._caching.lastFrame;
            return s !== d && (s < e && t < e || i < s && i < t) || (this._caching.lastIndex = s < t ? this._caching.lastIndex : 0,
            this.interpolateShape(t, this.pv, this._caching)),
            this._caching.lastFrame = t,
            this.pv
        }
        function r() {
            this.paths = this.localShapeCollection
        }
        function s(t, e) {
            if (t._length !== e._length || t.c !== e.c)
                return !1;
            var i, s = t._length;
            for (i = 0; i < s; i += 1)
                if (t.v[i][0] !== e.v[i][0] || t.v[i][1] !== e.v[i][1] || t.o[i][0] !== e.o[i][0] || t.o[i][1] !== e.o[i][1] || t.i[i][0] !== e.i[i][0] || t.i[i][1] !== e.i[i][1])
                    return !1;
            return !0
        }
        function e() {
            if (!this.lock && this.elem.globalData.frameId !== this.frameId) {
                this.lock = !0,
                this.frameId = this.elem.globalData.frameId,
                this._mdf = !1;
                var t, e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k, i = this.effectsSequence.length;
                for (t = 0; t < i; t += 1)
                    e = this.effectsSequence[t](e);
                s(this.v, e) || (this.v = ye.clone(e),
                this.localShapeCollection.releaseShapes(),
                this.localShapeCollection.addShape(this.v),
                this._mdf = !0,
                this.paths = this.localShapeCollection),
                this.lock = !1
            }
        }
        function a(t, e, i) {
            this.propType = "shape",
            this.comp = t.comp,
            this.container = t,
            this.elem = t,
            this.data = e,
            this.k = !1,
            this.kf = !1,
            this._mdf = !1;
            var s = 3 === i ? e.pt.k : e.ks.k;
            this.v = ye.clone(s),
            this.pv = ye.clone(this.v),
            this.localShapeCollection = be.newShapeCollection(),
            this.paths = this.localShapeCollection,
            this.paths.addShape(this.v),
            this.reset = r,
            this.effectsSequence = []
        }
        function i(t) {
            this.effectsSequence.push(t),
            this.container.addDynamicProperty(this)
        }
        function o(t, e, i) {
            this.propType = "shape",
            this.comp = t.comp,
            this.elem = t,
            this.container = t,
            this.offsetTime = t.data.st,
            this.keyframes = 3 === i ? e.pt.k : e.ks.k,
            this.k = !0,
            this.kf = !0;
            var s = this.keyframes[0].s[0].i.length;
            this.keyframes[0].s[0].i[0].length,
            this.v = ye.newElement(),
            this.v.setPathData(this.keyframes[0].s[0].c, s),
            this.pv = ye.clone(this.v),
            this.localShapeCollection = be.newShapeCollection(),
            this.paths = this.localShapeCollection,
            this.paths.addShape(this.v),
            this.lastFrame = d,
            this.reset = r,
            this._caching = {
                lastFrame: d,
                lastIndex: 0
            },
            this.effectsSequence = [n.bind(this)]
        }
        function h(t, e, i) {
            var s;
            if (3 === i || 4 === i) {
                var n = 3 === i ? e.pt : e.ks
                  , r = n.k;
                s = 1 === n.a || r.length ? new o(t,e,i) : new a(t,e,i)
            } else
                5 === i ? s = new u(t,e) : 6 === i ? s = new c(t,e) : 7 === i && (s = new f(t,e));
            return s.k && t.addDynamicProperty(s),
            s
        }
        function l() {
            return a
        }
        function p() {
            return o
        }
        var d = -999999;
        a.prototype.interpolateShape = t,
        a.prototype.getValue = e,
        a.prototype.getValue = e,
        a.prototype.addEffect = i,
        o.prototype.getValue = e,
        o.prototype.interpolateShape = t,
        o.prototype.addEffect = i;
        var c = function() {
            function t(t, e) {
                this.v = ye.newElement(),
                this.v.setPathData(!0, 4),
                this.localShapeCollection = be.newShapeCollection(),
                this.paths = this.localShapeCollection,
                this.localShapeCollection.addShape(this.v),
                this.d = e.d,
                this.elem = t,
                this.comp = t.comp,
                this.frameId = -1,
                this.initDynamicPropertyContainer(t),
                this.p = re.getProp(t, e.p, 1, 0, this),
                this.s = re.getProp(t, e.s, 1, 0, this),
                this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                this.convertEllToPath())
            }
            var a = Kt;
            return t.prototype = {
                reset: r,
                getValue: function() {
                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertEllToPath())
                },
                convertEllToPath: function() {
                    var t = this.p.v[0]
                      , e = this.p.v[1]
                      , i = this.s.v[0] / 2
                      , s = this.s.v[1] / 2
                      , n = 3 !== this.d
                      , r = this.v;
                    r.v[0][0] = t,
                    r.v[0][1] = e - s,
                    r.v[1][0] = n ? t + i : t - i,
                    r.v[1][1] = e,
                    r.v[2][0] = t,
                    r.v[2][1] = e + s,
                    r.v[3][0] = n ? t - i : t + i,
                    r.v[3][1] = e,
                    r.i[0][0] = n ? t - i * a : t + i * a,
                    r.i[0][1] = e - s,
                    r.i[1][0] = n ? t + i : t - i,
                    r.i[1][1] = e - s * a,
                    r.i[2][0] = n ? t + i * a : t - i * a,
                    r.i[2][1] = e + s,
                    r.i[3][0] = n ? t - i : t + i,
                    r.i[3][1] = e + s * a,
                    r.o[0][0] = n ? t + i * a : t - i * a,
                    r.o[0][1] = e - s,
                    r.o[1][0] = n ? t + i : t - i,
                    r.o[1][1] = e + s * a,
                    r.o[2][0] = n ? t - i * a : t + i * a,
                    r.o[2][1] = e + s,
                    r.o[3][0] = n ? t - i : t + i,
                    r.o[3][1] = e - s * a
                }
            },
            v([g], t),
            t
        }()
          , f = function() {
            function t(t, e) {
                this.v = ye.newElement(),
                this.v.setPathData(!0, 0),
                this.elem = t,
                this.comp = t.comp,
                this.data = e,
                this.frameId = -1,
                this.d = e.d,
                this.initDynamicPropertyContainer(t),
                1 === e.sy ? (this.ir = re.getProp(t, e.ir, 0, 0, this),
                this.is = re.getProp(t, e.is, 0, .01, this),
                this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath,
                this.pt = re.getProp(t, e.pt, 0, 0, this),
                this.p = re.getProp(t, e.p, 1, 0, this),
                this.r = re.getProp(t, e.r, 0, Qt, this),
                this.or = re.getProp(t, e.or, 0, 0, this),
                this.os = re.getProp(t, e.os, 0, .01, this),
                this.localShapeCollection = be.newShapeCollection(),
                this.localShapeCollection.addShape(this.v),
                this.paths = this.localShapeCollection,
                this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                this.convertToPath())
            }
            return t.prototype = {
                reset: r,
                getValue: function() {
                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertToPath())
                },
                convertStarToPath: function() {
                    var t, e, i, s, n = 2 * Math.floor(this.pt.v), r = 2 * Math.PI / n, a = !0, o = this.or.v, h = this.ir.v, l = this.os.v, p = this.is.v, d = 2 * Math.PI * o / (2 * n), c = 2 * Math.PI * h / (2 * n), f = -Math.PI / 2;
                    f += this.r.v;
                    var u = 3 === this.data.d ? -1 : 1;
                    for (t = this.v._length = 0; t < n; t += 1) {
                        i = a ? l : p,
                        s = a ? d : c;
                        var m = (e = a ? o : h) * Math.cos(f)
                          , g = e * Math.sin(f)
                          , v = 0 === m && 0 === g ? 0 : g / Math.sqrt(m * m + g * g)
                          , y = 0 === m && 0 === g ? 0 : -m / Math.sqrt(m * m + g * g);
                        m += +this.p.v[0],
                        g += +this.p.v[1],
                        this.v.setTripleAt(m, g, m - v * s * i * u, g - y * s * i * u, m + v * s * i * u, g + y * s * i * u, t, !0),
                        a = !a,
                        f += r * u
                    }
                },
                convertPolygonToPath: function() {
                    var t, e = Math.floor(this.pt.v), i = 2 * Math.PI / e, s = this.or.v, n = this.os.v, r = 2 * Math.PI * s / (4 * e), a = -Math.PI / 2, o = 3 === this.data.d ? -1 : 1;
                    for (a += this.r.v,
                    t = this.v._length = 0; t < e; t += 1) {
                        var h = s * Math.cos(a)
                          , l = s * Math.sin(a)
                          , p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l)
                          , d = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                        h += +this.p.v[0],
                        l += +this.p.v[1],
                        this.v.setTripleAt(h, l, h - p * r * n * o, l - d * r * n * o, h + p * r * n * o, l + d * r * n * o, t, !0),
                        a += i * o
                    }
                    this.paths.length = 0,
                    this.paths[0] = this.v
                }
            },
            v([g], t),
            t
        }()
          , u = function() {
            function t(t, e) {
                this.v = ye.newElement(),
                this.v.c = !0,
                this.localShapeCollection = be.newShapeCollection(),
                this.localShapeCollection.addShape(this.v),
                this.paths = this.localShapeCollection,
                this.elem = t,
                this.comp = t.comp,
                this.frameId = -1,
                this.d = e.d,
                this.initDynamicPropertyContainer(t),
                this.p = re.getProp(t, e.p, 1, 0, this),
                this.s = re.getProp(t, e.s, 1, 0, this),
                this.r = re.getProp(t, e.r, 0, 0, this),
                this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                this.convertRectToPath())
            }
            return t.prototype = {
                convertRectToPath: function() {
                    var t = this.p.v[0]
                      , e = this.p.v[1]
                      , i = this.s.v[0] / 2
                      , s = this.s.v[1] / 2
                      , n = Xt(i, s, this.r.v)
                      , r = n * (1 - Kt);
                    this.v._length = 0,
                    2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + i, e - s + n, t + i, e - s + n, t + i, e - s + r, 0, !0),
                    this.v.setTripleAt(t + i, e + s - n, t + i, e + s - r, t + i, e + s - n, 1, !0),
                    0 !== n ? (this.v.setTripleAt(t + i - n, e + s, t + i - n, e + s, t + i - r, e + s, 2, !0),
                    this.v.setTripleAt(t - i + n, e + s, t - i + r, e + s, t - i + n, e + s, 3, !0),
                    this.v.setTripleAt(t - i, e + s - n, t - i, e + s - n, t - i, e + s - r, 4, !0),
                    this.v.setTripleAt(t - i, e - s + n, t - i, e - s + r, t - i, e - s + n, 5, !0),
                    this.v.setTripleAt(t - i + n, e - s, t - i + n, e - s, t - i + r, e - s, 6, !0),
                    this.v.setTripleAt(t + i - n, e - s, t + i - r, e - s, t + i - n, e - s, 7, !0)) : (this.v.setTripleAt(t - i, e + s, t - i + r, e + s, t - i, e + s, 2),
                    this.v.setTripleAt(t - i, e - s, t - i, e - s + r, t - i, e - s, 3))) : (this.v.setTripleAt(t + i, e - s + n, t + i, e - s + r, t + i, e - s + n, 0, !0),
                    0 !== n ? (this.v.setTripleAt(t + i - n, e - s, t + i - n, e - s, t + i - r, e - s, 1, !0),
                    this.v.setTripleAt(t - i + n, e - s, t - i + r, e - s, t - i + n, e - s, 2, !0),
                    this.v.setTripleAt(t - i, e - s + n, t - i, e - s + n, t - i, e - s + r, 3, !0),
                    this.v.setTripleAt(t - i, e + s - n, t - i, e + s - r, t - i, e + s - n, 4, !0),
                    this.v.setTripleAt(t - i + n, e + s, t - i + n, e + s, t - i + r, e + s, 5, !0),
                    this.v.setTripleAt(t + i - n, e + s, t + i - r, e + s, t + i - n, e + s, 6, !0),
                    this.v.setTripleAt(t + i, e + s - n, t + i, e + s - n, t + i, e + s - r, 7, !0)) : (this.v.setTripleAt(t - i, e - s, t - i + r, e - s, t - i, e - s, 1, !0),
                    this.v.setTripleAt(t - i, e + s, t - i, e + s - r, t - i, e + s, 2, !0),
                    this.v.setTripleAt(t + i, e + s, t + i - r, e + s, t + i, e + s, 3, !0)))
                },
                getValue: function(t) {
                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertRectToPath())
                },
                reset: r
            },
            v([g], t),
            t
        }()
          , m = {};
        return m.getShapeProp = h,
        m.getConstructorFunction = l,
        m.getKeyframedConstructorFunction = p,
        m
    }()
      , he = function() {
        function t(t, e) {
            s[t] || (s[t] = e)
        }
        function e(t, e, i) {
            return new s[t](e,i)
        }
        var i = {}
          , s = {};
        return i.registerModifier = t,
        i.getModifier = e,
        i
    }();
    u.prototype.initModifierProperties = function() {}
    ,
    u.prototype.addShapeToModifier = function() {}
    ,
    u.prototype.addShape = function(t) {
        if (!this.closed) {
            var e = {
                shape: t.sh,
                data: t,
                localShapeCollection: be.newShapeCollection()
            };
            this.shapes.push(e),
            this.addShapeToModifier(e),
            this._isAnimated && t.setAsAnimated()
        }
    }
    ,
    u.prototype.init = function(t, e) {
        this.shapes = [],
        this.elem = t,
        this.initDynamicPropertyContainer(t),
        this.initModifierProperties(t, e),
        this.frameId = Vt,
        this.closed = !1,
        this.k = !1,
        this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
    }
    ,
    u.prototype.processKeys = function() {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
        this.iterateDynamicProperties())
    }
    ,
    v([g], u),
    v([u], m),
    m.prototype.initModifierProperties = function(t, e) {
        this.s = re.getProp(t, e.s, 0, .01, this),
        this.e = re.getProp(t, e.e, 0, .01, this),
        this.o = re.getProp(t, e.o, 0, 0, this),
        this.sValue = 0,
        this.eValue = 0,
        this.getValue = this.processKeys,
        this.m = e.m,
        this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
    }
    ,
    m.prototype.addShapeToModifier = function(t) {
        t.pathsData = []
    }
    ,
    m.prototype.calculateShapeEdges = function(t, e, i, s, n) {
        var r = [];
        e <= 1 ? r.push({
            s: t,
            e: e
        }) : 1 <= t ? r.push({
            s: t - 1,
            e: e - 1
        }) : (r.push({
            s: t,
            e: 1
        }),
        r.push({
            s: 0,
            e: e - 1
        }));
        var a, o, h = [], l = r.length;
        for (a = 0; a < l; a += 1)
            if ((o = r[a]).e * n < s || o.s * n > s + i)
                ;
            else {
                var p, d;
                p = o.s * n <= s ? 0 : (o.s * n - s) / i,
                d = o.e * n >= s + i ? 1 : (o.e * n - s) / i,
                h.push([p, d])
            }
        return h.length || h.push([0, 0]),
        h
    }
    ,
    m.prototype.releasePathsData = function(t) {
        var e, i = t.length;
        for (e = 0; e < i; e += 1)
            we.release(t[e]);
        return t.length = 0,
        t
    }
    ,
    m.prototype.processShapes = function(t) {
        var e, i;
        if (this._mdf || t) {
            var s = this.o.v % 360 / 360;
            if (s < 0 && (s += 1),
            e = this.s.v + s,
            (i = this.e.v + s) < e) {
                var n = e;
                e = i,
                i = n
            }
            e = Math.round(1e3 * e) / 1e3,
            i = Math.round(1e3 * i) / 1e3,
            this.sValue = e,
            this.eValue = i
        } else
            e = this.sValue,
            i = this.eValue;
        var r, a, o, h, l, p, d, c = this.shapes.length, f = 0;
        if (i === e)
            for (a = 0; a < c; a += 1)
                this.shapes[a].localShapeCollection.releaseShapes(),
                this.shapes[a].shape._mdf = !0,
                this.shapes[a].shape.paths = this.shapes[a].localShapeCollection;
        else if (1 === i && 0 === e || 0 === i && 1 === e) {
            if (this._mdf)
                for (a = 0; a < c; a += 1)
                    this.shapes[a].shape._mdf = !0
        } else {
            var u, m, g = [];
            for (a = 0; a < c; a += 1)
                if ((u = this.shapes[a]).shape._mdf || this._mdf || t || 2 === this.m) {
                    if (h = (r = u.shape.paths)._length,
                    d = 0,
                    !u.shape._mdf && u.pathsData.length)
                        d = u.totalShapeLength;
                    else {
                        for (l = this.releasePathsData(u.pathsData),
                        o = 0; o < h; o += 1)
                            p = ie.getSegmentsLength(r.shapes[o]),
                            l.push(p),
                            d += p.totalLength;
                        u.totalShapeLength = d,
                        u.pathsData = l
                    }
                    f += d,
                    u.shape._mdf = !0
                } else
                    u.shape.paths = u.localShapeCollection;
            var v, y = e, b = i, w = 0;
            for (a = c - 1; 0 <= a; a -= 1)
                if ((u = this.shapes[a]).shape._mdf) {
                    for ((m = u.localShapeCollection).releaseShapes(),
                    2 === this.m && 1 < c ? (v = this.calculateShapeEdges(e, i, u.totalShapeLength, w, f),
                    w += u.totalShapeLength) : v = [[y, b]],
                    h = v.length,
                    o = 0; o < h; o += 1) {
                        y = v[o][0],
                        b = v[o][1],
                        g.length = 0,
                        b <= 1 ? g.push({
                            s: u.totalShapeLength * y,
                            e: u.totalShapeLength * b
                        }) : 1 <= y ? g.push({
                            s: u.totalShapeLength * (y - 1),
                            e: u.totalShapeLength * (b - 1)
                        }) : (g.push({
                            s: u.totalShapeLength * y,
                            e: u.totalShapeLength
                        }),
                        g.push({
                            s: 0,
                            e: u.totalShapeLength * (b - 1)
                        }));
                        var E = this.addShapes(u, g[0]);
                        if (g[0].s !== g[0].e) {
                            if (1 < g.length)
                                if (u.shape.v.c) {
                                    var _ = E.pop();
                                    this.addPaths(E, m),
                                    E = this.addShapes(u, g[1], _)
                                } else
                                    this.addPaths(E, m),
                                    E = this.addShapes(u, g[1]);
                            this.addPaths(E, m)
                        }
                    }
                    u.shape.paths = m
                }
        }
    }
    ,
    m.prototype.addPaths = function(t, e) {
        var i, s = t.length;
        for (i = 0; i < s; i += 1)
            e.addShape(t[i])
    }
    ,
    m.prototype.addSegment = function(t, e, i, s, n, r, a) {
        n.setXYAt(e[0], e[1], "o", r),
        n.setXYAt(i[0], i[1], "i", r + 1),
        a && n.setXYAt(t[0], t[1], "v", r),
        n.setXYAt(s[0], s[1], "v", r + 1)
    }
    ,
    m.prototype.addSegmentFromArray = function(t, e, i, s) {
        e.setXYAt(t[1], t[5], "o", i),
        e.setXYAt(t[2], t[6], "i", i + 1),
        s && e.setXYAt(t[0], t[4], "v", i),
        e.setXYAt(t[3], t[7], "v", i + 1)
    }
    ,
    m.prototype.addShapes = function(t, e, i) {
        var s, n, r, a, o, h, l, p, d = t.pathsData, c = t.shape.paths.shapes, f = t.shape.paths._length, u = 0, m = [], g = !0;
        for (p = i ? (o = i._length,
        i._length) : (i = ye.newElement(),
        o = 0),
        m.push(i),
        s = 0; s < f; s += 1) {
            for (h = d[s].lengths,
            i.c = c[s].c,
            r = c[s].c ? h.length : h.length + 1,
            n = 1; n < r; n += 1)
                if (u + (a = h[n - 1]).addedLength < e.s)
                    u += a.addedLength,
                    i.c = !1;
                else {
                    if (u > e.e) {
                        i.c = !1;
                        break
                    }
                    e.s <= u && e.e >= u + a.addedLength ? (this.addSegment(c[s].v[n - 1], c[s].o[n - 1], c[s].i[n], c[s].v[n], i, o, g),
                    g = !1) : (l = ie.getNewSegment(c[s].v[n - 1], c[s].v[n], c[s].o[n - 1], c[s].i[n], (e.s - u) / a.addedLength, (e.e - u) / a.addedLength, h[n - 1]),
                    this.addSegmentFromArray(l, i, o, g),
                    g = !1,
                    i.c = !1),
                    u += a.addedLength,
                    o += 1
                }
            if (c[s].c) {
                if (a = h[n - 1],
                u <= e.e) {
                    var v = h[n - 1].addedLength;
                    e.s <= u && e.e >= u + v ? (this.addSegment(c[s].v[n - 1], c[s].o[n - 1], c[s].i[0], c[s].v[0], i, o, g),
                    g = !1) : (l = ie.getNewSegment(c[s].v[n - 1], c[s].v[0], c[s].o[n - 1], c[s].i[0], (e.s - u) / v, (e.e - u) / v, h[n - 1]),
                    this.addSegmentFromArray(l, i, o, g),
                    g = !1,
                    i.c = !1)
                } else
                    i.c = !1;
                u += a.addedLength,
                o += 1
            }
            if (i._length && (i.setXYAt(i.v[p][0], i.v[p][1], "i", p),
            i.setXYAt(i.v[i._length - 1][0], i.v[i._length - 1][1], "o", i._length - 1)),
            u > e.e)
                break;
            s < f - 1 && (i = ye.newElement(),
            g = !0,
            m.push(i),
            o = 0)
        }
        return m
    }
    ,
    he.registerModifier("tm", m),
    v([u], y),
    y.prototype.initModifierProperties = function(t, e) {
        this.getValue = this.processKeys,
        this.rd = re.getProp(t, e.r, 0, null, this),
        this._isAnimated = !!this.rd.effectsSequence.length
    }
    ,
    y.prototype.processPath = function(t, e) {
        var i = ye.newElement();
        i.c = t.c;
        var s, n, r, a, o, h, l, p, d, c, f, u, m, g = t._length, v = 0;
        for (s = 0; s < g; s += 1)
            n = t.v[s],
            a = t.o[s],
            r = t.i[s],
            n[0] === a[0] && n[1] === a[1] && n[0] === r[0] && n[1] === r[1] ? 0 !== s && s !== g - 1 || t.c ? (o = 0 === s ? t.v[g - 1] : t.v[s - 1],
            l = (h = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0,
            p = u = n[0] + (o[0] - n[0]) * l,
            d = m = n[1] - (n[1] - o[1]) * l,
            c = p - (p - n[0]) * Kt,
            f = d - (d - n[1]) * Kt,
            i.setTripleAt(p, d, c, f, u, m, v),
            v += 1,
            o = s === g - 1 ? t.v[0] : t.v[s + 1],
            l = (h = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0,
            p = c = n[0] + (o[0] - n[0]) * l,
            d = f = n[1] + (o[1] - n[1]) * l,
            u = p - (p - n[0]) * Kt,
            m = d - (d - n[1]) * Kt,
            i.setTripleAt(p, d, c, f, u, m, v)) : i.setTripleAt(n[0], n[1], a[0], a[1], r[0], r[1], v) : i.setTripleAt(t.v[s][0], t.v[s][1], t.o[s][0], t.o[s][1], t.i[s][0], t.i[s][1], v),
            v += 1;
        return i
    }
    ,
    y.prototype.processShapes = function(t) {
        var e, i, s, n, r = this.shapes.length, a = this.rd.v, o, h, l;
        if (0 !== a)
            for (i = 0; i < r; i += 1) {
                if (h = (o = this.shapes[i]).shape.paths,
                l = o.localShapeCollection,
                o.shape._mdf || this._mdf || t)
                    for (l.releaseShapes(),
                    o.shape._mdf = !0,
                    e = o.shape.paths.shapes,
                    n = o.shape.paths._length,
                    s = 0; s < n; s += 1)
                        l.addShape(this.processPath(e[s], a));
                o.shape.paths = o.localShapeCollection
            }
        this.dynamicProperties.length || (this._mdf = !1)
    }
    ,
    he.registerModifier("rd", y),
    v([u], b),
    b.prototype.initModifierProperties = function(t, e) {
        this.getValue = this.processKeys,
        this.c = re.getProp(t, e.c, 0, null, this),
        this.o = re.getProp(t, e.o, 0, null, this),
        this.tr = ae.getTransformProperty(t, e.tr, this),
        this.data = e,
        this.dynamicProperties.length || this.getValue(!0),
        this._isAnimated = !!this.dynamicProperties.length,
        this.pMatrix = new te,
        this.rMatrix = new te,
        this.sMatrix = new te,
        this.tMatrix = new te,
        this.matrix = new te
    }
    ,
    b.prototype.applyTransforms = function(t, e, i, s, n, r) {
        var a = r ? -1 : 1
          , o = s.s.v[0] + (1 - s.s.v[0]) * (1 - n)
          , h = s.s.v[1] + (1 - s.s.v[1]) * (1 - n);
        t.translate(s.p.v[0] * a * n, s.p.v[1] * a * n, s.p.v[2]),
        e.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]),
        e.rotate(-s.r.v * a * n),
        e.translate(s.a.v[0], s.a.v[1], s.a.v[2]),
        i.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]),
        i.scale(r ? 1 / o : o, r ? 1 / h : h),
        i.translate(s.a.v[0], s.a.v[1], s.a.v[2])
    }
    ,
    b.prototype.init = function(t, e, i, s) {
        this.elem = t,
        this.arr = e,
        this.pos = i,
        this.elemsData = s,
        this._currentCopies = 0,
        this._elements = [],
        this._groups = [],
        this.frameId = -1,
        this.initDynamicPropertyContainer(t),
        this.initModifierProperties(t, e[i]);
        for (var n = 0; 0 < i; )
            i -= 1,
            this._elements.unshift(e[i]),
            n += 1;
        this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
    }
    ,
    b.prototype.resetElements = function(t) {
        var e, i = t.length;
        for (e = 0; e < i; e += 1)
            t[e]._processed = !1,
            "gr" === t[e].ty && this.resetElements(t[e].it)
    }
    ,
    b.prototype.cloneElements = function(t) {
        var e = (t.length,
        JSON.parse(JSON.stringify(t)));
        return this.resetElements(e),
        e
    }
    ,
    b.prototype.changeGroupRender = function(t, e) {
        var i, s = t.length;
        for (i = 0; i < s; i += 1)
            t[i]._render = e,
            "gr" === t[i].ty && this.changeGroupRender(t[i].it, e)
    }
    ,
    b.prototype.processShapes = function(t) {
        var e, i, s, n, r;
        if (this._mdf || t) {
            var a = Math.ceil(this.c.v), o;
            if (this._groups.length < a) {
                for (; this._groups.length < a; ) {
                    var h = {
                        it: this.cloneElements(this._elements),
                        ty: "gr"
                    };
                    h.it.push({
                        a: {
                            a: 0,
                            ix: 1,
                            k: [0, 0]
                        },
                        nm: "Transform",
                        o: {
                            a: 0,
                            ix: 7,
                            k: 100
                        },
                        p: {
                            a: 0,
                            ix: 2,
                            k: [0, 0]
                        },
                        r: {
                            a: 1,
                            ix: 6,
                            k: [{
                                s: 0,
                                e: 0,
                                t: 0
                            }, {
                                s: 0,
                                e: 0,
                                t: 1
                            }]
                        },
                        s: {
                            a: 0,
                            ix: 3,
                            k: [100, 100]
                        },
                        sa: {
                            a: 0,
                            ix: 5,
                            k: 0
                        },
                        sk: {
                            a: 0,
                            ix: 4,
                            k: 0
                        },
                        ty: "tr"
                    }),
                    this.arr.splice(0, 0, h),
                    this._groups.splice(0, 0, h),
                    this._currentCopies += 1
                }
                this.elem.reloadShapes()
            }
            for (s = r = 0; s <= this._groups.length - 1; s += 1)
                o = r < a,
                this._groups[s]._render = o,
                this.changeGroupRender(this._groups[s].it, o),
                r += 1;
            this._currentCopies = a;
            var l = this.o.v
              , p = l % 1
              , d = 0 < l ? Math.floor(l) : Math.ceil(l)
              , c = (this.tr.v.props,
            this.pMatrix.props)
              , f = this.rMatrix.props
              , u = this.sMatrix.props;
            this.pMatrix.reset(),
            this.rMatrix.reset(),
            this.sMatrix.reset(),
            this.tMatrix.reset(),
            this.matrix.reset();
            var m = 0, g, v;
            if (0 < l) {
                for (; m < d; )
                    this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                    m += 1;
                p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1),
                m += p)
            } else if (l < 0) {
                for (; d < m; )
                    this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0),
                    m -= 1;
                p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0),
                m -= p)
            }
            for (s = 1 === this.data.m ? 0 : this._currentCopies - 1,
            n = 1 === this.data.m ? 1 : -1,
            r = this._currentCopies; r; ) {
                if (v = (i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props).length,
                e[e.length - 1].transform.mProps._mdf = !0,
                e[e.length - 1].transform.op._mdf = !0,
                0 !== m) {
                    for ((0 !== s && 1 === n || s !== this._currentCopies - 1 && -1 === n) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                    this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]),
                    this.matrix.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]),
                    this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]),
                    g = 0; g < v; g += 1)
                        i[g] = this.matrix.props[g];
                    this.matrix.reset()
                } else
                    for (this.matrix.reset(),
                    g = 0; g < v; g += 1)
                        i[g] = this.matrix.props[g];
                m += 1,
                r -= 1,
                s += n
            }
        } else
            for (r = this._currentCopies,
            s = 0,
            n = 1; r; )
                i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props,
                e[e.length - 1].transform.mProps._mdf = !1,
                e[e.length - 1].transform.op._mdf = !1,
                r -= 1,
                s += n
    }
    ,
    b.prototype.addShape = function() {}
    ,
    he.registerModifier("rp", b),
    w.prototype.addShape = function(t) {
        this._length === this._maxLength && (this.shapes = this.shapes.concat(k(this._maxLength)),
        this._maxLength *= 2),
        this.shapes[this._length] = t,
        this._length += 1
    }
    ,
    w.prototype.releaseShapes = function() {
        var t;
        for (t = 0; t < this._length; t += 1)
            ye.release(this.shapes[t]);
        this._length = 0
    }
    ,
    E.prototype.getValue = function(t) {
        if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId,
        this.iterateDynamicProperties(),
        this._mdf = this._mdf || t,
        this._mdf)) {
            var e = 0
              , i = this.dataProps.length;
            for ("svg" === this.renderer && (this.dashStr = ""),
            e = 0; e < i; e += 1)
                "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
        }
    }
    ,
    v([g], E),
    C.prototype.comparePoints = function(t, e) {
        for (var i, s = 0, n = this.o.length / 2; s < n; ) {
            if (.01 < (i = Math.abs(t[4 * s] - t[4 * e + 2 * s])))
                return !1;
            s += 1
        }
        return !0
    }
    ,
    C.prototype.checkCollapsable = function() {
        if (this.o.length / 2 != this.c.length / 4)
            return !1;
        if (this.data.k.k[0].s)
            for (var t = 0, e = this.data.k.k.length; t < e; ) {
                if (!this.comparePoints(this.data.k.k[t].s, this.data.p))
                    return !1;
                t += 1
            }
        else if (!this.comparePoints(this.data.k.k, this.data.p))
            return !1;
        return !0
    }
    ,
    C.prototype.getValue = function(t) {
        if (this.prop.getValue(),
        this._mdf = !1,
        this._cmdf = !1,
        this._omdf = !1,
        this.prop._mdf || t) {
            var e, i, s, n = 4 * this.data.p;
            for (e = 0; e < n; e += 1)
                i = e % 4 == 0 ? 100 : 255,
                s = Math.round(this.prop.v[e] * i),
                this.c[e] !== s && (this.c[e] = s,
                this._cmdf = !t);
            if (this.o.length)
                for (n = this.prop.v.length,
                e = 4 * this.data.p; e < n; e += 1)
                    i = e % 2 == 0 ? 100 : 1,
                    s = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e],
                    this.o[e - 4 * this.data.p] !== s && (this.o[e - 4 * this.data.p] = s,
                    this._omdf = !t);
            this._mdf = !t
        }
    }
    ,
    v([g], C);
    var le = function(t, e, i, s) {
        if (0 === e)
            return "";
        var n, r = t.o, a = t.i, o = t.v, h = " M" + s.applyToPointStringified(o[0][0], o[0][1]);
        for (n = 1; n < e; n += 1)
            h += " C" + s.applyToPointStringified(r[n - 1][0], r[n - 1][1]) + " " + s.applyToPointStringified(a[n][0], a[n][1]) + " " + s.applyToPointStringified(o[n][0], o[n][1]);
        return i && e && (h += " C" + s.applyToPointStringified(r[n - 1][0], r[n - 1][1]) + " " + s.applyToPointStringified(a[0][0], a[0][1]) + " " + s.applyToPointStringified(o[0][0], o[0][1]),
        h += "z"),
        h
    }, pe = function() {
        function i() {
            this.loadedAssets += 1,
            this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null)
        }
        function s(t) {
            var e = "";
            if (this.assetsPath) {
                var i = t.p;
                -1 !== i.indexOf("images/") && (i = i.split("/")[1]),
                e = this.assetsPath + i
            } else
                e = this.path,
                e += t.u ? t.u : "",
                e += t.p;
            return e
        }
        function n(t) {
            var e = x("img");
            e.addEventListener("load", i.bind(this), !1),
            e.addEventListener("error", i.bind(this), !1),
            e.src = t
        }
        function t(t, e) {
            var i;
            for (this.imagesLoadedCb = e,
            this.totalAssets = t.length,
            i = 0; i < this.totalAssets; i += 1)
                t[i].layers || (n.bind(this)(s.bind(this)(t[i])),
                this.totalImages += 1)
        }
        function e(t) {
            this.path = t || ""
        }
        function r(t) {
            this.assetsPath = t || ""
        }
        function a() {
            this.imagesLoadedCb = null
        }
        return function() {
            this.loadAssets = t,
            this.setAssetsPath = r,
            this.setPath = e,
            this.destroy = a,
            this.assetsPath = "",
            this.path = "",
            this.totalAssets = 0,
            this.totalImages = 0,
            this.loadedAssets = 0,
            this.imagesLoadedCb = null
        }
    }(), de = (fe = {
        maskType: !0
    },
    (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (fe.maskType = !1),
    fe), ce = function() {
        function t(t) {
            var e = A("filter");
            return e.setAttribute("id", t),
            e.setAttribute("filterUnits", "objectBoundingBox"),
            e.setAttribute("x", "0%"),
            e.setAttribute("y", "0%"),
            e.setAttribute("width", "100%"),
            e.setAttribute("height", "100%"),
            e
        }
        function e() {
            var t = A("feColorMatrix");
            return t.setAttribute("type", "matrix"),
            t.setAttribute("color-interpolation-filters", "sRGB"),
            t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"),
            t
        }
        var i = {};
        return i.createFilter = t,
        i.createAlphaToLuminanceFilter = e,
        i
    }(), fe;
    D.prototype.searchProperties = function() {
        var t, e, i = this._textData.a.length, s = re.getProp;
        for (t = 0; t < i; t += 1)
            e = this._textData.a[t],
            this._animatorsData[t] = new P(this._elem,e,this);
        this._textData.p && "m"in this._textData.p ? (this._pathData = {
            f: s(this._elem, this._textData.p.f, 0, 0, this),
            l: s(this._elem, this._textData.p.l, 0, 0, this),
            r: this._textData.p.r,
            m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
        },
        this._hasMaskedPath = !0) : this._hasMaskedPath = !1,
        this._moreOptions.alignment = s(this._elem, this._textData.m.a, 1, 0, this)
    }
    ,
    D.prototype.getMeasures = function(t, e) {
        if (this.lettersChangedFlag = e,
        this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
            this._isFirstFrame = !1;
            var i, s, n, r, a, o, h, l, p, d, c, f, u, m, g, v, y, b, w, E = this._moreOptions.alignment.v, _ = this._animatorsData, k = this._textData, A = this.mHelper, C = this._renderType, S = this.renderedLetters.length, x = (this.data,
            t.l);
            if (this._hasMaskedPath) {
                if (w = this._pathData.m,
                !this._pathData.n || this._pathData._mdf) {
                    var D = w.v, P;
                    for (this._pathData.r && (D = D.reverse()),
                    a = {
                        tLength: 0,
                        segments: []
                    },
                    r = D._length - 1,
                    n = v = 0; n < r; n += 1)
                        P = {
                            s: D.v[n],
                            e: D.v[n + 1],
                            to: [D.o[n][0] - D.v[n][0], D.o[n][1] - D.v[n][1]],
                            ti: [D.i[n + 1][0] - D.v[n + 1][0], D.i[n + 1][1] - D.v[n + 1][1]]
                        },
                        ie.buildBezierData(P),
                        a.tLength += P.bezierData.segmentLength,
                        a.segments.push(P),
                        v += P.bezierData.segmentLength;
                    n = r,
                    w.v.c && (P = {
                        s: D.v[n],
                        e: D.v[0],
                        to: [D.o[n][0] - D.v[n][0], D.o[n][1] - D.v[n][1]],
                        ti: [D.i[0][0] - D.v[0][0], D.i[0][1] - D.v[0][1]]
                    },
                    ie.buildBezierData(P),
                    a.tLength += P.bezierData.segmentLength,
                    a.segments.push(P),
                    v += P.bezierData.segmentLength),
                    this._pathData.pi = a
                }
                if (a = this._pathData.pi,
                o = this._pathData.f.v,
                d = 1,
                p = !(l = c = 0),
                m = a.segments,
                o < 0 && w.v.c)
                    for (a.tLength < Math.abs(o) && (o = -Math.abs(o) % a.tLength),
                    d = (u = m[c = m.length - 1].bezierData.points).length - 1; o < 0; )
                        o += u[d].partialLength,
                        (d -= 1) < 0 && (d = (u = m[c -= 1].bezierData.points).length - 1);
                f = (u = m[c].bezierData.points)[d - 1],
                g = (h = u[d]).partialLength
            }
            r = x.length,
            s = i = 0;
            var M, T, F, I, L, z = 1.2 * t.finalSize * .714, N = !0;
            I = _.length;
            var B, R, O, q, j, V, W, H, U, G, X, Y, J, Q = -1, K = o, Z = c, $ = d, tt = -1, et = 0, it = "", st = this.defaultPropsArray;
            if (2 === t.j || 1 === t.j) {
                var nt = 0
                  , rt = 0
                  , at = 2 === t.j ? -.5 : -1
                  , ot = 0
                  , ht = !0;
                for (n = 0; n < r; n += 1)
                    if (x[n].n) {
                        for (nt && (nt += rt); ot < n; )
                            x[ot].animatorJustifyOffset = nt,
                            ot += 1;
                        ht = !(nt = 0)
                    } else {
                        for (F = 0; F < I; F += 1)
                            (M = _[F].a).t.propType && (ht && 2 === t.j && (rt += M.t.v * at),
                            nt += (B = (T = _[F].s).getMult(x[n].anIndexes[F], k.a[F].s.totalChars)).length ? M.t.v * B[0] * at : M.t.v * B * at);
                        ht = !1
                    }
                for (nt && (nt += rt); ot < n; )
                    x[ot].animatorJustifyOffset = nt,
                    ot += 1
            }
            for (n = 0; n < r; n += 1) {
                if (A.reset(),
                j = 1,
                x[n].n)
                    i = 0,
                    s += t.yOffset,
                    s += N ? 1 : 0,
                    o = K,
                    N = !1,
                    et = 0,
                    this._hasMaskedPath && (d = $,
                    f = (u = m[c = Z].bezierData.points)[d - 1],
                    g = (h = u[d]).partialLength,
                    l = 0),
                    J = G = Y = it = "",
                    st = this.defaultPropsArray;
                else {
                    if (this._hasMaskedPath) {
                        if (tt !== x[n].line) {
                            switch (t.j) {
                            case 1:
                                o += v - t.lineWidths[x[n].line];
                                break;
                            case 2:
                                o += (v - t.lineWidths[x[n].line]) / 2
                            }
                            tt = x[n].line
                        }
                        Q !== x[n].ind && (x[Q] && (o += x[Q].extra),
                        o += x[n].an / 2,
                        Q = x[n].ind),
                        o += E[0] * x[n].an / 200;
                        var lt = 0;
                        for (F = 0; F < I; F += 1)
                            (M = _[F].a).p.propType && (lt += (B = (T = _[F].s).getMult(x[n].anIndexes[F], k.a[F].s.totalChars)).length ? M.p.v[0] * B[0] : M.p.v[0] * B),
                            M.a.propType && (lt += (B = (T = _[F].s).getMult(x[n].anIndexes[F], k.a[F].s.totalChars)).length ? M.a.v[0] * B[0] : M.a.v[0] * B);
                        for (p = !0; p; )
                            o + lt <= l + g || !u ? (y = (o + lt - l) / h.partialLength,
                            O = f.point[0] + (h.point[0] - f.point[0]) * y,
                            q = f.point[1] + (h.point[1] - f.point[1]) * y,
                            A.translate(-E[0] * x[n].an / 200, -E[1] * z / 100),
                            p = !1) : u && (l += h.partialLength,
                            (d += 1) >= u.length && (d = 0,
                            u = m[c += 1] ? m[c].bezierData.points : w.v.c ? m[c = d = 0].bezierData.points : (l -= h.partialLength,
                            null)),
                            u && (f = h,
                            g = (h = u[d]).partialLength));
                        R = x[n].an / 2 - x[n].add,
                        A.translate(-R, 0, 0)
                    } else
                        R = x[n].an / 2 - x[n].add,
                        A.translate(-R, 0, 0),
                        A.translate(-E[0] * x[n].an / 200, -E[1] * z / 100, 0);
                    for (et += x[n].l / 2,
                    F = 0; F < I; F += 1)
                        (M = _[F].a).t.propType && (B = (T = _[F].s).getMult(x[n].anIndexes[F], k.a[F].s.totalChars),
                        0 === i && 0 === t.j || (this._hasMaskedPath ? o += B.length ? M.t.v * B[0] : M.t.v * B : i += B.length ? M.t.v * B[0] : M.t.v * B));
                    for (et += x[n].l / 2,
                    t.strokeWidthAnim && (W = t.sw || 0),
                    t.strokeColorAnim && (V = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]),
                    t.fillColorAnim && t.fc && (H = [t.fc[0], t.fc[1], t.fc[2]]),
                    F = 0; F < I; F += 1)
                        (M = _[F].a).a.propType && ((B = (T = _[F].s).getMult(x[n].anIndexes[F], k.a[F].s.totalChars)).length ? A.translate(-M.a.v[0] * B[0], -M.a.v[1] * B[1], M.a.v[2] * B[2]) : A.translate(-M.a.v[0] * B, -M.a.v[1] * B, M.a.v[2] * B));
                    for (F = 0; F < I; F += 1)
                        (M = _[F].a).s.propType && ((B = (T = _[F].s).getMult(x[n].anIndexes[F], k.a[F].s.totalChars)).length ? A.scale(1 + (M.s.v[0] - 1) * B[0], 1 + (M.s.v[1] - 1) * B[1], 1) : A.scale(1 + (M.s.v[0] - 1) * B, 1 + (M.s.v[1] - 1) * B, 1));
                    for (F = 0; F < I; F += 1) {
                        if (M = _[F].a,
                        B = (T = _[F].s).getMult(x[n].anIndexes[F], k.a[F].s.totalChars),
                        M.sk.propType && (B.length ? A.skewFromAxis(-M.sk.v * B[0], M.sa.v * B[1]) : A.skewFromAxis(-M.sk.v * B, M.sa.v * B)),
                        M.r.propType && (B.length ? A.rotateZ(-M.r.v * B[2]) : A.rotateZ(-M.r.v * B)),
                        M.ry.propType && (B.length ? A.rotateY(M.ry.v * B[1]) : A.rotateY(M.ry.v * B)),
                        M.rx.propType && (B.length ? A.rotateX(M.rx.v * B[0]) : A.rotateX(M.rx.v * B)),
                        M.o.propType && (j += B.length ? (M.o.v * B[0] - j) * B[0] : (M.o.v * B - j) * B),
                        t.strokeWidthAnim && M.sw.propType && (W += B.length ? M.sw.v * B[0] : M.sw.v * B),
                        t.strokeColorAnim && M.sc.propType)
                            for (U = 0; U < 3; U += 1)
                                B.length ? V[U] = V[U] + (M.sc.v[U] - V[U]) * B[0] : V[U] = V[U] + (M.sc.v[U] - V[U]) * B;
                        if (t.fillColorAnim && t.fc) {
                            if (M.fc.propType)
                                for (U = 0; U < 3; U += 1)
                                    B.length ? H[U] = H[U] + (M.fc.v[U] - H[U]) * B[0] : H[U] = H[U] + (M.fc.v[U] - H[U]) * B;
                            M.fh.propType && (H = B.length ? ft(H, M.fh.v * B[0]) : ft(H, M.fh.v * B)),
                            M.fs.propType && (H = B.length ? dt(H, M.fs.v * B[0]) : dt(H, M.fs.v * B)),
                            M.fb.propType && (H = B.length ? ct(H, M.fb.v * B[0]) : ct(H, M.fb.v * B))
                        }
                    }
                    for (F = 0; F < I; F += 1)
                        (M = _[F].a).p.propType && (B = (T = _[F].s).getMult(x[n].anIndexes[F], k.a[F].s.totalChars),
                        this._hasMaskedPath ? B.length ? A.translate(0, M.p.v[1] * B[0], -M.p.v[2] * B[1]) : A.translate(0, M.p.v[1] * B, -M.p.v[2] * B) : B.length ? A.translate(M.p.v[0] * B[0], M.p.v[1] * B[1], -M.p.v[2] * B[2]) : A.translate(M.p.v[0] * B, M.p.v[1] * B, -M.p.v[2] * B));
                    if (t.strokeWidthAnim && (G = W < 0 ? 0 : W),
                    t.strokeColorAnim && (X = "rgb(" + Math.round(255 * V[0]) + "," + Math.round(255 * V[1]) + "," + Math.round(255 * V[2]) + ")"),
                    t.fillColorAnim && t.fc && (Y = "rgb(" + Math.round(255 * H[0]) + "," + Math.round(255 * H[1]) + "," + Math.round(255 * H[2]) + ")"),
                    this._hasMaskedPath) {
                        if (A.translate(0, -t.ls),
                        A.translate(0, E[1] * z / 100 + s, 0),
                        k.p.p) {
                            b = (h.point[1] - f.point[1]) / (h.point[0] - f.point[0]);
                            var pt = 180 * Math.atan(b) / Math.PI;
                            h.point[0] < f.point[0] && (pt += 180),
                            A.rotate(-pt * Math.PI / 180)
                        }
                        A.translate(O, q, 0),
                        o -= E[0] * x[n].an / 200,
                        x[n + 1] && Q !== x[n + 1].ind && (o += x[n].an / 2,
                        o += t.tr / 1e3 * t.finalSize)
                    } else {
                        switch (A.translate(i, s, 0),
                        t.ps && A.translate(t.ps[0], t.ps[1] + t.ascent, 0),
                        t.j) {
                        case 1:
                            A.translate(x[n].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[x[n].line]), 0, 0);
                            break;
                        case 2:
                            A.translate(x[n].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[x[n].line]) / 2, 0, 0)
                        }
                        A.translate(0, -t.ls),
                        A.translate(R, 0, 0),
                        A.translate(E[0] * x[n].an / 200, E[1] * z / 100, 0),
                        i += x[n].l + t.tr / 1e3 * t.finalSize
                    }
                    "html" === C ? it = A.toCSS() : "svg" === C ? it = A.to2dCSS() : st = [A.props[0], A.props[1], A.props[2], A.props[3], A.props[4], A.props[5], A.props[6], A.props[7], A.props[8], A.props[9], A.props[10], A.props[11], A.props[12], A.props[13], A.props[14], A.props[15]],
                    J = j
                }
                this.lettersChangedFlag = S <= n ? (L = new ut(J,G,X,Y,it,st),
                this.renderedLetters.push(L),
                S += 1,
                !0) : (L = this.renderedLetters[n]).update(J, G, X, Y, it, st) || this.lettersChangedFlag
            }
        }
    }
    ,
    D.prototype.getValue = function() {
        this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId,
        this.iterateDynamicProperties())
    }
    ,
    D.prototype.mHelper = new te,
    D.prototype.defaultPropsArray = [],
    v([g], D),
    ut.prototype.update = function(t, e, i, s, n, r) {
        this._mdf.o = !1,
        this._mdf.sw = !1,
        this._mdf.sc = !1,
        this._mdf.fc = !1,
        this._mdf.m = !1;
        var a = this._mdf.p = !1;
        return this.o !== t && (this.o = t,
        a = this._mdf.o = !0),
        this.sw !== e && (this.sw = e,
        a = this._mdf.sw = !0),
        this.sc !== i && (this.sc = i,
        a = this._mdf.sc = !0),
        this.fc !== s && (this.fc = s,
        a = this._mdf.fc = !0),
        this.m !== n && (this.m = n,
        a = this._mdf.m = !0),
        !r.length || this.p[0] === r[0] && this.p[1] === r[1] && this.p[4] === r[4] && this.p[5] === r[5] && this.p[12] === r[12] && this.p[13] === r[13] || (this.p = r,
        a = this._mdf.p = !0),
        a
    }
    ,
    M.prototype.defaultBoxWidth = [0, 0],
    M.prototype.copyFromDocumentData = function(t) {
        for (var e in t)
            this.currentData[e] = t[e]
    }
    ,
    M.prototype.setCurrentData = function(t, e) {
        this.currentData !== t ? (t.__complete || this.completeTextData(t),
        this.copyFromDocumentData(t),
        this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth,
        this.currentData.fillColorAnim = t.fillColorAnim || this.currentData.fillColorAnim,
        this.currentData.strokeColorAnim = t.strokeColorAnim || this.currentData.strokeColorAnim,
        this.currentData.strokeWidthAnim = t.strokeWidthAnim || this.currentData.strokeWidthAnim,
        this._mdf = !0) : e !== this.currentData.t && (this._mdf = !0,
        this.completeTextData(t))
    }
    ,
    M.prototype.searchProperty = function() {
        return this.searchKeyframes()
    }
    ,
    M.prototype.searchKeyframes = function() {
        return this.kf = 1 < this.data.d.k.length,
        this.kf && this.addEffect(this.getKeyframeValue.bind(this)),
        this.kf
    }
    ,
    M.prototype.addEffect = function(t) {
        this.effectsSequence.push(t),
        this.elem.addDynamicProperty(this)
    }
    ,
    M.prototype.getValue = function(t) {
        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
            var e = this.currentData.t;
            if (this.lock)
                return void this.setCurrentData(this.currentData, e);
            this.lock = !0,
            this._mdf = !1;
            var i, s = this.effectsSequence.length, n = t || this.currentData;
            for (i = 0; i < s; i += 1)
                n = this.effectsSequence[i](n);
            this.setCurrentData(n, e),
            this.pv = this.v = this.currentData,
            this.lock = !1,
            this.frameId = this.elem.globalData.frameId
        }
    }
    ,
    M.prototype.getKeyframeValue = function(t) {
        for (var e, i = this.data.d.k, s = this.elem.comp.renderedFrame, n = 0, r = i.length; n <= r - 1 && (e = i[n].s,
        !(n === r - 1 || i[n + 1].t > s)); )
            n += 1;
        return this.keysIndex !== n && (t = e,
        this.keysIndex = n),
        t
    }
    ,
    M.prototype.buildFinalText = function(t) {
        for (var e = ne.getCombinedCharacterCodes(), i = [], s = 0, n = t.length; s < n; )
            -1 !== e.indexOf(t.charCodeAt(s)) ? i[i.length - 1] += t.charAt(s) : i.push(t.charAt(s)),
            s += 1;
        return i
    }
    ,
    M.prototype.completeTextData = function(t) {
        t.__complete = !0;
        var e, i, s, n, r, a, o, h = this.elem.globalData.fontManager, l = this.data, p = [], d = 0, c = l.m.g, f = 0, u = 0, m = 0, g = [], v = 0, y = 0, b = h.getFontByName(t.f), w = 0, E = b.fStyle ? b.fStyle.split(" ") : [], _ = "normal", k = "normal", A;
        for (i = E.length,
        e = 0; e < i; e += 1)
            switch (A = E[e].toLowerCase()) {
            case "italic":
                k = "italic";
                break;
            case "bold":
                _ = "700";
                break;
            case "black":
                _ = "900";
                break;
            case "medium":
                _ = "500";
                break;
            case "regular":
            case "normal":
                _ = "400";
                break;
            case "light":
            case "thin":
                _ = "200"
            }
        t.fWeight = b.fWeight || _,
        t.fStyle = k,
        i = t.t.length,
        t.finalSize = t.s,
        t.finalText = this.buildFinalText(t.t),
        t.finalLineHeight = t.lh;
        var C = t.tr / 1e3 * t.finalSize;
        if (t.sz)
            for (var S, x, D = !0, P = t.sz[0], M = t.sz[1]; D; ) {
                v = S = 0,
                i = (x = this.buildFinalText(t.t)).length,
                C = t.tr / 1e3 * t.finalSize;
                var T = -1;
                for (e = 0; e < i; e += 1)
                    s = !1,
                    " " === x[e] ? T = e : 13 === x[e].charCodeAt(0) && (s = !(v = 0),
                    S += t.finalLineHeight || 1.2 * t.finalSize),
                    P < v + (w = h.chars ? (o = h.getCharData(x[e], b.fStyle, b.fFamily),
                    s ? 0 : o.w * t.finalSize / 100) : h.measureText(x[e], t.f, t.finalSize)) && " " !== x[e] ? (-1 === T ? i += 1 : e = T,
                    S += t.finalLineHeight || 1.2 * t.finalSize,
                    x.splice(e, T === e ? 1 : 0, "\r"),
                    T = -1,
                    v = 0) : (v += w,
                    v += C);
                S += b.ascent * t.finalSize / 100,
                this.canResize && t.finalSize > this.minimumFontSize && M < S ? (t.finalSize -= 1,
                t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = x,
                i = t.finalText.length,
                D = !1)
            }
        v = -C;
        var F, I = w = 0;
        for (e = 0; e < i; e += 1)
            if (s = !1,
            " " === (F = t.finalText[e]) ? n = " " : 13 === F.charCodeAt(0) ? (I = 0,
            g.push(v),
            y = y < v ? v : y,
            v = -2 * C,
            s = !(n = ""),
            m += 1) : n = t.finalText[e],
            w = h.chars ? (o = h.getCharData(F, b.fStyle, h.getFontByName(t.f).fFamily),
            s ? 0 : o.w * t.finalSize / 100) : h.measureText(n, t.f, t.finalSize),
            " " === F ? I += w + C : (v += w + C + I,
            I = 0),
            p.push({
                l: w,
                an: w,
                add: f,
                n: s,
                anIndexes: [],
                val: n,
                line: m,
                animatorJustifyOffset: 0
            }),
            2 == c) {
                if (f += w,
                "" === n || " " === n || e === i - 1) {
                    for ("" !== n && " " !== n || (f -= w); u <= e; )
                        p[u].an = f,
                        p[u].ind = d,
                        p[u].extra = w,
                        u += 1;
                    d += 1,
                    f = 0
                }
            } else if (3 == c) {
                if (f += w,
                "" === n || e === i - 1) {
                    for ("" === n && (f -= w); u <= e; )
                        p[u].an = f,
                        p[u].ind = d,
                        p[u].extra = w,
                        u += 1;
                    f = 0,
                    d += 1
                }
            } else
                p[d].ind = d,
                p[d].extra = 0,
                d += 1;
        if (t.l = p,
        y = y < v ? v : y,
        g.push(v),
        t.sz)
            t.boxWidth = t.sz[0],
            t.justifyOffset = 0;
        else
            switch (t.boxWidth = y,
            t.j) {
            case 1:
                t.justifyOffset = -t.boxWidth;
                break;
            case 2:
                t.justifyOffset = -t.boxWidth / 2;
                break;
            default:
                t.justifyOffset = 0
            }
        t.lineWidths = g;
        var L, z, N = l.a;
        a = N.length;
        var B, R, O = [];
        for (r = 0; r < a; r += 1) {
            for ((L = N[r]).a.sc && (t.strokeColorAnim = !0),
            L.a.sw && (t.strokeWidthAnim = !0),
            (L.a.fc || L.a.fh || L.a.fs || L.a.fb) && (t.fillColorAnim = !0),
            R = 0,
            B = L.s.b,
            e = 0; e < i; e += 1)
                (z = p[e]).anIndexes[r] = R,
                (1 == B && "" !== z.val || 2 == B && "" !== z.val && " " !== z.val || 3 == B && (z.n || " " == z.val || e == i - 1) || 4 == B && (z.n || e == i - 1)) && (1 === L.s.rn && O.push(R),
                R += 1);
            l.a[r].s.totalChars = R;
            var q, j = -1;
            if (1 === L.s.rn)
                for (e = 0; e < i; e += 1)
                    j != (z = p[e]).anIndexes[r] && (j = z.anIndexes[r],
                    q = O.splice(Math.floor(Math.random() * O.length), 1)[0]),
                    z.anIndexes[r] = q
        }
        t.yOffset = t.finalLineHeight || 1.2 * t.finalSize,
        t.ls = t.ls || 0,
        t.ascent = b.ascent * t.finalSize / 100
    }
    ,
    M.prototype.updateDocumentData = function(t, e) {
        e = void 0 === e ? -1 === this.keysIndex ? 0 : this.keysIndex : e;
        var i = this.data.d.k[e].s;
        for (var s in t)
            i[s] = t[s];
        this.recalculate(e)
    }
    ,
    M.prototype.recalculate = function(t) {
        var e = this.data.d.k[t].s;
        e.__complete = !1,
        this.keysIndex = this.kf ? -1 : 0,
        this._isFirstFrame = !0,
        this.getValue(e)
    }
    ,
    M.prototype.canResizeFont = function(t) {
        this.canResize = t,
        this.recalculate(this.keysIndex)
    }
    ,
    M.prototype.setMinimumFontSize = function(t) {
        this.minimumFontSize = Math.floor(t) || 1,
        this.recalculate(this.keysIndex)
    }
    ;
    var ue = function() {
        function s(t, e) {
            this._currentTextLength = -1,
            this.k = !1,
            this.data = e,
            this.elem = t,
            this.comp = t.comp,
            this.finalS = 0,
            this.finalE = 0,
            this.initDynamicPropertyContainer(t),
            this.s = re.getProp(t, e.s || {
                k: 0
            }, 0, 0, this),
            this.e = "e"in e ? re.getProp(t, e.e, 0, 0, this) : {
                v: 100
            },
            this.o = re.getProp(t, e.o || {
                k: 0
            }, 0, 0, this),
            this.xe = re.getProp(t, e.xe || {
                k: 0
            }, 0, 0, this),
            this.ne = re.getProp(t, e.ne || {
                k: 0
            }, 0, 0, this),
            this.a = re.getProp(t, e.a, 0, .01, this),
            this.dynamicProperties.length || this.getValue()
        }
        function t(t, e, i) {
            return new s(t,e,i)
        }
        var l = Math.max
          , p = Math.min
          , d = Math.floor;
        return s.prototype = {
            getMult: function(t) {
                this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                var e = ee.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get
                  , i = 0
                  , s = this.finalS
                  , n = this.finalE
                  , r = this.data.sh;
                if (2 == r)
                    i = e(i = n === s ? n <= t ? 1 : 0 : l(0, p(.5 / (n - s) + (t - s) / (n - s), 1)));
                else if (3 == r)
                    i = e(i = n === s ? n <= t ? 0 : 1 : 1 - l(0, p(.5 / (n - s) + (t - s) / (n - s), 1)));
                else if (4 == r)
                    n === s ? i = 0 : (i = l(0, p(.5 / (n - s) + (t - s) / (n - s), 1))) < .5 ? i *= 2 : i = 1 - 2 * (i - .5),
                    i = e(i);
                else if (5 == r) {
                    if (n === s)
                        i = 0;
                    else {
                        var a = n - s
                          , o = -a / 2 + (t = p(l(0, t + .5 - s), n - s))
                          , h = a / 2;
                        i = Math.sqrt(1 - o * o / (h * h))
                    }
                    i = e(i)
                } else
                    i = (6 == r ? i = n === s ? 0 : (t = p(l(0, t + .5 - s), n - s),
                    (1 + Math.cos(Math.PI + 2 * Math.PI * t / (n - s))) / 2) : t >= d(s) && (i = t - s < 0 ? 1 - (s - t) : l(0, p(n - t, 1))),
                    e(i));
                return i * this.a.v
            },
            getValue: function(t) {
                this.iterateDynamicProperties(),
                this._mdf = t || this._mdf,
                this._currentTextLength = this.elem.textProperty.currentData.l.length || 0,
                t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                var e = 2 === this.data.r ? 1 : 100 / this._currentTextLength
                  , i = this.o.v / e
                  , s = this.s.v / e + i
                  , n = this.e.v / e + i;
                if (n < s) {
                    var r = s;
                    s = n,
                    n = r
                }
                this.finalS = s,
                this.finalE = n
            }
        },
        v([g], s),
        {
            getTextSelectorProp: t
        }
    }(), me = function(t, e, i, s) {
        function n() {
            var t;
            return t = a ? h[a -= 1] : e()
        }
        function r(t) {
            a === o && (h = ge.double(h),
            o *= 2),
            i && i(t),
            h[a] = t,
            a += 1
        }
        var a = 0, o = t, h = k(o), l;
        return {
            newElement: n,
            release: r
        }
    }, ge = function() {
        function t(t) {
            return t.concat(k(t.length))
        }
        return {
            double: t
        }
    }(), ve = function() {
        function t() {
            return $t("float32", 2)
        }
        return me(8, t)
    }(), ye = function() {
        function t() {
            return new f
        }
        function e(t) {
            var e, i = t._length;
            for (e = 0; e < i; e += 1)
                ve.release(t.v[e]),
                ve.release(t.i[e]),
                ve.release(t.o[e]),
                t.v[e] = null,
                t.i[e] = null,
                t.o[e] = null;
            t._length = 0,
            t.c = !1
        }
        function i(t) {
            var e, i = n.newElement(), s = void 0 === t._length ? t.v.length : t._length;
            for (i.setLength(s),
            i.c = t.c,
            e = 0; e < s; e += 1)
                i.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
            return i
        }
        var n = me(4, t, e);
        return n.clone = i,
        n
    }(), be = function() {
        function t() {
            var t;
            return t = s ? r[s -= 1] : new w
        }
        function e(t) {
            var e, i = t._length;
            for (e = 0; e < i; e += 1)
                ye.release(t.shapes[e]);
            t._length = 0,
            s === n && (r = ge.double(r),
            n *= 2),
            r[s] = t,
            s += 1
        }
        var i = {
            newShapeCollection: t,
            release: e
        }
          , s = 0
          , n = 4
          , r = k(n);
        return i
    }(), we = function() {
        function t() {
            return {
                lengths: [],
                totalLength: 0
            }
        }
        function e(t) {
            var e, i = t.lengths.length;
            for (e = 0; e < i; e += 1)
                Ee.release(t.lengths[e]);
            t.lengths.length = 0
        }
        return me(8, t, e)
    }(), Ee = function() {
        function t() {
            return {
                addedLength: 0,
                percents: $t("float32", Jt),
                lengths: $t("float32", Jt)
            }
        }
        return me(8, t)
    }(), _e;
    T.prototype.checkLayers = function(t) {
        var e, i, s = this.layers.length;
        for (this.completeLayers = !0,
        e = s - 1; 0 <= e; e--)
            this.elements[e] || (i = this.layers[e]).ip - i.st <= t - this.layers[e].st && i.op - i.st > t - this.layers[e].st && this.buildItem(e),
            this.completeLayers = !!this.elements[e] && this.completeLayers;
        this.checkPendingElements()
    }
    ,
    T.prototype.createItem = function(t) {
        switch (t.ty) {
        case 2:
            return this.createImage(t);
        case 0:
            return this.createComp(t);
        case 1:
            return this.createSolid(t);
        case 3:
            return this.createNull(t);
        case 4:
            return this.createShape(t);
        case 5:
            return this.createText(t);
        case 13:
            return this.createCamera(t)
        }
        return this.createNull(t)
    }
    ,
    T.prototype.createCamera = function() {
        throw new Error("You're using a 3d camera. Try the html renderer.")
    }
    ,
    T.prototype.buildAllItems = function() {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1)
            this.buildItem(t);
        this.checkPendingElements()
    }
    ,
    T.prototype.includeLayers = function(t) {
        this.completeLayers = !1;
        var e, i, s = t.length, n = this.layers.length;
        for (e = 0; e < s; e += 1)
            for (i = 0; i < n; ) {
                if (this.layers[i].id == t[e].id) {
                    this.layers[i] = t[e];
                    break
                }
                i += 1
            }
    }
    ,
    T.prototype.setProjectInterface = function(t) {
        this.globalData.projectInterface = t
    }
    ,
    T.prototype.initItems = function() {
        this.globalData.progressiveLoad || this.buildAllItems()
    }
    ,
    T.prototype.buildElementParenting = function(t, e, i) {
        for (var s = this.elements, n = this.layers, r = 0, a = n.length; r < a; )
            n[r].ind == e && (s[r] && !0 !== s[r] ? (i.push(s[r]),
            s[r].setAsParent(),
            void 0 !== n[r].parent ? this.buildElementParenting(t, n[r].parent, i) : t.setHierarchy(i)) : (this.buildItem(r),
            this.addPendingElement(t))),
            r += 1
    }
    ,
    T.prototype.addPendingElement = function(t) {
        this.pendingElements.push(t)
    }
    ,
    T.prototype.searchExtraCompositions = function(t) {
        var e, i = t.length;
        for (e = 0; e < i; e += 1)
            if (t[e].xt) {
                var s = this.createComp(t[e]);
                s.initExpressions(),
                this.globalData.projectInterface.registerComposition(s)
            }
    }
    ,
    v([T], F),
    F.prototype.createNull = function(t) {
        return new J(t,this.globalData,this)
    }
    ,
    F.prototype.createShape = function(t) {
        return new nt(t,this.globalData,this)
    }
    ,
    F.prototype.createText = function(t) {
        return new st(t,this.globalData,this)
    }
    ,
    F.prototype.createImage = function(t) {
        return new tt(t,this.globalData,this)
    }
    ,
    F.prototype.createComp = function(t) {
        return new it(t,this.globalData,this)
    }
    ,
    F.prototype.createSolid = function(t) {
        return new et(t,this.globalData,this)
    }
    ,
    F.prototype.configAnimation = function(t) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
        this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h),
        this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w),
        this.svgElement.setAttribute("height", t.h),
        this.svgElement.style.width = "100%",
        this.svgElement.style.height = "100%",
        this.svgElement.style.transform = "translate3d(0,0,0)"),
        this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className),
        this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio),
        this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem),
        this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem),
        this.globalData.progressiveLoad = this.renderConfig.progressiveLoad,
        this.globalData.nm = t.nm,
        this.globalData.compSize.w = t.w,
        this.globalData.compSize.h = t.h,
        this.globalData.frameRate = t.fr,
        this.data = t;
        var i = A("clipPath")
          , s = A("rect");
        s.setAttribute("width", t.w),
        s.setAttribute("height", t.h),
        s.setAttribute("x", 0),
        s.setAttribute("y", 0);
        var n = "animationMask_" + _(10);
        i.setAttribute("id", n),
        i.appendChild(s),
        this.layerElement.setAttribute("clip-path", "url(" + jt + "#" + n + ")"),
        e.appendChild(i),
        this.layers = t.layers,
        this.globalData.fontManager.addChars(t.chars),
        this.globalData.fontManager.addFonts(t.fonts, e),
        this.elements = k(t.layers.length)
    }
    ,
    F.prototype.destroy = function() {
        this.animationItem.wrapper.innerHTML = "",
        this.layerElement = null,
        this.globalData.defs = null;
        var t, e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t++)
            this.elements[t] && this.elements[t].destroy();
        this.elements.length = 0,
        this.destroyed = !0,
        this.animationItem = null
    }
    ,
    F.prototype.updateContainerSize = function() {}
    ,
    F.prototype.buildItem = function(t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
            e[t] = !0;
            var i = this.createItem(this.layers[t]);
            e[t] = i,
            Rt && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(i),
            i.initExpressions()),
            this.appendElementInPos(i, t),
            this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? i.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1),
            this.addPendingElement(i)))
        }
    }
    ,
    F.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length; ) {
            var t = this.pendingElements.pop();
            if (t.checkParenting(),
            t.data.tt)
                for (var e = 0, i = this.elements.length; e < i; ) {
                    if (this.elements[e] === t) {
                        t.setMatte(this.elements[e - 1].layerId);
                        break
                    }
                    e += 1
                }
        }
    }
    ,
    F.prototype.renderFrame = function(t) {
        if (this.renderedFrame !== t && !this.destroyed) {
            null === t ? t = this.renderedFrame : this.renderedFrame = t,
            this.globalData.frameNum = t,
            this.globalData.frameId += 1,
            this.globalData.projectInterface.currentFrame = t,
            this.globalData._mdf = !1;
            var e, i = this.layers.length;
            for (this.completeLayers || this.checkLayers(t),
            e = i - 1; 0 <= e; e--)
                (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
            if (this.globalData._mdf)
                for (e = 0; e < i; e += 1)
                    (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
        }
    }
    ,
    F.prototype.appendElementInPos = function(t, e) {
        var i = t.getBaseElement();
        if (i) {
            for (var s, n = 0; n < e; )
                this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement() && (s = this.elements[n].getBaseElement()),
                n += 1;
            s ? this.layerElement.insertBefore(i, s) : this.layerElement.appendChild(i)
        }
    }
    ,
    F.prototype.hide = function() {
        this.layerElement.style.display = "none"
    }
    ,
    F.prototype.show = function() {
        this.layerElement.style.display = "block"
    }
    ,
    I.prototype.getMaskProperty = function(t) {
        return this.viewData[t].prop
    }
    ,
    I.prototype.renderFrame = function(t) {
        var e, i = this.element.finalTransform.mat, s = this.masksProperties.length;
        for (e = 0; e < s; e++)
            if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]),
            (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v),
            "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[e].invRect.setAttribute("x", -i.props[12]),
            this.viewData[e].invRect.setAttribute("y", -i.props[13])),
            this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
                var n = this.storedData[e].expan;
                this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode",
                this.storedData[e].elem.setAttribute("filter", "url(" + jt + "#" + this.storedData[e].filterId + ")")),
                n.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate",
                this.storedData[e].elem.setAttribute("filter", null)),
                this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
            }
    }
    ,
    I.prototype.getMaskelement = function() {
        return this.maskElement
    }
    ,
    I.prototype.createLayerSolidPath = function() {
        var t = "M0,0 ";
        return t += " h" + this.globalData.compSize.w,
        t += " v" + this.globalData.compSize.h,
        t += " h-" + this.globalData.compSize.w,
        t += " v-" + this.globalData.compSize.h + " "
    }
    ,
    I.prototype.drawPath = function(t, e, i) {
        var s, n, r = " M" + e.v[0][0] + "," + e.v[0][1];
        for (n = e._length,
        s = 1; s < n; s += 1)
            r += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[s][0] + "," + e.i[s][1] + " " + e.v[s][0] + "," + e.v[s][1];
        if (e.c && 1 < n && (r += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]),
        i.lastPath !== r) {
            var a = "";
            i.elem && (e.c && (a = t.inv ? this.solidPath + r : r),
            i.elem.setAttribute("d", a)),
            i.lastPath = r
        }
    }
    ,
    I.prototype.destroy = function() {
        this.element = null,
        this.globalData = null,
        this.maskElement = null,
        this.data = null,
        this.masksProperties = null
    }
    ,
    L.prototype = {
        initHierarchy: function() {
            this.hierarchy = [],
            this._isParent = !1,
            this.checkParenting()
        },
        setHierarchy: function(t) {
            this.hierarchy = t
        },
        setAsParent: function() {
            this._isParent = !0
        },
        checkParenting: function() {
            void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
        }
    },
    z.prototype = {
        initFrame: function() {
            this._isFirstFrame = !1,
            this.dynamicProperties = [],
            this._mdf = !1
        },
        prepareProperties: function(t, e) {
            var i, s = this.dynamicProperties.length;
            for (i = 0; i < s; i += 1)
                (e || this._isParent && "transform" === this.dynamicProperties[i].propType) && (this.dynamicProperties[i].getValue(),
                this.dynamicProperties[i]._mdf && (this.globalData._mdf = !0,
                this._mdf = !0))
        },
        addDynamicProperty: function(t) {
            -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
        }
    },
    N.prototype = {
        initTransform: function() {
            this.finalTransform = {
                mProp: this.data.ks ? ae.getTransformProperty(this, this.data.ks, this) : {
                    o: 0
                },
                _matMdf: !1,
                _opMdf: !1,
                mat: new te
            },
            this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
            this.data.ty
        },
        renderTransform: function() {
            if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame,
            this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame,
            this.hierarchy) {
                var t, e = this.finalTransform.mat, i = 0, s = this.hierarchy.length;
                if (!this.finalTransform._matMdf)
                    for (; i < s; ) {
                        if (this.hierarchy[i].finalTransform.mProp._mdf) {
                            this.finalTransform._matMdf = !0;
                            break
                        }
                        i += 1
                    }
                if (this.finalTransform._matMdf)
                    for (t = this.finalTransform.mProp.v.props,
                    e.cloneFromProps(t),
                    i = 0; i < s; i += 1)
                        t = this.hierarchy[i].finalTransform.mProp.v.props,
                        e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
            }
        },
        globalToLocal: function(t) {
            var e = [];
            e.push(this.finalTransform);
            for (var i = !0, s = this.comp; i; )
                s.finalTransform ? (s.data.hasMask && e.splice(0, 0, s.finalTransform),
                s = s.comp) : i = !1;
            var n, r, a = e.length;
            for (n = 0; n < a; n += 1)
                r = e[n].mat.applyToPointArray(0, 0, 0),
                t = [t[0] - r[0], t[1] - r[1], 0];
            return t
        },
        mHelper: new te
    },
    B.prototype = {
        initRenderable: function() {
            this.isInRange = !1,
            this.hidden = !1,
            this.isTransparent = !1,
            this.renderableComponents = []
        },
        addRenderableComponent: function(t) {
            -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
        },
        removeRenderableComponent: function(t) {
            -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
        },
        prepareRenderableFrame: function(t) {
            this.checkLayerLimits(t)
        },
        checkTransparency: function() {
            this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0,
            this.hide()) : this.isTransparent && (this.isTransparent = !1,
            this.show())
        },
        checkLayerLimits: function(t) {
            this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0,
            this._mdf = !0,
            this.isInRange = !0,
            this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0,
            this.isInRange = !1,
            this.hide())
        },
        renderRenderable: function() {
            var t, e = this.renderableComponents.length;
            for (t = 0; t < e; t += 1)
                this.renderableComponents[t].renderFrame(this._isFirstFrame)
        },
        sourceRectAtTime: function() {
            return {
                top: 0,
                left: 0,
                width: 100,
                height: 100
            }
        },
        getLayerSize: function() {
            return 5 === this.data.ty ? {
                w: this.data.textData.width,
                h: this.data.textData.height
            } : {
                w: this.data.width,
                h: this.data.height
            }
        }
    },
    v([B, p({
        initElement: function(t, e, i) {
            this.initFrame(),
            this.initBaseData(t, e, i),
            this.initTransform(t, e, i),
            this.initHierarchy(),
            this.initRenderable(),
            this.initRendererElement(),
            this.createContainerElements(),
            this.addMasks(),
            this.createContent(),
            this.hide()
        },
        hide: function() {
            var t;
            this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none",
            this.hidden = !0)
        },
        show: function() {
            var t;
            this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"),
            this.hidden = !1,
            this._isFirstFrame = !0)
        },
        renderFrame: function() {
            this.data.hd || this.hidden || (this.renderTransform(),
            this.renderRenderable(),
            this.renderElement(),
            this.renderInnerContent(),
            this._isFirstFrame && (this._isFirstFrame = !1))
        },
        renderInnerContent: function() {},
        prepareFrame: function(t) {
            this._mdf = !1,
            this.prepareRenderableFrame(t),
            this.prepareProperties(t, this.isInRange),
            this.checkTransparency()
        },
        destroy: function() {
            this.innerElem = null,
            this.destroyBaseElement()
        }
    })], R),
    q.prototype.reset = function() {
        this.d = "",
        this._mdf = !1
    }
    ,
    j.prototype.setAsAnimated = function() {
        this._isAnimated = !0
    }
    ,
    v([g], W),
    v([g], H),
    U.prototype.initGradientData = function(t, e, i) {
        this.o = re.getProp(t, e.o, 0, .01, this),
        this.s = re.getProp(t, e.s, 1, null, this),
        this.e = re.getProp(t, e.e, 1, null, this),
        this.h = re.getProp(t, e.h || {
            k: 0
        }, 0, .01, this),
        this.a = re.getProp(t, e.a || {
            k: 0
        }, 0, Qt, this),
        this.g = new C(t,e.g,this),
        this.style = i,
        this.stops = [],
        this.setGradientData(i.pElem, e),
        this.setGradientOpacity(e, i),
        this._isAnimated = !!this._isAnimated
    }
    ,
    U.prototype.setGradientData = function(t, e) {
        var i = "gr_" + _(10)
          , s = A(1 === e.t ? "linearGradient" : "radialGradient");
        s.setAttribute("id", i),
        s.setAttribute("spreadMethod", "pad"),
        s.setAttribute("gradientUnits", "userSpaceOnUse");
        var n, r, a, o = [];
        for (a = 4 * e.g.p,
        r = 0; r < a; r += 4)
            n = A("stop"),
            s.appendChild(n),
            o.push(n);
        t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(#" + i + ")"),
        this.gf = s,
        this.cst = o
    }
    ,
    U.prototype.setGradientOpacity = function(t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
            var i, s, n, r = A("mask"), a = A("path");
            r.appendChild(a);
            var o = "op_" + _(10)
              , h = "mk_" + _(10);
            r.setAttribute("id", h);
            var l = A(1 === t.t ? "linearGradient" : "radialGradient");
            l.setAttribute("id", o),
            l.setAttribute("spreadMethod", "pad"),
            l.setAttribute("gradientUnits", "userSpaceOnUse"),
            n = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
            var p = this.stops;
            for (s = 4 * t.g.p; s < n; s += 2)
                (i = A("stop")).setAttribute("stop-color", "rgb(255,255,255)"),
                l.appendChild(i),
                p.push(i);
            a.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(#" + o + ")"),
            this.of = l,
            this.ms = r,
            this.ost = p,
            this.maskId = h,
            e.msElem = a
        }
    }
    ,
    v([g], U),
    v([U, g], G);
    var ke = function() {
        function t(t) {
            switch (t.ty,
            t.ty) {
            case "fl":
                return s;
            case "gf":
                return r;
            case "gs":
                return n;
            case "st":
                return a;
            case "sh":
            case "el":
            case "rc":
            case "sr":
                return i;
            case "tr":
                return e
            }
        }
        function e(t, e, i) {
            (i || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v),
            (i || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
        }
        function i(t, e, i) {
            var s, n, r, a, o, h, l, p, d, c, f, u = e.styles.length, m = e.lvl;
            for (h = 0; h < u; h += 1) {
                if (a = e.sh._mdf || i,
                e.styles[h].lvl < m) {
                    for (p = v.reset(),
                    c = m - e.styles[h].lvl,
                    f = e.transformers.length - 1; !a && 0 < c; )
                        a = e.transformers[f].mProps._mdf || a,
                        c--,
                        f--;
                    if (a)
                        for (c = m - e.styles[h].lvl,
                        f = e.transformers.length - 1; 0 < c; )
                            d = e.transformers[f].mProps.v.props,
                            p.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]),
                            c--,
                            f--
                } else
                    p = g;
                if (n = (l = e.sh.paths)._length,
                a) {
                    for (r = "",
                    s = 0; s < n; s += 1)
                        (o = l.shapes[s]) && o._length && (r += le(o, o._length, o.c, p));
                    e.caches[h] = r
                } else
                    r = e.caches[h];
                e.styles[h].d += r,
                e.styles[h]._mdf = a || e.styles[h]._mdf
            }
        }
        function s(t, e, i) {
            var s = e.style;
            (e.c._mdf || i) && s.pElem.setAttribute("fill", "rgb(" + Gt(e.c.v[0]) + "," + Gt(e.c.v[1]) + "," + Gt(e.c.v[2]) + ")"),
            (e.o._mdf || i) && s.pElem.setAttribute("fill-opacity", e.o.v)
        }
        function n(t, e, i) {
            r(t, e, i),
            a(t, e, i)
        }
        function r(t, e, i) {
            var s = e.gf, n = e.g._hasOpacity, r = e.s.v, a = e.e.v, o, h, l, p, d;
            if (e.o._mdf || i) {
                var c = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
                e.style.pElem.setAttribute(c, e.o.v)
            }
            if (e.s._mdf || i) {
                var f = 1 === t.t ? "x1" : "cx"
                  , u = "x1" === f ? "y1" : "cy";
                s.setAttribute(f, r[0]),
                s.setAttribute(u, r[1]),
                n && !e.g._collapsable && (e.of.setAttribute(f, r[0]),
                e.of.setAttribute(u, r[1]))
            }
            if (e.g._cmdf || i) {
                o = e.cst;
                var m = e.g.c;
                for (l = o.length,
                h = 0; h < l; h += 1)
                    (p = o[h]).setAttribute("offset", m[4 * h] + "%"),
                    p.setAttribute("stop-color", "rgb(" + m[4 * h + 1] + "," + m[4 * h + 2] + "," + m[4 * h + 3] + ")")
            }
            if (n && (e.g._omdf || i)) {
                var g = e.g.o;
                for (l = (o = e.g._collapsable ? e.cst : e.ost).length,
                h = 0; h < l; h += 1)
                    p = o[h],
                    e.g._collapsable || p.setAttribute("offset", g[2 * h] + "%"),
                    p.setAttribute("stop-opacity", g[2 * h + 1])
            }
            if (1 === t.t)
                (e.e._mdf || i) && (s.setAttribute("x2", a[0]),
                s.setAttribute("y2", a[1]),
                n && !e.g._collapsable && (e.of.setAttribute("x2", a[0]),
                e.of.setAttribute("y2", a[1])));
            else if ((e.s._mdf || e.e._mdf || i) && (d = Math.sqrt(Math.pow(r[0] - a[0], 2) + Math.pow(r[1] - a[1], 2)),
            s.setAttribute("r", d),
            n && !e.g._collapsable && e.of.setAttribute("r", d)),
            e.e._mdf || e.h._mdf || e.a._mdf || i) {
                d || (d = Math.sqrt(Math.pow(r[0] - a[0], 2) + Math.pow(r[1] - a[1], 2)));
                var v = Math.atan2(a[1] - r[1], a[0] - r[0]), y, b = d * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v), w = Math.cos(v + e.a.v) * b + r[0], E = Math.sin(v + e.a.v) * b + r[1];
                s.setAttribute("fx", w),
                s.setAttribute("fy", E),
                n && !e.g._collapsable && (e.of.setAttribute("fx", w),
                e.of.setAttribute("fy", E))
            }
        }
        function a(t, e, i) {
            var s = e.style
              , n = e.d;
            n && (n._mdf || i) && n.dashStr && (s.pElem.setAttribute("stroke-dasharray", n.dashStr),
            s.pElem.setAttribute("stroke-dashoffset", n.dashoffset[0])),
            e.c && (e.c._mdf || i) && s.pElem.setAttribute("stroke", "rgb(" + Gt(e.c.v[0]) + "," + Gt(e.c.v[1]) + "," + Gt(e.c.v[2]) + ")"),
            (e.o._mdf || i) && s.pElem.setAttribute("stroke-opacity", e.o.v),
            (e.w._mdf || i) && (s.pElem.setAttribute("stroke-width", e.w.v),
            s.msElem && s.msElem.setAttribute("stroke-width", e.w.v))
        }
        var g = new te, v = new te, o;
        return {
            createRenderFunction: t
        }
    }();
    Y.prototype = {
        checkMasks: function() {
            if (!this.data.hasMask)
                return !1;
            for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
                if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl)
                    return !0;
                t += 1
            }
            return !1
        },
        initExpressions: function() {
            this.layerInterface = LayerExpressionInterface(this),
            this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
            var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
            this.layerInterface.registerEffectsInterface(t),
            0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface),
            this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this),
            this.layerInterface.text = this.layerInterface.textInterface)
        },
        blendModeEnums: {
            1: "multiply",
            2: "screen",
            3: "overlay",
            4: "darken",
            5: "lighten",
            6: "color-dodge",
            7: "color-burn",
            8: "hard-light",
            9: "soft-light",
            10: "difference",
            11: "exclusion",
            12: "hue",
            13: "saturation",
            14: "color",
            15: "luminosity"
        },
        getBlendMode: function() {
            return this.blendModeEnums[this.data.bm] || ""
        },
        setBlendMode: function() {
            var t = this.getBlendMode(), e;
            (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
        },
        initBaseData: function(t, e, i) {
            this.globalData = e,
            this.comp = i,
            this.data = t,
            this.layerId = "ly_" + _(10),
            this.data.sr || (this.data.sr = 1),
            this.effectsManager = new vt(this.data,this,this.dynamicProperties)
        },
        getType: function() {
            return this.type
        }
    },
    J.prototype.prepareFrame = function(t) {
        this.prepareProperties(t, !0)
    }
    ,
    J.prototype.renderFrame = function() {}
    ,
    J.prototype.getBaseElement = function() {
        return null
    }
    ,
    J.prototype.destroy = function() {}
    ,
    J.prototype.sourceRectAtTime = function() {}
    ,
    J.prototype.hide = function() {}
    ,
    v([Y, N, L, z], J),
    Q.prototype = {
        initRendererElement: function() {
            this.layerElement = A("g")
        },
        createContainerElements: function() {
            this.matteElement = A("g"),
            this.transformedElement = this.layerElement,
            this.maskedElement = this.layerElement,
            this._sizeChanged = !1;
            var t, e, i, s = null;
            if (this.data.td) {
                if (3 == this.data.td || 1 == this.data.td) {
                    var n = A("mask");
                    n.setAttribute("id", this.layerId),
                    n.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"),
                    n.appendChild(this.layerElement),
                    s = n,
                    this.globalData.defs.appendChild(n),
                    de.maskType || 1 != this.data.td || (n.setAttribute("mask-type", "luminance"),
                    t = _(10),
                    e = ce.createFilter(t),
                    this.globalData.defs.appendChild(e),
                    e.appendChild(ce.createAlphaToLuminanceFilter()),
                    (i = A("g")).appendChild(this.layerElement),
                    s = i,
                    n.appendChild(i),
                    i.setAttribute("filter", "url(" + jt + "#" + t + ")"))
                } else if (2 == this.data.td) {
                    var r = A("mask");
                    r.setAttribute("id", this.layerId),
                    r.setAttribute("mask-type", "alpha");
                    var a = A("g");
                    r.appendChild(a),
                    t = _(10),
                    e = ce.createFilter(t);
                    var o = A("feColorMatrix");
                    o.setAttribute("type", "matrix"),
                    o.setAttribute("color-interpolation-filters", "sRGB"),
                    o.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1"),
                    e.appendChild(o),
                    this.globalData.defs.appendChild(e);
                    var h = A("rect");
                    h.setAttribute("width", this.comp.data.w),
                    h.setAttribute("height", this.comp.data.h),
                    h.setAttribute("x", "0"),
                    h.setAttribute("y", "0"),
                    h.setAttribute("fill", "#ffffff"),
                    h.setAttribute("opacity", "0"),
                    a.setAttribute("filter", "url(" + jt + "#" + t + ")"),
                    a.appendChild(h),
                    a.appendChild(this.layerElement),
                    s = a,
                    de.maskType || (r.setAttribute("mask-type", "luminance"),
                    e.appendChild(ce.createAlphaToLuminanceFilter()),
                    i = A("g"),
                    a.appendChild(h),
                    i.appendChild(this.layerElement),
                    s = i,
                    a.appendChild(i)),
                    this.globalData.defs.appendChild(r)
                }
            } else
                this.data.tt ? (this.matteElement.appendChild(this.layerElement),
                s = this.matteElement,
                this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
            if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
            this.data.cl && this.layerElement.setAttribute("class", this.data.cl),
            0 === this.data.ty && !this.data.hd) {
                var l = A("clipPath")
                  , p = A("path");
                p.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
                var d = "cp_" + _(8);
                if (l.setAttribute("id", d),
                l.appendChild(p),
                this.globalData.defs.appendChild(l),
                this.checkMasks()) {
                    var c = A("g");
                    c.setAttribute("clip-path", "url(" + jt + "#" + d + ")"),
                    c.appendChild(this.layerElement),
                    this.transformedElement = c,
                    s ? s.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
                } else
                    this.layerElement.setAttribute("clip-path", "url(" + jt + "#" + d + ")")
            }
            0 !== this.data.bm && this.setBlendMode(),
            this.renderableEffectsManager = new gt(this)
        },
        renderElement: function() {
            this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()),
            this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
        },
        destroyBaseElement: function() {
            this.layerElement = null,
            this.matteElement = null,
            this.maskManager.destroy()
        },
        getBaseElement: function() {
            return this.data.hd ? null : this.baseElement
        },
        addMasks: function() {
            this.maskManager = new I(this.data,this,this.globalData)
        },
        setMatte: function(t) {
            this.matteElement && this.matteElement.setAttribute("mask", "url(" + jt + "#" + t + ")")
        }
    },
    K.prototype = {
        addShapeToModifiers: function(t) {
            var e, i = this.shapeModifiers.length;
            for (e = 0; e < i; e += 1)
                this.shapeModifiers[e].addShape(t)
        },
        isShapeInAnimatedModifiers: function(t) {
            for (var e = 0, i = this.shapeModifiers.length; 0 < i; )
                if (this.shapeModifiers[0].isAnimatedWithShape(t))
                    return !0;
            return !1
        },
        renderModifiers: function() {
            if (this.shapeModifiers.length) {
                var t, e = this.shapes.length;
                for (t = 0; t < e; t += 1)
                    this.shapes[t].sh.reset();
                for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1)
                    this.shapeModifiers[t].processShapes(this._isFirstFrame)
            }
        },
        lcEnum: {
            1: "butt",
            2: "round",
            3: "square"
        },
        ljEnum: {
            1: "miter",
            2: "round",
            3: "butt"
        },
        searchProcessedElement: function(t) {
            for (var e = this.processedElements, i = 0, s = e.length; i < s; ) {
                if (e[i].elem === t)
                    return e[i].pos;
                i += 1
            }
            return 0
        },
        addProcessedElement: function(t, e) {
            for (var i = this.processedElements, s = i.length; s; )
                if (i[s -= 1].elem === t)
                    return void (i[s].pos = e);
            i.push(new O(t,e))
        },
        prepareFrame: function(t) {
            this.prepareRenderableFrame(t),
            this.prepareProperties(t, this.isInRange)
        }
    },
    Z.prototype.initElement = function(t, e, i) {
        this.lettersChangedFlag = !0,
        this.initFrame(),
        this.initBaseData(t, e, i),
        this.textProperty = new M(this,t.t,this.dynamicProperties),
        this.textAnimator = new D(t.t,this.renderType,this),
        this.initTransform(t, e, i),
        this.initHierarchy(),
        this.initRenderable(),
        this.initRendererElement(),
        this.createContainerElements(),
        this.addMasks(),
        this.createContent(),
        this.hide(),
        this.textAnimator.searchProperties(this.dynamicProperties)
    }
    ,
    Z.prototype.prepareFrame = function(t) {
        this._mdf = !1,
        this.prepareRenderableFrame(t),
        this.prepareProperties(t, this.isInRange),
        (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(),
        this.textProperty._isFirstFrame = !1,
        this.textProperty._mdf = !1)
    }
    ,
    Z.prototype.createPathShape = function(t, e) {
        var i, s, n = e.length, r = "";
        for (i = 0; i < n; i += 1)
            s = e[i].ks.k,
            r += le(s, s.i.length, !0, t);
        return r
    }
    ,
    Z.prototype.updateDocumentData = function(t, e) {
        this.textProperty.updateDocumentData(t, e)
    }
    ,
    Z.prototype.canResizeFont = function(t) {
        this.textProperty.canResizeFont(t)
    }
    ,
    Z.prototype.setMinimumFontSize = function(t) {
        this.textProperty.setMinimumFontSize(t)
    }
    ,
    Z.prototype.applyTextPropertiesToMatrix = function(t, e, i, s, n) {
        switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0),
        e.translate(0, -t.ls, 0),
        t.j) {
        case 1:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]), 0, 0);
            break;
        case 2:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2, 0, 0)
        }
        e.translate(s, n, 0)
    }
    ,
    Z.prototype.buildColor = function(t) {
        return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
    }
    ,
    Z.prototype.emptyProp = new ut,
    Z.prototype.destroy = function() {}
    ,
    v([Y, N, L, z, R], $),
    $.prototype.initElement = function(t, e, i) {
        this.initFrame(),
        this.initBaseData(t, e, i),
        this.initTransform(t, e, i),
        this.initRenderable(),
        this.initHierarchy(),
        this.initRendererElement(),
        this.createContainerElements(),
        this.addMasks(),
        !this.data.xt && e.progressiveLoad || this.buildAllItems(),
        this.hide()
    }
    ,
    $.prototype.prepareFrame = function(t) {
        if (this._mdf = !1,
        this.prepareRenderableFrame(t),
        this.prepareProperties(t, this.isInRange),
        this.isInRange || this.data.xt) {
            if (this.tm._placeholder)
                this.renderedFrame = t / this.data.sr;
            else {
                var e = this.tm.v;
                e === this.data.op && (e = this.data.op - 1),
                this.renderedFrame = e
            }
            var i, s = this.elements.length;
            for (this.completeLayers || this.checkLayers(this.renderedFrame),
            i = 0; i < s; i += 1)
                (this.completeLayers || this.elements[i]) && (this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st),
                this.elements[i]._mdf && (this._mdf = !0))
        }
    }
    ,
    $.prototype.renderInnerContent = function() {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1)
            (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
    }
    ,
    $.prototype.setElements = function(t) {
        this.elements = t
    }
    ,
    $.prototype.getElements = function() {
        return this.elements
    }
    ,
    $.prototype.destroyElements = function() {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1)
            this.elements[t] && this.elements[t].destroy()
    }
    ,
    $.prototype.destroy = function() {
        this.destroyElements(),
        this.destroyBaseElement()
    }
    ,
    v([Y, N, Q, L, z, R], tt),
    tt.prototype.createContent = function() {
        var t = this.globalData.getAssetsPath(this.assetData);
        this.innerElem = A("image"),
        this.innerElem.setAttribute("width", this.assetData.w + "px"),
        this.innerElem.setAttribute("height", this.assetData.h + "px"),
        this.innerElem.setAttribute("preserveAspectRatio", "xMidYMid slice"),
        this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t),
        this.layerElement.appendChild(this.innerElem)
    }
    ,
    v([tt], et),
    et.prototype.createContent = function() {
        var t = A("rect");
        t.setAttribute("width", this.data.sw),
        t.setAttribute("height", this.data.sh),
        t.setAttribute("fill", this.data.sc),
        this.layerElement.appendChild(t)
    }
    ,
    v([F, $, Q], it),
    v([Y, N, Q, L, z, R, Z], st),
    st.prototype.createContent = function() {
        this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = A("text"))
    }
    ,
    st.prototype.buildTextContents = function(t) {
        for (var e = 0, i = t.length, s = [], n = ""; e < i; )
            t[e] === String.fromCharCode(13) ? (s.push(n),
            n = "") : n += t[e],
            e += 1;
        return s.push(n),
        s
    }
    ,
    st.prototype.buildNewText = function() {
        var t, e, i = this.textProperty.currentData;
        this.renderedLetters = k(i ? i.l.length : 0),
        i.fc ? this.layerElement.setAttribute("fill", this.buildColor(i.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"),
        i.sc && (this.layerElement.setAttribute("stroke", this.buildColor(i.sc)),
        this.layerElement.setAttribute("stroke-width", i.sw)),
        this.layerElement.setAttribute("font-size", i.finalSize);
        var s = this.globalData.fontManager.getFontByName(i.f);
        if (s.fClass)
            this.layerElement.setAttribute("class", s.fClass);
        else {
            this.layerElement.setAttribute("font-family", s.fFamily);
            var n = i.fWeight
              , r = i.fStyle;
            this.layerElement.setAttribute("font-style", r),
            this.layerElement.setAttribute("font-weight", n)
        }
        var a = i.l || []
          , o = this.globalData.fontManager.chars;
        if (e = a.length) {
            var h, l, p = this.mHelper, d = "", c = this.data.singleShape, f = 0, u = 0, m = !0, g = i.tr / 1e3 * i.finalSize;
            if (!c || o || i.sz) {
                var v, y, b = this.textSpans.length;
                for (t = 0; t < e; t += 1)
                    o && c && 0 !== t || (h = t < b ? this.textSpans[t] : A(o ? "path" : "text"),
                    b <= t && (h.setAttribute("stroke-linecap", "butt"),
                    h.setAttribute("stroke-linejoin", "round"),
                    h.setAttribute("stroke-miterlimit", "4"),
                    this.textSpans[t] = h,
                    this.layerElement.appendChild(h)),
                    h.style.display = "inherit"),
                    p.reset(),
                    p.scale(i.finalSize / 100, i.finalSize / 100),
                    c && (a[t].n && (f = -g,
                    u += i.yOffset,
                    u += m ? 1 : 0,
                    m = !1),
                    this.applyTextPropertiesToMatrix(i, p, a[t].line, f, u),
                    f += a[t].l || 0,
                    f += g),
                    o ? (l = (v = (y = this.globalData.fontManager.getCharData(i.finalText[t], s.fStyle, this.globalData.fontManager.getFontByName(i.f).fFamily)) && y.data || {}).shapes ? v.shapes[0].it : [],
                    c ? d += this.createPathShape(p, l) : h.setAttribute("d", this.createPathShape(p, l))) : (c && h.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"),
                    h.textContent = a[t].val,
                    h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
                c && h.setAttribute("d", d)
            } else {
                var w = this.textContainer
                  , E = "start";
                switch (i.j) {
                case 1:
                    E = "end";
                    break;
                case 2:
                    E = "middle"
                }
                w.setAttribute("text-anchor", E),
                w.setAttribute("letter-spacing", g);
                var _ = this.buildTextContents(i.finalText);
                for (e = _.length,
                u = i.ps ? i.ps[1] + i.ascent : 0,
                t = 0; t < e; t += 1)
                    (h = this.textSpans[t] || A("tspan")).textContent = _[t],
                    h.setAttribute("x", 0),
                    h.setAttribute("y", u),
                    h.style.display = "inherit",
                    w.appendChild(h),
                    this.textSpans[t] = h,
                    u += i.finalLineHeight;
                this.layerElement.appendChild(w)
            }
            for (; t < this.textSpans.length; )
                this.textSpans[t].style.display = "none",
                t += 1;
            this._sizeChanged = !0
        }
    }
    ,
    st.prototype.sourceRectAtTime = function(t) {
        if (this.prepareFrame(this.comp.renderedFrame - this.data.st),
        this.renderInnerContent(),
        this._sizeChanged) {
            this._sizeChanged = !1;
            var e = this.layerElement.getBBox();
            this.bbox = {
                top: e.y,
                left: e.x,
                width: e.width,
                height: e.height
            }
        }
        return this.bbox
    }
    ,
    st.prototype.renderInnerContent = function() {
        if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
        this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
            this._sizeChanged = !0;
            var t, e, i = this.textAnimator.renderedLetters, s = this.textProperty.currentData.l, n, r;
            for (e = s.length,
            t = 0; t < e; t += 1)
                s[t].n || (n = i[t],
                r = this.textSpans[t],
                n._mdf.m && r.setAttribute("transform", n.m),
                n._mdf.o && r.setAttribute("opacity", n.o),
                n._mdf.sw && r.setAttribute("stroke-width", n.sw),
                n._mdf.sc && r.setAttribute("stroke", n.sc),
                n._mdf.fc && r.setAttribute("fill", n.fc))
        }
    }
    ,
    v([Y, N, Q, K, L, z, R], nt),
    nt.prototype.initSecondaryElement = function() {}
    ,
    nt.prototype.identityMatrix = new te,
    nt.prototype.buildExpressionInterface = function() {}
    ,
    nt.prototype.createContent = function() {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
        this.filterUniqueShapes()
    }
    ,
    nt.prototype.filterUniqueShapes = function() {
        var t, e, i, s, n = this.shapes.length, r = this.stylesList.length, a = [], o = !1;
        for (i = 0; i < r; i += 1) {
            for (s = this.stylesList[i],
            o = !1,
            t = a.length = 0; t < n; t += 1)
                -1 !== (e = this.shapes[t]).styles.indexOf(s) && (a.push(e),
                o = e._isAnimated || o);
            1 < a.length && o && this.setShapesAsAnimated(a)
        }
    }
    ,
    nt.prototype.setShapesAsAnimated = function(t) {
        var e, i = t.length;
        for (e = 0; e < i; e += 1)
            t[e].setAsAnimated()
    }
    ,
    nt.prototype.createStyleElement = function(t, e) {
        var i, s = new q(t,e), n = s.pElem;
        if ("st" === t.ty)
            i = new W(this,t,s);
        else if ("fl" === t.ty)
            i = new H(this,t,s);
        else if ("gf" === t.ty || "gs" === t.ty) {
            var r;
            i = new ("gf" === t.ty ? U : G)(this,t,s),
            this.globalData.defs.appendChild(i.gf),
            i.maskId && (this.globalData.defs.appendChild(i.ms),
            this.globalData.defs.appendChild(i.of),
            n.setAttribute("mask", "url(#" + i.maskId + ")"))
        }
        return "st" !== t.ty && "gs" !== t.ty || (n.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"),
        n.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"),
        n.setAttribute("fill-opacity", "0"),
        1 === t.lj && n.setAttribute("stroke-miterlimit", t.ml)),
        2 === t.r && n.setAttribute("fill-rule", "evenodd"),
        t.ln && n.setAttribute("id", t.ln),
        t.cl && n.setAttribute("class", t.cl),
        this.stylesList.push(s),
        this.addToAnimatedContents(t, i),
        i
    }
    ,
    nt.prototype.createGroupElement = function(t) {
        var e = new X;
        return t.ln && e.gr.setAttribute("id", t.ln),
        e
    }
    ,
    nt.prototype.createTransformElement = function(t, e) {
        var i = ae.getTransformProperty(this, t, this)
          , s = new V(i,i.o,e);
        return this.addToAnimatedContents(t, s),
        s
    }
    ,
    nt.prototype.createShapeElement = function(t, e, i) {
        var s = 4;
        "rc" === t.ty ? s = 5 : "el" === t.ty ? s = 6 : "sr" === t.ty && (s = 7);
        var n, r = new j(e,i,oe.getShapeProp(this, t, s, this));
        return this.shapes.push(r),
        this.addShapeToModifiers(r),
        this.addToAnimatedContents(t, r),
        r
    }
    ,
    nt.prototype.addToAnimatedContents = function(t, e) {
        for (var i = 0, s = this.animatedContents.length; i < s; ) {
            if (this.animatedContents[i].element === e)
                return;
            i += 1
        }
        this.animatedContents.push({
            fn: ke.createRenderFunction(t),
            element: e,
            data: t
        })
    }
    ,
    nt.prototype.setElementStyles = function(t) {
        var e, i = t.styles, s = this.stylesList.length;
        for (e = 0; e < s; e += 1)
            this.stylesList[e].closed || i.push(this.stylesList[e])
    }
    ,
    nt.prototype.reloadShapes = function() {
        this._isFirstFrame = !0;
        var t, e = this.itemsData.length;
        for (t = 0; t < e; t += 1)
            this.prevViewData[t] = this.itemsData[t];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
        this.filterUniqueShapes(),
        e = this.dynamicProperties.length,
        t = 0; t < e; t += 1)
            this.dynamicProperties[t].getValue();
        this.renderModifiers()
    }
    ,
    nt.prototype.searchShapes = function(t, e, i, s, n, r, a) {
        var o, h, l, p, d, c, f = [].concat(r), u = t.length - 1, m = [], g = [];
        for (o = u; 0 <= o; o -= 1) {
            if ((c = this.searchProcessedElement(t[o])) ? e[o] = i[c - 1] : t[o]._render = a,
            "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty)
                c ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], n),
                t[o]._render && s.appendChild(e[o].style.pElem),
                m.push(e[o].style);
            else if ("gr" == t[o].ty) {
                if (c)
                    for (l = e[o].it.length,
                    h = 0; h < l; h += 1)
                        e[o].prevViewData[h] = e[o].it[h];
                else
                    e[o] = this.createGroupElement(t[o]);
                this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, n + 1, f, a),
                t[o]._render && s.appendChild(e[o].gr)
            } else
                "tr" == t[o].ty ? (c || (e[o] = this.createTransformElement(t[o], s)),
                p = e[o].transform,
                f.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (c || (e[o] = this.createShapeElement(t[o], f, n)),
                this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (c ? (d = e[o]).closed = !1 : ((d = he.getModifier(t[o].ty)).init(this, t[o]),
                e[o] = d,
                this.shapeModifiers.push(d)),
                g.push(d)) : "rp" == t[o].ty && (c ? (d = e[o]).closed = !0 : (d = he.getModifier(t[o].ty),
                (e[o] = d).init(this, t, o, e),
                this.shapeModifiers.push(d),
                a = !1),
                g.push(d));
            this.addProcessedElement(t[o], o + 1)
        }
        for (u = m.length,
        o = 0; o < u; o += 1)
            m[o].closed = !0;
        for (u = g.length,
        o = 0; o < u; o += 1)
            g[o].closed = !0
    }
    ,
    nt.prototype.renderInnerContent = function() {
        this.renderModifiers();
        var t, e = this.stylesList.length;
        for (t = 0; t < e; t += 1)
            this.stylesList[t].reset();
        for (this.renderShape(),
        t = 0; t < e; t += 1)
            (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d),
            this.stylesList[t].d = "M0 0" + this.stylesList[t].d),
            this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
    }
    ,
    nt.prototype.renderShape = function() {
        var t, e, i = this.animatedContents.length;
        for (t = 0; t < i; t += 1)
            e = this.animatedContents[t],
            (this._isFirstFrame || e.element._isAnimated) && e.fn(e.data, e.element, this._isFirstFrame)
    }
    ,
    nt.prototype.destroy = function() {
        this.destroyBaseElement(),
        this.shapeData = null,
        this.itemsData = null
    }
    ,
    rt.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[0].p.v
              , i = this.filterManager.effectElements[1].p.v
              , s = this.filterManager.effectElements[2].p.v / 100;
            this.matrixFilter.setAttribute("values", i[0] - e[0] + " 0 0 0 " + e[0] + " " + (i[1] - e[1]) + " 0 0 0 " + e[1] + " " + (i[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + s + " 0")
        }
    }
    ,
    at.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[2].p.v
              , i = this.filterManager.effectElements[6].p.v;
            this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + i + " 0")
        }
    }
    ,
    ot.prototype.initialize = function() {
        var t, e, i, s, n = this.elem.layerElement.children || this.elem.layerElement.childNodes;
        for (1 === this.filterManager.effectElements[1].p.v ? (s = this.elem.maskManager.masksProperties.length,
        i = 0) : s = (i = this.filterManager.effectElements[0].p.v - 1) + 1,
        (e = A("g")).setAttribute("fill", "none"),
        e.setAttribute("stroke-linecap", "round"),
        e.setAttribute("stroke-dashoffset", 1); i < s; i += 1)
            t = A("path"),
            e.appendChild(t),
            this.paths.push({
                p: t,
                m: i
            });
        if (3 === this.filterManager.effectElements[10].p.v) {
            var r = A("mask")
              , a = "stms_" + _(10);
            r.setAttribute("id", a),
            r.setAttribute("mask-type", "alpha"),
            r.appendChild(e),
            this.elem.globalData.defs.appendChild(r);
            var o = A("g");
            o.setAttribute("mask", "url(" + jt + "#" + a + ")"),
            n[0] && o.appendChild(n[0]),
            this.elem.layerElement.appendChild(o),
            this.masker = r,
            e.setAttribute("stroke", "#fff")
        } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
            if (2 === this.filterManager.effectElements[10].p.v)
                for (n = this.elem.layerElement.children || this.elem.layerElement.childNodes; n.length; )
                    this.elem.layerElement.removeChild(n[0]);
            this.elem.layerElement.appendChild(e),
            this.elem.layerElement.removeAttribute("mask"),
            e.setAttribute("stroke", "#fff")
        }
        this.initialized = !0,
        this.pathMasker = e
    }
    ,
    ot.prototype.renderFrame = function(t) {
        this.initialized || this.initialize();
        var e, i, s, n = this.paths.length;
        for (e = 0; e < n; e += 1)
            if (-1 !== this.paths[e].m && (i = this.elem.maskManager.viewData[this.paths[e].m],
            s = this.paths[e].p,
            (t || this.filterManager._mdf || i.prop._mdf) && s.setAttribute("d", i.lastPath),
            t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || i.prop._mdf)) {
                var r;
                if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                    var a = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100
                      , o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100
                      , h = s.getTotalLength();
                    r = "0 0 0 " + h * a + " ";
                    var l, p = h * (o - a), d = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100, c = Math.floor(p / d);
                    for (l = 0; l < c; l += 1)
                        r += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
                    r += "0 " + 10 * h + " 0 0"
                } else
                    r = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;
                s.setAttribute("stroke-dasharray", r)
            }
        if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v),
        (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v),
        (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
            var f = this.filterManager.effectElements[3].p.v;
            this.pathMasker.setAttribute("stroke", "rgb(" + Gt(255 * f[0]) + "," + Gt(255 * f[1]) + "," + Gt(255 * f[2]) + ")")
        }
    }
    ,
    ht.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[0].p.v
              , i = this.filterManager.effectElements[1].p.v
              , s = this.filterManager.effectElements[2].p.v
              , n = s[0] + " " + i[0] + " " + e[0]
              , r = s[1] + " " + i[1] + " " + e[1]
              , a = s[2] + " " + i[2] + " " + e[2];
            this.feFuncR.setAttribute("tableValues", n),
            this.feFuncG.setAttribute("tableValues", r),
            this.feFuncB.setAttribute("tableValues", a)
        }
    }
    ,
    lt.prototype.createFeFunc = function(t, e) {
        var i = A(t);
        return i.setAttribute("type", "table"),
        e.appendChild(i),
        i
    }
    ,
    lt.prototype.getTableValue = function(t, e, i, s, n) {
        for (var r, a, o = 0, h = 256, l = Math.min(t, e), p = Math.max(t, e), d = Array.call(null, {
            length: h
        }), c = 0, f = n - s, u = e - t; o <= 256; )
            a = (r = o / 256) <= l ? u < 0 ? n : s : p <= r ? u < 0 ? s : n : s + f * Math.pow((r - t) / u, 1 / i),
            d[c++] = a,
            o += 256 / 255;
        return d.join(" ")
    }
    ,
    lt.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
            var e, i = this.filterManager.effectElements;
            this.feFuncRComposed && (t || i[3].p._mdf || i[4].p._mdf || i[5].p._mdf || i[6].p._mdf || i[7].p._mdf) && (e = this.getTableValue(i[3].p.v, i[4].p.v, i[5].p.v, i[6].p.v, i[7].p.v),
            this.feFuncRComposed.setAttribute("tableValues", e),
            this.feFuncGComposed.setAttribute("tableValues", e),
            this.feFuncBComposed.setAttribute("tableValues", e)),
            this.feFuncR && (t || i[10].p._mdf || i[11].p._mdf || i[12].p._mdf || i[13].p._mdf || i[14].p._mdf) && (e = this.getTableValue(i[10].p.v, i[11].p.v, i[12].p.v, i[13].p.v, i[14].p.v),
            this.feFuncR.setAttribute("tableValues", e)),
            this.feFuncG && (t || i[17].p._mdf || i[18].p._mdf || i[19].p._mdf || i[20].p._mdf || i[21].p._mdf) && (e = this.getTableValue(i[17].p.v, i[18].p.v, i[19].p.v, i[20].p.v, i[21].p.v),
            this.feFuncG.setAttribute("tableValues", e)),
            this.feFuncB && (t || i[24].p._mdf || i[25].p._mdf || i[26].p._mdf || i[27].p._mdf || i[28].p._mdf) && (e = this.getTableValue(i[24].p.v, i[25].p.v, i[26].p.v, i[27].p.v, i[28].p.v),
            this.feFuncB.setAttribute("tableValues", e)),
            this.feFuncA && (t || i[31].p._mdf || i[32].p._mdf || i[33].p._mdf || i[34].p._mdf || i[35].p._mdf) && (e = this.getTableValue(i[31].p.v, i[32].p.v, i[33].p.v, i[34].p.v, i[35].p.v),
            this.feFuncA.setAttribute("tableValues", e))
        }
    }
    ,
    pt.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
            if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4),
            t || this.filterManager.effectElements[0].p._mdf) {
                var e = this.filterManager.effectElements[0].p.v;
                this.feFlood.setAttribute("flood-color", Zt(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
            }
            if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255),
            t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
                var i = this.filterManager.effectElements[3].p.v
                  , s = (this.filterManager.effectElements[2].p.v - 90) * Qt
                  , n = i * Math.cos(s)
                  , r = i * Math.sin(s);
                this.feOffset.setAttribute("dx", n),
                this.feOffset.setAttribute("dy", r)
            }
        }
    }
    ;
    var Ae = []
      , Ce = 0;
    mt.prototype.findSymbol = function(t) {
        for (var e = 0, i = Ae.length; e < i; ) {
            if (Ae[e] === t)
                return Ae[e];
            e += 1
        }
        return null
    }
    ,
    mt.prototype.replaceInParent = function(t, e) {
        var i = t.layerElement.parentNode;
        if (i) {
            for (var s = i.children, n = 0, r = s.length; n < r && s[n] !== t.layerElement; )
                n += 1;
            var a;
            n <= r - 2 && (a = s[n + 1]);
            var o = A("use");
            o.setAttribute("href", "#" + e),
            a ? i.insertBefore(o, a) : i.appendChild(o)
        }
    }
    ,
    mt.prototype.setElementAsMask = function(t, e) {
        if (!this.findSymbol(e)) {
            var i = "matte_" + _(5) + "_" + Ce++
              , s = A("mask");
            s.setAttribute("id", e.layerId),
            s.setAttribute("mask-type", "alpha"),
            Ae.push(e);
            var n = t.globalData.defs;
            n.appendChild(s);
            var r = A("symbol");
            r.setAttribute("id", i),
            this.replaceInParent(e, i),
            r.appendChild(e.layerElement),
            n.appendChild(r);
            var a = A("use");
            a.setAttribute("href", "#" + i),
            s.appendChild(a),
            e.data.hd = !1,
            e.show()
        }
        t.setMatte(e.layerId)
    }
    ,
    mt.prototype.initialize = function() {
        for (var t = this.filterManager.effectElements[0].p.v, e = 0, i = this.elem.comp.elements.length; e < i; )
            this.elem.comp.elements[e].data.ind === t && this.setElementAsMask(this.elem, this.elem.comp.elements[e]),
            e += 1;
        this.initialized = !0
    }
    ,
    mt.prototype.renderFrame = function() {
        this.initialized || this.initialize()
    }
    ,
    gt.prototype.renderFrame = function(t) {
        var e, i = this.filters.length;
        for (e = 0; e < i; e += 1)
            this.filters[e].renderFrame(t)
    }
    ;
    var Se = function() {
        function i(t) {
            for (var e = 0, i = t.target; e < _; )
                w[e].animation === i && (w.splice(e, 1),
                e -= 1,
                _ -= 1,
                i.isPaused || n()),
                e += 1
        }
        function h(t, e) {
            if (!t)
                return null;
            for (var i = 0; i < _; ) {
                if (w[i].elem == t && null !== w[i].elem)
                    return w[i].animation;
                i += 1
            }
            var s = new xe;
            return r(s, t),
            s.setData(t, e),
            s
        }
        function s() {
            A += 1,
            y()
        }
        function n() {
            0 === (A -= 1) && (k = !0)
        }
        function r(t, e) {
            t.addEventListener("destroy", i),
            t.addEventListener("_active", s),
            t.addEventListener("_idle", n),
            w.push({
                elem: e,
                animation: t
            }),
            _ += 1
        }
        function t(t) {
            var e = new xe;
            return r(e, null),
            e.setParams(t),
            e
        }
        function e(t, e) {
            var i;
            for (i = 0; i < _; i += 1)
                w[i].animation.setSpeed(t, e)
        }
        function a(t, e) {
            var i;
            for (i = 0; i < _; i += 1)
                w[i].animation.setDirection(t, e)
        }
        function o(t) {
            var e;
            for (e = 0; e < _; e += 1)
                w[e].animation.play(t)
        }
        function l(t) {
            var e, i = t - E;
            for (e = 0; e < _; e += 1)
                w[e].animation.advanceTime(i);
            E = t,
            k ? C = !0 : S.requestAnimationFrame(l)
        }
        function p(t) {
            E = t,
            S.requestAnimationFrame(l)
        }
        function d(t) {
            var e;
            for (e = 0; e < _; e += 1)
                w[e].animation.pause(t)
        }
        function c(t, e, i) {
            var s;
            for (s = 0; s < _; s += 1)
                w[s].animation.goToAndStop(t, e, i)
        }
        function f(t) {
            var e;
            for (e = 0; e < _; e += 1)
                w[e].animation.stop(t)
        }
        function u(t) {
            var e;
            for (e = 0; e < _; e += 1)
                w[e].animation.togglePause(t)
        }
        function m(t) {
            var e;
            for (e = _ - 1; 0 <= e; e -= 1)
                w[e].animation.destroy(t)
        }
        function g(t, e, i) {
            var s, n = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))), r = n.length;
            for (s = 0; s < r; s += 1)
                i && n[s].setAttribute("data-bm-type", i),
                h(n[s], t);
            if (e && 0 === r) {
                i || (i = "svg");
                var a = document.getElementsByTagName("body")[0];
                a.innerHTML = "";
                var o = x("div");
                o.style.width = "100%",
                o.style.height = "100%",
                o.setAttribute("data-bm-type", i),
                a.appendChild(o),
                h(o, t)
            }
        }
        function v() {
            var t;
            for (t = 0; t < _; t += 1)
                w[t].animation.resize()
        }
        function y() {
            k && (k = !1,
            C && (S.requestAnimationFrame(p),
            C = !1))
        }
        var b = {}
          , w = []
          , E = 0
          , _ = 0
          , k = !0
          , A = 0
          , C = !0;
        return b.registerAnimation = h,
        b.loadAnimation = t,
        b.setSpeed = e,
        b.setDirection = a,
        b.play = o,
        b.pause = d,
        b.stop = f,
        b.togglePause = u,
        b.searchAnimations = g,
        b.resize = v,
        b.goToAndStop = c,
        b.destroy = m,
        b
    }()
      , xe = function() {
        this._cbs = [],
        this.name = "",
        this.path = "",
        this.isLoaded = !1,
        this.currentFrame = 0,
        this.currentRawFrame = 0,
        this.totalFrames = 0,
        this.frameRate = 0,
        this.frameMult = 0,
        this.playSpeed = 1,
        this.playDirection = 1,
        this.pendingElements = 0,
        this.playCount = 0,
        this.animationData = {},
        this.layers = [],
        this.assets = [],
        this.isPaused = !0,
        this.autoplay = !1,
        this.loop = !0,
        this.renderer = null,
        this.animationID = _(10),
        this.assetsPath = "",
        this.timeCompleted = 0,
        this.segmentPos = 0,
        this.subframeEnabled = Wt,
        this.segments = [],
        this._idle = !0,
        this.projectInterface = {}
    };
    v([l], xe),
    xe.prototype.setParams = function(t) {
        var e = this;
        t.context && (this.context = t.context),
        (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
        var i = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
        switch (i) {
        case "canvas":
            this.renderer = new CanvasRenderer(this,t.rendererSettings);
            break;
        case "svg":
            this.renderer = new F(this,t.rendererSettings);
            break;
        default:
            this.renderer = new HybridRenderer(this,t.rendererSettings)
        }
        if (this.renderer.setProjectInterface(this.projectInterface),
        this.animType = i,
        "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)),
        this.autoplay = !("autoplay"in t) || t.autoplay,
        this.name = t.name ? t.name : "",
        this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments,
        this.assetsPath = t.assetsPath,
        t.animationData)
            e.configAnimation(t.animationData);
        else if (t.path) {
            "json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"),
            t.path += "data.json");
            var s = new XMLHttpRequest;
            -1 != t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1),
            this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1),
            this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")),
            s.open("GET", t.path, !0),
            s.send(),
            s.onreadystatechange = function() {
                if (4 == s.readyState)
                    if (200 == s.status)
                        e.configAnimation(JSON.parse(s.responseText));
                    else
                        try {
                            var t = JSON.parse(s.responseText);
                            e.configAnimation(t)
                        } catch (t) {}
            }
        }
    }
    ,
    xe.prototype.setData = function(t, e) {
        var i = {
            wrapper: t,
            animationData: e ? "object" == typeof e ? e : JSON.parse(e) : null
        }
          , s = t.attributes;
        i.path = s.getNamedItem("data-animation-path") ? s.getNamedItem("data-animation-path").value : s.getNamedItem("data-bm-path") ? s.getNamedItem("data-bm-path").value : s.getNamedItem("bm-path") ? s.getNamedItem("bm-path").value : "",
        i.animType = s.getNamedItem("data-anim-type") ? s.getNamedItem("data-anim-type").value : s.getNamedItem("data-bm-type") ? s.getNamedItem("data-bm-type").value : s.getNamedItem("bm-type") ? s.getNamedItem("bm-type").value : s.getNamedItem("data-bm-renderer") ? s.getNamedItem("data-bm-renderer").value : s.getNamedItem("bm-renderer") ? s.getNamedItem("bm-renderer").value : "canvas";
        var n = s.getNamedItem("data-anim-loop") ? s.getNamedItem("data-anim-loop").value : s.getNamedItem("data-bm-loop") ? s.getNamedItem("data-bm-loop").value : s.getNamedItem("bm-loop") ? s.getNamedItem("bm-loop").value : "";
        "" === n || (i.loop = "false" !== n && ("true" === n || parseInt(n)));
        var r = s.getNamedItem("data-anim-autoplay") ? s.getNamedItem("data-anim-autoplay").value : s.getNamedItem("data-bm-autoplay") ? s.getNamedItem("data-bm-autoplay").value : !s.getNamedItem("bm-autoplay") || s.getNamedItem("bm-autoplay").value, a;
        i.autoplay = "false" !== r,
        i.name = s.getNamedItem("data-name") ? s.getNamedItem("data-name").value : s.getNamedItem("data-bm-name") ? s.getNamedItem("data-bm-name").value : s.getNamedItem("bm-name") ? s.getNamedItem("bm-name").value : "",
        "false" === (s.getNamedItem("data-anim-prerender") ? s.getNamedItem("data-anim-prerender").value : s.getNamedItem("data-bm-prerender") ? s.getNamedItem("data-bm-prerender").value : s.getNamedItem("bm-prerender") ? s.getNamedItem("bm-prerender").value : "") && (i.prerender = !1),
        this.setParams(i)
    }
    ,
    xe.prototype.includeLayers = function(t) {
        t.op > this.animationData.op && (this.animationData.op = t.op,
        this.totalFrames = Math.floor(t.op - this.animationData.ip),
        this.animationData.tf = this.totalFrames);
        var e, i, s = this.animationData.layers, n = s.length, r = t.layers, a = r.length;
        for (i = 0; i < a; i += 1)
            for (e = 0; e < n; ) {
                if (s[e].id == r[i].id) {
                    s[e] = r[i];
                    break
                }
                e += 1
            }
        if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars),
        this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)),
        t.assets)
            for (n = t.assets.length,
            e = 0; e < n; e += 1)
                this.animationData.assets.push(t.assets[e]);
        this.animationData.__complete = !1,
        se.completeData(this.animationData, this.renderer.globalData.fontManager),
        this.renderer.includeLayers(t.layers),
        Rt && Rt.initExpressions(this),
        this.renderer.renderFrame(-1),
        this.loadNextSegment()
    }
    ,
    xe.prototype.loadNextSegment = function() {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments)
            return this.trigger("data_ready"),
            void (this.timeCompleted = this.animationData.tf);
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var i = new XMLHttpRequest
          , s = this
          , n = this.path + this.fileName + "_" + this.segmentPos + ".json";
        this.segmentPos += 1,
        i.open("GET", n, !0),
        i.send(),
        i.onreadystatechange = function() {
            if (4 == i.readyState)
                if (200 == i.status)
                    s.includeLayers(JSON.parse(i.responseText));
                else
                    try {
                        var t = JSON.parse(i.responseText);
                        s.includeLayers(t)
                    } catch (t) {}
        }
    }
    ,
    xe.prototype.loadSegments = function() {
        var t;
        this.animationData.segments || (this.timeCompleted = this.animationData.tf),
        this.loadNextSegment()
    }
    ,
    xe.prototype.configAnimation = function(t) {
        var e = this;
        this.renderer && (this.animationData = t,
        this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip),
        this.animationData.tf = this.totalFrames,
        this.renderer.configAnimation(t),
        t.assets || (t.assets = []),
        t.comps && (t.assets = t.assets.concat(t.comps),
        t.comps = null),
        this.renderer.searchExtraCompositions(t.assets),
        this.layers = this.animationData.layers,
        this.assets = this.animationData.assets,
        this.frameRate = this.animationData.fr,
        this.firstFrame = Math.round(this.animationData.ip),
        this.frameMult = this.animationData.fr / 1e3,
        this.trigger("config_ready"),
        this.imagePreloader = new pe,
        this.imagePreloader.setAssetsPath(this.assetsPath),
        this.imagePreloader.setPath(this.path),
        this.imagePreloader.loadAssets(t.assets, function(t) {
            t || e.trigger("loaded_images")
        }),
        this.loadSegments(),
        this.updaFrameModifier(),
        this.renderer.globalData.fontManager ? this.waitForFontsLoaded() : (se.completeData(this.animationData, this.renderer.globalData.fontManager),
        this.checkLoaded()))
    }
    ,
    xe.prototype.waitForFontsLoaded = function() {
        function t() {
            this.renderer.globalData.fontManager.loaded ? (se.completeData(this.animationData, this.renderer.globalData.fontManager),
            this.checkLoaded()) : setTimeout(t.bind(this), 20)
        }
        return function() {
            t.bind(this)()
        }
    }(),
    xe.prototype.addPendingElement = function() {
        this.pendingElements += 1
    }
    ,
    xe.prototype.elementLoaded = function() {
        this.pendingElements--,
        this.checkLoaded()
    }
    ,
    xe.prototype.checkLoaded = function() {
        0 === this.pendingElements && (Rt && Rt.initExpressions(this),
        this.renderer.initItems(),
        setTimeout(function() {
            this.trigger("DOMLoaded")
        }
        .bind(this), 0),
        this.isLoaded = !0,
        this.gotoFrame(),
        this.autoplay && this.play())
    }
    ,
    xe.prototype.resize = function() {
        this.renderer.updateContainerSize()
    }
    ,
    xe.prototype.setSubframe = function(t) {
        this.subframeEnabled = !!t
    }
    ,
    xe.prototype.gotoFrame = function() {
        this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame,
        this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted),
        this.trigger("enterFrame"),
        this.renderFrame()
    }
    ,
    xe.prototype.renderFrame = function() {
        !1 !== this.isLoaded && this.renderer.renderFrame(this.currentFrame + this.firstFrame)
    }
    ,
    xe.prototype.play = function(t) {
        t && this.name != t || !0 === this.isPaused && (this.isPaused = !1,
        this._idle && (this._idle = !1,
        this.trigger("_active")))
    }
    ,
    xe.prototype.pause = function(t) {
        t && this.name != t || !1 === this.isPaused && (this.isPaused = !0,
        this._idle = !0,
        this.trigger("_idle"))
    }
    ,
    xe.prototype.togglePause = function(t) {
        t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause())
    }
    ,
    xe.prototype.stop = function(t) {
        t && this.name != t || (this.pause(),
        this.playCount = 0,
        this.setCurrentRawFrameValue(0))
    }
    ,
    xe.prototype.goToAndStop = function(t, e, i) {
        i && this.name != i || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier),
        this.pause())
    }
    ,
    xe.prototype.goToAndPlay = function(t, e, i) {
        this.goToAndStop(t, e, i),
        this.play()
    }
    ,
    xe.prototype.advanceTime = function(t) {
        if (!0 !== this.isPaused && !1 !== this.isLoaded) {
            var e = this.currentRawFrame + t * this.frameModifier
              , i = !1;
            e >= this.totalFrames - 1 && 0 < this.frameModifier ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1,
            this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames),
            this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e % this.totalFrames) || (i = !0,
            e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (i = !0,
            e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames),
            this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e),
            i && (this.setCurrentRawFrameValue(e),
            this.pause(),
            this.trigger("complete"))
        }
    }
    ,
    xe.prototype.adjustSegment = function(t, e) {
        this.playCount = 0,
        t[1] < t[0] ? (0 < this.frameModifier && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)),
        this.timeCompleted = this.totalFrames = t[0] - t[1],
        this.firstFrame = t[1],
        this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)),
        this.timeCompleted = this.totalFrames = t[1] - t[0],
        this.firstFrame = t[0],
        this.setCurrentRawFrameValue(.001 + e)),
        this.trigger("segmentStart")
    }
    ,
    xe.prototype.setSegment = function(t, e) {
        var i = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < t ? i = t : this.currentRawFrame + this.firstFrame > e && (i = e - t)),
        this.firstFrame = t,
        this.timeCompleted = this.totalFrames = e - t,
        -1 !== i && this.goToAndStop(i, !0)
    }
    ,
    xe.prototype.playSegments = function(t, e) {
        if ("object" == typeof t[0]) {
            var i, s = t.length;
            for (i = 0; i < s; i += 1)
                this.segments.push(t[i])
        } else
            this.segments.push(t);
        e && this.checkSegments(0),
        this.isPaused && this.play()
    }
    ,
    xe.prototype.resetSegments = function(t) {
        this.segments.length = 0,
        this.segments.push([this.animationData.ip, this.animationData.op]),
        t && this.checkSegments(0)
    }
    ,
    xe.prototype.checkSegments = function(t) {
        return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t),
        !0)
    }
    ,
    xe.prototype.destroy = function(t) {
        t && this.name != t || !this.renderer || (this.renderer.destroy(),
        this.trigger("destroy"),
        this._cbs = null,
        this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null,
        this.renderer = null)
    }
    ,
    xe.prototype.setCurrentRawFrameValue = function(t) {
        this.currentRawFrame = t,
        this.gotoFrame()
    }
    ,
    xe.prototype.setSpeed = function(t) {
        this.playSpeed = t,
        this.updaFrameModifier()
    }
    ,
    xe.prototype.setDirection = function(t) {
        this.playDirection = t < 0 ? -1 : 1,
        this.updaFrameModifier()
    }
    ,
    xe.prototype.updaFrameModifier = function() {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
    }
    ,
    xe.prototype.getPath = function() {
        return this.path
    }
    ,
    xe.prototype.getAssetsPath = function(t) {
        var e = "";
        if (this.assetsPath) {
            var i = t.p;
            -1 !== i.indexOf("images/") && (i = i.split("/")[1]),
            e = this.assetsPath + i
        } else
            e = this.path,
            e += t.u ? t.u : "",
            e += t.p;
        return e
    }
    ,
    xe.prototype.getAssetData = function(t) {
        for (var e = 0, i = this.assets.length; e < i; ) {
            if (t == this.assets[e].id)
                return this.assets[e];
            e += 1
        }
    }
    ,
    xe.prototype.hide = function() {
        this.renderer.hide()
    }
    ,
    xe.prototype.show = function() {
        this.renderer.show()
    }
    ,
    xe.prototype.getAssets = function() {
        return this.assets
    }
    ,
    xe.prototype.getDuration = function(t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate
    }
    ,
    xe.prototype.trigger = function(t) {
        if (this._cbs && this._cbs[t])
            switch (t) {
            case "enterFrame":
                this.triggerEvent(t, new i(t,this.currentFrame,this.totalFrames,this.frameMult));
                break;
            case "loopComplete":
                this.triggerEvent(t, new n(t,this.loop,this.playCount,this.frameMult));
                break;
            case "complete":
                this.triggerEvent(t, new s(t,this.frameMult));
                break;
            case "segmentStart":
                this.triggerEvent(t, new r(t,this.firstFrame,this.totalFrames));
                break;
            case "destroy":
                this.triggerEvent(t, new a(t,this));
                break;
            default:
                this.triggerEvent(t)
            }
        "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new i(t,this.currentFrame,this.totalFrames,this.frameMult)),
        "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new n(t,this.loop,this.playCount,this.frameMult)),
        "complete" === t && this.onComplete && this.onComplete.call(this, new s(t,this.frameMult)),
        "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new r(t,this.firstFrame,this.totalFrames)),
        "destroy" === t && this.onDestroy && this.onDestroy.call(this, new a(t,this))
    }
    ;
    var De = {};
    De.play = bt,
    De.pause = wt,
    De.setLocationHref = yt,
    De.togglePause = Et,
    De.setSpeed = _t,
    De.setDirection = kt,
    De.stop = At,
    De.searchAnimations = Ct,
    De.registerAnimation = St,
    De.loadAnimation = Mt,
    De.setSubframeRendering = Pt,
    De.resize = xt,
    De.goToAndStop = Dt,
    De.destroy = Tt,
    De.setQuality = Ft,
    De.inBrowser = It,
    De.installPlugin = Lt,
    De.__getFactory = zt,
    De.version = "5.1.13";
    var Pe = "__[STANDALONE]__"
      , Me = "__[ANIMATIONDATA]__"
      , Te = "";
    if (Pe) {
        var Fe = document.getElementsByTagName("script"), Ie, Le, ze = (Fe[Fe.length - 1] || {
            src: ""
        }).src.replace(/^[^\?]+\??/, "");
        Te = Bt("renderer")
    }
    var Ne = setInterval(Nt, 100);
    return De
}),
function(t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.Rellax = e()
}(this, function() {
    var h = function(t, e) {
        var d = Object.create(h.prototype)
          , n = 0
          , c = 0
          , r = 0
          , f = 0
          , u = []
          , m = !0
          , i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
            setTimeout(t, 1e3 / 60)
        }
          , a = window.transformProp || function() {
            var t = document.createElement("div");
            if (null === t.style.transform) {
                var e = ["Webkit", "Moz", "ms"], i;
                for (i in e)
                    if (void 0 !== t.style[e[i] + "Transform"])
                        return e[i] + "Transform"
            }
            return "transform"
        }();
        d.options = {
            speed: -2,
            center: !1,
            wrapper: null,
            round: !0,
            vertical: !0,
            horizontal: !1,
            callback: function() {}
        },
        e && Object.keys(e).forEach(function(t) {
            d.options[t] = e[t]
        }),
        t || (t = ".rellax");
        var s = "string" == typeof t ? document.querySelectorAll(t) : [t];
        if (!(0 < s.length))
            throw Error("The elements you're trying to select don't exist.");
        if (d.elems = s,
        d.options.wrapper && !d.options.wrapper.nodeType) {
            if (!(s = document.querySelector(d.options.wrapper)))
                throw Error("The wrapper you're trying to use don't exist.");
            d.options.wrapper = s
        }
        var g = function() {
            for (var t = 0; t < u.length; t++)
                d.elems[t].style.cssText = u[t].style;
            for (u = [],
            c = window.innerHeight,
            f = window.innerWidth,
            v(),
            t = 0; t < d.elems.length; t++) {
                var e = d.elems[t]
                  , i = e.getAttribute("data-rellax-percentage")
                  , s = e.getAttribute("data-rellax-speed")
                  , n = e.getAttribute("data-rellax-zindex") || 0
                  , r = d.options.wrapper ? d.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                  , a = d.options.vertical && (i || d.options.center) ? r : 0
                  , o = d.options.horizontal && (i || d.options.center) ? window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0;
                r = a + e.getBoundingClientRect().top;
                var h = e.clientHeight || e.offsetHeight || e.scrollHeight
                  , l = o + e.getBoundingClientRect().left
                  , p = e.clientWidth || e.offsetWidth || e.scrollWidth;
                a = i || (a - r + c) / (h + c),
                i = i || (o - l + f) / (p + f),
                d.options.center && (a = i = .5),
                s = s || d.options.speed,
                i = y(i, a, s),
                a = "",
                0 <= (e = e.style.cssText).indexOf("transform") && (a = e.indexOf("transform"),
                a = (o = (a = e.slice(a)).indexOf(";")) ? " " + a.slice(11, o).replace(/\s/g, "") : " " + a.slice(11).replace(/\s/g, "")),
                u.push({
                    baseX: i.x,
                    baseY: i.y,
                    top: r,
                    left: l,
                    height: h,
                    width: p,
                    speed: s,
                    style: e,
                    transform: a,
                    zindex: n
                })
            }
            m && (window.addEventListener("resize", g),
            m = !1),
            b()
        }
          , v = function() {
            var t = n
              , e = r;
            return n = d.options.wrapper ? d.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset,
            r = d.options.wrapper ? d.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset,
            !!(t != n && d.options.vertical || e != r && d.options.horizontal)
        }
          , y = function(t, e, i) {
            var s = {};
            return t = 100 * i * (1 - t),
            e = 100 * i * (1 - e),
            s.x = d.options.round ? Math.round(t) : Math.round(100 * t) / 100,
            s.y = d.options.round ? Math.round(e) : Math.round(100 * e) / 100,
            s
        }
          , o = function() {
            v() && !1 === m && b(),
            i(o)
        }
          , b = function() {
            for (var t, e = 0; e < d.elems.length; e++) {
                var i = (t = y((r - u[e].left + f) / (u[e].width + f), (n - u[e].top + c) / (u[e].height + c), u[e].speed)).y - u[e].baseY
                  , s = t.x - u[e].baseX;
                d.elems[e].style[a] = "translate3d(" + (d.options.horizontal ? s : "0") + "px," + (d.options.vertical ? i : "0") + "px," + u[e].zindex + "px) " + u[e].transform
            }
            d.options.callback(t)
        };
        return d.destroy = function() {
            for (var t = 0; t < d.elems.length; t++)
                d.elems[t].style.cssText = u[t].style;
            m || (window.removeEventListener("resize", g),
            m = !0)
        }
        ,
        g(),
        o(),
        d.refresh = g,
        d
    };
    return h
});
var ScrollTriggers = function() {
    "use strict";
    function d(t, e) {
        var i = o(t, e);
        return i.length ? i[0] : null
    }
    function n(t) {
        return null != t && t === t.window
    }
    function o(t, e) {
        var i = 1 < arguments.length && void 0 !== e ? e : null;
        if (t instanceof HTMLElement || t instanceof Node || n(t))
            return [t];
        if (t instanceof NodeList)
            return [].slice.call(t);
        if ("string" != typeof t)
            return [];
        var s = i ? d(i) : document;
        return [].slice.call(s.querySelectorAll(t))
    }
    function a(t, e) {
        if (Array.isArray(t))
            return t.forEach(function(t) {
                return a(t, e)
            });
        var i = o(t);
        if (i.length) {
            var s = [].concat(e);
            return i.forEach(function(e) {
                s.forEach(function(t) {
                    e.classList.add(t)
                })
            }),
            i
        }
    }
    function h(t, e, i, s) {
        var n = 3 < arguments.length && void 0 !== s && s;
        if (Array.isArray(t))
            t.forEach(function(t) {
                return h(t, e, i, n)
            });
        else {
            var r = {
                cb: i,
                capture: n
            };
            window._domassistevents || (window._domassistevents = {}),
            window._domassistevents["_" + e] = r;
            var a = o(t);
            a.length && a.forEach(function(t) {
                t.addEventListener(e, i, n)
            })
        }
    }
    function t() {
        try {
            var t = new i("t",{
                detail: {
                    a: "b"
                }
            });
            return "t" === t.type && "b" === t.detail.a
        } catch (t) {
            return !1
        }
    }
    function l(t, i, s) {
        if (Array.isArray(t))
            return t.forEach(function(t) {
                return l(t, i, s)
            });
        var e = o(t);
        return e.length ? (e.forEach(function(t) {
            var e = new p(i,s);
            t.dispatchEvent(e)
        }),
        e) : void 0
    }
    function r(t, e) {
        if (Array.isArray(t))
            return t.forEach(function(t) {
                return r(t, e)
            });
        var i = o(t);
        if (i.length) {
            var s = [].concat(e);
            return i.forEach(function(e) {
                s.forEach(function(t) {
                    e.classList.remove(t)
                })
            }),
            i
        }
    }
    function e() {
        if (f)
            return f;
        var t = window.document.documentElement
          , e = void 0;
        return e = (t.scrollTop = 1) === t.scrollTop ? (t.scrollTop = 0,
        t) : document.body,
        f = e
    }
    function c(t, i) {
        Array.isArray(t) && t.forEach(function(t) {
            return c(t, i)
        });
        var e = o(t);
        e.length && e.forEach(function(e) {
            Object.keys(i).forEach(function(t) {
                e.style[t] = i[t]
            })
        })
    }
    var i = window.CustomEvent
      , s = function t(e, i) {
        var s = document.createEvent("CustomEvent");
        return i ? s.initCustomEvent(e, i.bubbles, i.cancelable, i.detail) : s.initCustomEvent(e, !1, !1, void 0),
        s
    }
      , p = t() ? i : s
      , f = void 0;
    f = e();
    var u, m = function t(s) {
        return function(t) {
            function e() {
                for (; s.length; ) {
                    var t = s.shift();
                    "function" == typeof t && t()
                }
            }
            function i() {
                document.removeEventListener("DOMContentLoaded", i),
                e()
            }
            if (s.push(t),
            "loading" !== document.readyState)
                return e();
            document.addEventListener("DOMContentLoaded", i)
        }
    }([]), g = function(s, n) {
        var r = {};
        return Object.keys(n.dataset).forEach(function(t) {
            if (t.match(new RegExp("^" + s)) && t !== s) {
                var e = t.replace(s, "")
                  , i = !1;
                e.match(/^Global/) && (e = e.replace("Global", ""),
                i = !0),
                e = "" + e[0].toLowerCase() + e.slice(1),
                r[e] = i ? window[n.dataset[t]] : n.dataset[t]
            }
        }),
        r
    }, v = function t(n, r, a) {
        var o = void 0;
        return function() {
            var e = this
              , i = arguments
              , t = function t() {
                o = null,
                a || n.apply(e, i)
            }
              , s = a && !o;
            clearTimeout(o),
            o = setTimeout(t, r),
            s && n.apply(e, i)
        }
    }, y = function(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }, b = function() {
        function s(t, e) {
            for (var i = 0; i < e.length; i++) {
                var s = e[i];
                s.enumerable = s.enumerable || !1,
                s.configurable = !0,
                "value"in s && (s.writable = !0),
                Object.defineProperty(t, s.key, s)
            }
        }
        return function(t, e, i) {
            return e && s(t.prototype, e),
            i && s(t, i),
            t
        }
    }(), w = {
        In: "scrolltriggers:inView",
        Out: "scrolltriggers:outOfView",
        Pause: "scrolltriggers:pause",
        Resume: "scrolltriggers:resume"
    }, E = function() {
        function p(t, e) {
            var i = this;
            y(this, p),
            t.hasAttribute("data-scroll-init") || (this.added = !1,
            this.el = t,
            this.options = e,
            this.eventHandler = v(this.onScroll.bind(this), 10, !0),
            this.dCalcBounds = v(this.calcBounds.bind(this), 10),
            this.paused = !1,
            this.disabled = !1,
            (this.options.image || this.options.srcset || "auto" === this.options.offset) && (this.options.offset = -1 * Math.max((document.documentElement.clientHeight,
            (window.innerHeight || 0) / 2))),
            (this.options.image || this.options.src || this.options.srcset) && (this.options.once = !0),
            t.setAttribute("data-scroll-init", "true"),
            this.calcBounds(),
            window.addEventListener("scroll", this.eventHandler),
            window.addEventListener("resize", this.dCalcBounds),
            h(this.el, w.Pause, function() {
                i.paused = !0
            }),
            h(this.el, w.Resume, function() {
                i.paused = !1
            }),
            setTimeout(this.eventHandler, 400))
        }
        return b(p, [{
            key: "calcBounds",
            value: function t() {
                var e = !0 === this.options.progress || void 0 !== this.options.fixed;
                if (!this.el.offsetParent && !e || this.added && this.options.once)
                    this.disabled = !0;
                else {
                    this.disabled = !1;
                    var i = this.options.position || "bottom";
                    this.startEl = this.options.start ? d(this.options.start) : this.el,
                    p.checkElement(this.startEl, "start", this.options.start);
                    var s = this.startEl.getBoundingClientRect()
                      , n = p.getScrollY()
                      , r = s.top + n + (this.options.offset || 0);
                    if (this.start = p.processPosition(i, r),
                    this.options.end) {
                        var a = d(this.options.end), o, h = a.getBoundingClientRect().top + n, l = this.options.positionEnd || "bottom";
                        "auto" === l && (l = "top"),
                        this.end = p.processPosition(l, h),
                        "auto" === this.options.positionEnd && (this.end -= this.el.offsetHeight),
                        p.checkElement(a, "end", this.options.end)
                    }
                    this.eventHandler()
                }
            }
        }, {
            key: "inView",
            value: function t() {
                var e = this.options
                  , i = e.className
                  , t = e.inView;
                i && this.el.classList && a(this.el, i);
                var s = this.options.image
                  , n = this.options.src
                  , r = this.options.srcset;
                (s || n) && ("IMG" === this.el.tagName ? this.el.setAttribute("src", s) : "IFRAME" === this.el.tagName || "VIDEO" === this.el.tagName ? this.el.setAttribute("src", n) : c(this.el, {
                    backgroundImage: "url(" + s + ")",
                    backgroundRepeat: "no-repeat"
                })),
                r && this.el.setAttribute("srcset", r),
                "function" == typeof t && t(this.el, this.options),
                l(this.el, w.In, {
                    bubbles: !0,
                    detail: this.options
                }),
                this.options.once && (this.disabled = !0,
                window.removeEventListener("scroll", this.eventHandler),
                window.removeEventListener("resize", this.dCalcBounds)),
                this.added = !0
            }
        }, {
            key: "outOfView",
            value: function t() {
                var e = this.options
                  , i = e.className
                  , t = e.outOfView;
                i && this.el.classList && r(this.el, i),
                "function" == typeof t && t(this.el, this.options),
                l(this.el, w.Out, {
                    bubbles: !0,
                    detail: this.options
                }),
                this.added = !1
            }
        }, {
            key: "onScroll",
            value: function t() {
                var e = p.getScrollY();
                if (!this.paused && !this.disabled) {
                    if (this.options.progress) {
                        var i = e / (document.documentElement.scrollHeight - window.innerHeight);
                        this.el.style.width = 100 * i + "%"
                    }
                    e < this.start || this.end && e > this.end ? this.added && this.outOfView() : this.added || this.inView()
                }
            }
        }], [{
            key: "checkElement",
            value: function t(e, i, s) {
                if (!e)
                    throw new Error(i + " element doesn't match any element with selector: \"" + s + '"')
            }
        }, {
            key: "getScrollY",
            value: function t() {
                return window.pageYOffset || document.documentElement.scrollTop
            }
        }, {
            key: "processPosition",
            value: function t(e, i) {
                return "top" === e ? i : i -= "middle" === e ? window.innerHeight / 2 : "bottom" === e ? window.innerHeight : window.innerHeight * (parseInt(e, 10) / 100)
            }
        }]),
        p
    }(), _ = function t(e) {
        var i = [];
        if (e && Array.isArray(e))
            e.forEach(function(e) {
                var t = o(e.el);
                if (null === t)
                    throw new Error("unknown element");
                t.forEach(function(t) {
                    delete e.el,
                    i.push(new E(t,e))
                })
            });
        else {
            if (e)
                throw new Error("please convert object to array");
            var s;
            o("[data-scroll]").forEach(function(t) {
                var e = g("scroll", t);
                null !== e.progress && void 0 !== e.progress && (e.progress = !0),
                e.className = e.class,
                e.offset && (e.offset = parseInt(e.offset, 10)),
                void 0 !== e.once && (e.once = !0),
                i.push(new E(t,e))
            })
        }
        return i
    };
    return "complete" !== document.readyState && document.addEventListener("readystatechange", function() {
        "complete" === document.readyState && l(window, "resize")
    }),
    m(_),
    _.Events = w,
    _.ScrollTrigger = E,
    _
}();
String.prototype.includes || (String.prototype.includes = function(t, e) {
    "use strict";
    return "number" != typeof e && (e = 0),
    !(e + t.length > this.length) && -1 !== this.indexOf(t, e)
}
),
ready(function() {
    var t = Array.prototype.slice.call(document.getElementsByClassName("audio-player"), 0)
      , e = Array.prototype.slice.call(document.getElementsByClassName("video-player"), 0)
      , i = Array.prototype.slice.call(document.getElementsByTagName("audio"), 0)
      , s = Array.prototype.slice.call(document.getElementsByTagName("video"), 0);
    window.playableElements = t.concat(e),
    window.players = i.concat(s),
    window.masterVolume = 80,
    window.playing = null,
    window.loading = !1,
    window.latestKnownScrollY = 0,
    window.canScroll = !1;
    for (var n = 0; n < window.playableElements.length; n++)
        initPlayer(window.playableElements[n], "player_" + n);
    initVolume(),
    formHandling(),
    initOverlays(),
    toggleNav(),
    formSetup(),
    initCredits(),
    targetBlank(),
    loadMore(),
    animateJson()
}),
window.addEventListener("load", function() {
    var t;
    removeClass(document.querySelector("main"), "hidden"),
    removeClass(document.body, "loading"),
    null !== document.querySelector(".rellax") && (window.rellax = new Rellax(".rellax")),
    scrollEffect()
//	document.getElementById("hp_holder").setAttribute("class", "step0")
});
/*
document.getElementById("hp_holder").addEventListener("click",function(e){
   scrollEffect();
},false);
*/
