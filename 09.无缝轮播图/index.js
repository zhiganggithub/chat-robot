(function () {
    var imgs = ["./img/banner1.jpg", "./img/banner2.jpg", "./img/banner3.jpg"];
    var totalCount = imgs.length;
    var banner = document.querySelector(".banner");
    var img1 = banner.querySelector(".img0");
    img1.src = imgs[0];
    var pagebar = document.querySelector("#pagebar");
    var pageLeft = document.querySelector(".page-left");
    var pageRight = document.querySelector(".page-right");
    var curIndex = 0;
    var totalMS = 300;

    function init() {
        for (let i = 1; i < 3; i++) {
            var img = img1.cloneNode(true);
            img.src = imgs[i];
            img.className = "img" + i + " fl";
            banner.appendChild(img);
        }
        var imgLast = img1.cloneNode(true);
        banner.appendChild(imgLast);

        initPageBar();

        pageLeft.onclick = onMovePrev;

        pageRight.onclick = onMoveNext;
    }

    function onMovePrev() {
        pageLeft.className += " no-click";
        onMoveTo(curIndex - 1);
    }
    function onMoveNext() {
        pageRight.className += " no-click";
        onMoveTo(curIndex + 1);
    };

    function onMoveTo(index, isClickBar = false) {
        clearMovingImg();
        curIndex = index;
        if (curIndex < 0) {
            curIndex = totalCount - 1;
            moveTo(totalCount);
        }
        var timerId = createAnimation({
            from: parseInt(banner.style.left),
            to: -(curIndex * pagebar.clientWidth),
            totalMS: totalMS,
            onMove: function (n) {
                banner.style.left = n + "px";
            },
            onEnd: function () {
                // console.log('onend', index)
                banner.removeAttribute("timerid");
                pageLeft.className = pageLeft.className.replace("no-click", "");
                pageRight.className = pageRight.className.replace("no-click", "");
                setSelectBar(curIndex);
                if (!isClickBar) {
                    if (curIndex === 0) {
                        curIndex = totalCount;
                        moveTo(curIndex);
                        curIndex = 0;
                    }
                    if (curIndex >= totalCount) {
                        curIndex = 0;
                        moveTo(curIndex);
                    }
                }
            },
        });
        banner.setAttribute("timerid", timerId);
    }

    function clearMovingImg() {
        var timerId = banner.getAttribute("timerid");
        if (timerId) {
            clearInterval(timerId);
        }
    }

    function initPageBar() {
        var totalW = totalCount * 20 + (totalCount - 1) * 5;
        var startX = (pagebar.clientWidth - totalW) >> 1;
        for (let i = 0; i < totalCount; i++) {
            var li = document.createElement("li");
            li.className = "fl";
            li.style.left = startX + "px";
            li.onclick = onClickBar.bind(this, i);
            pagebar.appendChild(li);
        }
    }

    function onClickBar(i) {
        onMoveTo(i, true);
    }

    function moveTo(index) {
        banner.style.left = -(index * pagebar.clientWidth) + "px";

        setSelectBar(index);
    }

    function setSelectBar(index) {
        index = index % totalCount;
        var beforeSelect = pagebar.querySelector("li.active");
        if (beforeSelect) {
            beforeSelect.className = "fl";
        }
        pagebar.children[index].className = "fl active";
    }

    init();

    console.log(curIndex)
    moveTo(curIndex);

    // 自动播放
    var timerId;
    function startMove() {
        timerId = setInterval(function () {
            onMoveNext();
        }, totalMS * 5);
    }

    function stopMove() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    startMove();

    var container = document.querySelector(".container");
    container.onmouseenter = stopMove;
    container.onmouseleave = startMove;
})();
