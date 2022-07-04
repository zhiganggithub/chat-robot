(function () {
    // 引入动画库
    function addAnimateScript() {
        var animateScr = document.createElement("script");
        animateScr.setAttribute("type", "text/javascript");
        animateScr.setAttribute("src", "./animate.js");
        document.getElementsByTagName("head")[0].appendChild(animateScr);
    }
    addAnimateScript();
    // end

    var navLiArr = document.querySelectorAll(".nav > li");

    var totalMS = 2000;

    for (let i = 0; i < navLiArr.length; i++) {
        var navLi = navLiArr[i];
        navLi.setAttribute("status", "closed");
        navLi.onclick = function () {
            onClick(i);
        };
    }

    function onClick(i) {
        var navLi = navLiArr[i];
        var status = navLi.getAttribute("status");
        // console.log(status);
        if (status === "moving") {
            return;
        }
        if (status === "opened") {
            closeMenu(i);
            return;
        }
        closeAll();
        openMenu(i);
    }

    function closeAll() {
        for (let i = 0; i < navLiArr.length; i++) {
            const navLi = navLiArr[i];
            var status = navLi.getAttribute("status");
            var timerId = navLi.getAttribute("timerId");
            // console.log("timerId: " + timerId);
            if (timerId !== null || status === "opened") {
                if (timerId) {
                    clearInterval(timerId);
                    timerId = null;
                    navLi.removeAttribute("timerId");
                }
                closeMenu(i);
            }
        }
    }

    function closeMenu(i) {
        var navLi = navLiArr[i];
        // console.log("clientHeight:" + navLi.clientHeight);
        var from = navLi.clientHeight; // parseInt(navLi.clientHeight)
        var to = 30;
        navLi.setAttribute("status", "moving");
        createAnimation({
            from,
            to,
            totalMS,
            onMove: function (n) {
                navLi.style.height = n + "px";
            },
            onEnd: function () {
                // console.log("closeMenu>>closed end");
                navLi.setAttribute("status", "closed");
            },
        });
    }

    function openMenu(i) {
        var navLi = navLiArr[i];
        var from = 30;
        var to = 150;
        navLi.setAttribute("status", "moving");
        var timerId = createAnimation({
            from,
            to,
            totalMS,
            onMove: function (n) {
                navLi.style.height = n + "px";
            },
            onEnd: function () {
                // console.log("opened end");
                navLi.setAttribute("status", "opened");
                navLi.removeAttribute("timerId");
            },
        });
        navLi.setAttribute("timerId", timerId);
    }
})();
