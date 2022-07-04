(function () {
    function $(selector) {
        return document.querySelector(selector);
    }

    var doms = {
        img: $(".middle a img"),
        titles: document.querySelectorAll(".content div"),
    };

    var curIndex = 0;
    var len = doms.titles.length;

    var urls = ["./img/banner1.jpg", "./img/banner2.jpg", "./img/banner3.jpg", "./img/banner4.jpg"];

    function init() {
        for (let i = 0; i < len; i++) {
            var title = doms.titles[i];
            var span = title.querySelector('span');
            title.setAttribute("title", title.innerText + ':' + span.innerText);
            title.onmouseenter = function() {
                stop();
                curIndex = i;
                changePage();
            };
            title.onmouseleave = start;
        }

        doms.img.onmouseenter = stop;
        doms.img.onmouseleave = start;

        changePage();
        start();
    }

    function changePage() {
        doms.img.src = urls[curIndex];
        for (var i = 0; i < len; i++) {
            var title = doms.titles[i];
            var span = title.querySelector('span');
            title.className = i === curIndex ? "active" : "";
            span.className = i === curIndex ? "" : "dn";
        }
    }

    init();

    var timerId;

    function start() {
        timerId = setInterval(function() {
            curIndex++;
            if (curIndex >= len) {
                curIndex = 0;
            }
            changePage();
        }, 1000);
    }

    function stop() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    }
})();
