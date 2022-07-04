(function () {
    var ul = document.querySelector("ul");
    console.dir(ul);

    function cloneFirstNode() {
        var li = ul.children[0].cloneNode(true);
        ul.appendChild(li);
    }
    cloneFirstNode();

    var scrollY = 0;
    var ulH = ul.clientHeight;
    var maxH = (ul.children.length - 1) * ulH;
    var curIndex = 0;

    function changeLi() {
        var curScrollY = ul.scrollTop;
        curIndex++;
        if (curIndex >= ul.children.length) {
            curIndex = 0;
        }
        scrollY = ulH * curIndex;
        if (scrollY > maxH) {
            scrollY = 0;
        }
        var tweenScrollY = curScrollY;
        var needTime = 300;
        var gapTime = 16;
        var count = needTime / gapTime;
        var dis = (scrollY - tweenScrollY) / count;
        var timerId = setInterval(function () {
            tweenScrollY += dis;
            ul.scrollTop = tweenScrollY;
            if (tweenScrollY >= scrollY) {
                clearInterval(timerId);
                ul.scrollTop = scrollY;
                if (curIndex === ul.children.length - 1) {
                    changeLi();
                } else {
                    setTimeout(changeLi, 1000);
                }
            }
        }, gapTime);
    }

    changeLi();
})();
