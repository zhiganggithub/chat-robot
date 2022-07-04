(function () {
    var imgs = document.querySelectorAll(".list img");
    var rightContainer = document.querySelector(".showRight");
    var rightImg = rightContainer.querySelector("img");
    var leftContainer = document.querySelector(".showLeft");
    var leftImg = leftContainer.querySelector("img");
    var mirror = leftContainer.querySelector("#mirror");
    var mask = leftContainer.querySelector(".mask");

    function init() {
        console.log(imgs);
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].onclick = function () {
                onSelectImg(i);
            };
        }

        onSelectImg(0);
        mask.onmouseenter = onMouseEnter;
    }

    function onSelectImg(index) {
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].className = i === index ? "selected" : "";
        }
        showImg(index);
    }

    function showImg(index) {
        leftImg.src = imgs[index].src;
    }

    function onMouseEnter(e) {
        e.stopPropagation();
        mask.onmousemove = onMouseMove;
        mask.onmouseleave = onMouseLeave;
        onMouseMove(e);
    }

    function onMouseMove(e) {
        e.stopPropagation();
        mirror.className = "";
        rightContainer.className = "showRight";
        rightImg.src = leftImg.src;

        var left = e.offsetX;
        var top = e.offsetY;
        var mirrorML = 25;
        if (left < mirrorML) {
            left = mirrorML;
        }
        if (left > leftContainer.clientWidth - mirrorML) {
            left = leftContainer.clientWidth - mirrorML;
        }
        if (top < mirrorML) {
            top = mirrorML;
        }
        if (top > leftContainer.clientHeight - mirrorML) {
            top = leftContainer.clientHeight - mirrorML;
        }
        mirror.style.left = left + "px";
        mirror.style.top = top + "px";

        rightImg.style.left = (mirrorML-left) * 4 + "px";
        rightImg.style.top = (mirrorML-top) * 4 + "px";
    }

    function onMouseLeave(e) {
        console.log("leave");
        mask.onmousemove = null;
        mask.onmouseleave = null;
        mirror.className = "dn";
        rightContainer.className = "showRight dn";
    }

    init();
})();
